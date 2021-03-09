import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';



// figure out how to import to PokemonList and be bale to call openModal() from there. saying Cannot read property '_modal' of undefined
// once you figure that out figure out how to link which item you're clicking on and link it to the correct key so that it shows the correct Pokemon





const customStyles = {
content : {
top                   : '50%',
left                  : '50%',
right                 : 'auto',
bottom                : 'auto',
marginRight           : '-50%',
transform             : 'translate(-50%, -50%)'
}
};

class pokemodal extends React.Component {
    constructor() {
    super();

    this.state = {
    modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
    this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
    }

    closeModal() {
    this.setState({modalIsOpen: false});
    }

    render() {
    return (
    <div>
        {/* <button onClick={this.openModal}>Open Modal</button> */}
        <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        >

        <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
        <button onClick={this.closeModal}>close</button>
        <div>I am a modal</div>
        <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
        </form>
        </Modal>
    </div>
);
}
}

export default pokemodal