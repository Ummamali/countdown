import { useState } from "react";
import { useRef } from "react";

export default function Player() {
  const [username, setUsername] = useState("");
  const inputRef = useRef();

  function handleClick() {
    setUsername(inputRef.current.value);
    inputRef.current.value = "";
  }
  return (
    <section id="player">
      <h2>Welcome {username ? username : "unknown entity"}</h2>
      <p>
        <input type="text" ref={inputRef} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
