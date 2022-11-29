import React from "react";

function MessageForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="lg:p-5">
        <div className="h-[80vh] lg:border border-y border-solid border-gray-500 overflow-y-scroll rounded lg:mb-4"></div>
      <form onSubmit={() => handleSubmit()} className="flex">
        <div className="w-[100vw] flex  lg:border border-b border-gray-500 rounded">
          <input
            type="text"
            placeholder="Enter message here..."
            className="w-full p-2 "
          />
          <button className="py-2 px-4 border-gray-500 border-l bg-tertiary" type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}

export default MessageForm;
