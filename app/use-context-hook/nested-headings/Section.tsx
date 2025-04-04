'use client';

import { useContext } from "react";
import { LevelContext } from "./LevelContext"

interface ISection {
  children: React.ReactNode;
}

export default function Section({ children }: ISection) {
  const level = useContext(LevelContext);

  return (
    <section className="p-[10px] m-[5px] border rounded-[5px] border-gray-400">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  )
}
