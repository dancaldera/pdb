import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import { ThemeProvider } from "@/components/theme-provider";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Button } from "./components/button";
import { Label } from "./components/label";
import { Input } from "./components/input";
import { ModeToggle } from "./components/mode-toggle";
import { PlusIcon } from "lucide-react";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center my-4">Welcome to Pdb</h1>
        <h2 className="text-xl font-semibold text-center my-4">
          Open Source Database Management Tool
        </h2>
        <form
          className="flex items-center space-x-2 my-2"
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <Button type="submit">
            <PlusIcon size={16} />
          </Button>
          <Input
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Search for a connection..."
          />
        </form>

        <Label>{greetMsg}</Label>
      </div>

      {/* Force this toggle to be in the bottom right corner */}
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
