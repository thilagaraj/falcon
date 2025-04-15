import { Icon } from '@iconify/react';
const items = [
  // Financial items - blue colors
  { icon: 'mdi:file-document', label: 'Bill Detail', bg: 'bg-info-gradient' },
  { icon: 'mdi:cash', label: 'Pay Advance', bg: 'bg-info' },

  // Service items - green colors
  { icon: 'mdi:food', label: 'View Menu', bg: 'bg-success-gradient' },
  { icon: 'mdi:bed', label: 'Extrabed Request', bg: 'bg-success' },
  { icon: 'mdi:room-service-outline', label: 'Facilities', bg: 'bg-success-600' },

  // Information items - purple/pink colors
  { icon: 'mdi:comment', label: 'Feedback', bg: 'bg-purple' },
  { icon: 'mdi:magnify', label: 'Enquiry Detail', bg: 'bg-indigo' },

  // Booking - orange/yellow color
  { icon: 'mdi:calendar-check', label: 'Reservation', bg: 'bg-warning-gradient' },
];
const ReportListPage = () => {
  return (
    <div>
      <header className="d-flex flex-column align-items-center bg-success p-3">
        <h1 className="fs-4 text-center text-white">Online Report List</h1>
      </header>
      <div className="container py-4 d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <div className="row g-4">
          {items.map((item, index) => (
            <div className="col-6 col-lg-3" key={index}>
              <div
                className={`py-4 px-3 d-flex flex-column justify-content-center align-items-center text-white rounded text-center ${item.bg}`}
                style={{
                  height: '120px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                <Icon icon={item.icon} width="48" />
                <div className="fs-5">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportListPage;
