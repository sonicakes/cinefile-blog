import { data } from "react-router";
import { Link } from "react-router";

export function loader() {
  return data(null, { status: 404 });
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <p className="font-brawler text-sm uppercase tracking-widest text-crimson mb-4">404</p>
      <div className="w-full max-w-md border-y-4 border-double border-dark py-4 mb-6">
        <h1 className="font-brawler text-5xl font-bold uppercase tracking-wide text-dark">
          Reel Not Found
        </h1>
      </div>
      <p className="font-source text-lg text-dark/70 mb-8">
        The page you requested could not be located.
      </p>
      <Link
        to="/"
        className="inline-block text-dark hover:text-crimson transition duration-700 border-gray-600 hover:border-crimson border-t border-b border-dotted tracking-wider font-gothic text-2xl hover:scale-110 mt-6"
      >
        back to front page
      </Link>
    </div>
  );
}
