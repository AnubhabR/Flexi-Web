// sidebar.jsx

import * as Icon from "lucide-react";

function Sidebar(props) {
  return (
    <>
      {/* Sidebar for large screens */}
      <div className="fixed top-0 left-0 flex-col max-w-64 justify-between lg:flex hidden bg-amber-50 p-2 rounded-br-md  min-h-screen w-64">
        <header className="flex flex-col py-4 w-full text-center justify-center align-middle text-lg font-semibold">
          Hi {props.user}
          <div className=" text-4xl text-neutral-800">{props.name}</div>
        </header>
        <main>
          <ul>
            {props.items.map((item, index) => {
              const IconComponent = Icon[props.icons[index]];
              const isActive = props.activeItem === item;
              return (
                <div
                  className={`flex items-center py-2 px-4 gap-1 hover:cursor-pointer rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-amber-200 text-amber-800"
                      : "hover:bg-amber-100"
                  }`}
                  key={index}
                  onClick={() =>
                    props.onItemSelected && props.onItemSelected(item)
                  }
                >
                  {IconComponent && (
                    <IconComponent size={24} className="mr-2" />
                  )}
                  <li className="hidden lg:flex py-2 px-4 list-none">{item}</li>
                </div>
              );
            })}
          </ul>
        </main>
        <footer>
          <div className="py-4 px-4 text-sm text-center">
            &copy; {new Date().getFullYear()} SIT Pune
          </div>
        </footer>
      </div>

      {/* Bottom nav for medium and smaller screens */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-20 rounded-t-md bg-amber-50 shadow-inner flex justify-around items-center py-2 md:flex lg:hidden">
        {props.items.map((item, index) => {
          const IconComponent = Icon[props.icons[index]];
          const isActive = props.activeItem === item;
          return (
            <button
              key={index}
              className={`flex flex-col items-center justify-center px-2 py-1 rounded transition-colors duration-200 ${
                isActive ? "bg-amber-200 text-amber-800" : "hover:bg-amber-100"
              }`}
              onClick={() => props.onItemSelected && props.onItemSelected(item)}
            >
              {IconComponent && <IconComponent size={24} />}
              <span className="text-xs mt-1">{item}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default Sidebar;
