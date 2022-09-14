import axios from "axios";

import { curHeaders } from "../../constant";

const getContractInfo = async (contractAddress: string) => {
  try {
    const { data } = await axios.get(
      `https://kip17-api.klaytnapi.com/v2/contract/${contractAddress}`,
      { headers: curHeaders }
    );

    console.log("data", data);

    return data;
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  return await getContractInfo("hello");
};

main();
