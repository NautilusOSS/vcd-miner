import { CONTRACT } from "ulujs";
import algosdk from "algosdk";
import * as dotenv from "dotenv";
import abi from "./abi.js";

dotenv.config();

const { MN, ALGO_SERVER, ALGO_INDEXER, NETWORK } = process.env;

const networks = NETWORK ? NETWORK.split(",") : ["voitest", "voimain"];

if (!MN) {
  throw new Error("Mnemonic (MN) environment variable is required");
}

if (NETWORK === "custom" && (!ALGO_SERVER || !ALGO_INDEXER)) {
  throw new Error(
    "ALGO_SERVER and ALGO_INDEXER are required for custom network"
  );
}

const getAccount = () => algosdk.mnemonicToSecretKey(MN || "");

const signSendAndConfirm = async (algodClient, txns, sk) => {
  const stxns = txns
    .map((t) => new Uint8Array(Buffer.from(t, "base64")))
    .map((t) => {
      const txn = algosdk.decodeUnsignedTransaction(t);
      return txn;
    })
    .map((t) => algosdk.signTransaction(t, sk));
  const res = await algodClient
    .sendRawTransaction(stxns.map((txn) => txn.blob))
    .do();
  // don't wait for confirmation
  // return await Promise.all(
  //   stxns.map((res) => algosdk.waitForConfirmation(algodClient, res.txID, 4))
  // );
};

const getClientParams = (network) => {
  switch (network) {
    default:
    case "voitest":
      return {
        server: "https://testnet-api.voi.nodely.dev",
        indexerServer: "https://testnet-idx.voi.nodely.dev",
        port: 443,
      };
    case "voimain":
      return {
        server: "https://mainnet-api.voi.nodely.dev",
        indexerServer: "https://mainnet-idx.voi.nodely.dev",
        port: 443,
      };
    case "localnet":
      return {
        server: "http://localhost:8080",
        indexerServer: "http://localhost:8080",
        port: 8080,
      };
    case "custom":
      return {
        server: ALGO_SERVER,
        indexerServer: ALGO_INDEXER,
        port: 443,
      };
  }
};

const getAppIds = (network) => {
  switch (network) {
    default:
    case "voitest":
      return {
        slotMachine: 50834,
        slotMachinePayoutModel: 50835,
        yieldBearingToken: 50838,
      };
    case "voimain":
      return {
        slotMachine: 40048754,
        slotMachinePayoutModel: 40048751,
        yieldBearingToken: 40048753,
      };
  }
};

const getAlgorandClients = (network) => {
  const { server, indexerServer, port } = getClientParams(network);
  const algodClient = new algosdk.Algodv2("", server, port);
  const indexerClient = new algosdk.Indexer("", indexerServer, port);
  return { algodClient, indexerClient };
};

for (const network of networks) {
  try {
    console.log(`Mining on ${network}`);
    const { algodClient, indexerClient } = getAlgorandClients(network);
    const { slotMachine } = getAppIds(network);
    const acc = getAccount();
    const ci = new CONTRACT(slotMachine, algodClient, indexerClient, abi, acc);
    const { boxes } = await algodClient.getApplicationBoxes(slotMachine).do();

    for await (const box of boxes) {
      try {
        ci.setFee(4000);
        ci.setEnableParamsLastRoundMod(true);
        const claimR = await ci.claim(box.name);
        if (claimR.success) {
          await signSendAndConfirm(algodClient, claimR.txns, acc.sk);
          console.log(
            `Successfully claimed box ${Buffer.from(box.name).toString(
              "base64"
            )}`
          );
        }
      } catch (boxError) {
        console.error(
          `Error processing box: ${Buffer.from(box.name).toString("base64")}`,
          boxError
        );
        continue; // Continue with next box even if one fails
      }
    }
  } catch (networkError) {
    console.error(`Error processing network ${network}:`, networkError);
    continue; // Continue with next network even if one fails
  }
}
