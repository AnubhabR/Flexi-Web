function Sidebar(props) {
  return (
    <div className="flex flex-col bg-amber-50 p-4 rounded-md shadow-md">
      <header className="flex w-full justify-center align-middle text-lg font-semibold">
        Hi {props.user}
      </header>
      <main>
        <ul>
          {props.items.map((item, index) => (
            <li key={index} className="py-2 px-4 hover:bg-amber-100">
              {item}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
