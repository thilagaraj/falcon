import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, InputGroup } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useSpinner } from "../hook/SpinnerContext";
import $axios from "../utils/axios";
import { useSearchParams } from "react-router-dom";
import Slider from "react-slick";

const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    }
  ]
};

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${className} slick-next slick-arrow`}
    >
      <Icon icon="ic:outline-keyboard-arrow-right" className="menu-icon" />
    </button>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${className} slick-prev slick-arrow`}
    >
      <Icon icon="ic:outline-keyboard-arrow-left" className="menu-icon" />
    </button>
  );
}

const GenericMenuList = ({ endpoint, title }) => {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [tabs, setTabs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { showLoading, hideLoading } = useSpinner();
  const [searchParams] = useSearchParams();

  const getMenu = async () => {
    try {
      showLoading();
      const response = await $axios.get(`${endpoint}${searchParams.toString()}`);
      setTabs([
        { CategoryCode: null, CategoryName: "All" },
        ...(response?.falconPOSCategoryModel || []),
      ]);
      setMenu(response?.falconPOSItemsModellist || []);
    } catch (error) {
      console.error("Error loading menu:", error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    getMenu();
  }, [endpoint]);

  const filteredMenu = menu.filter((item) => {
    // First apply category filter
    const categoryMatch =
      selectedCategory === null || item.CatCode === selectedCategory;

    // Then apply search filter if there's a search term
    const searchMatch =
      search.trim() === "" ||
      item.ItemName.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <Container fluid className="bg-dark min-vh-100 py-3">
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <h4 style={{ color: "#d4af37" }} className="fw-bold">
            {title}
          </h4>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-secondary text-white border-0"
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <div className="position-relative menu-card">
            <Slider {...settings}>
              {tabs.map((category, index) => (
                <Col key={index} className="px-2">
                  <Card
                    className="mb-0 h-100"
                    style={{
                      backgroundColor:
                        selectedCategory === category.CategoryCode
                          ? "#d4af37"
                          : "#2c2c2c",
                      border: "1px solid #d4af37",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedCategory(category.CategoryCode)}
                  >
                    <Card.Body className="p-2">
                      <div className="text-center">
                        <div
                          className="mb-0 fw-bold"
                          style={{
                            color:
                              selectedCategory === category.CategoryCode
                                ? "#2c2c2c"
                                : "#d4af37",
                          }}
                        >
                          {category.CategoryName}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Slider>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <Row>
            {filteredMenu?.map((item) => (
              <Col md={12} key={item.ItemCode} className="mb-3">
                <Card className="flex-row align-items-center bg-secondary text-white border-0 p-2">
                  <div
                    style={{ width: 60, height: 60 }}
                    className="d-flex align-items-center justify-content-center bg-dark rounded-circle me-3"
                  >
                    <img
                      src={`./assets/images/menu-items/No_Image_Available.jpg`}
                      alt={item.ItemName}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-row justify-content-between align-items-center p-0 w-100">
                    <div>
                      <Card.Title as="h5" className="mb-0 text-white fw-bold">
                        {item.ItemName}
                      </Card.Title>
                      <span className="ms-2">
                        {item.IsVeg ? (
                          <span
                            title="Veg"
                            style={{ color: "#28a745", fontSize: 18 }}
                          >
                            🟩
                          </span>
                        ) : (
                          <span
                            title="Non Veg"
                            style={{ color: "#dc3545", fontSize: 18 }}
                          >
                            🟥
                          </span>
                        )}
                      </span>{" "}
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

export default GenericMenuList;
