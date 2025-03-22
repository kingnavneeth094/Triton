import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Triton</h1>
        <Link 
          href="/sign-in"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign In
        </Link>
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Triton</h2>
        <p className="text-xl text-gray-600">Your Smart Building Management System</p>
      </div>
    </div>
  );
}
