import PropTypes from "prop-types";
import { CheckoutDetails } from "../../pages/CheckoutDetails";
import { Modal } from "react-bootstrap";
import HouseGuestForm from "../Form/HouseGuestForm";
import ExtraPaxForm from "../Form/ExtraPaxForm";
import GracePeriodForm from "../Form/GracePeriodForm";


const RoomContextMenu = ({
  showContextMenu,
  contextMenuPosition,
  contextMenuRef,
  onGuestInfoClick = () => {},
  onHouseGuestClick = () => {},
  onExtraPaxClick = () => {},
  onGracePeriodClick = () => {},
  showCheckoutModal,
  showHouseGuestModal,
  showExtraPaxModal,
  showGracePeriodModal,
  selectedRoom,
  onCloseModal,
}) => {
  return (
    <>
      {/* Context Menu */}
      {showContextMenu && (
        <div
          ref={contextMenuRef}
          style={{
            position: "fixed",
            left: contextMenuPosition.x,
            top: contextMenuPosition.y,
            zIndex: 1000,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            padding: "8px 0",
            minWidth: "120px",
          }}
        >
          <div
            className="context-menu-item cursor-pointer"
            onClick={onGuestInfoClick}
          >
            Guest Info
          </div>
          <div
            className="context-menu-item cursor-pointer"
            onClick={onHouseGuestClick}
          >
            House Guest
          </div>
          <div
            className="context-menu-item cursor-pointer"
            onClick={onExtraPaxClick}
          >
            Extra Pax
          </div>
          <div
            className="context-menu-item cursor-pointer"
            onClick={onGracePeriodClick}
          >
            Grace Period
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <Modal show={showCheckoutModal} onHide={onCloseModal} size="lg" centered>
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

      <Modal show={showHouseGuestModal} onHide={onCloseModal} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <HouseGuestForm roomNo={selectedRoom?.RoomNo} onSave={onCloseModal} />
        </Modal.Body>
      </Modal>

      <Modal show={showExtraPaxModal} onHide={onCloseModal} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ExtraPaxForm roomNo={selectedRoom?.RoomNo} onSave={onCloseModal} />
        </Modal.Body>
      </Modal>

      <Modal show={showGracePeriodModal} onHide={onCloseModal} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <GracePeriodForm roomNo={selectedRoom?.RoomNo} onSave={onCloseModal} />
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
  onHouseGuestClick: PropTypes.func,
  onExtraPaxClick: PropTypes.func.isRequired,
  onGracePeriodClick: PropTypes.func.isRequired,
  showHouseGuestModal: PropTypes.bool,
  showExtraPaxModal: PropTypes.bool,
  showGracePeriodModal: PropTypes.bool,
  showCheckoutModal: PropTypes.bool.isRequired,
  selectedRoom: PropTypes.shape({
    RoomNo: PropTypes.string.isRequired,
  }),
  onCloseModal: PropTypes.func.isRequired,
};

export default RoomContextMenu;
