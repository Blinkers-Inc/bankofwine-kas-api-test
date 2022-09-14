import axios from "axios";
import * as dotenv from "dotenv";
import { prompt } from "prompts";

import { curHeaders } from "../../constant";
dotenv.config();

export const getContractList = async () => {
  const { size, cursor } = await prompt([
    {
      type: "number",
      name: "size",
      message: "100 <= size <= 1000",
      validate: (value: number) =>
        value >= 100 && value <= 1000 ? true : "100 <= size <= 1000",
    },
    {
      type: "text",
      name: "cursor",
      message: "put cursor",
    },
  ]);

  console.log("size,cursor", size, cursor);
  try {
    const { data: contractList } = await axios.get(
      "https://kip17-api.klaytnapi.com/v2/contract",
      { headers: curHeaders }
    );
    const { cursor, items } = contractList;

    const result = {
      cursor,
      length: items.length,
      items,
    };

    console.log("result :>> ", result);

    return result;
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  await getContractList();
};

main();
