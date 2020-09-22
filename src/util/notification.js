import React, { useState, useMemo, useContext } from "react";
import { Message } from "semantic-ui-react";

const NotificationContext = React.createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const methods = useMemo(
    () => ({
      setSuccess: (message) => setNotification({ content: message, positive: true, icon: "check circle outline" }),
      setInfo: (message) => setNotification({ content: message, info: true, icon: "info circle" }),
      setWarning: (message) => setNotification({ content: message, warning: true, icon: "warning circle" }),
      setError: (message) => setNotification({ content: message, negative: true, icon: "remove circle" }),
      dismissNotification: () => setNotification(null),
    }),
    []
  );

  return (
    <NotificationContext.Provider value={methods}>
      {notification && (
        <Message
          style={{ position: "fixed", top: "10px", right: "10px", zIndex: 1, width: "auto", overflowWrap: "anywhere" }}
          onDismiss={methods.dismissNotification}
          {...notification}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);
  return context;
};

export default useNotification;
export { NotificationProvider };
