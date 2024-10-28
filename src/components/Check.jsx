export default function Check({ checked, onChange }) {
  return (
    <label className="hex_check outer">
      <div className="hex_check inner">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <img
          className="tick_mark"
          src="img/icons/tick_mark.svg"
          alt="Flueben"
        />
      </div>
    </label>
  );
}
