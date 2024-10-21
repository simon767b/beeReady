export default function List() {
  const itemsChecked = 17;
  const itemsTotal = 20;
  const hexHeight = 125;

  function calcItemCount() {
    const itemsDone = (hexHeight / itemsTotal) * itemsChecked;
    const itemsPercent = (itemsDone / hexHeight) * 100;
    return itemsPercent;
  }

  return (
    <section className="hexagon">
      <div className="hex_content">
        <h6>Riga</h6>
        <p className="date">Maj 2024</p>
        <img src="img\icons\tourist.svg" alt="Turist ikon" />
        <p className="item_count">
          {itemsChecked}/{itemsTotal}
        </p>
        <div
          className="wave"
          style={{ height: calcItemCount() + 36 + "%" }}
        ></div>
      </div>
    </section>
  );
}
