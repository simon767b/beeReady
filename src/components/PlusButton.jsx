import { useState } from "react";

export default function PlusButton() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <>
      <section
        className="plusButton_border manuel"
        style={{
          position: "fixed",
          right: open ? "30%" : "0%",
          bottom: open ? "10%" : "8%",
          scale: open ? "0.75" : "0.5",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <section className="plusButton" onClick={handleClick}>
          <p>Manuel</p>
        </section>
      </section>

      <section
        className="plusButton_border skabelon"
        style={{
          position: "fixed",
          right: open ? "42.5%" : "0%",
          bottom: open ? "20%" : "8%",
          scale: open ? "0.75" : "0.5",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <section className="plusButton" onClick={handleClick}>
          <p>Skabelon</p>
        </section>
      </section>

      <section
        className="plusButton_border auto"
        style={{
          position: "fixed",
          right: open ? "17.5%" : "0%",
          bottom: open ? "20%" : "8%",
          scale: open ? "0.75" : "0.5",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <section className="plusButton" onClick={handleClick}>
          <p>Auto</p>
        </section>
      </section>

      <section
        className="plusButton_border genbrug"
        style={{
          position: "fixed",
          right: open ? "55%" : "0%",
          bottom: open ? "10%" : "8%",
          scale: open ? "0.75" : "0.5",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <section className="plusButton" onClick={handleClick}>
          <p>Genbrug</p>
        </section>
      </section>

      <section
        className="plusButton_border"
        style={{
          position: "fixed",
          right: open ? "5%" : "0%",
          bottom: open ? "10%" : "8%",
          scale: open ? "0.75" : "0.5",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <section className="plusButton" onClick={handleClick}>
          <div className="plus_button_plus"></div>
          <div
            className="plus_button_plus rotated"
            style={{
              position: "fixed",
              height: open ? "1px" : "20px",
              transition: "all 0.5s ease-in-out",
            }}
          ></div>
        </section>
      </section>
    </>
  );
}
