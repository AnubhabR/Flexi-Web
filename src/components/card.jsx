function Card(props) {
  return (
    <div className="flex flex-col gap-4 w-1/4 min-w-[300px] bg-darkbg border rounded-md p-4">
      {props.cardtitle && (
        <div className="flex flex-col">
          <h2 className="text-xl text-amber-50 font-semibold">
            {props.cardtitle}
          </h2>
          <hr className="border-2 border-amber-50/70 w-3/4" />
        </div>
      )}
      {props.inputfield && (
        <div className="flex flex-col gap-2">
          {props.label && (
            <label htmlFor="input-field" className="text-amber-50/75">
              {props.label}
            </label>
          )}
          {props.inputtext && (
            <input
              type="text"
              id="input-field"
              className="flex bg-darkgreen rounded-md p-2 text-amber-50 justify-center items-center border-0"
              placeholder={props.inputtext}
            />
          )}
        </div>
      )}
      {props.btntext && (
        <button className="flex justify-center items-center bg-foreground text-amber-50 py-2 px-4 rounded-md hover:cursor-pointer border-0">
          {props.btntext}
        </button>
      )}
    </div>
  );
}

export default Card;
