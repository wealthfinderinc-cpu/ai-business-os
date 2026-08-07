"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function login() {
    setLoading(true);

    const result = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false,
      }
    );

    setLoading(false);

    if (result?.error) {
      toast.error(
        "Invalid Email or Password"
      );
      return;
    }

    toast.success("Login Successful");

    router.push("/dashboard");

    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

      <h1 className="mb-2 text-center text-3xl font-bold">
        AI Business OS
      </h1>

      <p className="mb-8 text-center text-slate-500">
        Login to continue
      </p>

      <div className="space-y-5">

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <Button
          className="w-full"
          disabled={loading}
          onClick={login}
        >
          {loading
            ? "Signing In..."
            : "Login"}
        </Button>

      </div>

    </div>
  );
}