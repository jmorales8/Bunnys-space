import { useEffect, useState } from "react";

type LoreTypes = {
  id: number;
  location: string;
  character: string;
  background: string;
};

type ApiResponse = {
  lore: LoreTypes[];
};

const currentLoreSelection = 0;
export function Lore() {
  const [lore, setLore] = useState<LoreTypes[]>([]);
  const [plainText, setPlainText] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sectionedBackground, setSectionedBackground] = useState<string[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/lore");
        const result: ApiResponse = await response.json();
        setLore(result.lore);
        setSectionedBackground(result.lore[currentLoreSelection].background.split("/n"))
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isPlainText = () => {
    setPlainText(!plainText);
  }

  let text = (depth: string) => plainText ? 'lore__no_effect' : 'lore__container' + [depth];

  return (
    <div className="lore">
      {loading ? (
        <> loading </>
      ) : (
        <>
          <button type="button" onClick={isPlainText}>PRESS TO CHANGE</button>
          <div className={text("")}>
            {plainText ? null : <div id="fade"/>}
            <div className={text("__effect")}>
              <div className={text("__effect__text")}>
                <h3 className="header3">LOCATION:</h3>
                <p className="paragraph">{lore[currentLoreSelection].location}</p>
                <h3 className="header3">Character:</h3>
                <p className="paragraph">{lore[currentLoreSelection].character}</p>
                <h3 className="header3">Background:</h3>
                {sectionedBackground.map((section) => (
                  <div key={section}>
                    <p className="paragraph">
                      {section}
                    </p>
                    <br />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
