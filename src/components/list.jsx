export default function List() {
  function calcItemCount() {
    const itemsChecked = 17;
    const itemsTotal = 20;
    const hexHeight = 125;

    const itemsDone = (hexHeight / itemsTotal) * itemsChecked;
    return itemsDone;
  }
  const itemsDone = calcItemCount();

  return (
    <section className="beehive">
      <h6>Riga</h6>
      <p className="date">Maj 2024</p>
      <img src="\img\icons\tourist.svg" alt="Turist ikon" />
      <p className="item_count">17/20</p>
      <div className="wave" style={{ height: itemsDone }}></div>
    </section>
  );
}
