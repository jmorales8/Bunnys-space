import { Link } from "react-router-dom";

export function LoginButton() {
  return (
    <div className="app__login">
      <Link to="/login">
        <img
          className="app__login__button"
          src="/images/hallo_pillow.png"
          alt="Pillow_corner"
        />
      </Link>
    </div>
  );
}
