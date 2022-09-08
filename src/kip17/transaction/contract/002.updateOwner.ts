import axios from "axios";
import * as dotenv from "dotenv";
import { prompt } from "prompts";
import { curHeaders } from "../../../constant";
import { getContractOwner } from "../../read/003.getContractOwner";
dotenv.config();

const getPromptResult = async () => {
  const { contractAddress, newOwnerAddress } = await prompt([
    {
      type: "text",
      name: "contractAddress",
      message: "KIP17 Contract address to update owner : ",
    },
    {
      type: "text",
      name: "newOwnerAddress",
      message: "new owner address : ",
    },
  ]);

  return { contractAddress, newOwnerAddress };
};

export const updateOwner = async (input: {
  contractAddress: string;
  newOwnerAddress: string;
  headers: {
    Authorization: string;
    "x-chain-id": string;
    "Content-Type": string;
  };
}) => {
  const { contractAddress, newOwnerAddress, headers } = input;
  const { owner: preOwner } = await getContractOwner(contractAddress);
  const url = `https://kip17-api.klaytnapi.com/v2/contract/${contractAddress}/owner/transfer`;
  const data = {
    sender: preOwner,
    owner: newOwnerAddress,
  };

  try {
    const { data: result } = await axios.put(url, data, {
      headers,
    });

    return result;
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  const { contractAddress, newOwnerAddress } = await getPromptResult();

  await updateOwner({
    contractAddress,
    newOwnerAddress,
    headers: curHeaders,
  });
};

main();
