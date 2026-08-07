"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function register() {
    setLoading(true);

    const res = await fetch(
      "/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    setLoading(false);

    if (!res.ok) {
      toast.error(
        "Registration Failed"
      );
      return;
    }

    toast.success(
      "Account Created"
    );

    router.push("/login");
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

      <h1 className="mb-6 text-center text-3xl font-bold">
        Create Account
      </h1>

      <div className="space-y-4">

        <Input
          placeholder="Full Name"
          value={form.name}
          onChange={(e)=>
            setForm({
              ...form,
              name:e.target.value
            })
          }
        />

        <Input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value
            })
          }
        />

        <Input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e)=>
            setForm({
              ...form,
              password:e.target.value
            })
          }
        />

        <Button
          className="w-full"
          disabled={loading}
          onClick={register}
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </Button>

      </div>

    </div>
  );
}