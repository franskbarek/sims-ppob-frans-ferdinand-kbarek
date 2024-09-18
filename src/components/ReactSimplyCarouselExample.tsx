import React, { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';


interface Banner {
  banner_image: string;
  banner_name: string;
}

interface ReactSimplyCarouselExampleProps {
  banners: Banner[];
}

const ReactSimplyCarouselExample: React.FC<ReactSimplyCarouselExampleProps> = ({ banners }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  return (
    <div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 2,
            itemsToScroll: 2,
            minWidth: 768,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            style={{ width: 400, height: 100, background: '#fff' }}
          >
            <img
              src={banner.banner_image}
              alt={banner.banner_name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </ReactSimplyCarousel>
    </div>
  );
};

export default ReactSimplyCarouselExample;
