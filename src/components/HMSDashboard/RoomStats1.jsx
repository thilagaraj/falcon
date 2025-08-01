import { Row, Col } from 'react-bootstrap';

const StatusBar = ({ label, value, color }) => (
  <Col xs={4}>
    <div 
      className="d-flex align-items-center justify-content-center h-100 py-6" 
      style={{ 
        backgroundColor: color,
        color: 'white',
        textAlign: 'center',
      }}
    >
      <span className="fw-medium  px-1 " style={{ fontSize: '12px' }}>{label} ({value})</span>
    </div>
  </Col>
);

const RoomStats1 = ({ data }) => {
  if (!data) return null;
  const { Vacant, Occupied, Unsettled, Dirty, Blocked, ManagementBlocked } = data;

  const total = Vacant + Occupied + Dirty + Blocked + Unsettled + ManagementBlocked;
  const occPercentage = ((Occupied / total) * 100).toFixed(2);

  const rows = [
    // First Row
    [
      { label: 'Vacant', value: Vacant, color: '#4CAF50' },
      { label: 'Occupied', value: Occupied, color: '#F44336' },
      { label: 'Dirty', value: Dirty, color: '#757575' }
    ],
    // Second Row
    [
      { label: 'Blocked', value: Blocked, color: '#FFB74D' },
      { label: 'Un-Settel', value: Unsettled, color: '#9E9D24' },
      { label: 'Mgment', value: ManagementBlocked, color: '#2196F3' }
    ],
    // Bottom Row
    [
      { label: 'OCC %', value: occPercentage, color: '#5d4037' },
      { label: 'TodayCin', value: '0', color: '#bf360c' },
      { label: 'TodayCout', value: '0', color: '#616161' }
    ]
  ];

  return (
    <>
      <div className="bg-base py-16 px-2">
        <h6 className="text-lg fw-semibold mb-0">HMS Dashboard</h6>
      </div>
        <div className="d-flex flex-column gap-2">
          {rows.map((row, rowIndex) => (
            <Row key={rowIndex} className='mt-1'>
              {row.map((stat, index) => (
                <StatusBar key={index} {...stat} />
              ))}
            </Row>
          ))}
        </div>
    </>
  );
};

export default RoomStats1;
