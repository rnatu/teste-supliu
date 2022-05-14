import "./styles.scss";
import logo from "../assets/logo.png";
import { AlbumInfo } from "../components/AlbumInfo";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  const [discography, setDiscography] = useState([]);

  useEffect(() => {
    (async function loadApiData() {
      const { data: apiResponse } = await axios.get(
        "https://tiao.supliu.com.br/api/album",
        {
          headers: {
            Authorization: "rnatu91@gmail.com",
          },
        }
      );

      setDiscography(apiResponse.data);
    })();
  }, []);

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

          {discography.map((album) => (
            <AlbumInfo
              key={album.id}
              name={album.name}
              year={album.year}
              tracks={album.tracks}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
