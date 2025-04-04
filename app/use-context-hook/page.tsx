/** 
 * useContext is a React Hook that lets you read and subscribe to context from your component.
*/

"use client";

import {
  ChangeEvent,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";

type TMyProvider = {
  children: React.ReactNode;
  theme: string,
}

type TPanel = {
  children: React.ReactNode;
}

type TDarkModeSwitch = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

type TTitle = {
  children: ReactNode;
}

type TButton = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

type TInputField = {
  label: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

type TGreetings = {
  email: string,
}

type TCurrentUserContextType = {
  currentUser: null | { email: string };
  setCurrentUser: Dispatch<SetStateAction<null | { email: string }>>;
};

const ThemeContext = createContext("light");
const CurrentUserContext = createContext<TCurrentUserContextType | null>(null);


export default function MyApp() {
  const [theme, setTheme] = useState("light");

  return (
    <MyProvider theme={theme}>
      <AppContent theme={theme} setTheme={setTheme} />
    </MyProvider>
  );
}

function AppContent({ theme, setTheme }: TDarkModeSwitch) {
  const { currentUser } = useContext(CurrentUserContext) as TCurrentUserContextType;

  return (
    <>
      <Panel>
        {!currentUser?.email ? (
          <Login />
        ) : (
          <Greetings email={currentUser?.email || ""} />
        )}
      </Panel>

      <DarkModeSwitch theme={theme} setTheme={setTheme} />
    </>
  );
}

function Login() {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("Login must be used within a CurrentUserContext.Provider");
  }
  const { setCurrentUser } = context;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canLogin = email.length > 0 && password.length > 0;

  const handleLogin = () => {
    if (!canLogin) return;
    setCurrentUser({ email });
  };

  return (
    <>
      <Title>Welcome</Title>

      <InputField
        label="Email:"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <InputField
        label="Password:"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button disabled={!canLogin} onClick={handleLogin}>
        Log In
      </Button>
      {!canLogin && <span className="text-red-500">Fields are required</span>}
    </>
  );
}


function Greetings({ email = "" }: TGreetings) {
  return (
    <>
      <Title>Welcome</Title>
      <p>You logged in as {email}.</p>
    </>
  )
}

function DarkModeSwitch({ theme, setTheme }: TDarkModeSwitch) {
  return (
    <div className="flex items-center gap-1 max-w-xl mx-auto p-1">
      <input
        id="dark-mode"
        type="checkbox"
        checked={theme === "dark"}
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        aria-label="Toggle dark mode"
      />
      <label
        htmlFor="dark-mode"
        className="block text-sm font-normal cursor-pointer select-none"
      >
        Use dark mode
      </label>
    </div>
  );
}

function InputField({ label, type, value, onChange, required = false }: TInputField) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <label className="block text-sm font-medium w-1/4">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="border rounded px-2 py-1 w-3/4"
      />
    </div>
  );
}

function Title({ children }: TTitle) {
  return (
    <h1 className="text-xl font-medium mb-4">
      {children}
    </h1>
  );
}

function Button({ children, disabled, onClick }: TButton) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="bg-white text-black border border-black px-2 rounded"
    >
      {children}
    </button>
  )
}

function Panel({ children }: TPanel) {
  const theme = useContext(ThemeContext) || "light";

  return (
    <section
      className={`${theme}:bg-black ${theme}:text-white max-w-xl border rounded-sm mx-auto p-4`}
    >
      {children}
    </section>
  );
}

function MyProvider({ children, theme }: TMyProvider) {
  const [currentUser, setCurrentUser] = useState<null | { email: string }>(null);

  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  );
}