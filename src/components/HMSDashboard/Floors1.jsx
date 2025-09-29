import PropTypes from 'prop-types';
import { useRoomContextMenu } from '../../hook/useRoomContextMenu';
import RoomContextMenu from './RoomContextMenu';

const Floors1 = ({ data }) => {
  const {
    showCheckoutModal,
    showHouseGuestModal,
    showExtraPaxModal,
    selectedRoom,
    showContextMenu,
    contextMenuPosition,
    contextMenuRef,
    handleRoomClick,
    handleGuestInfoClick,
    handleHouseGuestClick,
    handleExtraPaxClick,
    closeModal
  } = useRoomContextMenu();


  const roomTypeStyles = {
    O: {
      style: { backgroundColor: "#F44336" },
    },
    V: {
      style: { backgroundColor: "#4CAF50" },
    },
    D: {
      style: { backgroundColor: "#757575" },
    },
    U: {
      style: { backgroundColor: "#9E9D24" },
    },
    B: {
      style: { backgroundColor: "#FF9800" },
    },
    M: {
      style: { backgroundColor: "#2196F3" },
    },
  };

  return (
    <>     
    <div className="mt-2 py-4 ">

      <h4 className="mb-6 mt-6 text-xxs">{data.FloorName}</h4>
      <div className="d-flex flex-wrap gap-1">
        {data?.rooms?.map((room, index) => {
          const roomType = room.Status || "D";
          const styles = roomTypeStyles[roomType];
          return (
            <div 
                key={index} 
                className="room-container" 
                onClick={(event) => handleRoomClick(room, event)}
                style={{ cursor: room.Status === 'O' ? 'pointer' : 'default' }}
              >
                <div className={`border-0 `} style={styles.style}>
                  <div className=" py-2 px-1">
                    <div
                      className="text-center text-white text-xxs"
                    >
                      <div className={`${styles.text}`}>{room.RoomNo}</div>
                      <div className={`${styles.text}`}>{room.RoomDesc}</div>
                    </div>
                  </div>
                </div>
              </div>
          );
        })}
      </div>
    </div>
     <hr className="mt-2" />

      <RoomContextMenu
        showContextMenu={showContextMenu}
        contextMenuPosition={contextMenuPosition}
        contextMenuRef={contextMenuRef}
        onGuestInfoClick={handleGuestInfoClick}
        onHouseGuestClick={handleHouseGuestClick}
        onExtraPaxClick={handleExtraPaxClick}
        showCheckoutModal={showCheckoutModal}
        showHouseGuestModal={showHouseGuestModal}
        showExtraPaxModal={showExtraPaxModal}
        selectedRoom={selectedRoom}
        onCloseModal={closeModal}
      />
    </>
  );
};

Floors1.propTypes = {
  data: PropTypes.shape({
    FloorName: PropTypes.string.isRequired,
    rooms: PropTypes.arrayOf(PropTypes.shape({
      RoomNo: PropTypes.string.isRequired,
      RoomDesc: PropTypes.string,
      Status: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default Floors1;
