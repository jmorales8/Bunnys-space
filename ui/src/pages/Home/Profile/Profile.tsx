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
  useEffect(() => {
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
        <>loading</>
      ) : (
        <>
          <div>
            <img
              className="profile__image"
              src={`/images/${profileImages[RandomImage()]}`}
              alt="bunnie"
            />
          </div>
          <div className="profile__text">
            {profile[0].bio}
          </div>
        </>
      )}
    </div>
  );
}
