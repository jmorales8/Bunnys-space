interface LinkSplitProps {
  text: string;
}

export function LinkSplit({text}: LinkSplitProps) {
  return (
    <div>
      <a
        className="link"
        target="_blank"
        rel="noreferrer"
      >
        <span className="link--top">{text}</span>
        <span className="link--bottom">{text}</span>
      </a>
    </div>
  );
}
