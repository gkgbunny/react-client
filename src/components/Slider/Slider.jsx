import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRandomNumber, getNextRoundRobin } from '../../libs/utils/math';
import { DEFAULT_BANNER_IMAGE } from '../../configs/constants';

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
    const source = (banners) ? banners[index] : defaultBanner;
    return (
      <div>
        <img src={source} alt={altText} height={height} {...rest} />
      </div>
    );
  }
}

Slider.propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.arrayOf(PropTypes.string),
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
