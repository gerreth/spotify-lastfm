/*
 * Image
 */
import React from 'react';
import { get } from 'lodash';
import VisibilitySensor from 'react-visibility-sensor';

class Img extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { status: 'constructed', src: get(props, 'image.small.url') };
  }

  componentDidUpdate() {}

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
    // console.log('error');
  };

  render() {
    const { src } = this.state;

    return (
      <VisibilitySensor partialVisibility delayedCall onChange={this.onChange}>
        <img src={src} />
      </VisibilitySensor>
    );
  }
}

export default Img;
