import { useEffect, useState } from "react";
import "./q-and-a.scss";
import { QuestionCard } from "./QuestionCard/QuestionCard";
import { text } from "stream/consumers";

export interface otherRepliesProps {
  responseGiven: number;
  responseId: number;
  responseText: string;
  responseUsername: string;
}

export interface Q_And_A_MockDataProps {
  userId: number;
  username: string;
  questionAsked: string;
  questionId: number;
  questionText: string;
  rabbitReply?: string | null;
  responses?: otherRepliesProps[] | null;
}

type ApiResponse = {
  Q_A: {
    questions: Q_And_A_MockDataProps[];
  };
};

export function QAndA() {
  const [Q_A, setQA] = useState<Q_And_A_MockDataProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Q-A");
        const result: ApiResponse = await response.json();
        setQA(result.Q_A.questions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="QA">
      {loading ? (
        <>loading</>
      ) : (
        Q_A.map((question) => {
          const {questionId, username, questionText, questionAsked, responses} = question;
          return (
            <QuestionCard
              key={questionId}
              username={username}
              question={questionText}
              date={questionAsked}
              rabbitReply={"bruh"}
              otherReplies={
                responses?.map((response) => ({
                  username: response.responseUsername,
                  text: response.responseText,
                })) ?? []
              }
            />
          );
        })
      )}
    </div>
  );
}
