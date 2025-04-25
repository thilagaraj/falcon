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
        height: 100,
        width: 100,
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
        position: "left",
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
    <div className="row gy-4 mt-16">
      <div className="col col-lg-9">
        <div className="card h-100 p-0 radius-12 ">
          <div className="card-header border-bottom bg-base py-16 px-24">
            <h6 className="text-lg fw-semibold mb-0">Collections</h6>
          </div>

          <div className="card-body p-24">
            <div className="row row-cols-xxxl-3 row-cols-lg-5 row-cols-sm-1 row-cols-1 gy-4">
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Total Collection
                        </p>
                        <h6 className="mb-0">
                          {formatCurrency(TotalCollection)}
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                        <Icon
                          icon="mynaui:rupee-square-solid"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Cash
                        </p>
                        <h6 className="mb-0">{formatCurrency(Cash)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                        <Icon
                          icon="mynaui:rupee-square-solid"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Card
                        </p>
                        <h6 className="mb-0">{formatCurrency(Card)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                        <Icon
                          icon="mynaui:rupee-square-solid"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Online
                        </p>
                        <h6 className="mb-0">{formatCurrency(Online)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                        <Icon
                          icon="mynaui:rupee-square-solid"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Wallet
                        </p>
                        <h6 className="mb-0">{formatCurrency(Wallet)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                        <Icon
                          icon="mynaui:rupee-square-solid"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Cheque
                        </p>
                        <h6 className="mb-0">{formatCurrency(Cheque)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                        <Icon
                          icon="mynaui:rupee-square-solid"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Bills on hold
                        </p>
                        <h6 className="mb-0">{formatCurrency(BillsOnHold)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                        <Icon
                          icon="mynaui:rupee-square-solid"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Refund
                        </p>
                        <h6 className="mb-0">{formatCurrency(Refund)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                        <Icon
                          icon="mynaui:rupee-square-solid"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Cash Expense
                        </p>
                        <h6 className="mb-0">{formatCurrency(CashExpense)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                        <Icon
                          icon="mynaui:rupee-square-solid"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Other Expense
                        </p>
                        <h6 className="mb-0">{formatCurrency(OtherExpense)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                        <Icon
                          icon="mynaui:rupee-square-solid"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-4">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-8">
                          Cash in hand
                        </p>
                        <h6 className="mb-0">{formatCurrency(CashInHand)}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                        <Icon
                          icon="mynaui:rupee-square-solid"
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
      <div className="col col-lg-3 ">
        <div className="card h-100 p-0 radius-12 ">
          <div className="card-header border-bottom bg-base py-16 px-24">
            <h6 className="text-lg fw-semibold mb-0">Overall Collections</h6>
          </div>

          <div className="card-body p-24">
            <div className="mx-auto">
              <ReactApexChart
                options={chartOptions.options}
                series={chartOptions.series}
                type="donut"
                width={450}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCollections;
