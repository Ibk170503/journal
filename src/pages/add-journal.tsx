import { NextPage } from "next";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import Router from "next/router";
import SubmitModal from "../components/SubmitModal";
import { CeramicContext, CeramicContextValue } from "../context/ceramic";
import ConnectModal from "../components/ConnectModal";
import Link from "next/link";

const SBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const SConnectModal = styled.div`
  width: 38vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 1rem;
  margin: 0 2rem;
  background: rgba(238, 238, 238, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid white;
  border-radius: 25px;
`;

const SButton = styled.div`
  width: 5rem;
  height: 5rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: 250ms all;

  :hover {
    background: rgba(255, 255, 255, 0.9);
  }
`;

const SQuestion = styled.p`
  font-weight: 500;
  font-size: 1.5rem;
  height: 5rem;
`;

const STextAnswer = styled.textarea`
  height: 70vh;
  border: 1px solid #c0c7ce;
  border-radius: 1rem;
  font-size: 1rem;
  padding: 1rem;
  background-color: transparent;
  resize: none;
  outline: none;
  color: #5e5d5d;
`;

const SHome = styled.img`
  position: fixed;
  left: 2rem;
  top: 4rem;
  width: 1.5rem;
`;

const AddJournal: NextPage = () => {
  const [answerIndex, setAnswerIndex] = useState(0);
  const [answer, setAnswer] = useState<string[]>();
  const [submitModal, setSubmitModal] = useState(false);

  const ceramicContext = useContext(CeramicContext) as CeramicContextValue;

  const questions = [
    "How was your day",
    "Did you work towards your goal today",
    "Have you been the kind of person you want to be",
    "What am you grateful for today",
    "Notes",
  ];

  useEffect(() => {
    if (questions?.length) {
      const temp = [];
      for (const item in questions) {
        temp.push("");
      }
      setAnswer(temp);
    }
  }, []);

  const handleMessageChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setAnswer((prev) => {
        const c = [...prev!];
        c[answerIndex] = event.target.value;
        return c;
      });
    },
    [answerIndex, answer]
  );

  const leftArrow = () => {
    if (answerIndex == 0) return;
    setAnswerIndex(answerIndex - 1);
  };

  const rightArrow = () => {
    if (answerIndex + 1 == questions.length) {
      setSubmitModal(true);
      return;
    }
    setAnswerIndex(answerIndex + 1);
  };

  if (!ceramicContext?.ceramic) {
    return <ConnectModal />;
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SBackground>
        <Link href={"/"}>
          <a>
            <SHome src="/Home.svg" />
          </a>
        </Link>
        <SButton onClick={leftArrow}>
          <img src="arrowLeft.svg" alt="" />
        </SButton>
        <SConnectModal>
          <SQuestion>{questions[answerIndex]}</SQuestion>
          <STextAnswer
            id="description"
            value={answer && answer[answerIndex]}
            onChange={handleMessageChange}
            placeholder="Type your answer.."
          />
        </SConnectModal>
        <SButton onClick={rightArrow}>
          <img src="arrowRight.svg" alt="" />
        </SButton>
      </SBackground>

      <SubmitModal
        setSubmitModal={setSubmitModal}
        journal={answer!}
        submitModal={submitModal}
      />
    </div>
  );
};

export default AddJournal;
