import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {}
});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
