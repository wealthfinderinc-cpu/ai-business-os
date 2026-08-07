"use client";

import React, { useEffect, useState } from 'react';
import { Employee } from '@/types/hr';
import { HRService } from '@/services/hr.service';
import { Button } from '@/components/ui/Button';

export default function EmployeesManager() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    HRService.listEmployees().then(r => setEmployees(r || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Employees</h3>
        <Button onClick={() => alert('Add employee')}>New</Button>
      </div>

      <div className="mt-3">
        {loading ? <div className="skeleton h-24" /> : (
          <ul className="space-y-2 text-sm">
            {employees.slice(0,8).map(emp => (
              <li key={emp.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{emp.firstName} {emp.lastName}</div>
                  <div className="text-xs text-slate-500">{emp.designation} · {emp.department}</div>
                </div>
                <div className="text-xs text-slate-400">{emp.email}</div>
              </li>
            ))}
            {employees.length === 0 && <li className="text-slate-400">No employees</li>}
          </ul>
        )}
      </div>
    </div>
  );
}
