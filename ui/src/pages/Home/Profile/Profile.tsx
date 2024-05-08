import React from "react";
const text = "Anya Forger: The adopted daughter of Loid Forger and Yor Forger, who doesn't know she isn't Loid's biological daughter. She was used as an experiment by the Ostanian government that gave her the ability to read minds. She ended up"

export function Profile() {
  return (
    <div className="profile">
      <div>
      <img className="profile__image" src="bunnyW.jpg" alt="bunnie"/>
      </div>
      <div className="profile__text">
      {text}{text}
      </div>
    </div>
  )
}
