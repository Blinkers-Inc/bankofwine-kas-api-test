import axios from "axios";
import { headers } from "../../constant";
import { getContractAddress } from "./001.getContractList";

const getContractInfo = async () => {
  const address = await getContractAddress();
  console.log("address", address);

  try {
    const { data } = await axios.get(
      `https://kip17-api.klaytnapi.com/v2/contract/${address}`,
      { headers }
    );

    console.log("data", data);

    return data;
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  return await getContractInfo();
};

main();
