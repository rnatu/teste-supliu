import "./styles.scss";

export function AlbumInfo() {
  return (
    <>
      <header className="albumInfoContent__header">
        <h4>Álbum: Rei do gado, 1961</h4>
      </header>
      <main className="albumInfoContent__main">
        <div className="trackMainInfo">
          <div className="trackMainInfo__number">
            <p>Nº</p>
            <p>1</p>
            <p>2</p>
          </div>

          <div className="trackMainInfo__title">
            <p>Faixa</p>
            <p>O mineiro</p>
            <p>O mineiro</p>
          </div>
        </div>

        <div className="trackTime">
          <p>Duração</p>
          <p>3:00</p>
          <p>3:00</p>
        </div>
      </main>
    </>
  );
}
