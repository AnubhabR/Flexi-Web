function Card(props) {
  return (
    <div className="flex bg-darkbg border rounded-md p-4">
      <button className="flex bg-darkgreen text-amber-50 py-2 px-4 rounded-md hover:cursor-pointer border-0">
        {props.label || "Click me"}
      </button>
      <input
        type="text"
        className="flex bg-darkgreen border rounded-md p-2 focus:border-2 focus:outline-none focus:ring-foreground text-amber-50"
        placeholder={props.inputPlaceholder || "Enter text"}
      />
    </div>
  );
}

export default Card;
