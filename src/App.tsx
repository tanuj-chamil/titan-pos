import { Eclipse, KeyRound, Power, User } from "lucide-react";
import "./App.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-dvh flex flex-col items-center justify-center">
        <Card className="flex flex-col w-2/12 min-w-96 p-4 gap-4 drop-shadow-lg">
          <CardHeader className="flex flex-col gap-4">
            <div className="flex justify-between align-middle">
              <div>
                <CardTitle>TitanPOS</CardTitle>
                <CardDescription>
                  Powered by{" "}
                  <a className="underline underline-offset-4" href="">
                    snap86
                  </a>
                </CardDescription>
              </div>
              <Eclipse
                className="animate-pulse"
                size={36}
                color="hsl(var(--primary))"
              />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <User size={16}></User>
                <Label htmlFor="username">Username</Label>
              </div>
              <Input
                type="username"
                placeholder="Username"
                name="username"
              ></Input>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <KeyRound size={16}></KeyRound>
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                type="password"
                placeholder="Password"
                name="password"
              ></Input>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="min-w-20">Login</Button>
            <Button variant={"destructive"} size={"icon"}>
              <Power size={16} />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default App;
