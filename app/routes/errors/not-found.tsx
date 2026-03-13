import { data } from "react-router";

export function loader() {
  throw data(null, { status: 404 });
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <h1 className="font-brawler text-6xl font-bold text-dark">404</h1>
      <p className="mt-4 font-source text-xl text-dark/70">Page not found.</p>
    </div>
  );
}
