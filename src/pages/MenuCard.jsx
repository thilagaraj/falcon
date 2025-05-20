import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Tabs, Tab, Card, InputGroup } from "react-bootstrap";

const TABS = [
  { label: "All", value: "all" },
  { label: "VEG DISHES", value: "veg" },
  { label: "NON VEG DISHES", value: "nonveg" },
  { label: "SOUP", value: "soup" },
];

const MenuCard = () => {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  const filteredMenu = menu.filter(item => {
    // Filter by tab and search
    const matchesTab =
      tab === "all" ||
      (tab === "veg" && item.type === "veg") ||
      (tab === "nonveg" && item.type === "nonveg") ||
      (tab === "soup" && item.category === "soup");
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <Container fluid className="bg-dark min-vh-100 py-5">
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <h4 style={{ color: '#d4af37' }} className="fw-bold">Check Our HOLIDAY PALMS Menu</h4>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search.."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-secondary text-white border-0"
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <Tabs
            activeKey={tab}
            onSelect={k => setTab(k)}
            className="mb-3 justify-content-center"
            variant="pills"
            fill
          >
            {TABS.map(t => (
              <Tab eventKey={t.value} title={t.label} key={t.value} />
            ))}
          </Tabs>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <Row>
            {filteredMenu.map(item => (
              <Col md={12} key={item.id} className="mb-3">
                <Card className="flex-row align-items-center bg-secondary text-white border-0 p-2">
                  <div style={{ width: 60, height: 60 }} className="d-flex align-items-center justify-content-center bg-dark rounded-circle me-3">
                    <img
                      src={item.image || "https://via.placeholder.com/60?text=No+Image"}
                      alt={item.name}
                      style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-row justify-content-between align-items-center p-0 w-100">
                    <div>
                      <Card.Title as="h5" className="mb-0 text-white fw-bold">{item.name}</Card.Title>
                      <span className="ms-2">
                        {item.type === "veg" ? (
                          <span title="Veg" style={{ color: '#28a745', fontSize: 18 }}>🟩</span>
                        ) : item.type === "nonveg" ? (
                          <span title="Non Veg" style={{ color: '#dc3545', fontSize: 18 }}>🟥</span>
                        ) : null}
                      </span>
                    </div>
                    <div className="ms-auto" style={{ color: '#d4af37', fontWeight: 600, fontSize: 18 }}>
                      ₹ {item.price}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MenuCard;