import { useNavigate } from "react-router-dom";
import "./styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">STAR WARS</h1>

      <h2 className="home-subtitle">
        "A long time ago in a galaxy far, far away...."
      </h2>

      <p className="home-text">
        Star Wars is an American multimedia franchise of science fantasy and space opera created by George Lucas. Released on May 25, 1977, the first film became an unexpected worldwide phenomenon and revolutionized the film industry, inaugurating the so-called "era of blockbusters"—high-grossing blockbusters that expand into toys, books, video games, and various other media.
        The enormous success gave rise to the Original Trilogy (1977–1983), followed by the Prequel Trilogy (1999–2005), which explored events prior to the initial story, and later by the Sequel Trilogy (2015–2019), continuing the saga for a new generation. In addition to the nine main episodes, the franchise also has spin-off films, such as Rogue One, which expand the universe without directly focusing on the central narrative. <br/>

        Over the years, Star Wars has established itself not only as a film series, but as a vast expanded universe. Animated series and television productions have been released that have expanded the mythology of the saga, including Star Wars: The Clone Wars, which gave rise to a highly popular animated series.
        In 2012, Lucasfilm was acquired by The Walt Disney Company. From 2014 onwards, the former expanded universe was classified under the Legends label, while a new official canon was established, overseen by the Lucasfilm Story Group, ensuring greater integration between films, series, books, comics and games.<br/>

        With a global box office exceeding billions of dollars, Star Wars is among the most successful film franchises in history. Its cultural impact is profound and lasting, influencing generations of fans, filmmakers and science fiction productions around the world. More than entertainment, it has become a landmark of contemporary pop culture and one of the most recognized narratives in the history of cinema. <br/><br/>
        Explore characters, planets, starships, species and films from the universe created by George Lucas.
      </p>

      <button onClick={() => navigate("/explore")}>
        Explore Universe
      </button>
    </div>
  );
}

export default Home;