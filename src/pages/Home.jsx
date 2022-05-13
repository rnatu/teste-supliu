import "./styles.scss";
import logo from "../assets/logo.png";
import { AlbumInfo } from "../components/AlbumInfo";

export function Home() {
  return (
    <div className="homeContainer">
      <main className="homeContent">
        <header className="homeContent__header">
          <img src={logo} alt="Logo do Tião Carreiro" />
          <h1>Discografia</h1>
        </header>

        <section className="mainContent">
          <p>Digite uma palavra chave</p>

          <form action="#" className="mainContent__searchBar">
            <input type="word" />

            <button type="submit">Procurar</button>
          </form>

          <AlbumInfo />
          <AlbumInfo />
          <AlbumInfo />
          <AlbumInfo />
          <AlbumInfo />
          <AlbumInfo />
          <AlbumInfo />
          <AlbumInfo />
          <AlbumInfo />
          <AlbumInfo />
          <AlbumInfo />
        </section>
      </main>
    </div>
  );
}
