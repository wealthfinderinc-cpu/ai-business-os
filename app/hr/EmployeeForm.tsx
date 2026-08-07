"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EmployeeForm() {
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    designation: "",
    department: "",
    mobile: "",
    email: "",
    salary: "",
  });

  function saveEmployee() {
    toast.success("Employee Saved");

    setForm({
      employeeId: "",
      fullName: "",
      designation: "",
      department: "",
      mobile: "",
      email: "",
      salary: "",
    });
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Add Employee
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <Input
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={(e)=>
            setForm({...form,employeeId:e.target.value})
          }
        />

        <Input
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e)=>
            setForm({...form,fullName:e.target.value})
          }
        />

        <Input
          placeholder="Designation"
          value={form.designation}
          onChange={(e)=>
            setForm({...form,designation:e.target.value})
          }
        />

        <Input
          placeholder="Department"
          value={form.department}
          onChange={(e)=>
            setForm({...form,department:e.target.value})
          }
        />

        <Input
          placeholder="Mobile"
          value={form.mobile}
          onChange={(e)=>
            setForm({...form,mobile:e.target.value})
          }
        />

        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e)=>
            setForm({...form,email:e.target.value})
          }
        />

        <Input
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={(e)=>
            setForm({...form,salary:e.target.value})
          }
        />

      </div>

      <Button
        className="mt-6 w-full"
        onClick={saveEmployee}
      >
        Save Employee
      </Button>

    </div>
  );
}