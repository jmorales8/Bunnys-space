import { Bunzone } from "./Servers/Bunzone";
import { NightRunners } from "./Servers/NightRunners";

export function Discord() {
  return(
    <div className="discord">
      <div className="left__server__profile">
        <Bunzone />
      </div>
      <div className="right__server__profile">
        <NightRunners />
      </div>
    </div>
  )
}
