import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'


class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false
    }
    this.toggleImage = this.toggleImage.bind(this);
  }


  toggleImage = () => {

    console.log(`Clicking: ${this.state.showPopUp}`);
    this.setState(state => ({
      showPopUp: !state.showPopUp
    }));
  }

  render() {
    return (
      <>
        <img className={this.props.css} src={this.props.src} alt="" onClick={this.toggleImage} />
        {this.state.showPopUp ?
          <Modal show={true}
            onHide={this.toggleImage}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>

              <img className="image-popup" src={this.props.src} alt="" onClick={this.toggleImage}  />

            </Modal.Body>
          </Modal>
          : null
        }
      </>
    )
  }

}

export default ImageView