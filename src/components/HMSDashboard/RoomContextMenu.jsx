import PropTypes from 'prop-types';
import { CheckoutDetails } from '../../pages/CheckoutDetails';
import { Modal } from 'react-bootstrap';

const RoomContextMenu = ({
  showContextMenu,
  contextMenuPosition,
  contextMenuRef,
  onGuestInfoClick,
  showCheckoutModal,
  selectedRoom,
  onCloseModal
}) => {
  return (
    <>
      {/* Context Menu */}
      {showContextMenu && (
        <div
          ref={contextMenuRef}
          style={{
            position: 'fixed',
            left: contextMenuPosition.x,
            top: contextMenuPosition.y,
            zIndex: 1000,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            padding: '8px 0',
            minWidth: '120px'
          }}
        >
          <div
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#333',
              borderBottom: '1px solid #eee'
            }}
            onClick={onGuestInfoClick}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            Guest Info
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <Modal
        show={showCheckoutModal}
        onHide={onCloseModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Checkout Details</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          {selectedRoom && (
            <CheckoutDetails
              RoomNo={selectedRoom.RoomNo}
              onClose={onCloseModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

RoomContextMenu.propTypes = {
  showContextMenu: PropTypes.bool.isRequired,
  contextMenuPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  contextMenuRef: PropTypes.object.isRequired,
  onGuestInfoClick: PropTypes.func.isRequired,
  showCheckoutModal: PropTypes.bool.isRequired,
  selectedRoom: PropTypes.shape({
    RoomNo: PropTypes.string.isRequired,
  }),
  onCloseModal: PropTypes.func.isRequired,
};

export default RoomContextMenu;
