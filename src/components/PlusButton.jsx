import { useState } from "react";
import Manual from "./Manual";
import Template from "./Template";
import Auto from "./Auto";
import Recycle from "./Recycle";

export default function PlusButton() {
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
        <section className="plusButton" onClick={() => showDialog("Manual")}>
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
        <section className="plusButton" onClick={() => showDialog("Template")}>
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
        <section className="plusButton" onClick={() => showDialog("Auto")}>
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
        <section className="plusButton" onClick={() => showDialog("Recycle")}>
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
      <div className={gradientClass}></div>

      {/* Dialogs */}
      <Manual
        isOpen={openDialog === "Manual" ? true : false}
        onClose={closeDialog}
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
