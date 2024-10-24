import { useNavigate } from "react-router-dom";

export default function List({ props }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/lists/${props.id}`);
  }

  console.log(props.id);

  const itemsChecked = 17;
  const itemsTotal = 20;
  const hexHeight = 125;

  function calcItemCount() {
    const itemsDone = (hexHeight / itemsTotal) * itemsChecked;
    const itemsPercent = (itemsDone / hexHeight) * 100;
    return itemsPercent;
  }

  return (
    <section onClick={handleClick} className="hexagon">
      <div className="hex_content">
        <h6>{props.name}</h6>
        <p className="date">{props.dateStart}</p>
        <img src={props.icon} alt="Ikon" />
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
