import { Icon } from '@iconify/react';
import {useState} from 'react';

const items = [
  { icon: 'mdi:file-document', label: 'Guest Bill Detail', bg: 'bg-success-gradient' },
  { icon: 'mdi:cash', label: 'Pay Advance', bg: 'bg-success-gradient' },
  { icon: 'mdi:food', label: 'View Menu', bg: 'bg-success-gradient' },
  { icon: 'mdi:bed', label: 'Extrabed Request', bg: 'bg-success-gradient' },
  { icon: 'mdi:comment', label: 'Feedback', bg: 'bg-success-gradient' },
  { icon: 'mdi:room-service-outline', label: 'Facilities', bg: 'bg-success-gradient' },
  { icon: 'mdi:magnify', label: 'Enquiry Detail', bg: 'bg-success-gradient' },
  { icon: 'mdi:calendar-check', label: 'Reservation', bg: 'bg-success-gradient' },
];
const ReportListPage = () => {
  const [name, setName] = useState('Mr. Vinoth');
  return (
    <>
      <div className="d-flex flex-column align-items-center" style={{
        background: 'linear-gradient(135deg, #8252e9 0%, #a485fd 100%)',
        padding: '2.5rem 1rem'
      }}>
        <h1 className="fs-4 text-center text-white mb-3" style={{ maxWidth: '600px' }}>
          Warm greeting {name}</h1>
      </div>
      <div className="container py-4 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <div className="row g-4">
          {items.map((item, index) => (
            <div className="col-6 col-lg-3" key={index}>
              <div
                className={`py-4 px-3 d-flex flex-column justify-content-center align-items-center text-white text-center ${item.bg}`}
                style={{
                  height: '120px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  borderRadius: '12px'
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
    </>
  );
};
export default ReportListPage;
