import { KeyRound, Orbit, Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useAtom } from "jotai";
import sessionIDatom from "@/atoms";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const [sessionID, setSessionID] = useAtom(sessionIDatom);

  const usernameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameInput.current) {
      usernameInput.current.focus();
    }
    console.log(sessionID);
  }, []);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (username == "" || password == "") {
      toast({
        variant: "destructive",
        title: "Login Failed!",
        description: "Username and password cannot be empty.",
        duration: 5000,
      });
    } else {
      setLoading(true);
      const token = await new Promise<Token>((resolve, reject) =>
        setTimeout(
          () =>
            resolve(
              window.ipcRenderer.invoke("login-request", {
                username: username,
                password: password,
              })
            ),
          1250
        )
      );

      setSessionID(token.session);

      if (token.status == 401) {
        toast({
          variant: "destructive",
          title: "Login Failed!",
          description: "The username or password was incorrect.",
          duration: 5000,
        });
      } else if (token.status == 200) {
        toast({
          variant: "success",
          title: "Login Success!",
          description: `Welcome ${username}`,
          duration: 5000,
        });
      } else if (token.status == 404) {
        toast({
          variant: "destructive",
          title: "Login Failed!",
          description: `User not found.`,
          duration: 5000,
        });
      }
    }
    console.log(sessionID);
    setLoading(false);
  }
  return (
    <div className="flex flex-col min-h-dvh justify-center items-center">
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
                onChange={(e) => setUserame(e.target.value)}
              />
            </div>
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              tabIndex={2}
              type="submit"
              className="mt-6"
              disabled={loading}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
