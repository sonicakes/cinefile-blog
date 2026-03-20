const PostDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="space-y-6 max-w-3xl mx-auto py-8">
        <div className="aspect-video bg-neutral-200 w-full rounded" />
        <div className="h-3 bg-neutral-200 w-1/3 rounded" />
        <div className="h-10 bg-neutral-200 w-3/4 rounded" />
        <div className="h-4 bg-neutral-200 w-full rounded" />
        <div className="space-y-3 pt-4">
          <div className="h-3 bg-neutral-200 w-full rounded" />
          <div className="h-3 bg-neutral-200 w-full rounded" />
          <div className="h-3 bg-neutral-200 w-5/6 rounded" />
          <div className="h-3 bg-neutral-200 w-full rounded" />
          <div className="h-3 bg-neutral-200 w-4/5 rounded" />
          <div className="h-3 bg-neutral-200 w-full rounded" />
          <div className="h-3 bg-neutral-200 w-2/3 rounded" />
        </div>
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
