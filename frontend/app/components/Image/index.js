/*
 * Image
 */
import React from 'react';

class Img extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { status: 'loading' };
  }

  handleImageLoaded(type) {
    this.setState({ status: type });
  }

  render() {
    const { image } = this.props;

    const { status } = this.state;

    return (
      <div>
        <img
          style={{ display: status === 'loading' ? 'block' : 'none' }}
          src={image && image.small && image.small.url}
          onLoad={this.handleImageLoaded.bind(this, 'small')}
        />
        <img
          style={{ display: status === 'large' ? 'block' : 'none' }}
          src={image && image.large && image.large.url}
          onLoad={this.handleImageLoaded.bind(this, 'large')}
        />
      </div>
    );
  }
}

export default Img;
