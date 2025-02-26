"use client";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type HTagCont = {
  nameCollection: { id: string; name: string }[];
  handleNames: (data: { id: string; name: string }) => void;
};

const HeaderTagContext = createContext<HTagCont>({
  nameCollection: [],
  handleNames: () => {},
});
export const useHeaderTagContext = () => useContext(HeaderTagContext);

export const HeaderTagContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [nameCollection, setNames] = useState<{ id: string; name: string }[]>(
    []
  );

  const handleNames = (data: { id: string; name: string }) => {
    if (!nameCollection.some((s) => s.id === data.id)) {
      setNames((prev) => [...prev, data]);
    }
    if (nameCollection.some((s) => s.id === data.id && s.name !== data.name)) {
      setNames((prev) =>
        prev.map((m) => {
          if (m.id === data.id) {
            return data;
          } else {
            return m;
          }
        })
      );
    }
  };

  return (
    <HeaderTagContext.Provider value={{ nameCollection, handleNames }}>
      {children}
    </HeaderTagContext.Provider>
  );
};
