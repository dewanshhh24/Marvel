import "../styles/characters.css";

export default function Characters({
  data,
  onClick,
}: {
  data: any[];
  onClick: (id: number) => void;
}) {
  return (
    <div className="characters">
      {data.map((character) => (
        <div
          key={character.id}
          className="characterCard"
          style={{
            background: `url(${character.thumbnail.path}.${character.thumbnail.extension}) no-repeat center`,
            backgroundSize: "cover",
          }}
          onClick={() => onClick(character.id)}
        >
          <div className="caption">{character.name}</div>
          <div className="caption bottom">View Comics</div>
        </div>
      ))}
    </div>
  );
}
