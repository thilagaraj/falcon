import { Icon } from "@iconify/react/dist/iconify.js";
import ReactApexChart from "react-apexcharts";
import { formatCurrency } from "../../utils/formatter";

const TotalCollections = ({ data }) => {
  const {
    TotalCollection,
    Cash,
    Card,
    Online,
    Wallet,
    Cheque,
    BillsOnHold,
    Refund,
    CashExpense,
    OtherExpense,
    CashInHand,
  } = data;
  const series = Object.values(data);
  const total = series.reduce((sum, val) => sum + (val || 0), 0);
  const labels = [
    "Total Collection",
    "Cash",
    "Card",
    "Online",
    "Wallet",
    "Cheque",
    "Bills on hold",
    "Refund",
    "Cash Expense",
    "Other Expense",
    "Cash in hand",
  ];

  const chartOptions = {
    series,
    options: {
      chart: {
        type: "donut",
      },
      colors: [
        "#1E88E5",
        "#43A047",
        "#FB8C00",
        "#E53935",
        "#8E24AA",
        "#00ACC1",
        "#947a06",
        "#6D4C41",
        "#3949AB",
        "#F06292",
        "#00E676",
      ],
    legend: {
        position: "bottom",
      },
      labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
               width: '100%',
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "55%",
                },
              },
            },
          },
        },
        {
          breakpoint: 390,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "25%",
                  labels: {
                    show: false,
                  },
                },
              },
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          donut: {
            size: "55%",
            labels: {
              show: true,
            },
          },
        },
      },
    },
  };

  return (
    <div className="row gy-4 gx-4 mt-16">
      <div className="col col-lg-9">
        <div className="card h-100 p-0 radius-12 ">
          <div className="card-header border-bottom bg-base py-16 px-24">
            <h6 className="text-lg fw-semibold mb-0">Collections</h6>
          </div>

          <div className="card-body p-24 px-10 dashboard-collections">
            <div className="row row-cols-xxxl-5 row-cols-xxl-3 row-cols-xl-3 row-cols-lg-3 row-cols-sm-2 row-cols-3 gy-4 gx-2">
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4  left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body px-10 position-relative">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Total
                        </p>
                        <h6 className="mb-0 ">
                          {formatCurrency(TotalCollection + 100000)}
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
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
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
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
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
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
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
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
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
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
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
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          On-hold
                        </p>
                        <h6 className="mb-0">{formatCurrency(BillsOnHold)}</h6>
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
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Refund
                        </p>
                        <h6 className="mb-0">{formatCurrency(Refund)}</h6>
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
                        <h6 className="mb-0">{formatCurrency(OtherExpense)}</h6>
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
                  <div className="card-body px-10 position-relative">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Hand Cash
                        </p>
                        <h6 className="mb-0">{formatCurrency(CashInHand)}</h6>
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
      <div className="col col-lg-3 ">
        <div className="card h-100 p-0 radius-12 ">
          <div className="card-header border-bottom bg-base py-16 px-24">
            <h6 className="text-lg fw-semibold mb-0">Overall Collections</h6>
          </div>

          <div className="card-body p-10">
            <div className="mx-auto">
              <ReactApexChart
                options={chartOptions.options}
                series={chartOptions.series}
                type="donut"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCollections;
