import axios from "axios";
import * as dotenv from "dotenv";

import { headers } from "../../constant";
dotenv.config();

export const createKIP17Contract = async () => {
  try {
    const { data: result } = await axios.post(
      "https://kip17-api.klaytnapi.com/v2/contract",
      {
        headers,
        body: {
          alias: "test1Alias",
          symbol: "TEST1SYMBOL",
          name: "test1Name",
          owner: process.env.BOW_TEST_ACCOUNT,
          options: {
            enableGlobalFeePayer: true,
          },
        },
      }
    );

    console.log("result :>> ", result);

    return result;
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  // await createKIP17Contract();
};

main();
