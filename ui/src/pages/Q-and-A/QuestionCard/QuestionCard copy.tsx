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

export function QuestionCardCopy({
  username,
  question,
  rabbitReply,
  otherReplies,
  date,
}: QuestionCardProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const drawerHeight = 100;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="card2">
        <div
          className={`box-container ${isOpen ? "expanded" : ""}`}
          style={{ marginBottom: isOpen ? drawerHeight : 0 }}
        >
          <div className="card-header">
            <span className="username">
              <AuroraText text={`@ ${username} asks:`} />
            </span>
            <span className="date">{date.toLocaleDateString()}</span>
          </div>
          <div className={isOpen ? "box-open" : "box"}>
            <span className="question">❓{question}</span>
          <div className="reply__info">
            <div>
              {otherReplies.length > 0 ? (
                <>
                  <span className="reply__amount">
                    💬 {otherReplies.length} Replies
                  </span>

                  {!isOpen ? (
                    <button
                      className="view-replies"
                      onClick={() => setIsOpen(true)}
                    >
                      <LinkSplit text="View all replies →" />
                    </button>
                  ) : (
                    <button
                      className="view-replies"
                      onClick={() => setIsOpen(false)}
                    >
                      <LinkSplit text="Close All Replies ↑" />
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
            {/* Hidden drawer content */}
            <div
              className="drawer-behind"
              style={{
                height: isOpen ? drawerHeight : 0,
                opacity: isOpen ? 1 : 0,
              }}
            >
              {isOpen && (
                <div className="all-replies">
                  {rabbitReply && (
                    <div className="reply_pillow">
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
        </div>
        <div className="drawer__button__container">
          <button className="drawer__button">fart</button>
        </div>
      </div>
    </>
  );
}
