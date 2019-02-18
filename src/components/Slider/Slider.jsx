import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from '../../configs/constants';
import { getRandomNumber, getNextRoundRobin } from '../../libs/utils/math';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  componentDidMount() {
    const { random, duration } = this.props;
    this.interval = setInterval(() => {
      const { index } = this.state;
      let value;
      if (random) {
        value = getRandomNumber(6);
      } else {
        value = getNextRoundRobin(6, index);
      }
      this.setState({
        index: value,
      });
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      altText,
      banners,
      defaultBanner,
      height,
      ...rest
    } = this.props;
    const { index } = this.state;
    const banner = [
      `${PUBLIC_IMAGE_FOLDER}/cloud.jpg`,
      `${PUBLIC_IMAGE_FOLDER}/default.png`,
      `${PUBLIC_IMAGE_FOLDER}/dns-server.png`,
      `${PUBLIC_IMAGE_FOLDER}/full-stack-web-development.jpg`,
      `${PUBLIC_IMAGE_FOLDER}/full-stack.jpg`,
      `${PUBLIC_IMAGE_FOLDER}/load-balancer.png`,
    ];
    const source = (banners) ? banner[index] : defaultBanner;
    return (
      <div>
        <img src={source} alt={altText} height={height} {...rest} />
      </div>
    );
  }
}

Slider.propTypes = {
  altText: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  banners: PropTypes.array,
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};
Slider.defaultProps = {
  altText: 'Default Banner',
  banners: [],
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
};
export default Slider;
