import axios from "axios";
import * as dotenv from "dotenv";
import { prompt } from "prompts";

import { headers } from "../../constant";
dotenv.config();

const getPromptResult = async () => {
  const { address } = await prompt([
    {
      type: "text",
      name: "address",
      message: "Account address : ",
    },
  ]);

  return address;
};
export const getAccountInfo = async () => {
  const address = await getPromptResult();
  console.log("address :>> ", address);
  console.log("typeof address :>> ", typeof address);
  try {
    const { data: account } = await axios.get(
      `https://wallet-api.klaytnapi.com/v2/account/${address}`,
      { headers }
    );

    console.log("account :>> ", account);

    return account;
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  await getAccountInfo();
};

main();
