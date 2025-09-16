/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink, useLocation } from "react-router-dom";
import Alerts from "../components/common/Alerts";
import PropertyDropdown from "../components/common/PropertyDropdown";
import { useNavigate } from "react-router-dom";
import useProperty from "../hook/useProperty";

const MasterLayout = ({ children }) => {
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation(); // Hook to get the current route
  const navigate = useNavigate();
  const { clearProperties } = useProperty();

  useEffect(() => {
    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location.pathname ||
            link.getAttribute("to") === location.pathname
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  const logout = () => {
    clearProperties();
    localStorage.removeItem("FALCON_TOKEN");
    navigate("/sign-in");
  };

  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
            ? "sidebar sidebar-open"
            : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type="button"
          className="sidebar-close-btn"
        >
          <Icon icon="radix-icons:cross-2" />
        </button>
        <div>
          <Link to="/" className="sidebar-logo">
            <img
              src="assets/images/logo.png"
              alt="site logo"
              className="light-logo"
            />
            <img
              src="assets/images/logo-light.png"
              alt="site logo"
              className="dark-logo"
            />
            <img
              src="assets/images/logo-icon.png"
              alt="site logo"
              className="logo-icon"
            />
          </Link>
        </div>
        <div className="sidebar-menu-area">
          <ul className="sidebar-menu" id="sidebar-menu">
            <li>
              <NavLink
                to="/"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon
                  icon="solar:home-smile-angle-outline"
                  className="menu-icon"
                />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/hms-dashboard"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="carbon:hotel" className="menu-icon" />
                <span>HMS Dashboard</span>
              </NavLink>
              <NavLink
                to="/hms-dashboard1"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="carbon:hotel" className="menu-icon" />
                <span>HMS Dashboard1</span>
              </NavLink>
            </li>

            <li className="sidebar-menu-group-title">Reports</li>
            <li>
              <NavLink
                to="/sales-report"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon
                  icon="fluent-mdl2:reservation-orders"
                  className="menu-icon"
                />
                <span>Sales report</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/house-report"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="ix:report-general" className="menu-icon" />
                <span>House report</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/flash-report"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="ix:report-general" className="menu-icon" />
                <span>Flash report</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/collection-report"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="ix:report-general" className="menu-icon" />
                <span>Collection report</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sales-segment"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="ix:report-general" className="menu-icon" />
                <span>Sales segment</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/guest-occupancy"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="ix:report-general" className="menu-icon" />
                <span>Guest Occupany List</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
        <div className="navbar-header">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <div className="d-flex flex-wrap align-items-center gap-4">
                <button
                  type="button"
                  className="sidebar-toggle"
                  onClick={sidebarControl}
                >
                  {sidebarActive ? (
                    <Icon
                      icon="iconoir:arrow-right"
                      className="icon text-2xl non-active"
                    />
                  ) : (
                    <Icon
                      icon="heroicons:bars-3-solid"
                      className="icon text-2xl non-active "
                    />
                  )}
                </button>
                <button
                  onClick={mobileMenuControl}
                  type="button"
                  className="sidebar-mobile-toggle"
                >
                  <Icon icon="heroicons:bars-3-solid" className="icon" />
                </button>
                {/* <form className="navbar-search">
                  <input type="text" name="search" placeholder="Search" />
                  <Icon icon="ion:search-outline" className="icon" />
                </form> */}
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex flex-wrap align-items-center gap-3">
                {/* Property dropdown */}
                <PropertyDropdown />
                {/* Language dropdown end */}
                <div className="dropdown">
                  <div className="dropdown-menu to-top dropdown-menu-lg p-0">
                    <div className="max-h-400-px overflow-y-auto scroll-sm pe-4">
                      <Link
                        to="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                      ></Link>
                      <Link
                        to="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                            <img
                              src="assets/images/notification/profile-4.png"
                              alt="WowDash React Vite"
                            />
                            <span className="w-8-px h-8-px  bg-neutral-300 rounded-circle position-absolute end-0 bottom-0" />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Kathryn Murphy
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            12:30 PM
                          </span>
                          <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle">
                            2
                          </span>
                        </div>
                      </Link>
                      <Link
                        to="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                            <img
                              src="assets/images/notification/profile-5.png"
                              alt="WowDash React Vite"
                            />
                            <span className="w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0" />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Kathryn Murphy
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            12:30 PM
                          </span>
                          <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-neutral-400 rounded-circle">
                            0
                          </span>
                        </div>
                      </Link>
                      <Link
                        to="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                            <img
                              src="assets/images/notification/profile-6.png"
                              alt="WowDash React Vite"
                            />
                            <span className="w-8-px h-8-px bg-neutral-300 rounded-circle position-absolute end-0 bottom-0" />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Kathryn Murphy
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            12:30 PM
                          </span>
                          <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-neutral-400 rounded-circle">
                            0
                          </span>
                        </div>
                      </Link>
                      <Link
                        to="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                            <img
                              src="assets/images/notification/profile-7.png"
                              alt="WowDash React Vite"
                            />
                            <span className="w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0" />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Kathryn Murphy
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            12:30 PM
                          </span>
                          <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle">
                            8
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="text-center py-12 px-16">
                      <Link
                        to="#"
                        className="text-primary-600 fw-semibold text-md"
                      >
                        See All Message
                      </Link>
                    </div>
                  </div>
                </div>
              
                <div className="dropdown">
                  <button
                    className="d-flex justify-content-center align-items-center rounded-circle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src="assets/images/user.png"
                      alt="image_user"
                      className="w-40-px h-40-px object-fit-cover rounded-circle"
                    />
                  </button>
                  <div className="dropdown-menu to-top dropdown-menu-sm">
                    <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                      <div>
                        <h6 className="text-lg text-primary-light fw-semibold mb-2">
                          Falcon software
                        </h6>
                        <span className="text-secondary-light fw-medium text-sm">
                          Admin
                        </span>
                      </div>
                      <button type="button" className="hover-text-danger">
                        <Icon
                          icon="radix-icons:cross-1"
                          className="icon text-xl"
                        />
                      </button>
                    </div>
                    <ul className="to-top-list">
                      <li>
                        <a
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3"
                          
                          onClick={logout}
                        >
                          <Icon icon="lucide:power" className="icon text-xl" />
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Profile dropdown end */}
              </div>
            </div>
          </div>
        </div>

        {/* dashboard-main-body */}
        <div className="dashboard-main-body">
          <div>
            <Alerts />
          </div>
          <div>{children}</div>
        </div>

        {/* Footer section */}
        <footer className="d-footer">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <p className="mb-0 text-sm text-sm-center">
                © 2025 Falcon software. All Rights Reserved.
              </p>
            </div>
            <div className="col-auto">
              <p className="mb-0 text-sm text-sm-center">
                Made by <span className="text-primary-600">Falcon team</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
