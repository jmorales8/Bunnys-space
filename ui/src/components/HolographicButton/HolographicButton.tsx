interface HolograpicButtonProps {
  label: string;
  state: boolean; // true = night mode
}

export function HolograpicButton({ label, state }: HolograpicButtonProps) {
  return (
    <div className="holographic__container">
      <div className={`holographic__card ${state ? "night-mode" : ""}`}>
        <h2>{label}</h2>
      </div>
    </div>
  );
}
