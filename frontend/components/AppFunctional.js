import React, { useState } from "react";

const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4;
export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  function getXY() {
    const x = index % 3;
    const y = Math.floor(index / 3);
    return { x, y };
  }

  function getXYMesaj() {
    const { x, y } = getXY();
    return `Koordinatlar (${x}, ${y})`;
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function sonrakiIndex(yon) {
    const x = index % 3;
    const y = Math.floor(index / 3);
    let yeniX = x;
    let yeniY = y;

    switch (yon) {
      case "sol":
        yeniX = x - 1;
        break;
      case "yukarı":
        yeniY = y - 1;
        break;
      case "sağ":
        yeniX = x + 1;
        break;
      case "aşağı":
        yeniY = y + 1;
        break;
      default:
        break;
    }

    if (yeniX < 0 || yeniX > 2 || yeniY < 0 || yeniY > 2) {
      return index;
    }

    return yeniY * 3 + yeniX;
  }

  function ilerle(yon) {
    const yeniIndex = sonrakiIndex(yon);
    setIndex(yeniIndex);
    setSteps(steps + 1);
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    // POST isteğini burada gönderin
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => ilerle("sol")}>
          SOL
        </button>
        <button id="up" onClick={() => ilerle("yukarı")}>
          YUKARI
        </button>
        <button id="right" onClick={() => ilerle("sağ")}>
          SAĞ
        </button>
        <button id="down" onClick={() => ilerle("aşağı")}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
          onChange={onChange}
        />
        <input id="submit" type="submit" />
      </form>
    </div>
  );
}
