import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";
import { useRoomContextMenu } from '../../hook/useRoomContextMenu';
import RoomContextMenu from './RoomContextMenu';

const Floors = ({ data }) => {
  const {
    showCheckoutModal,
    selectedRoom,
    showContextMenu,
    contextMenuPosition,
    contextMenuRef,
    handleRoomClick,
    handleGuestInfoClick,
    closeModal
  } = useRoomContextMenu();

  // Status-to-style mapping
  const statusStyles = {
    O: {
      bg: "bg-custom-color2",
      text: "custom-color2",
    },
    V: {
      bg: "bg-custom-color1",
      text: "custom-color1",
    },
    D: {
      bg: "bg-custom-color3",
      text: "custom-color3",
    },
    U: {
      bg: "bg-custom-color6",
      text: "custom-color6",
    },
    B: {
      bg: "bg-custom-color4",
      text: "custom-color4",
    },
    M: {
      bg: "bg-custom-color5",
      text: "custom-color5",
    },
  };

  const statusMapping = {
    O: "Occupied",
    V: "Vacant",
    M: "Mangmnt",
    U: "Unsettled",
    D: "Dirty",
    B: "Blocked",
  };

  const toSentenceCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };



  return (
    <div className="flex flex-col gap-2 mt-1">
      <div className="card h-100 p-0 radius-12">
        <div
          className="card-header border-bottom bg-base py-16 px-24 cursor-pointer"
        >
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 ">
            <h6 className="text-lg fw-semibold mb-0 d-flex align-items-center gap-2">
              <span>
                <Icon
                  icon="carbon:hotel"
                  className="text-danger-800 text-lg mb-0"
                ></Icon>
              </span>
              <span> {toSentenceCase(data.FloorName)}</span>
            </h6>
        
          </div>
        </div>

          <div className="p-6">
            <div className="floors-grid gap-1">
              {data?.rooms?.map((room, index) => {
                const styles = statusStyles[room.Status] || statusStyles["D"];
                return (
                  <div key={index}>
                    <div className={`rounded-3 border-0 ${styles.bg} shadow-sm position-relative overflow-hidden`} 
                         style={{
                           transition: 'all 0.2s ease-in-out',
                           minHeight: '60px',
                           background: `linear-gradient(135deg, var(--${styles.bg.replace('bg-', '')}-100) 0%, var(--${styles.bg.replace('bg-', '')}-200) 100%)`,
                           cursor: room.Status === 'O' ? 'pointer' : 'default'
                         }}
                         onClick={(event) => handleRoomClick(room, event)}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.transform = 'translateY(-2px)';
                           e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.transform = 'translateY(0)';
                           e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                         }}>
                      {/* Decorative corner accent */}
                      <div className="position-absolute top-0 end-0" 
                           style={{
                             width: '20px',
                             height: '20px',
                             background: `var(--${styles.bg.replace('bg-', '')}-300)`,
                             clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)',
                             opacity: 0.3
                           }}></div>
                      
                      <div className="px-2 py-1 h-100 d-flex flex-column justify-content-between">
                        {/* Room Info Section */}
                        <div className="text-center">
                          <h6 className={`text-xs fw-bold mb-0 text-dark`} style={{fontSize: '11px', lineHeight: '1'}}>
                            {room.RoomNo}
                          </h6>
                          <div className={`text-xxs fw-semibold text-muted`} style={{
                            whiteSpace: 'nowrap',
                            fontSize: '9px',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase'
                          }}>
                            {room.RoomCode}
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="d-flex justify-content-center mt-0">
                          <span
                            className={`text-xxs fw-bold px-2 py-1 rounded-pill text-white`}
                            style={{
                              fontSize: '8px',
                              background: `var(--${styles.bg.replace('bg-', '')}-600)`,
                              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                              letterSpacing: '0.3px',
                              textTransform: 'uppercase'
                            }}
                          >
                            {statusMapping[room.Status]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      </div>

      <RoomContextMenu
        showContextMenu={showContextMenu}
        contextMenuPosition={contextMenuPosition}
        contextMenuRef={contextMenuRef}
        onGuestInfoClick={handleGuestInfoClick}
        showCheckoutModal={showCheckoutModal}
        selectedRoom={selectedRoom}
        onCloseModal={closeModal}
      />
    </div>
  );
};

Floors.propTypes = {
  data: PropTypes.shape({
    FloorName: PropTypes.string,
    rooms: PropTypes.arrayOf(PropTypes.shape({
      RoomNo: PropTypes.string,
      RoomCode: PropTypes.string,
      Status: PropTypes.string,
    })),
  }).isRequired,
};

export default Floors;
