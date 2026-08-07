"use client";

export default function AudienceFilter() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-4 text-xl font-bold">
        Audience Filter
      </h2>

      <select className="w-full rounded-md border p-2">
        <option>All Customers</option>
        <option>Hot Leads</option>
        <option>Cold Leads</option>
        <option>Existing Customers</option>
        <option>Inactive Customers</option>
      </select>

    </div>
  );
}