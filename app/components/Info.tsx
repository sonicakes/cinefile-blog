const Info = ({
  postDate,
  readTime,
  wordCount,
}: {
  postDate?: string;
  readTime?: string;
  wordCount?: number;
}) => {
  return (
    <div className=" text-gray-600 uppercase tracking-widest py-3 text-sm font-medium font-brawler mb-5 border-t-dark border-b-gray-300 border-t-2 border-b ">
      {postDate && <span>Published {new Date(postDate).toDateString()} </span>}
      {readTime && (
        <>
          <span> | </span>
          <span>{readTime}</span>
        </>
      )}
      {wordCount && (
        <>
          <span> | </span>
          <span> ~ {wordCount} words</span>
        </>
      )}
    </div>
  );
};

export default Info;
