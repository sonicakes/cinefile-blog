const BlogCardSkeleton = ({ classExtra = "" }: { classExtra?: string }) => {
  return (
    <div className={`flex flex-col gap-4 p-4 border border-neutral-200 rounded-lg animate-pulse ${classExtra}`}>
      {/* Image Placeholder */}
      <div className="w-full aspect-video bg-neutral-200 rounded-md" />
      
      <div className="space-y-3">
        {/* Title Placeholder */}
        <div className="h-6 bg-neutral-300 w-3/4 rounded" />
        
        {/* Metadata (Rating/Year) Placeholder */}
        <div className="flex gap-2">
          <div className="h-4 bg-neutral-200 w-12 rounded" />
          <div className="h-4 bg-neutral-200 w-12 rounded" />
        </div>
        
        {/* Excerpt/Body Placeholder */}
        <div className="space-y-2">
          <div className="h-3 bg-neutral-200 w-full rounded" />
          <div className="h-3 bg-neutral-200 w-5/6 rounded" />
        </div>
      </div>

      {/* Tags/Genres Placeholder */}
      <div className="flex gap-2 mt-auto pt-4">
        <div className="h-5 bg-neutral-100 w-16 rounded-full" />
        <div className="h-5 bg-neutral-100 w-16 rounded-full" />
      </div>
    </div>
  );
};

const BlogPageSkeleton = () => {
  return (
    <div className="flex flex-col">
      {/* Filter Bar Skeleton */}
      <section className="py-4 md:px-4 border-b border-neutral-300 flex flex-col gap-4 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <div className="h-10 bg-neutral-200 rounded-md w-full" />
          <div className="h-10 bg-neutral-200 rounded-md w-32 md:justify-self-end" />
        </div>
        <div className="flex gap-2">
           {[1, 2, 3, 4].map((i) => (
             <div key={i} className="h-6 bg-neutral-200 w-20 rounded-full" />
           ))}
        </div>
      </section>

      {/* Grid Skeleton - Matches your grid-flow-dense logic */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 md:p-4 grid-flow-dense">
        {[...Array(6)].map((_, index) => (
          <BlogCardSkeleton 
            key={index} 
            classExtra={index % 3 === 0 ? "md:col-span-2" : "md:col-span-1"} 
          />
        ))}
      </section>
    </div>
  );
};

export default BlogPageSkeleton;