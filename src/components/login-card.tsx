import { KeyRound, Orbit, Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";

function LoginCard() {
  const [loading, setLoading] = useState(false);
  const usernameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameInput.current) {
      usernameInput.current.focus();
    }
  }, []);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }
  return (
    <Card className="min-w-80 shadow-md">
      <CardHeader>
        <div className="flex justify-between align-middle">
          <div>
            <CardTitle className="font-bold">TitanPOS</CardTitle>
            <CardDescription>Developed by Snap86</CardDescription>
          </div>
          <Orbit
            size={32}
            className={`${
              !loading ? "animate-pulse" : "animate-spin-slow"
            } -scale-100`}
          />
        </div>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-2"
          onSubmit={(event) => handleLogin(event)}
        >
          <div>
            <div className="flex gap-2">
              <Users size={14} />
              <Label htmlFor="username">Username</Label>
            </div>
            <Input
              tabIndex={1}
              className="my-2"
              name="username"
              placeholder="Username"
              type="text"
              ref={usernameInput}
            />
          </div>
          <div>
            <div className="flex justify-between mt-2">
              <div className="flex gap-2">
                <KeyRound size={14} />
                <Label htmlFor="password">Password</Label>
              </div>
              <a tabIndex={4} className="text-xs" href="/">
                Forgot Password?
              </a>
            </div>
            <div>
              <Input
                tabIndex={2}
                className="my-2"
                name="password"
                placeholder="Password"
                type="password"
              />
            </div>
          </div>
          <Button tabIndex={2} type="submit" className="mt-6">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginCard;
