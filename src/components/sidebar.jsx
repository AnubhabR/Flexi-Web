// sidebar.jsx

import * as Icon from "lucide-react";

function Sidebar(props) {
  const handleItemClick = (item, onItemSelected) => {
    if (item === "Logout") {
      // Add visual feedback for logout
      const button = event?.currentTarget;
      if (button) {
        button.style.transform = "scale(0.95)";
        setTimeout(() => {
          button.style.transform = "";
          onItemSelected(item);
        }, 150);
      } else {
        onItemSelected(item);
      }
    } else {
      onItemSelected(item);
    }
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="fixed top-0 left-0 flex-col max-w-64 justify-between lg:flex hidden bg-amber-50 p-2 rounded-br-md min-h-screen w-64 z-40">
        <header className="flex flex-col py-4 w-full text-center justify-center align-middle text-lg font-semibold">
          Hi {props.user}
          <div className="text-4xl text-neutral-800">{props.name}</div>
        </header>

        <main className="flex-1 flex flex-col">
          <ul className="flex-1">
            {props.items.map((item, index) => {
              const IconComponent = Icon[props.icons[index]];
              const isActive = props.activeItem === item;
              const isLogout = item === "Logout";

              return (
                <div
                  className={`flex items-center py-3 px-4 gap-3 hover:cursor-pointer rounded-lg transition-all duration-200 mb-1 ${
                    isLogout
                      ? "hover:bg-red-100 text-red-600 hover:text-red-700 hover:shadow-md border border-red-200 mt-4"
                      : isActive
                      ? "bg-amber-200 text-amber-800 shadow-sm"
                      : "hover:bg-amber-100 text-gray-700"
                  }`}
                  key={index}
                  onClick={() => handleItemClick(item, props.onItemSelected)}
                >
                  {IconComponent && (
                    <IconComponent
                      size={20}
                      className={`transition-all duration-200 ${
                        isLogout
                          ? "text-red-500"
                          : isActive
                          ? "text-amber-800"
                          : "text-gray-600"
                      }`}
                    />
                  )}
                  <li
                    className={`hidden lg:flex py-1 px-2 list-none transition-all duration-200 font-medium ${
                      isLogout
                        ? "text-red-600"
                        : isActive
                        ? "text-amber-800"
                        : "text-gray-700"
                    }`}
                  >
                    {item}
                  </li>
                </div>
              );
            })}
          </ul>
        </main>

        <footer>
          <div className="py-4 px-4 text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} SIT Pune
          </div>
        </footer>
      </div>

      {/* Bottom nav for medium and smaller screens - Icon only */}
      <nav
        className="fixed left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-lg shadow-2xl border border-gray-200/50 lg:hidden"
        style={{
          bottom: "10px",
          borderRadius: "28px",
          padding: "8px 12px",
          maxWidth: "95vw",
          width: "fit-content",
          minWidth: "280px",
          zIndex: 99999,
          position: "fixed",
        }}
      >
        {/* Scrollable container for all navigation items - Icons only */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {props.items.map((item, index) => {
            const IconComponent = Icon[props.icons[index]];
            const isActive = props.activeItem === item;
            const isLogout = item === "Logout";

            return (
              <button
                key={index}
                className={`flex items-center justify-center p-3 rounded-2xl transition-all duration-300 flex-shrink-0 ${
                  isLogout
                    ? "text-red-500 hover:text-red-600 hover:bg-red-50/70 hover:shadow-lg border border-red-200"
                    : isActive
                    ? "bg-blue-500 text-white shadow-lg transform scale-110"
                    : "text-gray-600 hover:text-blue-500 hover:bg-blue-50/70"
                }`}
                onClick={() => handleItemClick(item, props.onItemSelected)}
                style={{
                  minWidth: "44px",
                  width: "44px",
                  height: "44px",
                }}
                title={item} // Tooltip for accessibility
              >
                {IconComponent && (
                  <IconComponent
                    size={isActive ? 22 : 20}
                    className="transition-all duration-200"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
