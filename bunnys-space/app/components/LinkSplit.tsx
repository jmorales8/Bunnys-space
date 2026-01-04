interface LinkSplitProps {
  text: string;
  destination: string 
}

export function LinkSplit({text, destination}: LinkSplitProps) {
  return (
    <div>
      <a
        className="link"
        target="_blank"
        rel="noreferrer"
        href={destination}
      >
        <span className="link--top">{text}</span>
        <span className="link--bottom">{text}</span>
      </a>
    </div>
  );
}
