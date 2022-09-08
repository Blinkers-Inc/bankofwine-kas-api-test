import axios from "axios";
import * as dotenv from "dotenv";
import keccak256 from "keccak256";
import { prompt } from "prompts";
import { curHeaders, newHeaders } from "../../../constant";
dotenv.config();

const getPromptResult = async () => {
  const { contractAddress, id, isNew, to } = await prompt([
    {
      type: "toggle",
      name: "isNew",
      message: "is new headers?",
    },
    {
      type: "text",
      name: "contractAddress",
      message: "KIP17 Contract address to mint : ",
    },
    {
      type: "text",
      name: "id",
      message: "KIP17 Contract id to mint : ",
    },
    {
      type: "text",
      name: "to",
      message: "User address to get NFT : ",
    },
  ]);

  return { contractAddress, id, isNew, to };
};

export const mintToken = async (input: {
  contractAddress: string;
  headers: any;
  id: string;
  to: string;
}) => {
  const { contractAddress, id, headers, to } = input;
  console.log("id :>> ", id);
  console.log("headers", headers);
  const uri = "hello";

  console.log("contractAddress", contractAddress);
  console.log("to", to);
  const url = `https://kip17-api.klaytnapi.com/v2/contract/${contractAddress}/token`;
  console.log("url :>> ", url);
  try {
    const { data: result } = await axios.post(
      url,
      {
        to,
        id: `0x${id}`,
        uri,
      },
      {
        headers,
      }
    );

    console.log("result :>> ", result);

    return result;
  } catch (err) {
    console.error(err);
    const { data } = err as any;
    console.log("data :>> ", data);
  }
};

const main = async () => {
  const { contractAddress, id, isNew, to } = await getPromptResult();
  const headers = isNew ? newHeaders : curHeaders;

  console.log("isNew :>> ", isNew);
  console.log("contractAddress", contractAddress);
  console.log("id :>> ", id);
  console.log("to :>> ", to);

  await mintToken({ contractAddress, to, id, headers });
};

main();
