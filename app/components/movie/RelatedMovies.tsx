import { useEffect, useState } from "react";
import { Link } from "react-router";
import Reveal from "~/components/ui/Reveal";

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
  mode?: "related" | "latest";
};

const RelatedMovies = ({ genres, currentDocumentId, mode = "related" }: Props) => {
  const [related, setRelated] = useState<RelatedMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const strapiUrl = import.meta.env.VITE_STRAPI_URL;

  useEffect(() => {
    setIsLoading(true);

    if (mode === "latest") {
      const params = new URLSearchParams();
      params.append("filters[review_provided][$eq]", "true");
      params.append("sort", "date_reviewed:desc");
      params.append("pagination[limit]", "3");
      params.append("populate", "img");
      fetch(`${apiUrl}/movies?${params}`)
        .then((r) => r.json())
        .then((json) => setRelated(json.data || []))
        .catch(() => {})
        .finally(() => setIsLoading(false));
      return;
    }

    if (!genres.length) {
      setIsLoading(false);
      return;
    }

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
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [currentDocumentId, mode]);

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
        <h3 className="font-brawler tracking-wide uppercase font-semibold">
        {mode === "latest" ? "Latest Reviews" : "Related Reviews"}
      </h3>
      </div>
      {!isLoading && related.length === 0 && (
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
              <Reveal groupHover>
                <img
                  src={imgSrc}
                  alt={movie.title}
                  className="w-full h-28 object-cover"
                />
              </Reveal>
            )}
            <h4 className="group-hover:text-crimson transition duration-700 pt-1 font-semibold text-lg leading-tight font-brawler tracking-tight capitalize">
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
