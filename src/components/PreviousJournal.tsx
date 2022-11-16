import { useEffect, useState } from "react";
import styled from "styled-components";

interface IData {
  journal: any;
  setOpenJournal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  display: grid;
  place-items: center;
  z-index: 2000;
`;

const SPreviousModal = styled.div`
  width: 40vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 1rem 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid #ebebeb;
  border-radius: 25px;
`;

const SDateTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const STitle = styled.p`
  margin-left: 1rem;
  font-weight: 600;
  font-size: 1.4rem;
  color: #686a6e;
`;

const SJournalEntry = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.3rem;
  overflow-y: auto;
`;

const SQuestion = styled.p`
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
`;

const SAnswer = styled.p`
  margin-bottom: 1.7rem;
  font-size: 0.9rem;
  font-weight: 300;
`;

const SDate = styled.p`
  font-style: italic;
  font-weight: 300;
  font-size: 0.9rem;
  margin-right: 5px;
`;

const PreviousJournal: React.FC<IData> = ({ journal, setOpenJournal }) => {
  const [journalEntry, setJournalEntry] = useState<{
    title: string;
    createdAt: number;
    journal: string[];
  }>();

  useEffect(() => {
    try {
      fetch(`https://${journal && journal.cid}.ipfs.w3s.link/`)
        .then((results) => results.json())
        .then((data) => {
          setJournalEntry(data);
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <SBackground onClick={() => setOpenJournal(false)}>
      <SPreviousModal onClick={(e) => e.stopPropagation()}>
        <SDateTitle>
          <STitle>{journal && journal.title}</STitle>
          <SDate>{new Date(journal.createdAt).toDateString()}</SDate>
        </SDateTitle>
        <SJournalEntry>
          {journalEntry && (
            <>
              <SQuestion>How was your day</SQuestion>
              <SAnswer>&emsp; {journalEntry?.journal[0]}</SAnswer>
              <SQuestion>Did you work towards your goal today</SQuestion>
              <SAnswer>&emsp; {journalEntry?.journal[1]}</SAnswer>
              <SQuestion>
                Have you been the kind of person you want to be
              </SQuestion>
              <SAnswer>&emsp; {journalEntry?.journal[2]}</SAnswer>
              <SQuestion>What am I grateful for today</SQuestion>
              <SAnswer>&emsp; {journalEntry?.journal[3]}</SAnswer>
              <SQuestion>Notes</SQuestion>
              <SAnswer>&emsp; {journalEntry?.journal[0]}</SAnswer>
            </>
          )}
        </SJournalEntry>
      </SPreviousModal>
    </SBackground>
  );
};

export default PreviousJournal;
