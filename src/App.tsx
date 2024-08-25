import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import { ThemeProvider } from "@/components/theme-provider";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Button } from "./components/button";
import { Label } from "./components/label";
import { Input } from "./components/input";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Label>Click on the Tauri, Vite, and React logos to learn more.</Label>

        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <Input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <Button type="submit">Greet</Button>
        </form>

        <Label>{greetMsg}</Label>
      </div>

      <ModeToggle />
    </ThemeProvider>
  );
}

export default App;
