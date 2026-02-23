const BlogDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-10 bg-neutral-100 border-b border-t border-neutral-300 mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 py-4">
        <div className="space-y-6">
          <div className="h-12 bg-neutral-200 w-3/4 rounded" /> {/* Title */}
          <div className="aspect-video bg-neutral-200 w-full rounded" />{" "}
          {/* Hero Image */}
          <div className="space-y-3">
            <div className="h-4 bg-neutral-200 w-full rounded" />
            <div className="h-4 bg-neutral-200 w-full rounded" />
            <div className="h-4 bg-neutral-200 w-2/3 rounded" />
          </div>
        </div>
        {/* Sidebar Skeleton */}
        <div className="space-y-4">
          <div className="h-64 bg-neutral-100 rounded" />
          <div className="h-32 bg-neutral-100 rounded" />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSkeleton;
