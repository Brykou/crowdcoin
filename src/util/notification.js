import React, { useState, useMemo, useContext } from "react";
import { Message } from "semantic-ui-react";

const NotificationContext = React.createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const methods = useMemo(
    () => ({
      setInfo: (message) => setNotification({ content: message, info: true, icon: "info circle" }),
      setError: (message) => setNotification({ content: message, negative: true, icon: "exclamation circle" }),
      dismissNotification: () => setNotification(null),
    }),
    []
  );

  return (
    <NotificationContext.Provider value={methods}>
      {notification && (
        <Message
          style={{ position: "fixed", top: "10px", right: "10px", zIndex: 1, width: "auto" }}
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
