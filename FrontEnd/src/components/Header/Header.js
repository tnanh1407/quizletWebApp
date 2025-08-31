import { createContext, useState, useContext } from "react";

const NavContext = createContext();

export function NavProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <NavContext.Provider value={{ isOpen, handleClick }}>
      {children}
    </NavContext.Provider>
  );
}

export  function useNav() {
  return useContext(NavContext);
}