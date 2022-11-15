import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ConnectModal from "../components/ConnectModal";
import PreviousJournal from "../components/PreviousJournal";
import { CeramicContext, CeramicContextValue } from "../context/ceramic";

const SBody = styled.div`
  max-width: 65rem;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 2.5rem;
  margin: 0 1rem;
`;

const SContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SAddText = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  color: white;
`;

const SImg = styled.img`
  transition: 200ms all;
  width: 1.1rem;
`;

const SAddJournal = styled.div`
  width: 16rem;
  height: 4rem;
  background: #d5dae0;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  margin-bottom: 3rem;
  transition: 250ms border;

  :hover {
    ${SImg} {
      transform: scale(1.2);
    }
  }
`;

const SJournals = styled.p`
  font-weight: 500;
  font-size: 2rem;
  color: #565656;
  margin-bottom: 0.75rem;
`;

const SJournalBox = styled.div`
  height: 7.3rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid white;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  cursor: pointer;
  transition: 350ms ease-in-out;

  :hover {
    transform: scale(1.07);
  }
`;

const SJournalContainer = styled.div`
  display: grid;
  padding: 1rem;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  overflow-y: auto;
`;

const SJournalTitle = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
`;

const SDate = styled.p`
  font-weight: 300;
  color: #5d5f62;
  font-size: 0.9rem;
  margin-right: 5px;
`;

const rawData = [
  {
    title: "Peaches",
    date: "Wed Feb 17 2016",
    journal: [
      "",
      "Successful leaders understand the importance of goal-setting in everything from long-term vision to short-term motivation. Focusing on your goals helps you to organize your actions and make the most of your ambition and aspirations.",
      "Character rules. You’re not born with the qualities that make up your character, but they develop as you go through your experiences, your failures, and your wins. Govern your sense of responsibility and responses to events to develop the character you’d like to have.",
      "There will always be bad days and good days, bad luck and good luck. Through it all, gratitude remains among the most useful tools you can have. It shows you what really matters and what’s important, and it keeps you level-headed and focused on what is important.",
    ],
  },
  {
    title: "Awesome",
    date: "Wed Feb 17 2016",
    journal: [
      "it was fine",
      "Successful leaders understand the importance of goal-setting in everything from long-term vision to short-term motivation. Focusing on your goals helps you to organize your actions and make the most of your ambition and aspirations.",
      "Character rules. You’re not born with the qualities that make up your character, but they develop as you go through your experiences, your failures, and your wins. Govern your sense of responsibility and responses to events to develop the character you’d like to have.",
      "There will always be bad days and good days, bad luck and good luck. Through it all, gratitude remains among the most useful tools you can have. It shows you what really matters and what’s important, and it keeps you level-headed and focused on what is important.",
    ],
  },
  {
    title: "Sad",
    date: "Wed Feb 17 2016",
    journal: [
      "it was fine",
      "Successful leaders understand the importance of goal-setting in everything from long-term vision to short-term motivation. Focusing on your goals helps you to organize your actions and make the most of your ambition and aspirations.",
      "Character rules. You’re not born with the qualities that make up your character, but they develop as you go through your experiences, your failures, and your wins. Govern your sense of responsibility and responses to events to develop the character you’d like to have.",
      "There will always be bad days and good days, bad luck and good luck. Through it all, gratitude remains among the most useful tools you can have. It shows you what really matters and what’s important, and it keeps you level-headed and focused on what is important.",
    ],
  },
  {
    title: "Aching",
    date: "Wed Feb 17 2016",
    journal: [
      "it was fine",
      "Successful leaders understand the importance of goal-setting in everything from long-term vision to short-term motivation. Focusing on your goals helps you to organize your actions and make the most of your ambition and aspirations.",
      "Character rules. You’re not born with the qualities that make up your character, but they develop as you go through your experiences, your failures, and your wins. Govern your sense of responsibility and responses to events to develop the character you’d like to have.",
      "There will always be bad days and good days, bad luck and good luck. Through it all, gratitude remains among the most useful tools you can have. It shows you what really matters and what’s important, and it keeps you level-headed and focused on what is important.",
    ],
  },
  {
    title: "Aching",
    date: "Wed Feb 17 2016",
    journal: [
      "it was fine",
      "Successful leaders understand the importance of goal-setting in everything from long-term vision to short-term motivation. Focusing on your goals helps you to organize your actions and make the most of your ambition and aspirations.",
      "Character rules. You’re not born with the qualities that make up your character, but they develop as you go through your experiences, your failures, and your wins. Govern your sense of responsibility and responses to events to develop the character you’d like to have.",
      "There will always be bad days and good days, bad luck and good luck. Through it all, gratitude remains among the most useful tools you can have. It shows you what really matters and what’s important, and it keeps you level-headed and focused on what is important.",
    ],
  },
  {
    title: "Aching",
    date: "Wed Feb 17 2016",
    journal: [
      "it was fine",
      "Successful leaders understand the importance of goal-setting in everything from long-term vision to short-term motivation. Focusing on your goals helps you to organize your actions and make the most of your ambition and aspirations.",
      "Character rules. You’re not born with the qualities that make up your character, but they develop as you go through your experiences, your failures, and your wins. Govern your sense of responsibility and responses to events to develop the character you’d like to have.",
      "There will always be bad days and good days, bad luck and good luck. Through it all, gratitude remains among the most useful tools you can have. It shows you what really matters and what’s important, and it keeps you level-headed and focused on what is important.",
    ],
  },
];

const Home: NextPage = () => {
  const [data, setData] = useState<{ title: string; date: string }[]>();
  // const [data, setData] = useState<any>();
  const [connected, setConnected] = useState(false);
  const [openJournal, setOpenJournal] = useState(false);
  const [index, setIndex] = useState(0);

  const ceramicContext = useContext(CeramicContext) as CeramicContextValue;

  useEffect(() => {
    setData(rawData);
  }, []);

  if (!ceramicContext?.ceramic) {
    return <ConnectModal />;
  }

  if (openJournal) {
    return (
      <PreviousJournal
        journal={data}
        index={index}
        setOpenJournal={setOpenJournal}
      />
    );
  }

  function openJournalModal(i: number) {
    setIndex(i);
    setOpenJournal(true);
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SContainer>
        <SBody>
          <SAddJournal onClick={() => Router.push("/add-journal")}>
            <SImg src="/Add.svg" alt="" />
            <SAddText>Add Today's journal</SAddText>
          </SAddJournal>

          <SJournals>Your Journals</SJournals>
          <SJournalContainer>
            {data?.map((journal: any, i: any) => {
              return (
                <SJournalBox onClick={() => openJournalModal(i)} key={i}>
                  <SJournalTitle>{journal.title}</SJournalTitle>
                  <SDate>{journal.date}</SDate>
                </SJournalBox>
              );
            })}
          </SJournalContainer>
        </SBody>
      </SContainer>
    </div>
  );
};

export default Home;
