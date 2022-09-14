/* eslint-disable new-cap */

import CaverExtKAS from "caver-js-ext-kas";
import { prompt } from "prompts";

const {
  TESTNET_KAS_ACCESS_KEY,
  TESTNET_KAS_SECRET_ACCESS_KEY,
  TESTNET_KAS_CHAIN_ID,
} = process.env;

const getPromptResult = async () => {
  const { publicKey, privateKey } = await prompt([
    {
      type: "text",
      name: "publicKey",
      message: "public key : ",
    },
    {
      type: "text",
      name: "privateKey",
      message: "privateKey key : ",
    },
  ]);

  return { publicKey, privateKey };
};

const caver = new CaverExtKAS();

const getSignResult = async (publicKey: string, privateKey: string) => {
  try {
    await caver.initKASAPI(
      TESTNET_KAS_CHAIN_ID,
      TESTNET_KAS_ACCESS_KEY,
      TESTNET_KAS_SECRET_ACCESS_KEY
    );
  } catch (err) {
    console.error("err1", err);
  }

  try {
    await caver.initWalletAPI(
      TESTNET_KAS_CHAIN_ID,
      TESTNET_KAS_ACCESS_KEY,
      TESTNET_KAS_SECRET_ACCESS_KEY
    );
  } catch (err) {
    console.error("err2", err);
  }

  const keyringContainer = new caver.keyringContainer();
  const keyring = keyringContainer.keyring.create(publicKey, privateKey);
  keyringContainer.add(keyring);

  const createdKeys = await caver.kas.wallet.createKeys(1);
  const key = createdKeys.items[0];

  const updateTx = new caver.transaction.feeDelegatedAccountUpdate({
    from: keyring.address,
    account: caver.account.createWithAccountKeyPublic(
      keyring.address,
      key.publicKey
    ),
    gas: 1000000,
  });

  // 트랜잭션에 서명합니다.
  await keyringContainer.sign(keyring.address, updateTx);

  const result = {
    keyId: key.keyId,
    address: keyring.address,
    rlp: updateTx.getRLPEncoding(),
  };

  return result;
};

const main = async () => {
  const { publicKey, privateKey } = await getPromptResult();
  const result = await getSignResult(publicKey, privateKey);

  console.log("result :>> ", result);

  // TODO : migrate with result by
  // https://docs.klaytnapi.com/migrate
};

main();
