import "./q-and-a.scss";
import { QuestionCard } from "./QuestionCard/QuestionCard";

export function QAndA() {
  return (
    <div className="QA">
      <QuestionCard
        username="Sonic123"
        question="How often do you shave your butthole"
        rabbitReply={"a lil bit"}
        otherReplies={[
          { username: "plantGuy42", text: "I use glue." },
          { username: "gardenQueen", text: "I prune mine weekly." },
        ]}
        date={new Date("2025-06-14")}
      />
    </div>
  );
}
