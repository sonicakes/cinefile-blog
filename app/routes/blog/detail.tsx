import ReactMarkdown from "react-markdown";
import type { Route } from "./+types";
import type { PostMeta } from "~/types";
import { Link } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;
  const url = new URL("/movies.json", request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error("Failed to fetch data");

  const index = await res.json();
  const postMeta = index.find((post: PostMeta) => post.slug === slug);

  if (!postMeta) throw new Response("not found", { status: 404 });

  //dynamically import the raw markdown
  //the name of posts md file should match the slug names exactly
  const markdown = await import(`/posts/${slug}.md?raw`);

  return {
    postMeta,
    markdown: markdown.default,
  };
}

type BlogPostDetailsPageProps = {
  loaderData: {
    postMeta: PostMeta;
    markdown: string;
  };
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { postMeta, markdown } = loaderData;
  return (
    <>
      {/* <header className="detail-header">
        <a href="#" className="masthead">
          The Cinefile Blog
        </a>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/blog">Film Reviews</Link> /{" "}
          {postMeta.title}
        </div>
      </header> */}


      <div className="article-container">
        <article className="main-content">
          <div className="article-header">
            <div className="article-meta">
              Published by Film Lady | 5 Minute Read
            </div>
          </div>

          <img
            src={postMeta.image}
            alt="Atmospheric Cinema"
            className="w-full grayscale"
          />
          <p className="caption">
            A scene from the latest psychological thriller to sweep the nation.
            Photo: Associated Press.
          </p>

          <div className="full-text drop-cap">
            <div className="max-w-none mb-12 prose">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>

                 <button className="inline-block text-dark hover:text-crimson transition duration-300 border-gray-600 hover:border-crimson border-t border-b border-dotted cursor-pointer tracking-wider font-gothic text-2xl hover:scale-110 mt-6">back to all reviews</button>

        </article>

        <aside className="related-sidebar">
          <h3>Recent Stories</h3>

          <div className="mini-card">
            <img src="./soni.jpg" alt="Review" />
            <h4>Beyond the front page: The Hydro Majestic</h4>
            <p>
              <small>The history of the Overlook's cousin...</small>
            </p>
          </div>

          <div className="mini-card">
            <img src="./wednesday.JPG" alt="Review" />
            <h4>Wednesday Woes</h4>
            <p>
              <small>Why mid-week cinema is dying...</small>
            </p>
          </div>

          <div className="mini-card">
            <img src="./oz-landscape.jpg" alt="Review" />
            <h4>The Cost of Oz-Sploitation</h4>
            <p>
              <small>Revisiting the classNameics of the outback...</small>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
};

export default BlogPostDetailsPage;
