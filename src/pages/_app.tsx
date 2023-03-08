import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../styles/theme";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    }
    <Component {...pageProps} />
  </ChakraProvider>
);

export default api.withTRPC(MyApp);
