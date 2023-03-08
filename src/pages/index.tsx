import {
  Card,
  Flex,
  Heading,
  IconButton,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { api } from "~/utils/api";
import {
  FaMoon as MoonIcon,
  FaSun as SunIcon,
  FaGithub as GithubIcon,
} from "react-icons/fa";

const Read: NextPage = () => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  const poolId = 2;
  const levelInfo = api.relic.getLevelInfo.useQuery(
    { poolId },
    {
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: false,
      refetchInterval: 60000,
    }
  ).data?.levelInfo;

  if (!levelInfo)
    return (
      <>
        <Flex m={6} justifyContent="flex-end">
          <Link
            href="https://github.com/onkeljoe/mabeets-quorum"
            isExternal
            mx={4}
          >
            <IconButton
              fontSize="xl"
              variant="ghost"
              icon={<GithubIcon />}
              aria-label={`Github`}
            />
          </Link>
          <IconButton
            mx={4}
            fontSize="xl"
            variant="ghost"
            onClick={toggleColorMode}
            icon={<SwitchIcon />}
            aria-label={`Switch to ${text} mode`}
          />{" "}
        </Flex>
        <Card m={12} p={6}>
          <Heading mb={4} alignSelf="center">
            Loading
          </Heading>
        </Card>
      </>
    );
  return (
    <>
      <Flex m={6} justifyContent="flex-end">
        <IconButton
          mx={4}
          fontSize="xl"
          variant="ghost"
          onClick={toggleColorMode}
          icon={<SwitchIcon />}
          aria-label={`Switch to ${text} mode`}
        />
      </Flex>
      <Card m={12} p={6}>
        <Heading mb={4} alignSelf="center">
          maBEETS voting power
        </Heading>
        <Table size="sm" variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th isNumeric>Level</Th>
              <Th isNumeric>Weight</Th>
              <Th isNumeric>min age [days]</Th>
              <Th isNumeric>total fBEETS</Th>
              <Th isNumeric>total voting power</Th>
            </Tr>
          </Thead>
          <Tbody>
            {levelInfo &&
              levelInfo.multipliers.map((mul, index) => {
                return (
                  <Tr key={index}>
                    <Td isNumeric>{index}</Td>
                    <Td isNumeric>{mul}</Td>
                    <Td isNumeric>
                      {(levelInfo.requiredMaturities[index] || 0) / 86400}
                    </Td>
                    <Td isNumeric>
                      {Math.round(
                        levelInfo.balance[index] || 0
                      ).toLocaleString()}
                    </Td>
                    <Td isNumeric>
                      {Math.round(
                        ((levelInfo.balance[index] || 0) * mul) / 100
                      ).toLocaleString()}
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td isNumeric>
                {levelInfo &&
                  Math.round(
                    levelInfo.balance.reduce((sum, cur) => sum + cur, 0)
                  ).toLocaleString()}
              </Td>
              <Td isNumeric>
                {levelInfo &&
                  Math.round(
                    levelInfo.balance.reduce(
                      (sum, cur, index) =>
                        sum + (cur * (levelInfo.multipliers[index] || 0)) / 100,
                      0
                    )
                  ).toLocaleString()}
              </Td>
            </Tr>
          </Tfoot>
        </Table>
        <Text as="b" alignSelf="flex-end" m={6}>
          Quorum suggestion: 5% of total Voting Power:{" "}
          {levelInfo &&
            Math.round(
              levelInfo.balance.reduce(
                (sum, cur, index) =>
                  sum + (cur * (levelInfo.multipliers[index] || 0)) / 100,
                0
              ) * 0.05
            ).toLocaleString()}
        </Text>
        <Text fontSize="sm">
          created by Onkeljoe 2023, V0.2{" "}
          <Link href="https://github.com/onkeljoe/mabeets-quorum" isExternal>
            <IconButton
              fontSize="xl"
              variant="ghost"
              icon={<GithubIcon />}
              aria-label={`Github`}
            />
          </Link>
        </Text>
      </Card>
    </>
  );
};

export default Read;
