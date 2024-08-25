import { useEffect, useState } from "react";

const profileImages: string[] = [
  "bunnyW.jpg",
  "bunnyW2.jpg",
  "bunnyL.jpg",
  "bunnyL2.jpg",
];

function RandomImage() {
  return Math.floor(Math.random() * 4);
}

type ProfileTypes = {
  id: number;
  age: number;
  bio: string;
};

type ApiResponse = {
  profiles: ProfileTypes[];
};

export function Profile() {
  const [profile, setProfile] = useState<ProfileTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [preloadedImage, setPreloadedImage] = useState<string>("");

  useEffect(() => {
    const image = new Image();
    const randomImage = profileImages[RandomImage()];
    image.src = `/images/${randomImage}`;
    image.onload = () => {
      setIsImageLoaded(true);
    };
    setPreloadedImage(image.src);

    const fetchData = async () => {
      try {
        const response = await fetch("/profile");
        const result: ApiResponse = await response.json();
        setProfile(result.profiles);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="profile">
      {loading ? (
        <div className="profile__skeleton">
          <div className="profile__skeleton__text">loading</div>
        </div>
      ) : (
        <>
          <img
            className={
              isImageLoaded ? "profile__image" : "profile__image__loading"
            }
            src={preloadedImage}
            alt="bunnie"
          />
          <div className="profile__text">{profile[0]?.bio}</div>
        </>
      )}
    </div>
  );
}
