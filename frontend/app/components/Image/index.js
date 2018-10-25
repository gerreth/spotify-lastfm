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
        {status !== 'large' && (
          <div>
            <img
              src={image && image.small && image.small.url}
              onLoad={this.handleImageLoaded.bind(this, 'small')}
            />
          </div>
        )}
        {(status === 'large' || status === 'small') && (
          <img
            src={image && image.large && image.large.url}
            onLoad={this.handleImageLoaded.bind(this, 'large')}
          />
        )}
      </div>
    );
  }
}

export default Img;
