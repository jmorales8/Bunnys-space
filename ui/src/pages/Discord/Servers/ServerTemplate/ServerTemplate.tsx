interface ServerTemplatePorps {
  title: string;
  description: string;
  img: string;
  joinLink: string;
}

export function ServerTemplate(props: ServerTemplatePorps) {
  const { title, description, img, joinLink } = props;
  return (
    <div className="server">
      <div className="server__title">{title}</div>
      <div className="server__img">
        <img src={img} alt="server_img" />
      </div>
      <div className="server__desc">{description}</div>
      <div className="server__button__container">
        <a
          className="server__button"
          href={`https://discord.com/invite/${joinLink}`}
          target="blank"
        >
          Join here :3
        </a>
      </div>
    </div>
  );
}
