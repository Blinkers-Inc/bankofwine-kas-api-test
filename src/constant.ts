import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export const curHeaders = {
  Authorization: process.env.TESTNET_KAS_AUTHORIZATION!,
  "x-chain-id": process.env.TESTNET_KAS_CHAIN_ID!,
  "Content-Type": "application/json",
};

export const newHeaders = {
  Authorization: process.env.NEW_KAS_AUTHORIZATION!,
  "x-chain-id": process.env.TESTNET_KAS_CHAIN_ID!,
  "Content-Type": "application/json",
};
