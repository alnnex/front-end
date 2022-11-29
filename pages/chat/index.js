import React from "react";
import MessageForm from "../../components/MessageForm";
import SideBar from "../../components/SideBar"

function Index() {
  return (
    <div className="grid grid-cols-3 grid-rows-1">
      <div className="col-span-1 lg:border-r border-gray-800/20">
        <SideBar/>
      </div>
      <div className="col-span-3 lg:col-span-2">
        <MessageForm/>
      </div>
    </div>
  );
}

export default Index;
