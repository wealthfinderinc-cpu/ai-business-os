"use client";

import React, { useEffect, useState } from 'react';
import { AttendanceRecord } from '@/types/hr';
import { HRService } from '@/services/hr.service';

export default function AttendanceManager() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    HRService.listAttendance().then(r => setRecords(r || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Attendance</h3>
        <div className="text-xs text-slate-500">Today</div>
      </div>

      <div className="mt-3">
        {loading ? <div className="skeleton h-24" /> : (
          <ul className="space-y-2 text-sm">
            {records.slice(0,8).map(r => (
              <li key={r.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.employeeId}</div>
                  <div className="text-xs text-slate-500">{r.status}</div>
                </div>
                <div className="text-xs text-slate-400">{r.date}</div>
              </li>
            ))}
            {records.length === 0 && <li className="text-slate-400">No attendance records</li>}
          </ul>
        )}
      </div>
    </div>
  );
}
