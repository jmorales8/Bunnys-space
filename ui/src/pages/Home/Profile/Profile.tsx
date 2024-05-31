const text = "Anya Forger: The adopted daughter of Loid Forger and Yor Forger, who doesn't know she isn't Loid's biological daughter. She was used as an experiment by the Ostanian government that gave her the ability to read minds. She ended up"
const profileImages: string[] = ["bunnyW.jpg", "bunnyW2.jpg", "bunnyL.jpg", "bunnyL2.jpg"]

function RandomImage() {
  return Math.floor(Math.random() * 4)
}

export function Profile() {
  return (
    <div className="profile">
      <div>
        <img className="profile__image" src={`/images/${profileImages[RandomImage()]}`} alt="bunnie"/>
      </div>
      <div className="profile__text">
        {text}{text}
      </div>
    </div>
  )
}
