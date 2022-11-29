import React from "react";

function Sidebar() {
  const rooms = ["General Room", "room 2"];
  return (
    <div className="lg:p-5">
      <ul class="p-2 w-full my-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {rooms.map((room, idx) => (
          <>
            <li
              key={idx}
              className="py-2 px-4 w-full rounded-t-lg last:border-b-0 border-b border-gray-500 dark:border-gray-600"
            >
              {room}
            </li>
          </>
        ))}
      </ul>
      <p className="text-2xl text-center mt">Members</p>
    </div>
  );
}

export default Sidebar;
