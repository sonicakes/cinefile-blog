import React from 'react';
import { Link } from 'react-router';

const FeaturedBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Your Toto doesn't have to be perfect",
      category: "ESSAY",
      image: "./images/toto.jpg",
      span: "md:col-span-2 md:row-span-2",
      special: true,
      url: "/blog/bringing-up-baby",
      excerpt: "Film Lady explains the new rules of admittance to the land of OZ: dogs of all sizes and breeds are accepted now."
    },
    {
      id: 2,
      title: "Why does Film Lady like to be Scared?",
      category: "AESTHETIC",
      image: "./images/scare.jpg",
      span: "md:col-span-1 md:row-span-1",
      url: "/blog/the-music-man",
    },
    {
      id: 3,
      title: "Film Lady's Obsession with Doubles",
      category: "DIRECTOR SPOTLIGHT",
      image: "./images/wall.JPG",
      span: "md:col-span-1 md:row-span-1",
      url: "/blog/court-jester",
    },
    {
      id: 4,
      title: "Wednesday Woeful: Love at First Fright",
      category: "HOT TAKE",
      image: "./images/wednesday.JPG",
      span: "md:col-span-3 md:row-span-1",
      url: "/blog/mulholland-drive",
      horizontal: true,
      excerpt: "My love for little evil Wednesday and her 2 black braids caught me unabashed."

    }
  ];

  return (
    <section className="mt-12 border-t-2 border-dark pt-8">
      <h3 className="font-brawler text-4xl mb-6 uppercase tracking-widest">Featured Reviews</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link to={blog.url}       key={blog.id}  className={`group cursor-pointer border border-neutral-600 p-4 transition-all hover:border-black ${blog.span} flex flex-col`}>
            <div className={`overflow-hidden mb-4 ${blog.horizontal ? 'md:flex md:gap-6 items-center' : ''}`}>
              <img 
                src={blog.image} 
                alt={blog.title}
                className={`w-full grayscale group-hover:grayscale-0 transition-all duration-700 object-cover ${blog.special ? 'h-130' : ''} ${blog.horizontal && !blog.special ? 'md:w-1/2 h-64' : 'h-48'}`}
              />
              <div className={blog.horizontal ? 'md:w-1/2' : ''}>
                <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-bold border-b border-crimson mb-2 inline-block">
                  {blog.category}
                </span>
                <h4 className="font-brawler tracking-tight font-bold text-2xl leading-tight group-hover:text-crimson transition-colors capitalize">
                  {blog.title}
                </h4>
                {blog.excerpt && (
                  <p className="text-sm text-neutral-700 mt-2 italic">
                    {blog.excerpt}
                  </p>
                )}
              </div>
            </div>
          </Link>
        
        ))}
      </div>
    </section>
  );
};

export default FeaturedBlogs;