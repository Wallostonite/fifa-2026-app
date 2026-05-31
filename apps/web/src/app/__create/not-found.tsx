import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6 text-center">
      <p className="text-6xl font-bold text-[#FF415B] mb-2">404</p>
      <h1 className="text-xl font-semibold mb-2">Page not found</h1>
      <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-[#FF415B] hover:bg-[#e03550] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
