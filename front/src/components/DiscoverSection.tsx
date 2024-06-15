import React from 'react';
import Image from 'next/image';

const DiscoverSection = () => {
  return (
    <>
      <h1 className="text-white font-bold text-2xl mt-4 mb-4 ml-8 text-left">
        DISCOVER
      </h1>

      <div className="gallery-container relative ml-4">
        <div
          className="images-container flex overflow-x-auto gap-4 scrollbar-hide"
          id="imagesContainer"
        >
          <div>
            <Image src="/images/energic.png" alt="" width="300" height="300" />
          </div>

          <div>
            <Image src="/images/indie.png" alt="" width="300" height="300" />
          </div>
          <div>
            <Image src="/images/jazz.png" alt="" width="300" height="300" />
          </div>
          <div>
            <Image src="/images/morning.png" alt="" width="300" height="300" />
          </div>
          <div>
            <Image src="/images/New.png" alt="" width="300" height="300" />
          </div>
          <div>
            <Image src="/images/peaceful.png" alt="" width="300" height="300" />
          </div>

          <div>
            <Image src="/images/popular.png" alt="" width="300" height="300" />
          </div>
          <div>
            <Image src="/images/recent.png" alt="" width="300" height="300" />
          </div>

          <div>
            <Image src="/images/trend.png" alt="" width="300" height="300" />
          </div>
          <div>
            <Image src="/images/energic.png" alt="" width="300" height="300" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscoverSection;
