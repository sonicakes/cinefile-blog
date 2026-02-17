const RelatedBlogs = () => {
    return ( 
            <div>
        <div className="flex justify-between mb-5 border-y border-gray-300 items-center py-5">
          <h3 className="font-brawler tracking-wide uppercase">
            Related Blogs
          </h3>
        </div>
        <div className="mini-card">
          <img src="/images/soni.jpg" alt="Review" />
          <h4>Beyond the front page: The Hydro Majestic</h4>
          <p>
            <small>The history of the Overlook's cousin...</small>
          </p>
        </div>
        <div className="mini-card">
          <img src="/images/wednesday.JPG" alt="Review" />
          <h4>Wednesday Woes</h4>
          <p>
            <small>Why mid-week cinema is dying...</small>
          </p>
        </div>
        <div className="mini-card">
          <img src="/images/piano.jpg" alt="Review" />
          <h4>The Cost of Oz-Sploitation</h4>
          <p>
            <small>Revisiting the classNameics of the outback...</small>
          </p>
        </div>
      </div>
     );
}
 
export default RelatedBlogs;