import { ServerTemplate } from "./ServerTemplate/ServerTemplate";
const text = "Anya Forger: The adopted daughter of Loid Forger and Yor Forger, who doesn't know she isn't Loid's biological daughter. She was used as an experiment by the Ostanian government that gave her the ability to read minds. She ended up";

export function NightRunners() {
  return (
    <ServerTemplate
      title="Night Runners"
      description={text}
      img="bunnyL.jpg"
      joinLink="discord/deeznuts"
    />
  );
}
