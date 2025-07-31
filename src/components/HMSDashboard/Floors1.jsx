const Floors1 = ({ data, floorIndex }) => {
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
    <div className="mt-2 px-2 py-4 ">

      <h4 className="mb-6 mt-6 text-xxs">{data.FloorName}</h4>
      <div className="d-flex flex-wrap gap-1">
        {data?.rooms?.map((room, index) => {
          const roomType = room.Status || "D";
          const styles = roomTypeStyles[roomType];
          return (
            <div key={index} className="room-container">
              <div className={`border-0 `} style={styles.style}>
                <div className=" py-2 px-2">
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
</>
  );
};

export default Floors1;
