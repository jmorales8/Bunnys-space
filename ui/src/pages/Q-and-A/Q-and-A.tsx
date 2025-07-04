import "./q-and-a.scss";
import { QuestionCard } from "./QuestionCard/QuestionCard";

interface otherRepliesProps {
  username: string;
  response: string;
}

interface Q_And_A_MockDataProps {
  username: string;
  question: string;
  rabbitReply?: string | null;
  otherReplies?: otherRepliesProps[] | null;
  date: Date;
}

const Q_And_A_MockData: Q_And_A_MockDataProps[] = [
  {
    username: "Sonic123",
    question: "How often do you shave your butthole",
    rabbitReply: "a lil bit",
    otherReplies: [
      { username: "plantGuy42", response: "I use glue." },
      { username: "gardenQueen", response: "I prune mine weekly." },
    ],
    date: new Date("2025-06-14"),
  },
  {
    username: "Shadow321",
    question: "What do you do when life gives you lemons?",
    rabbitReply: null,
    otherReplies: null,
    date: new Date("2025-06-14"),
  },
];
export function QAndA() {
  return (
    <div className="QA">
      {Q_And_A_MockData.map((data) => {
        const { username, question, rabbitReply, otherReplies, date } = data;

        return (
          <QuestionCard
            key={username + date.toISOString()}
            username={username}
            question={question}
            rabbitReply={rabbitReply}
            otherReplies={
              otherReplies?.map((reply) => ({
                username: reply.username,
                text: reply.response,
              })) ?? []
            }
            date={date}
          />
        );
      })}
    </div>
  );
}
