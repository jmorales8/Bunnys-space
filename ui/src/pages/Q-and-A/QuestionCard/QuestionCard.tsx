import { useState } from "react";
import { AuroraText } from "../../../components/AuroraText/AuroraText";
import { LinkSplit } from "../../../components/LinkSplit/LinkSplit";
import { FloatingWords } from "../../../components/FloatingWords/FloatingWords";
import { Drawer } from "../../../components/Drawer/VerticalDrawer";
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
    <>
      <div className="card" style={{zIndex: 2}}>
        <div className="card-header">
          <span className="username">
            <AuroraText text={`@ ${username} asks:`} />
          </span>
          <span className="date">{date.toLocaleDateString()}</span>
        </div>
        <div className="card-body">
          <p className="question">❓{question}</p>

          <div className="reply__info">
            <div>
              {otherReplies.length > 0 ? (
                <>
                  <span className="reply__amount">
                    💬 {otherReplies.length} Replies
                  </span>

                  {!showAllReplies && (
                    <button
                      className="view-replies"
                      onClick={() => setShowAllReplies(true)}
                    >
                      <LinkSplit text="View all replies →" />
                    </button>
                  )}
                </>
              ) : (
                <> No replies yet</>
              )}
            </div>
            {rabbitReply ? (
              <span className="reply__info__emoji">🐰✏️</span>
            ) : (
              <span>🐰 Awaiting Pillow's Gracious Response</span>
            )}
          </div>
          {showAllReplies && (
            <div className="all-replies">
              {rabbitReply && (
                <div className="reply">
                  <strong>🐰💊 Pillow:</strong> {rabbitReply}
                </div>
              )}
              {otherReplies.map((reply: otherReplyProps, idx: number) => (
                <div key={idx} className="reply">
                  <strong>{reply.username}:</strong> {reply.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Drawer direction={3}>
        <div className="card-footer">
          <AuroraText text="Want to input your own thoughts??" />
          <textarea
            style={{ resize: "none", height: "60px", marginTop: "5px" }}
            className={"effect-20 login__input"}
            placeholder="What do you think?!"
          />
          <button>
            <FloatingWords text="bruh" />
          </button>
        </div>
      </Drawer>
    </>
  );
}
