import tickMark from "../assets/img/icons/tick_mark.svg";

export default function RadioHex({ name, sortType, setSortType }) {
  return (
    <label
      className="hex_check outer"
      onClick={() => {
        setSortType(`${name}`), console.log(name);
      }}
    >
      <div className="hex_check inner">
        {sortType === name ? <input type="radio" name={name} /> : ""}
        {sortType === name ? (
          <img className="tick_mark" src={tickMark} alt="Flueben" />
        ) : (
          ""
        )}
      </div>
    </label>
  );
}
