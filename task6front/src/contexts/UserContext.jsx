import React, { createContext, useState } from "react";

export const UserContext = createContext({
  username: "",
  setUsername: () => {},
  logout: () => {},
});

export function UserProvider({ children }) {
  const [username, setUsername] = useState("");

  const logout = () => {
    setUsername("");
  };

  return (
    <UserContext.Provider value={{ username, setUsername, logout }}>
      {children}
    </UserContext.Provider>
  );
}
