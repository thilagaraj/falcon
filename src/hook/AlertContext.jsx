import { createContext, useContext, useState } from "react";
import ALERTS from "../constants/messages";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, type: "", title: "", message: "" });

  const showAlert = (keys) => {
    if (!keys) return;

    let alertKeys = Array.isArray(keys) ? keys : [keys];

    let firstAlert = ALERTS[alertKeys[0]] || ALERTS.DEFAULT;
    let message = alertKeys
      .map((key) => ALERTS[key]?.message || "")
      .filter(Boolean)
      .join(" ");

    setAlert({
      show: true,
      type: firstAlert.type,
      title: firstAlert.title,
      message,
    });

    //setTimeout(() => hideAlert(), 3000);
  };

  const hideAlert = () => setAlert({ show: false, type: "", title: "", message: "" });

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within an AlertProvider");
  return context;
};
