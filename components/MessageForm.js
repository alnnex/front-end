import React from "react";

function MessageForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div>
      <form onSubmit={() => handleSubmit()} className="flex p-3 -z-10">
        <div className="w-[100vw] flex gap-2">
          <input
            type="text"
            placeholder="Enter message here..."
            className="w-full p-2 border border-gray-500 rounded-md"
          />
          <button className="py-2 px-4 border border-gray-500 rounded-md" type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}

export default MessageForm;
