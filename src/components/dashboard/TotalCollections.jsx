import { Icon } from "@iconify/react/dist/iconify.js";
import { formatCurrency } from "../../utils/formatter";
import { useState, useEffect } from "react";
import $axios from "../../utils/axios";
import { addDays, formatDateForDb, getCurrentDate } from "../../utils/date";
import { useSpinner } from "../../hook/SpinnerContext";
import ReportTable from "./ReportTable";
import PropTypes from "prop-types";


const TotalCollections = ({ data, checkin }) => {
  const { showLoading, hideLoading } = useSpinner();
  const [fromDate, setFromDate] = useState(getCurrentDate("MM/DD/YYYY"));
  const [toDate, setToDate] = useState(addDays(getCurrentDate("MM/DD/YYYY"), 2));
  const [reportData, setReportData] = useState([]);


  const {
    DayTotalCollection,
    Cash,
    Card,
    Online,
    Wallet,
    Cheque,
    Outstanding,
    PaidOut,
    CashExpense,
    OtherExpences,
    HandCash,
  } = data;

  const {
    ContinueCheckin,
    TodayCheckin,
    TodayCheckout,
    TodayArrival,
    TodayRoomCancel,
    TodayHouseGuest,
  } = checkin;

  const getRoomAvialability = async () => {
    showLoading();
    try {
      const formattedFromDate = formatDateForDb(fromDate, "MM/DD/YYYY");
      let formattedToDate = toDate;
      if (toDate && typeof toDate === 'object' && typeof toDate.format === 'function') {
        formattedToDate = toDate.format("MM/DD/YYYY");
      } else if (typeof toDate === 'string') {
        formattedToDate = formatDateForDb(toDate, "MM/DD/YYYY");
      }
      const response = await $axios.get(
        `/Falconreport/GetRoomAvailabilityChart?BranchCode=HMS_1001&PropertyId=10001&HotelId=THAI_1001&fromdt=${formattedFromDate}&Todt=${formattedToDate}`
      );
      setReportData(response)
    } catch (e) {
      console.log(e);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    getRoomAvialability();
  }, [fromDate, toDate]);

  const updateTable = (fromDate, toDate) => {
    setFromDate(formatDateForDb(fromDate, "MM/DD/YYYY"));
    setToDate(formatDateForDb(toDate, "MM/DD/YYYY"));
  };
  
  return (
    <div className="row gy-4 gx-4 mt-16">
      <div className="col col-12">
        <div className="card h-100 p-0 radius-12 ">
          <div className="card-header border-bottom bg-base py-16 px-24">
            <h6 className="text-lg fw-semibold mb-0">Collections</h6>
          </div>

          <div className="card-body p-24 px-10 dashboard-collections">
            <div className="row row-cols-xxxl-5 row-cols-xxl-3 row-cols-xl-3 row-cols-lg-3 row-cols-sm-2 row-cols-3 gy-4 gx-2">
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4  left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body px-10 position-relative">
                    <div className="d-flex long-text-card flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Total
                        </p>
                        <h6 className="mb-0 ">
                          {formatCurrency(DayTotalCollection)}
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center d-none d-sm-flex">
                        <Icon
                          icon="mynaui:rupee-square-solid"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                    <div className="top-bill-pin w-28-px h-28-px bg-success  d-flex justify-content-center align-items-center d-block d-sm-none position-absolute top-0 end-0">
                      <Icon
                        icon="majesticons:rupee-circle"
                        className="text-base text-sm mb-0"
                      ></Icon>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4   left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body px-10 position-relative">
                    <div className="d-flex long-text-card flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Cash
                        </p>
                        <h6 className="mb-0">{formatCurrency(Cash)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="bi:cash"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                    <div className="top-bill-pin w-28-px h-28-px bg-success  d-flex justify-content-center align-items-center d-block d-sm-none position-absolute top-0 end-0">
                      <Icon
                        icon="bi:cash"
                        className="text-base text-sm mb-0"
                      ></Icon>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4   left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body px-10 position-relative">
                    <div className="d-flex long-text-card flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Card
                        </p>
                        <h6 className="mb-0">{formatCurrency(Card)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="ion:card-sharp"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                    <div className="top-bill-pin w-28-px h-28-px bg-success  d-flex justify-content-center align-items-center d-block d-sm-none position-absolute top-0 end-0">
                      <Icon
                        icon="ion:card-sharp"
                        className="text-base text-sm mb-0"
                      ></Icon>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4   left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body px-10 position-relative">
                    <div className="d-flex flex-wrap long-text-card align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Online
                        </p>
                        <h6 className="mb-0">{formatCurrency(Online)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="material-symbols:shopping-cart-checkout"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                    <div className="top-bill-pin w-28-px h-28-px bg-success  d-flex justify-content-center align-items-center d-block d-sm-none position-absolute top-0 end-0">
                      <Icon
                        icon="material-symbols:shopping-cart-checkout"
                        className="text-base text-sm mb-0"
                      ></Icon>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4  left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body px-10 position-relative">
                    <div className="d-flex flex-wrap long-text-card align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Wallet
                        </p>
                        <h6 className="mb-0">{formatCurrency(Wallet)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="tabler:wallet"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                    <div className="top-bill-pin w-28-px h-28-px bg-success  d-flex justify-content-center align-items-center d-block d-sm-none position-absolute top-0 end-0">
                      <Icon
                        icon="tabler:wallet"
                        className="text-base text-sm mb-0"
                      ></Icon>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4  left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body px-10 position-relative">
                    <div className="d-flex flex-wrap long-text-card align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Cheque
                        </p>
                        <h6 className="mb-0">{formatCurrency(Cheque)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="mdi:cheque-book"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                    <div className="top-bill-pin w-28-px h-28-px bg-success  d-flex justify-content-center align-items-center d-block d-sm-none position-absolute top-0 end-0">
                      <Icon
                        icon="mdi:cheque-book"
                        className="text-base text-sm mb-0"
                      ></Icon>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4  left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body px-10 position-relative">
                    <div className="d-flex long-text-card flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          On-hold
                        </p>
                        <h6 className="mb-0">{formatCurrency(Outstanding)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="si:info-fill"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                    <div className="top-bill-pin w-28-px h-28-px bg-success  d-flex justify-content-center align-items-center d-block d-sm-none position-absolute top-0 end-0">
                      <Icon
                        icon="si:info-fill"
                        className="text-base text-sm mb-0"
                      ></Icon>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4  left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body px-10 position-relative">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 long-text-card">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Refund
                        </p>
                        <h6 className="mb-0">{formatCurrency(PaidOut)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="mingcute:card-refund-line"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                    <div className="top-bill-pin w-28-px h-28-px bg-success  d-flex justify-content-center align-items-center d-block d-sm-none position-absolute top-0 end-0">
                      <Icon
                        icon="mingcute:card-refund-line"
                        className="text-base text-sm mb-0"
                      ></Icon>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4  left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body px-10 position-relative">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Cash Expense
                        </p>
                        <h6 className="mb-0">{formatCurrency(CashExpense)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="mdi:cash-minus"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                    <div className="top-bill-pin w-28-px h-28-px bg-success  d-flex justify-content-center align-items-center d-block d-sm-none position-absolute top-0 end-0">
                      <Icon
                        icon="mdi:cash-minus"
                        className="text-base text-l mb-0"
                      ></Icon>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4  left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body px-10 position-relative">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Other Expense
                        </p>
                        <h6 className="mb-0">
                          {formatCurrency(OtherExpences)}
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="solar:cart-4-bold"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                    <div className="top-bill-pin w-28-px h-28-px bg-success  d-flex justify-content-center align-items-center d-block d-sm-none position-absolute top-0 end-0">
                      <Icon
                        icon="solar:cart-4-bold"
                        className="text-base text-sm mb-0"
                      ></Icon>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4  left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body px-10 position-relative long-text-card">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Hand Cash
                        </p>
                        <h6 className="mb-0">{formatCurrency(HandCash)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="mdi:cash-check"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                    <div className="top-bill-pin w-28-px h-28-px bg-success  d-flex justify-content-center align-items-center d-block d-sm-none position-absolute top-0 end-0">
                      <Icon
                        icon="mdi:cash-check"
                        className="text-base text-l mb-0"
                      ></Icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col col-12">
        <div className="card-header border-bottom bg-base py-16 px-24">
          <h6 className="text-lg fw-semibold mb-0">Room Availability</h6>
        </div>
        {hideLoading && <ReportTable data={reportData} onFilter={updateTable} toDate={toDate} />}
      </div>

      <div className="col col-12">
        <div className="card h-100 p-0 radius-12">
          <div className="card-header border-bottom bg-base py-16 px-24">
            <h6 className="text-lg fw-semibold mb-0">Hotel Current Status</h6>
          </div>

          <div className="card-body p-24 px-10 dashboard-collections">
            <div className="row row-cols-xxxl-5 row-cols-xxl-4 row-cols-xl-4 row-cols-lg-4 row-cols-sm-2 row-cols-3 gy-3 gx-2">
              <div className="col">
                <div className="card shadow-none border left-line position-relative overflow-hidden bg-light-600">
                  <div className="card-body px-10 long-text-height-collection">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Continue Checkin
                        </p>
                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="check-in-status text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{ContinueCheckin}</span>
                        </h6>
                      </div>
                      <div className=" w-50-px h-50-px check-in-bg rounded-circle d-flex justify-content-center align-items-center d-none d-sm-flex">
                        <Icon
                          icon="carbon:hotel"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card border left-line bg-light-600 position-relative overflow-hidden">
                  <div className="card-body px-10 long-text-height-collection">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Today Checkin
                        </p>
                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="check-in-status text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{TodayCheckin}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px check-in-bg rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="carbon:hotel"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card  border left-line bg-light-600 position-relative overflow-hidden">
                  <div className="card-body px-10 long-text-height-collection">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Today Checkout
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="check-in-status text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{TodayCheckout}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px check-in-bg rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="carbon:hotel"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card border bg-light-600 left-line position-relative overflow-hidden">
                  <div className="card-body px-10 long-text-height-collection">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Today Arrival
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="text-primary text-2xl mb-0 check-in-status"
                            ></Icon>
                          </span>
                          <span>{TodayArrival}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px check-in-bg rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="carbon:hotel"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card border bg-light-600 left-line position-relative overflow-hidden">
                  <div className="card-body px-10 long-text-height-collection">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Room Cancel
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="check-in-status text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{TodayRoomCancel}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px check-in-bg rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="carbon:hotel"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card border bg-light-600 line-bg-color6 position-relative overflow-hidden">
                  <div className="card-body px-10 long-text-height-collection">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          House Guest
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="check-in-status text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{TodayHouseGuest}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px check-in-bg rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
                        <Icon
                          icon="carbon:hotel"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

TotalCollections.propTypes = {
  data: PropTypes.shape({
    DayTotalCollection: PropTypes.number,
    Cash: PropTypes.number,
    Card: PropTypes.number,
    Online: PropTypes.number,
    Wallet: PropTypes.number,
    Cheque: PropTypes.number,
    Outstanding: PropTypes.number,
    PaidOut: PropTypes.number,
    CashExpense: PropTypes.number,
    OtherExpences: PropTypes.number,
    HandCash: PropTypes.number,
  }).isRequired,
  checkin: PropTypes.shape({
    ContinueCheckin: PropTypes.number,
    TodayCheckin: PropTypes.number,
    TodayCheckout: PropTypes.number,
    TodayArrival: PropTypes.number,
    TodayRoomCancel: PropTypes.number,
    TodayHouseGuest: PropTypes.number,
  }).isRequired,
};

export default TotalCollections;
