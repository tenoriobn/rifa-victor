/* eslint-disable react/prop-types */
import styled from "styled-components"

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .5);
  z-index: 99;
  width: 100%;
  height: 100vh;

  .modal-content {
    width: 100%;
    max-width: 350px;
    border-radius: 5px;
    background-color: #2e2e36;
    margin: 0 1rem;
  }

  .modal-header {
    padding: 15px;
    background-color: #111;
    border-bottom: 1px solid #000;
    height: 80px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }

  h2 {
    font-size: 1.5em;
    font-weight: 500;
  }

  .close-button {
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;
    box-sizing: border-box;
    transition: all .3s ease-in-out;
  }

  .close-button:hover {
    opacity: .8;
  }

  .body-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem 1rem .375rem 1rem;
  }
`;

export default function Modal({ title, children, openState, setOpenState }) {
  return (
    openState && (
      <ModalContainer>
        <div className="modal-content">
          <div className="modal-header">
            <h2 id="modalTitulo">{title}</h2>

            <button className="close-button" onClick={() => setOpenState(false)}>
              <i className="fa fa-times"></i>
            </button>
          </div>

          <div className="modal-body">
            <div className="body-container">
              {children}
            </div>
          </div>
        </div>
      </ModalContainer>
    )
  );
}
