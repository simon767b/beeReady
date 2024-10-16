import { useState } from "react";

export default function PlusButton() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <>
      <section
        className="beehive plusButton_border manuel"
        style={{
          left: open ? "56%" : "65%",
          bottom: open ? "10%" : "10%",
          scale: open ? "2" : "1",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <section className="beehive plusButton" onClick={handleClick}>
          <p>Manuel</p>
        </section>
      </section>

      <section
        className="beehive plusButton_border skabelon"
        style={{
          left: open ? "51.5%" : "65%",
          bottom: open ? "24%" : "10%",
          scale: open ? "2" : "1",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <section className="beehive plusButton" onClick={handleClick}>
          <p>Skabelon</p>
        </section>
      </section>

      <section
        className="beehive plusButton_border auto"
        style={{
          left: open ? "60.5%" : "65%",
          bottom: open ? "24%" : "10%",
          scale: open ? "2" : "1",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <section className="beehive plusButton" onClick={handleClick}>
          <p>Auto</p>
        </section>
      </section>

      <section
        className="beehive plusButton_border genbrug"
        style={{
          left: open ? "47%" : "65%",
          bottom: open ? "10%" : "10%",
          scale: open ? "2" : "1",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <section className="beehive plusButton" onClick={handleClick}>
          <p>Genbrug</p>
        </section>
      </section>

      <section
        className="beehive plusButton_border"
        style={{
          left: open ? "65%" : "65%",
          bottom: open ? "10%" : "10%",
          scale: open ? "2" : "1",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <section className="beehive plusButton" onClick={handleClick}>
          <div className="plus_button_plus"></div>
          <div
            className="plus_button_plus rotated"
            style={{
              height: open ? "1px" : "20px",
              transition: "all 0.5s ease-in-out",
            }}
          ></div>
        </section>
      </section>
    </>
  );
}
