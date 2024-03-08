import "../styles/Card.css";
import { useState } from "react";
import { useEffect } from "react";

export function Card({ searchWord, text, cardClick, turning }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/search?api_key=H4oiUoGL9jQDFkxg4ub0y0jSP6gNhyl4&q=" +
          searchWord +
          "&limit=1"
      );
      const responseObject = await response.json();
      setImageUrl(responseObject.data[0].images.original_still.url);
    }
    fetchData();
  }, [searchWord]);

  return (
    <div className={"card" + (turning ? " turning" : "")} onClick={cardClick}>
      <div className="img-container">
        <img src={imageUrl ? imageUrl : "../../public/loading2.gif"}></img>
      </div>
      <p>{text}</p>
    </div>
  );
}
