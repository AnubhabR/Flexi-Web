function Card(props) {
  // Helper to render array, object, or single value
  const renderItems = (item, renderFn) => {
    if (Array.isArray(item)) {
      return item.map((val, idx) => renderFn(val, idx));
    }
    if (item && typeof item === "object") {
      return Object.entries(item).map(([key, val], idx) => renderFn(val, key));
    }
    if (item !== undefined && item !== null) {
      return renderFn(item);
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-4 w-1/5 min-w-[300px] bg-gray-800 border rounded-md p-4">
      {props.cardtitle &&
        renderItems(props.cardtitle, (title, key) => (
          <div className="flex flex-col" key={`cardtitle-${key}`}>
            <h2 className="text-xl text-amber-50 font-semibold">{title}</h2>
            <hr className="border-2 border-amber-50/70 w-3/4" />
          </div>
        ))}

      {props.quiz && (
        <div>
          {props.topics &&
            renderItems(props.topics, (topic, key) => (
              <div className="flex flex-col text-amber-50" key={`topic-${key}`}>
                <p>
                  <b>Topics: </b>
                  {topic}
                </p>
              </div>
            ))}
          {props.duedate &&
            renderItems(props.duedate, (date, key) => (
              <div
                className="flex flex-col text-amber-50"
                key={`duedate-${key}`}
              >
                <p>
                  <b>Duedate: </b>
                  {date}
                </p>
              </div>
            ))}
          {props.maxmarks &&
            renderItems(props.maxmarks, (mark, key) => (
              <div
                className="flex flex-col text-amber-50"
                key={`maxmarks-${key}`}
              >
                <p>
                  <b>Max Marks: </b>
                  {mark}
                </p>
              </div>
            ))}
          {props.questions &&
            renderItems(props.questions, (question, key) => (
              <div
                className="flex flex-col text-amber-50"
                key={`questions-${key}`}
              >
                <p>
                  <b>Questions: </b>
                  {question}
                </p>
              </div>
            ))}
        </div>
      )}

      {props.inputfield && (
        <div className="flex flex-col gap-2">
          {props.label &&
            renderItems(props.label, (label, key) => (
              <label
                htmlFor={`input-field-${key}`}
                className="text-amber-50/75"
                key={`label-${key}`}
              >
                {label}
              </label>
            ))}
          {props.inputtext &&
            renderItems(props.inputtext, (input, key) => (
              <input
                type="text"
                id={`input-field-${key}`}
                className="flex bg-gray-700 rounded-md p-2 text-amber-50 justify-center items-center border-0"
                placeholder={input}
                key={`input-${key}`}
              />
            ))}
        </div>
      )}

      {props.btntext &&
        renderItems(props.btntext, (btn, key) => (
          <button
            className="flex justify-center items-center bg-gray-900 text-amber-50 mt-7 py-2 px-4 rounded-md hover:cursor-pointer border-0"
            key={`btn-${key}`}
          >
            {btn}
          </button>
        ))}
    </div>
  );
}

export default Card;
