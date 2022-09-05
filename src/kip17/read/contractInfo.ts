import axios from "axios";
import * as dotenv from "dotenv";

import { headers } from "../../constant";
dotenv.config();

export const getContractList = async () => {
  try {
    const { data: contractList } = await axios.get(
      "https://kip17-api.klaytnapi.com/v2/contract",
      { headers }
    );
    const contract = contractList.items[0];

    console.log("contract :>> ", contract);
    console.log("contract.options :>> ", contract.options);

    return contract;
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  await getContractList();
};

main();
