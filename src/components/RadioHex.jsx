export default function RadioHex({name, id, value}) {
  return (
    <label className="hex_check outer">
      <div className="hex_check inner">
        <input type="radio" name={name} id={id} value={value}/>
        <img
          className="tick_mark"
          src="img\icons\tick_mark.svg"
          alt="Flueben"
        />
      </div>
    </label>
  );
}
