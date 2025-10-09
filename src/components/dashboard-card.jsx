export default function DashboardCard({ icon, title, count, desc }) {
  return (
    <div className="space-y-2 border p-4 rounded-lg">
      <div className="flex gap-2 items-center">
        {icon}
        <p className="italic text-sm">{title}</p>
      </div>
      <div>
        <h1 className="text-4xl font-semibold">{count}</h1>
      </div>
      <div>
        <p className="italic text-sm">{desc}</p>
      </div>
    </div>
  );
}
