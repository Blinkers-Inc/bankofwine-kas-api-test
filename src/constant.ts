import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export const headers = {
  Authorization: process.env.KAS_AUTHORIZATION!,
  "x-chain-id": process.env.KAS_CHAIN_ID!,
  "Content-Type": "application/json",
};
