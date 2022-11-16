import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import Link from "next/link";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Web3Storage, File } from "web3.storage";
import { CeramicContext, CeramicContextValue } from "../context/ceramic";
import { aliases } from "../db/ceramic";

interface IConnectProps {
  submitModal: boolean;
  setSubmitModal: React.Dispatch<React.SetStateAction<boolean>>;
  journal: string[];
}

const SBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: grid;
  place-items: center;
  z-index: 2000;
`;

const SSubmitModal = styled.div`
  width: 40vw;
  height: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.5rem 1rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid #ebebeb;
  border-radius: 25px;
`;

const SSubmitButton = styled.div`
  border-radius: 16rem;
  background: #c4cad2;
  color: white;
  font-weight: 500;
  font-size: 1.3rem;
  width: 10rem;
  height: 3rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  margin-top: 3rem;
  transition: 200ms all;
  box-shadow: 0px 2px 12px 2px rgba(41, 41, 41, 0.2);

  :hover {
    box-shadow: 0px 2px 12px 2px rgba(90, 90, 90, 0.17);
  }
`;

const SText = styled.p`
  font-size: 1.1rem;
  color: #5e5d5d;
  text-align: center;
  margin: 0.3rem 0;
`;

const STextAnswer = styled.input`
  border: 1px solid #c0c7ce;
  border-radius: 1rem;
  font-size: 16px;
  padding: 1rem;
  margin-top: 2rem;
  background-color: transparent;
  resize: none;
  outline: none;
  color: #5e5d5d;
`;

const SBold = styled.span`
  font-weight: 700;
`;

const SubmitModal: React.FC<IConnectProps> = ({
  setSubmitModal,
  journal,
  submitModal,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState("");
  const [buttonText, setButtonText] = useState("submit");

  const ceramicContext = useContext(CeramicContext) as CeramicContextValue;
  const ceramic = ceramicContext?.ceramic!;

  const submit = async () => {
    setLoading(true);
    setButtonText("saving...");

    const cidData = {
      journal: journal,
    };

    const token = process.env.NEXT_PUBLIC_TOKEN;
    const storage = new Web3Storage({ token: token || "" });
    const buffer = Buffer.from(JSON.stringify(cidData));
    const file = [new File([buffer], "journal.json")];

    //get cid from web3.storage
    const cid = await storage.put(file, { wrapWithDirectory: false });

    //send data to ceramic node
    const model = new DataModel({ ceramic, aliases });
    const journalStore = new DIDDataStore({ ceramic, model });

    const doc = (await journalStore.get("journal")) as {
      data: { title: string; cid: string; createdAt: number }[];
    };

    setButtonText("almost...");

    let journals: { title: string; cid: string; createdAt: number }[];
    console.log(doc);

    if (doc && doc.data) {
      journals = [...doc.data];
    } else {
      journals = [];
    }

    setButtonText("wait...");

    journals.push({ title, cid, createdAt: Date.now() });
    const data = { data: [...journals] };
    await journalStore.set("journal", { ...data });

    setButtonText("Done!");
    setLoading(false);
    console.log(data);
  };

  if (!submitModal) {
    return null;
  }

  return (
    <SBackground onClick={() => setSubmitModal(false)}>
      <SSubmitModal onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <>
            <SText>Hey there, one last thing before you&apos;re done.</SText>
            <SText>
              What <SBold>title</SBold> would best fit your journal entry for
              today?
            </SText>
            <STextAnswer
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </>
        ) : (
          <>
            <SText>
              Go back{" "}
              <SBold>
                <Link href={"/"}>home</Link>
              </SBold>
            </SText>
          </>
        )}
        <SSubmitButton onClick={submit}>{buttonText}</SSubmitButton>
      </SSubmitModal>
    </SBackground>
  );
};

export default SubmitModal;
