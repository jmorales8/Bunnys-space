import "./linkSplit.css";

type LinkSplitProps = {
  text: string;
  href: string;
  target?: "_blank" | "_self";
  className?: string;

  // optional: override colors per usage
  color1?: string; // base text color
  color2?: string; // hover/accent color
};

export function LinkSplit({
  text,
  href,
  target = "_blank",
  className = "",
  color1 = "darkgreen",
  color2 = "rgb(82, 14, 40)",
}: LinkSplitProps) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      className={`link-split ${className}`}
      style={
        {
          ["--text-main" as any]: color1,
          ["--text-secondary" as any]: color2,
        } as React.CSSProperties
      }
    >
      <span className="link-split__top">{text}</span>
      <span className="link-split__bottom">{text}</span>
    </a>
  );
}
