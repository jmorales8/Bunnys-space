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
    <div className="card">

        <div className="card__header">
          <span className="card__question__username">
            <AuroraText text={`@ ${username} asks:`} color1="#FF007F" color2="rgb(243, 114, 208)" color3="#FF007F" />
          </span>
          <span className="card__date">{date.toLocaleDateString()}</span>
        </div>

        <div className={isRepliesOpen || isKeyboardOpen ? "card__body-open" : "card__body"}>
          <span className="card__question">❓{question}</span>
          <div className="card__reply__info">
            <div>
              {otherReplies.length > 0 ? (
                <>
                  <span className="card__reply__amount">
                    💬 {otherReplies.length} Replies
                  </span>
                  <button
                    className="card__replies__view__button"
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
              <span className="card__reply__info__emoji">🐰✏️</span>
            ) : (
              <span>🐰 Awaiting Pillow's Gracious Response</span>
            )}
          </div>
        </div>

        {/* Drawer - Replies */}
        <div
          className="card__drawer__behind-replies"
          style={{
            borderRadius: isKeyboardOpen ? 0 : "0px 0px 8px 8px",
            opacity: isRepliesOpen ? 1 : 0,
            maxHeight: isRepliesOpen ? 400 : 0,
          }}
        >
          {isRepliesOpen && (
            <div className="card__replies">
              {rabbitReply && (
                <div className="card__reply__pillow">
                  <strong>🐰💊 Pillow:</strong> {rabbitReply}
                </div>
              )}
              {otherReplies.map((reply, idx) => (
                <div key={idx} className="card__reply">
                  <strong>{reply.username}:</strong> {reply.text}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer - Keyboard */}
        <div
          className="card__drawer__behind-keyboard"
          style={{
            height: isKeyboardOpen ? drawerKeyboardHeight : 0,
            opacity: isKeyboardOpen ? 1 : 0,
          }}
        >
          {isKeyboardOpen && (
            <div className="keyboard-content">
              <div style={{ marginTop: "5px" }}>
                <AuroraText text="Want to input your own thoughts??" color1="darkgreen" color2="rgb(82, 14, 40)" color3="darkgreen"/>
              </div>
              <textarea
                style={{ resize: "none", height: "60px", marginTop: "5px" }}
                className={"effect-20 login__input"}
                placeholder="What do you think?!"
              />
              <button className="card__drawer__behind-keyboard__button">
                <FloatingWords text="Add comment" />
              </button>
            </div>
          )}
      </div>

      <div className="card__drawer__button__container">
        <button
          className="card__drawer__button"
          onClick={() => setIsKeyboardOpen(!isKeyboardOpen)}
        >
          Toggle Keyboard
        </button>
      </div>
    </div>
  );
}
