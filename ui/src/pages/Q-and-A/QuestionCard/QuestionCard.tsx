import React, { useState } from "react";
import { AuroraText } from "../../../components/AuroraText/AuroraText";
import { LinkSplit } from "../../../components/LinkSplit/LinkSplit";
import { FloatingWords } from "../../../components/FloatingWords/FloatingWords";
interface otherReplyProps {
  username: string;
  text: string;
}
interface QuestionCardProps {
  username: string;
  question: string;
  rabbitReply?: string | null;
  otherReplies: otherReplyProps[];
  date: Date;
}

export function QuestionCard({
  username,
  question,
  rabbitReply,
  otherReplies,
  date,
}: QuestionCardProps) {
  const [showAllReplies, setShowAllReplies] = useState(false);

  return (
    <div className="card">
      <div className="card-header">
        <span className="username">
          <AuroraText text={`@ ${username} asks:`} />
        </span>
        <span className="date">{date.toLocaleDateString()}</span>
      </div>
      <div className="card-body">
      <p className="question">❓{question}</p>

      <div className="status-tags">
        {rabbitReply ? (
          <span className="tag tag-success"><FloatingWords text="Pillow has Answered!"/></span>
        ) : (
          <span className="tag tag-waiting">
            🐰 Awaiting Pillow's Gracious Response
          </span>
        )}
        <span className="tag tag-replies">
          💬 {otherReplies.length} Replies
        </span>
      </div>

      {rabbitReply && (
        <div className="reply">
          <strong>🐰💊 Pillow:</strong> {rabbitReply}
        </div>
      )}

      {showAllReplies ? (
        <div className="all-replies">
          {otherReplies.map((reply: otherReplyProps, idx: number) => (
            <div key={idx} className="reply">
              <strong>{reply.username}:</strong> {reply.text}
            </div>
          ))}
        </div>
      ) : (
        <button
          className="view-replies"
          onClick={() => setShowAllReplies(true)}
        >
          <LinkSplit text="View all replies →"/>
        </button>
      )}
      </div>
    </div>
  );
}
