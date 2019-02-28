import React from 'react';
import { Slider } from '../../components';
import {
  PUBLIC_IMAGE_FOLDER,
  DEFAULT_BANNER_IMAGE,
} from '../../configs/constants';

const SliderDemo = () => {
  const banners = [
    `${PUBLIC_IMAGE_FOLDER}/cloud.jpg`,
    `${PUBLIC_IMAGE_FOLDER}/default.png`,
    `${PUBLIC_IMAGE_FOLDER}/dns-server.png`,
    `${PUBLIC_IMAGE_FOLDER}/full-stack-web-development.jpg`,
    `${PUBLIC_IMAGE_FOLDER}/full-stack.jpg`,
    `${PUBLIC_IMAGE_FOLDER}/load-balancer.png`,
  ];
  return (
    <div style={{ textAlign: 'center' }}>
      <Slider
        altText="image"
        banners={banners}
        duration={2000}
        random={false}
        defaultBanner={DEFAULT_BANNER_IMAGE}
      />
    </div>
  );
};
export default SliderDemo;
