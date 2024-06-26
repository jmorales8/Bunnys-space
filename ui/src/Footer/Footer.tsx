interface FooterButtons {
  label: string;
  path: string;
}

const footerButtons: FooterButtons[] = [
  { label: "Q&A", path: "/Q-and-A" },
];
export function Footer() {
  return (
    <footer className="footer">
      <a className="footer__img" href="/home">
        <img src="/images/peachy.png" width="55" height="55"/>
      </a>
      {footerButtons.map((button) => {
        return (
          <a className="footer__button" href={button.path} key={button.label}>
            {button.label}
          </a>
        )
      })}
    </footer>
  )
}