"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function UserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "SALES",
  });

  function saveUser() {
    toast.success("User Created");

    setForm({
      name: "",
      email: "",
      password: "",
      role: "SALES",
    });
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Create User
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <Input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <Input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <Input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <select
          className="rounded-md border p-2"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >
          <option value="ADMIN">
            ADMIN
          </option>

          <option value="MANAGER">
            MANAGER
          </option>

          <option value="SALES">
            SALES
          </option>

          <option value="VIEWER">
            VIEWER
          </option>

        </select>

      </div>

      <Button
        className="mt-6 w-full"
        onClick={saveUser}
      >
        Create User
      </Button>

    </div>
  );
}