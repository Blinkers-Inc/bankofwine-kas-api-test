import axios from "axios";
import * as dotenv from "dotenv";
import { prompt } from "prompts";
import { curHeaders } from "../../../constant";
import { getContractOwner } from "../../read/003.getContractOwner";
dotenv.config();

const getPromptResult = async () => {
  const { contractAddress, currentOwnerAddress } = await prompt([
    {
      type: "text",
      name: "contractAddress",
      message: "KIP17 Contract address to update owner : ",
    },
    {
      type: "text",
      name: "currentOwnerAddress",
      message: "current owner address : ",
    },
  ]);

  return { contractAddress, currentOwnerAddress };
};

export const removeOwner = async (input: {
  contractAddress: string;
  currentOwnerAddress: string;
  headers: {
    Authorization: string;
    "x-chain-id": string;
    "Content-Type": string;
  };
}) => {
  const { contractAddress, currentOwnerAddress, headers } = input;
  const url = `https://kip17-api.klaytnapi.com/v2/contract/${contractAddress}/owner`;

  try {
    const { data: result } = await axios.delete(url, {
      headers,
      data: {
        from: currentOwnerAddress,
      },
    });

    console.log("result :>> ", result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  const { contractAddress, currentOwnerAddress } = await getPromptResult();

  await removeOwner({
    contractAddress,
    currentOwnerAddress,
    headers: curHeaders,
  });
};

main();
