import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full min-h-screen flex-col">
      <p className="italic">Afif Rohul</p>
      <Link href="/login" className="text-xs italic">Login</Link>
    </div>
  );
}
