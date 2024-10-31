import { useState } from "react";
import Manual from "./Manual";
import Template from "./Template";
import Auto from "./Auto";
import Recycle from "./Recycle";

export default function PlusButton({ props }) {
  const [open, setOpen] = useState(false);
  const [gradientClass, setGradientClass] = useState("gradient low");

  /* Dialog bokse pop op */

  // Track which dialog is open
  const [openDialog, setOpenDialog] = useState(null); // null means no dialog is open

  const handleClick = () => {
    setOpen(!open);
    if (!open) {
      setGradientClass("gradient high");
    } else {
      setGradientClass("gradient low");
    }
  };

  // Function to open a specific dialog
  const showDialog = (dialogName) => {
    setOpenDialog(dialogName);
  };

  // Function to close any dialog
  const closeDialog = () => {
    setOpenDialog(null);
  };

  return (
    <>
      {/* manual btn */}
      <section
        className="plusButton_border manuel"
        style={{
          right: open ? "calc((48px * 1.5) + 2rem)" : "1rem",
          bottom: open ? "6rem" : "6rem",
          scale: open ? "1.5" : "1",
        }}
      >
        <section className="plusButton" onClick={() => showDialog("Manual")}>
          <p>Manuel</p>
        </section>
      </section>

      {/* auto btn */}
      <section
        className="plusButton_border auto"
        style={{
          right: open ? "calc((48px * 1.5) / 2 + 1.5rem)" : "1rem",
          bottom: open ? "calc(6rem + ((55px * 1.5) - 55px * 0.15)" : "6rem",
          scale: open ? "1.5" : "1",
        }}
      >
        <section className="plusButton" onClick={() => showDialog("Auto")}>
          <p>Auto</p>
        </section>
      </section>

      {/* template btn */}
      <section
        className="plusButton_border skabelon"
        style={{
          right: open ? "calc((48px * 1.5) * 1.5 + 2.5rem)" : "1rem",
          bottom: open ? "calc(6rem + ((55px * 1.5) - 55px * 0.15)" : "6rem",
          scale: open ? "1.5" : "1",
        }}
      >
        <section className="plusButton" onClick={() => showDialog("Template")}>
          <p>Skabelon</p>
        </section>
      </section>

      {/* recycle btn */}
      <section
        className="plusButton_border genbrug"
        style={{
          right: open ? "calc((48px * 1.5) * 2 + 3rem)" : "1rem",
          bottom: open ? "6rem" : "6rem",
          scale: open ? "1.5" : "1",
        }}
      >
        <section className="plusButton" onClick={() => showDialog("Recycle")}>
          <p>Genbrug</p>
        </section>
      </section>

      {/* plus btn */}
      <section
        className="plusButton_border"
        style={{
          scale: open ? "1.5" : "1",
        }}
      >
        <section className="plusButton" onClick={handleClick}>
          <div className="plus_button_plus"></div>
          <div
            className="plus_button_plus rotate"
            style={{
              height: open ? "1px" : "20px",
            }}
          ></div>
        </section>
      </section>

      <div className={gradientClass}></div>

      {/* Dialogs */}
      <Manual
        isOpen={openDialog === "Manual" ? true : false}
        onClose={closeDialog}
        props={props}
      ></Manual>

      <Template
        isOpen={openDialog === "Template" ? true : false}
        onClose={closeDialog}
      ></Template>

      <Auto
        isOpen={openDialog === "Auto" ? true : false}
        onClose={closeDialog}
      ></Auto>

      <Recycle
        isOpen={openDialog === "Recycle" ? true : false}
        onClose={closeDialog}
      ></Recycle>
    </>
  );
}
