// sidebar.jsx

import * as Icon from "lucide-react";

function Sidebar(props) {
  return (
    <div className="fixed top-0 left-0 flex flex-col max-w-64 justify-between lg:show bg-amber-50 p-2 rounded-tr-md rounded-br-md shadow-md min-h-screen w-64">
      <header className="flex flex-col py-4 w-full text-center justify-center align-middle text-lg font-semibold">
        Hi {props.user}
        <div className=" text-4xl text-neutral-800">{props.name}</div>
      </header>
      <main>
        <ul>
          {props.items.map((item, index) => {
            const IconComponent = Icon[props.icons[index]];
            // Check if the current item is the active one
            const isActive = props.activeItem === item;

            return (
              <div
                // 1. ADD THE ONCLICK HANDLER HERE
                onClick={() => props.onItemSelected(item)}
                // 2. ADD CONDITIONAL STYLING FOR THE ACTIVE ITEM
                className={`flex items-center py-2 px-4 gap-1 hover:cursor-pointer hover:bg-amber-100 rounded-md transition-colors duration-200 ${
                  isActive ? "bg-amber-200 font-bold" : ""
                }`}
                key={index}
              >
                {IconComponent && <IconComponent size={24} className="mr-2" />}
                <li className="py-2 px-4 list-none">{item}</li>
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
  );
}

export default Sidebar;