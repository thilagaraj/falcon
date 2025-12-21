import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, InputGroup } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useSpinner } from "../hook/SpinnerContext";
import $axios from "../utils/axios";
import { useSearchParams } from "react-router-dom";
import Slider from "react-slick";
import PropTypes from "prop-types";

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
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
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

const GenericMenuList = ({ endpoint }) => {
  const [menu, setMenu] = useState([]);
  const [falconOutletMasterModel, setFalconOutletMasterModel] = useState({});
  const [search, setSearch] = useState("");
  const [tabs, setTabs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const { showLoading, hideLoading } = useSpinner();
  const [searchParams] = useSearchParams();

  const scrollToMenu = (e) => {
    e.preventDefault();
    const menuSection = document.getElementById("menu-section");
    menuSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const loadMenu = async () => {
      try {
        showLoading();
        const sanitizedEndpoint = (endpoint || "").replace(/[?&]+$/, "");
        const response = await $axios.get(sanitizedEndpoint, {
          params: Object.fromEntries(searchParams.entries()),
        });
        setTabs([
          { CategoryCode: null, CategoryName: "All" },
          ...(response?.falconPOSCategoryModel || []),
        ]);
        setMenu(response?.falconPOSItemsModellist || []);
        setFalconOutletMasterModel(response?.falconOutletMasterModel || {});
      } catch (error) {
        console.error("Error loading menu:", error);
      } finally {
        hideLoading();
      }
    };

    if (endpoint) {
      loadMenu();
    }
  }, []);

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
    <Container fluid className="p-0">
      <div
        style={{
          backgroundImage: 'url("/assets/images/restaurant/bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          height: "100vh",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <nav
          className="fixed-top"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", zIndex: 1030 }}
        >
                     <div className="px-3 px-sm-5 py-3 w-100 w-md-75 m-auto">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-white text-decoration-none h6 m-0 w-100 ">
                {falconOutletMasterModel.OutletName}
              </div>
              <button
                className="d-md-none bg-transparent border-0 text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation"
              >
                <Icon
                  icon={isMenuOpen ? "mdi:close" : "mdi:menu"}
                  width="24"
                  height="24"
                />
              </button>
              <div className="d-none d-md-block">
                <ul className="list-unstyled m-0 d-flex gap-4 align-items-center">
                  <li>
                    <button
                      className="text-decoration-none bg-transparent border-0 px-0"
                      onClick={(e) => {
                        scrollToTop(e);
                        setActiveNav("home");
                      }}
                      style={{
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        color: activeNav === "home" ? "#d4af37" : "white",
                        transition: "color 0.3s ease",
                      }}
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-decoration-none bg-transparent border-0 px-0"
                      onClick={(e) => {
                        scrollToMenu(e);
                        setActiveNav("menu");
                      }}
                      style={{
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        color: activeNav === "menu" ? "#d4af37" : "white",
                        transition: "color 0.3s ease",
                      }}
                    >
                      Menu
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {/* Mobile Menu */}
            <div
              className={`d-md-none ${isMenuOpen ? "d-block" : "d-none"}`}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                padding: "1rem",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <ul className="list-unstyled m-0 d-flex flex-column gap-3">
                <li>
                  <button
                    className="text-decoration-none bg-transparent border-0 px-3 w-100 text-start"
                    onClick={(e) => {
                      scrollToTop(e);
                      setIsMenuOpen(false);
                      setActiveNav("home");
                    }}
                    style={{
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      color: activeNav === "home" ? "#d4af37" : "white",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    className="text-decoration-none bg-transparent border-0 px-3 w-100 text-start"
                    onClick={(e) => {
                      scrollToMenu(e);
                      setIsMenuOpen(false);
                      setActiveNav("menu");
                    }}
                    style={{
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      color: activeNav === "menu" ? "#d4af37" : "white",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Menu
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div
          style={{
            position: "relative",
            height: "calc(100% - 60px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            padding: "2rem",
          }}
        >
          <h3 className="mb-4 fw-bold">
            <div className="display-4 d-none d-md-block">
              <span className="text-white">Welcome to</span>
              <span style={{ color: "#d4af37" }} className="ms-1">
                {falconOutletMasterModel.OutletHeader}
              </span>
            </div>
            <div className="h2 d-md-none">
              <span className="text-white">Welcome to</span>
              <span style={{ color: "#d4af37" }} className="ms-1">
                {falconOutletMasterModel.OutletHeader}
              </span>
            </div>
          </h3>
        </div>
      </div>
      <div className="bg-dark pb-4 pt-68 " id="menu-section">
        <div className="">
          <Row className="justify-content-center mb-4 w-100">
            <Col xs={11} md={8}>
              <div className="mb-4 mb-md-5">
                {/* <p className="text-white mb-2 text-uppercase pt-4">MENU</p> */}
                <div
                  className="ri-2x fw-bold lh-1"
                  style={{ color: "#d4af37" }}
                >
                  Check Our {falconOutletMasterModel.OutletHeader} Menu
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center mb-5">
            <Col xs={11} md={8}>
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
            <Col xs={11} md={8}>
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
                        onClick={() =>
                          setSelectedCategory(category.CategoryCode)
                        }
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
            <Col xs={11} md={8}>
              {tabs
                .filter((tab) => tab.CategoryCode !== null)
                .map((category) => {
                  const categoryItems = filteredMenu.filter(
                    (item) => item.CatCode === category.CategoryCode
                  );

                  if (categoryItems.length === 0) return null;

                  return (
                    <div key={category.CategoryCode} className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <div
                          className="text-uppercase m-0 fs-14 "
                          style={{ color: "#d4af37" }}
                        >
                          {category.CategoryName}
                        </div>
                        <div
                          className="flex-grow-1 ms-3"
                          style={{
                            height: "1px",
                            background: "rgba(212, 175, 55, 0.3)",
                          }}
                        ></div>
                      </div>
                      <Row>
                        {categoryItems.map((item) => (
                          <Col
                            xs={12}
                            md={6}
                            key={item.ItemCode}
                            className="mb-3"
                          >
                            <Card className="flex-row align-items-center bg-secondary text-white border-0 p-2 h-100">
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
                                <div className="d-flex justify-content-between align-items-center w-100">
                                  <div className="d-flex align-items-center">
                                    <div
                                      className="mb-0 text-white fw-bold"
                                    >
                                      <span className="fs-6">{item.ItemName}</span>
                                      <span className="ms-2 fs-14">
                                      {item.IsVeg ? (
                                        <span
                                          title="Veg"
                                        >
                                          🟩
                                        </span>
                                      ) : (
                                        <span
                                          title="Non Veg"
                                        >
                                          🟥
                                        </span>
                                      )}
                                    </span>

                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <div className="dotted-line me-2"></div>
                                    <span className="text-warning fw-bold pe-1">
                                      {item.ItemRate}
                                    </span>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  );
                })}
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default GenericMenuList;

SampleNextArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

SamplePrevArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

GenericMenuList.propTypes = {
  endpoint: PropTypes.string.isRequired,
};
