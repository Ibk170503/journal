import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { getResolver } from "@ceramicnetwork/3id-did-resolver";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { DID } from "dids";
import React, { useCallback, useEffect, useState } from "react";
import { CeramicContext } from "./ceramic";

export default function Context({ children }: { children: React.ReactNode }) {
  const [ethereum, setEthereum] = useState();
  const [ethAddress, setEthAddress] = useState();
  const [ceramic, setCeramic] = useState<CeramicClient>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (ethereum && ethAddress) {
        setLoading(true);
        (async () => {
          const threeID = new ThreeIdConnect();

          // Create an EthereumAuthProvider using the Ethereum provider and requested account
          const authProvider = new EthereumAuthProvider(ethereum, ethAddress);

          // Connect the created EthereumAuthProvider to the 3ID Connect instance so it can be used to
          // generate the authentication secret
          await threeID.connect(authProvider);

          // Connect to a Ceramic node
          const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com");

          const did = new DID({
            provider: threeID.getDidProvider(),
            resolver: {
              ...getResolver(ceramic),
            },
          });

          // Authenticate the DID using the 3ID provider from 3ID Connect, this will trigger the
          // authentication flow using 3ID Connect and the Ethereum provider
          did
            .authenticate()
            .then(() => {
              // The Ceramic client can create and update streams using the authenticated DID
              ceramic.did = did;

              setCeramic(ceramic);

              setLoading(false);
            })
            .catch((e) => {
              setLoading(false);
              alert("sometihng went wrong please connect again");
              console.log(e);
            });
        })();
      }
    } catch (e) {
      setLoading(false);
      alert("sometihng went wrong please connect again");
      console.log(e);
    }
  }, [ethereum, ethAddress]);


  const init = useCallback(() => {
    if ((window as any).ethereum) {
      setEthereum((window as any).ethereum);
      (async () => {
        try {
          const addresses = await (window as any).ethereum.request({
            method: "eth_requestAccounts",
          });

          setEthAddress(addresses[0]);
        } catch (e) {
          alert(e);
        }
      })();
    }
  }, [setEthAddress]);


  // Disconnects from Ethereum.
  const disconnect = () => {
    alert("Disconnected");
  };

  return (
    <CeramicContext.Provider value={{ init, disconnect, ceramic }}>
      {children}
    </CeramicContext.Provider>
  );
}
