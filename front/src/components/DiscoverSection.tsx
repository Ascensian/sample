import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 10,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 10,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 5,
  },
};

const DiscoverSection = () => (
  <>
    <h1
      style={{
        color: 'white',
        fontSize: '2rem',
        paddingLeft: '2rem',
        fontWeight: 'bold',
      }}
    >
      DISCOVER
    </h1>

    <div
      style={{
        paddingLeft: '2rem',
      }}
    >
      <Carousel responsive={responsive} itemClass="carousel-item-padding-10-px">
        <div>
          <img src="/images/energic.png" alt="" />
        </div>

        <div>
          <img src="/images/indie.png" alt="" />
        </div>
        <div>
          <img src="/images/jazz.png" alt="" />
        </div>
        <div>
          <img src="/images/morning.png" alt="" />
        </div>
        <div>
          <img src="/images/New.png" alt="" />
        </div>
        <div>
          <img src="/images/peaceful.png" alt="" />
        </div>

        <div>
          <img src="/images/popular.png" alt="" />
        </div>
        <div>
          <img src="/images/recent.png" alt="" />
        </div>

        <div>
          <img src="/images/trend.png" alt="" />
        </div>
        <div>
          <img src="/images/energic.png" alt="" />
        </div>

        <div>
          <img src="/images/indie.png" alt="" />
        </div>
        <div>
          <img src="/images/jazz.png" alt="" />
        </div>
        <div>
          <img src="/images/morning.png" alt="" />
        </div>
        <div>
          <img src="/images/New.png" alt="" />
        </div>
        <div>
          <img src="/images/peaceful.png" alt="" />
        </div>

        <div>
          <img src="/images/popular.png" alt="" />
        </div>
        <div>
          <img src="/images/recent.png" alt="" />
        </div>

        <div>
          <img src="/images/trend.png" alt="" />
        </div>
      </Carousel>
    </div>
  </>
);

export default DiscoverSection;
