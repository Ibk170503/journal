import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CeramicContext, CeramicContextValue } from "../context/ceramic";

const SBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: grid;
  place-items: center;
  z-index: 2000;
`;

const SConnectModal = styled.div`
  width: 40vw;
  height: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3.5rem 1rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid #ebebeb;
  border-radius: 25px;
`;

const SConnectButton = styled.div`
  border-radius: 16rem;
  background: #c4cad2;
  width: 10rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: 200ms all;
  box-shadow: 0px 2px 12px 2px rgba(41, 41, 41, 0.2);

  :hover {
    box-shadow: 0px 2px 12px 2px rgba(90, 90, 90, 0.17);
  }
`;

const Simg = styled.img`
  width: 1.5rem;
`;

const SConnectButtonText = styled.p`
  color: white;
  font-weight: 500;
  font-size: 1.3rem;
`;

const SText = styled.p`
  font-size: 1.1rem;
  color: #5e5d5d;
  margin: 0.5rem 0;
`;

const ConnectModal: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const ceramicContext = useContext(CeramicContext) as CeramicContextValue;

  return (
    <SBackground>
      <SConnectModal>
        <SText>
          Journal is an app that lets you document your thoughts everyday, with
          inbuilt questions so you don&apos;t run out of what to document!
        </SText>
        <SText>Sign up with Metamask by pressing the connect button</SText>
        <div style={{ display: "grid", placeItems: "center" }}>
          <SConnectButton
            onClick={() => {
              setLoading(true);
              ceramicContext?.init();
            }}
          >
            <Simg src="/Wallet.svg" alt="" />
            <SConnectButtonText>
              {loading ? "loading.." : " connect"}
            </SConnectButtonText>
          </SConnectButton>
        </div>
      </SConnectModal>
    </SBackground>
  );
};

export default ConnectModal;
