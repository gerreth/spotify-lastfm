/*
 * Image
 */
import React, { Component } from 'react';
import { get } from 'lodash';
import VisibilitySensor from 'react-visibility-sensor';

class Img extends Component {
  constructor(props) {
    super(props);

    this.state = { status: 'constructed', src: get(props, 'image.small.url') };
  }

  onChange = isVisible => {
    const status = this.state.status;

    if (status === 'initialized' || (status === 'constructed' && isVisible)) {
      this.loadLargeImage();
      this.setState({ status: 'loaded' });
    }
    // delayedCall not working properly?
    if (status === 'constructed') {
      this.setState({ status: 'initialized' });
    }
  };

  loadLargeImage = () => {
    const image = new Image();
    this.image = image;
    image.onload = this.onLoad;
    image.onerror = this.onError;
    image.src = this.props.image.large ? this.props.image.large.url : '';
  };

  onLoad = () => {
    this.setState({ src: this.image.src });
  };

  onError = () => {
    console.log('error loading larger version');
  };

  render() {
    const style = {
      background: 'red',
      backgroundImage: `url(${this.state.src})`,
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
      bottom: 0,
      left: 0,
      height: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      width: '100%',
    };

    return (
      <VisibilitySensor partialVisibility delayedCall onChange={this.onChange}>
        <div style={style} />
      </VisibilitySensor>
    );
  }
}

export default Img;
