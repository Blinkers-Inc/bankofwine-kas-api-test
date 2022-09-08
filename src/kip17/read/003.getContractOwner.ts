import axios from "axios";
import * as dotenv from "dotenv";
import { prompt } from "prompts";

import { curHeaders } from "../../constant";

dotenv.config();

const getPromptResult = async () => {
  const { contractAddress } = await prompt([
    {
      type: "text",
      name: "contractAddress",
      message: "KIP17 Contract address to get owner address : ",
    },
  ]);

  return { contractAddress };
};

export const getContractOwner = async (contractAddress: string) => {
  try {
    const { data: owner } = await axios.get(
      `https://kip17-api.klaytnapi.com/v2/contract/${contractAddress}/owner`,
      { headers: curHeaders }
    );

    console.log("owner :>> ", owner);

    return owner;
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  const { contractAddress } = await getPromptResult();
  await getContractOwner(contractAddress);
};

main();
