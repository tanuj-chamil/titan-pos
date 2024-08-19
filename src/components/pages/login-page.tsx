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
import { useHotkeys } from "react-hotkeys-hook";
import { useToast } from "../ui/use-toast";
import { useAtom } from "jotai";
import sessionIDatom from "@/atoms";
import { useNavigate } from "react-router-dom";
import ShortcutKey from "../ui/shortcutkey";
import { ModeToggle } from "../ui/mode-toggle";
import { Separator } from "../ui/separator";
import { useTheme } from "../ui/theme-provider";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const [sessionID, setSessionID] = useAtom(sessionIDatom);
  const navigate = useNavigate();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const {theme, setTheme} = useTheme();

  useHotkeys(
    "alt+u",
    () => {
      if (usernameInputRef.current) {
        usernameInputRef.current.focus();
      }
    },
    {
      enableOnFormTags: ["input", "select", "textarea"],
      enableOnContentEditable: true,
      preventDefault: true,
    }
  );

  useHotkeys(
    "alt+p",
    () => {
      if (passwordInputRef.current) {
        passwordInputRef.current.focus();
      }
    },
    {
      enableOnFormTags: ["input", "select", "textarea"],
      enableOnContentEditable: true,
      preventDefault: true,
    }
  );

  useHotkeys(
    "alt+L",
    () => {
      if (loginButtonRef.current) {
        loginButtonRef.current.click();
      }
    },
    {
      enableOnFormTags: ["input", "select", "textarea"],
      enableOnContentEditable: true,
      preventDefault: true,
    }
  );

  useHotkeys(
    "alt+T",
    () => {
      let newtheme = theme;
      if (theme == "light") {
        newtheme = "dark";
      } else if (theme == "dark") {
        newtheme = "system"
      } else {
        newtheme = "light"
      }
      setTheme(newtheme);
      toast({
        variant: "default",
        title: "Theme Changed!",
        description: `Appliction theme has been changed: ${newtheme.charAt(0).toUpperCase() + newtheme.slice(1)}`,
        duration: 2500,
      })
    },
    {
      enableOnFormTags: ["input", "select", "textarea"],
      enableOnContentEditable: true,
      preventDefault: true,
    }
  );

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
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
        navigate("/");
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
    <div className="relative flex flex-col min-h-dvh justify-center items-center">
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
                ref={usernameInputRef}
                onChange={(e) => setUserame(e.target.value)}
                shortcut="⌥ U"
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
                ref={passwordInputRef}
                onChange={(e) => setPassword(e.target.value)}
                shortcut="⌥ P"
              />
            </div>
            <Separator></Separator>
            <Button
              tabIndex={2}
              type="submit"
              className="flex-grow"
              disabled={loading}
              ref={loginButtonRef}
            >
              <ShortcutKey
                text="Login"
                shortcut="⌥ L"
                invert={true}
              ></ShortcutKey>
            </Button>

            <div className="absolute top-0 right-0 m-8  flex items-center">
              <div className="mx-3 flex items-center">
                <ShortcutKey shortcut="⌥ T" text="" />
                <div className="flex font-medium text-sm">Theme</div>
              </div>

              <ModeToggle />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
