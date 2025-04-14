import { Icon } from '@iconify/react';

const ReportListPage = () => {
  const items = [
    { icon: 'mdi:file-document', label: 'Bill Detail', bg: 'bg-primary' },
    { icon: 'mdi:cash', label: 'Pay Advance', bg: 'bg-success' },
    { icon: 'mdi:food', label: 'View Menu', bg: 'bg-danger' },
    { icon: 'mdi:bed', label: 'Extrabed Request', bg: 'bg-warning' },
    { icon: 'mdi:comment', label: 'Feedback', bg: 'bg-pink' },
    { icon: 'mdi:room-service-outline', label: 'Facilities', bg: 'bg-dark' },
    { icon: 'mdi:magnify', label: 'Enquiry Detail', bg: '', customBg: '#808000' },
    { icon: 'mdi:calendar-check', label: 'Reservation', bg: 'bg-primary' },
  ];

  return (
    <div>
      <header className="d-flex flex-column align-items-center bg-success text-white p-3">
        <h1 className="fs-5 text-center">Online Report List</h1>
      </header>
      <div className="container py-4 d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <div className="row g-4">
          {items.map((item, index) => (
            <div className="col-6" key={index}>
              <div
                className={`p-4  d-flex flex-column justify-content-center align-items-center text-white rounded ${item.bg}`}
                style={{ height: '120px', backgroundColor: item.customBg  }}
              >
                <Icon icon={item.icon} width="48" />
                <div style={{ marginTop: '10px' }}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportListPage;
