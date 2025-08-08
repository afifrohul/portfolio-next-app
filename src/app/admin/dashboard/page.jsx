"use client";

import { SiteHeader } from "@/components/site-header";

export default function Dashboard() {
  return (
    <>
      <SiteHeader name="Dashboard" />
      <div className="p-4">
        <div className="border rounded-lg p-4">
          <p className="italic text-sm">Welcome to your dashboard!</p>
        </div>
      </div>
    </>
  );
}
