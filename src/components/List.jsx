export default function List() {
  const itemsChecked = 10;
  const itemsTotal = 20;
  const hexHeight = 125;

  function calcItemCount() {
    const itemsDone = (hexHeight / itemsTotal) * itemsChecked;
    const itemsPercent = itemsDone / hexHeight * 100;
    return itemsPercent;
  }
  const itemsPercent = calcItemCount();
  console.log(itemsPercent);

  return (
    <section className="beehive">
      <h6>Riga</h6>
      <p className="date">Maj 2024</p>
      <img src="\img\icons\tourist.svg" alt="Turist ikon" />
      <p className="item_count">
        {itemsChecked}/{itemsTotal}
      </p>
      <div className="wave"></div>
    </section>
  );
}
