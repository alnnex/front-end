import React, { createContext, useContext, useState } from "react";

const TriggerContext = createContext();

const TriggerProvider = ({ children }) => {
  const [trigger, setTrigger] = useState(false);
  const [reFetchChats, setReFetchChats] = useState(false);

  return (
    <TriggerContext.Provider
      value={{ trigger, setTrigger, reFetchChats, setReFetchChats }}
    >
      {children}
    </TriggerContext.Provider>
  );
};
export const TriggerState = () => {
  return useContext(TriggerContext);
};
export default TriggerProvider;
