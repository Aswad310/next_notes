'use client';

import { useContext } from "react";
import { LevelContext } from "./LevelContext";

interface IHeading {
  children: React.ReactNode;
}

export default function Heading({ children }: IHeading) {
  const level = useContext(LevelContext);

  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1 className="text-[22px]">{children}</h1>;
    case 2:
      return <h2 className="text-[20px]">{children}</h2>;
    case 3:
      return <h3 className="text-[18px]">{children}</h3>;
    case 4:
      return <h4 className="text-[16px]">{children}</h4>;
    case 5:
      return <h5 className="text-[14px]">{children}</h5>;
    case 6:
      return <h6 className="text-[12px]">{children}</h6>;
    default:
      return <h1 className="text-[22px]">{children}</h1>;
  }
};
