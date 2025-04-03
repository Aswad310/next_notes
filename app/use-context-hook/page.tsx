/** 
 * useContext is a React Hook that lets you read and subscribe to context from your component.
*/

"use client";

type TPanel = {
  children: React.ReactNode;
}

type TTitle = {
  children: React.ReactNode;
}

type TInputField = {
  label: string,
  type: string,
  required?: boolean
}

export default function MyApp() {
  return (
    <Panel>
      <Login />
    </Panel>
  );
}

function Login() {
  return (
    <>
      <form action="">
        <Title>Welcome</Title>
        <InputField label="Email:" type="email" required />
        <InputField label="Password:" type="password" required />
        <Button>Log In</Button>
      </form>
    </>
  )
}

function InputField({ label, type, required }: TInputField) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <label className="block text-sm font-medium w-1/4">{label}</label>
      <input
        type={type}
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

function Button({ children }: TTitle) {
  return (
    <button className=" border text-black px-2">
      {children}
    </button>
  )
}

function Panel({ children }: TPanel) {
  return (
    <section className="max-w-4xl mx-auto border rounded-sm mt-4 p-4">
      {children}
    </section>
  )
}