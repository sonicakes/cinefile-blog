const FeaturedReviews = () => {
    return ( 
               <section className="reviews-grid">
          <div className="review-card red">
            <img src="./images/soni.jpg" alt="Review 1" />
            <h3>Beyond the front page</h3>
            <p>
              Film lady talks about <s>the Overlook</s> the Hydro Majestic Hotel
            </p>
            <button className="gothic-button">read more</button>
          </div>

          <div className="review-card yellow">
            <img src="./images/ozzz.jpg" alt="Review 2" />
            <h3>The cost of OZ-sploitation</h3>
            <p>
              Is the Wizard of OZ indeed Wonderful? Or is it all just clickbait?
            </p>
          </div>

          <div className="review-card pink">
            <img src="./images/wall.JPG" alt="Review 3" />
            <h3>Doppleganger or Dead Ringer?</h3>
            <p>
              Once I found a wall art that looks like me. Who/What else looks
              like me?
            </p>
          </div>

          <div className="review-card blue">
            <img src="./images/wednesday.JPG" alt="Review 4" />
            <h3>wow, wednesday woes</h3>
            <p>
              How the new skyline is changing the way we live and work in the
              city.
            </p>
          </div>
        </section>
     );
}
 
export default FeaturedReviews;