import "./styles.scss";

export function AlbumInfo({ name, year, tracks }) {
  function fmtMSS(seconds) {
    return (
      (seconds - (seconds = seconds % 60)) / 60 +
      (9 < seconds ? ":" : ":0") +
      seconds
    );
  }

  return (
    <>
      <header className="albumTitle">
        <h4>
          Álbum: {name}, {year}
        </h4>
      </header>
      <section className="albumInfoContent__header">
        <div className="trackDescription__header">
          <div>
            <p>Nº</p>
          </div>

          <div>
            <p>Faixa</p>
          </div>
        </div>

        <div className="trackTime__header">
          <p>Duração</p>
        </div>
      </section>

      {tracks.map((track) => (
        <section className="albumInfoContent" key={track.id}>
          <div className="trackDescription">
            <p>{track.number}</p>

            <p>{track.title}</p>
          </div>

          <div className="trackTime">
            <p>{fmtMSS(track.duration)}</p>
          </div>
        </section>
      ))}
    </>
  );
}
