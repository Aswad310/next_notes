/** 
 * useContext is a React Hook that lets you read and subscribe to context from your component.
*/

"use client";

import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

type Panel = {
  title?: string;
  children: React.ReactNode;
};

export default function MyApp() {
  return (
    <ThemeContext.Provider value="light">
      <Form />
    </ThemeContext.Provider>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Signup</Button>
      <Button>Login</Button>
    </Panel>
  );
}

function Panel({ title, children }: Panel) {
  const theme = useContext(ThemeContext);
  return (
    <section className={`${theme}:bg-black`}>
      <h1 className={`${theme}:text-white`}>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children }: Panel) {
  const theme = useContext(ThemeContext);
  return (
    <button className={`${theme}:bg-blue-500 ${theme}:text-white border border-blue-500 rounded px-4 py-2`}>
      {children}
    </button>
  );
}