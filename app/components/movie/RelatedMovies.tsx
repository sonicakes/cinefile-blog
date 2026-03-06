import { useEffect, useState } from "react";
import { Link } from "react-router";

type RelatedMovie = {
  documentId: string;
  title: string;
  excerpt: string;
  img?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
    };
  };
};

type Props = {
  genres: { id: string; name: string }[];
  currentDocumentId: string;
};

const RelatedMovies = ({ genres, currentDocumentId }: Props) => {
  const [related, setRelated] = useState<RelatedMovie[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const strapiUrl = import.meta.env.VITE_STRAPI_URL;

  useEffect(() => {
    if (!genres.length) return;

    const params = new URLSearchParams();
    genres.forEach((g, i) =>
      params.append(`filters[genres][id][$in][${i}]`, g.id)
    );
    params.append("filters[documentId][$ne]", currentDocumentId);
    params.append("filters[review_provided][$eq]", "true");
    params.append("sort", "date_reviewed:desc");
    params.append("pagination[limit]", "3");
    params.append("populate", "img");

    fetch(`${apiUrl}/movies?${params}`)
      .then((r) => r.json())
      .then((json) => setRelated(json.data || []))
      .catch(() => {});
  }, [currentDocumentId]);

  const getImg = (movie: RelatedMovie) => {
    const raw =
      movie.img?.formats?.small?.url ||
      movie.img?.formats?.thumbnail?.url ||
      movie.img?.url;
    if (!raw) return null;
    return raw.startsWith("http") ? raw : `${strapiUrl}${raw}`;
  };

  return (
    <div>
      <div className="flex justify-between mb-5 border-y border-gray-300 items-center py-5">
        <h3 className="font-brawler tracking-wide uppercase font-semibold">Related Reviews</h3>
      </div>
      {related.length === 0 && (
        <p className="text-sm text-gray-400">No related reviews found.</p>
      )}
      {related.map((movie) => {
        const imgSrc = getImg(movie);
        return (
          <Link
            to={`/blog/${movie.documentId}`}
            key={movie.documentId}
            className="block mb-5 pb-4 border-b border-neutral-300 group cursor-pointer"
          >
            {imgSrc && (
              <img
                src={imgSrc}
                alt={movie.title}
                className="w-full h-28 object-cover grayscale group-hover:grayscale-0 transition duration-700"
              />
            )}
            <h4 className="group-hover:text-crimson transition duration-700 pt-1 font-semibold text-lg leading-tight font-brawler tracking-tight">
              {movie.title}
            </h4>
            {movie.excerpt && (
              <small className="text-neutral-500 text-xs line-clamp-2">
                {movie.excerpt}
              </small>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default RelatedMovies;
