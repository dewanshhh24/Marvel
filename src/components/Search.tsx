import { useState } from "react";
import md5 from "md5";
import "../styles/search.css";
import Characters from "./Characters";
import Comics from "./Comics";

export default function Search() {
  const [characterData, setCharacterData] = useState<any>(null);
  const [comicData, setComicData] = useState<any>(null);
  const [characterName, setCharacterName] = useState<string>("");

  const privateKey = import.meta.env.VITE_PRIVATE_KEY as string;
  const publicKey = import.meta.env.VITE_PUBLIC_KEY as string;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getCharacterData();
  };

  const getCharacterData = () => {
    setCharacterData(null);
    setComicData(null);

    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);

    const url = `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${characterName}&limit=100`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCharacterData(result.data);
        console.log(result.data);
      })
      .catch(() => {
        console.log("error while getting character data");
      });
  };

  const getComicData = (characterId: number) => {
    window.scrollTo({ top: 0, left: 0 });

    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);

    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setComicData(result.data);
        console.log(result.data);
      })
      .catch(() => {
        console.log("error while getting comic data");
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterName(event.target.value);
  };

  const generateHash = (timeStamp: number) => {
    return md5(timeStamp + privateKey + publicKey);
  };

  const handleReset = () => {
    setCharacterName("");
    setCharacterData(null);
    setComicData(null);
  };

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Character Name"
          value={characterName}
          onChange={handleChange}
        />
        <div className="buttons">
          <button type="submit">Get Character Data</button>
          <button type="button" className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {!comicData && characterData?.results?.[0] && (
        <Characters data={characterData.results} onClick={getComicData} />
      )}

      {comicData?.results?.[0] && (
        <Comics data={comicData.results} />
      )}
    </>
  );
}
