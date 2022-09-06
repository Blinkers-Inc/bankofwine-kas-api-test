import axios from "axios";
import * as dotenv from "dotenv";

import { headers } from "../../constant";
import { getContractAddress } from "./001.getContractList";
dotenv.config();

export const getContractOwner = async () => {
  const address = await getContractAddress();

  try {
    const { data: owner } = await axios.get(
      `https://kip17-api.klaytnapi.com/v2/contract/${address}/owner`,
      { headers }
    );

    console.log("owner :>> ", owner);

    return owner;
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  await getContractOwner();
};

main();
