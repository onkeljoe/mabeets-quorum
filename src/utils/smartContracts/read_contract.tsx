/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ethers } from "ethers";
import type { BigNumber } from "ethers";
import { relicAbi } from "../abi/relicAbi";

interface Position {
  amount: BigNumber;
  rewardDebt: BigNumber;
  rewardCredit: BigNumber;
  entry: BigNumber;
  poolId: BigNumber;
  level: BigNumber;
}

interface LevelInfo {
  requiredMaturities: BigNumber[];
  multipliers: BigNumber[];
  balance: BigNumber[];
}

const contractAdress = "0x1ed6411670c709F4e163854654BD52c74E66D7eC";
const providerUrl = "https://rpc.ftm.tools";

const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const contract = new ethers.Contract(contractAdress, relicAbi, provider);

export async function balanceOf(address: string): Promise<number> {
  const resultobj = (await contract.balanceOf(address)) as BigNumber;
  return resultobj.toNumber() || 0;
}

export async function emissionCurve(): Promise<string> {
  const address = (await contract.emissionCurve()) as string;
  return address || "";
}

// export async function getApproved() {
//   return null;
// }

export async function getLevelInfo(poolId: number) {
  const levelInfo = (await contract.getLevelInfo(poolId)) as LevelInfo;
  const result = {
    requiredMaturities: levelInfo.requiredMaturities.map((x) => x.toNumber()),
    multipliers: levelInfo.multipliers.map((x) => x.toNumber()),
    balance: levelInfo.balance.map((x) =>
      parseFloat(ethers.utils.formatEther(x))
    ),
  };
  return result;
}

export async function getPoolInfo(poolId: number) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const poolInfo = await contract.getPoolInfo(poolId);
  console.log(poolInfo);
  return null;
}

export async function getPositionForId(relicId: number) {
  const position = (await contract.getPositionForId(relicId)) as Position;
  const result = {
    amount: ethers.utils.formatEther(position.amount),
    rewardDebt: ethers.utils.formatEther(position.rewardDebt),
    rewardCredit: ethers.utils.formatEther(position.rewardCredit),
    entry: position.entry.toNumber(),
    poolId: position.poolId.toNumber(),
    level: position.level.toNumber(),
  };
  return result;
}

// export async function getRoleAdmin() {
//   return null;
// }

// export async function getRoleMember() {
//   return null;
// }

// export async function getRoleMemberCount() {
//   return null;
// }

// export async function hasRole() {
//   return null;
// }

// export async function isApprovedForAll() {
//   return null;
// }

// export async function isApprovedOrOwner() {
//   return null;
// }

export async function levelOnUpdate(relicId: number): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const level = (await contract.levelOnUpdate(relicId)) as ethers.BigNumber;
  return level.toNumber();
}

// not implemented: name

// export async function nftDescriptor() {
//   return null;
// }

// export async function ownerOf() {
//   return null;
// }

// export async function pendingReward() {
//   return null;
// }

// export async function pendingRewardsOfOwner() {
//   return null;
// }

// export async function poolLength() {
//   return null;
// }

// export async function poolToken() {
//   return null;
// }

// export async function relicPositionsOfOwner() {
//   return null;
// }

// not implemented: rewardToken (immutable):
// 0xf24bcf4d1e507740041c9cfd2dddb29585adce1e

// export async function rewarder() {
//   return null;
// }

// export async function supportsInterface() {
//   return null;
// }

// not implemented: symbol => RELIC

// export async function tokenByIndex() {
//   return null;
// }

// export async function tokenOfOwnerByIndex() {
//   return null;
// }

// export async function tokenURI() {
//   return null;
// }

// export async function totalAllocPoint() {
//   return null;
// }

// export async function totalSupply() {
//   return null;
// }
