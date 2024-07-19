import { useEffect, useState } from "react";

type LoreTypes = {
  id: number;
  text: string;
  section: number;
  location: string;
  character: string;
  background: string;
};

type ApiResponse = {
  lore: LoreTypes[];
};

export function Lore() {
  const [lore, setLore] = useState<LoreTypes[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/lore");
        const result: ApiResponse = await response.json();
        setLore(result.lore);
        console.log(result.lore[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="lore">
      {loading ? (
        <> loading </>
      ) : (
        <div className="lore__content">
          <h3 className="header3">LOCATION:</h3>
          <p className="paragraph">{lore[0].location}</p>
          <h3 className="header3">Character:</h3>
          <p className="paragraph">{lore[0].character}</p>
          <h3 className="header3">Background:</h3>
          <p className="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id
            neque aliquam vestibulum morbi blandit cursus risus at. Id porta
            nibh venenatis cras. Lorem mollis aliquam ut porttitor leo a. Id
            <br />
            Quis auctor elit sed vulputate mi sit. Vestibulum morbi blandit
            cursus risus at ultrices mi tempus. Elementum facilisis leo vel
            fringilla est. Odio facilisis mauris sit amet massa vitae tortor
            <br />
            Enim ut sem viverra aliquet eget. Ullamcorper a lacus vestibulum sed
            arcu non odio euismod. Non consectetur a erat nam at lectus urna
            duis. Mattis rhoncus urna neque viverra. Lobortis mattis aliquam
          </p>
        </div>
      )}
    </div>
  );
}
