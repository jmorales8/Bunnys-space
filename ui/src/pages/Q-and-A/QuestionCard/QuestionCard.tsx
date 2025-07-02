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
  const drawerKeyboardHeight = 150;

  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  return (
    <div className="card2">
      <div
        className={`box-container ${
          isRepliesOpen || isKeyboardOpen ? "expanded" : ""
        }`}
      >
        <div className="card-header">
          <span className="username">
            <AuroraText text={`@ ${username} asks:`} />
          </span>
          <span className="date">{date.toLocaleDateString()}</span>
        </div>

        <div className={isRepliesOpen || isKeyboardOpen ? "box-open" : "box"}>
          <span className="question">❓{question}</span>
          <div className="reply__info">
            <div>
              {otherReplies.length > 0 ? (
                <>
                  <span className="reply__amount">
                    💬 {otherReplies.length} Replies
                  </span>
                  <button
                    className="view-replies"
                    onClick={() => setIsRepliesOpen(!isRepliesOpen)}
                  >
                    <LinkSplit
                      text={
                        isRepliesOpen
                          ? "Close All Replies ↑"
                          : "View all replies →"
                      }
                    />
                  </button>
                </>
              ) : (
                <>No replies yet</>
              )}
            </div>
            {rabbitReply ? (
              <span className="reply__info__emoji">🐰✏️</span>
            ) : (
              <span>🐰 Awaiting Pillow's Gracious Response</span>
            )}
          </div>
        </div>

        {/* Drawer - Replies */}
        <div
          className="drawer-behind-replies"
          style={{
            borderRadius: isKeyboardOpen ? 0 : "0px 0px 8px 8px",
            height: isRepliesOpen ? otherReplies.length * 60 : 0,
            opacity: isRepliesOpen ? 1 : 0,
          }}
        >
          {isRepliesOpen && (
            <div className="all-replies">
              {rabbitReply && (
                <div className="reply_pillow">
                  <strong>🐰💊 Pillow:</strong> {rabbitReply}
                </div>
              )}
              {otherReplies.map((reply, idx) => (
                <div key={idx} className="reply">
                  <strong>{reply.username}:</strong> {reply.text}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer - Keyboard */}
        <div
          className="drawer-behind-keyboard"
          style={{
            height: isKeyboardOpen ? drawerKeyboardHeight : 0,
            opacity: isKeyboardOpen ? 1 : 0,
          }}
        >
          {isKeyboardOpen && (
            <div className="keyboard-content">
              <div style={{ marginTop: "5px" }}>
                <AuroraText text="Want to input your own thoughts??" />
              </div>
              <textarea
                style={{ resize: "none", height: "60px", marginTop: "5px" }}
                className={"effect-20 login__input"}
                placeholder="What do you think?!"
              />
              <button>
                <FloatingWords text="Add comment" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="drawer__button__container">
        <button
          className="drawer__button"
          onClick={() => setIsKeyboardOpen(!isKeyboardOpen)}
        >
          Toggle Keyboard
        </button>
      </div>
    </div>
  );
}
