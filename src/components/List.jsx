import { useNavigate } from "react-router-dom";

export default function List({ props }) {
  const navigate = useNavigate();

  function handleClick() {
    console.log(props.id);
    navigate(`/lists/${props.id}`);
  }

  // const itemsChecked = 17;
  // const itemsTotal = 20;
  const hexHeight = 125;

  function calcItemCount() {
    const itemsDone = (hexHeight / props.itemsTotal) * props.itemsChecked;
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
          {props.itemsChecked ? props.itemsChecked : 0}/
          {props.itemsTotal ? props.itemsTotal : 0}
        </p>
        <div
          className="wave"
          style={{ height: calcItemCount() + 36 + "%" }}
        ></div>
      </div>
    </section>
  );
}
