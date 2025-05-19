import { Icon } from "@iconify/react/dist/iconify.js";
import ReactApexChart from "react-apexcharts";

const RoomStatus = ({ data }) => {
  const { Vacant, Occupied, Unsettled, Dirty, Blocked, ManagementBlocked } =
    data;
  const series = Object.values(data);
  const total = series.reduce((sum, val) => sum + (val || 0), 0);
  const labels = [
    "Vacant",
    "Occupied",
    "Unsettled",
    "Dirty",
    "Blocked",
    "Management Blocked",
  ];
  const chartOptions = {
    series,
    options: {
      chart: {
        type: "donut",
      },
      legend: {
        position: "bottom",
        width: '100%',
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
            size: "25%",
            labels: {
              show: false,
              total: {
                show: true,
                label: "Total",
                fontSize: "16px",
                fontWeight: 500,
                color: "#999",
                formatter: () => total.toLocaleString(),
              },
            },
          },
        },
      },
    },
  };

  return (
    <div className="row gy-4">
      <div className="col col-lg-9">
        <div className="card h-100 p-0 radius-12">
          <div className="card-header border-bottom bg-base py-16 px-24">
            <h6 className="text-lg fw-semibold mb-0">Room status</h6>
          </div>

          <div className="card-body p-24">
            <div className="row row-cols-xxxl-5 row-cols-xxl-3 row-cols-xl-3 row-cols-lg-3 row-cols-sm-2 row-cols-2 gy-4">
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-5 left-line line-bg-danger position-relative overflow-hidden">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Vacant
                        </p>
                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="ri:hotel-bed-line"
                              className="text-danger text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Vacant}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center d-none d-sm-flex">
                        <Icon
                          icon="material-symbols:hotel"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-5  left-line line-bg-danger position-relative overflow-hidden">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Occupied
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="ri:hotel-bed-line"
                              className="text-danger text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Occupied}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center d-none d-sm-flex">
                        <Icon
                          icon="material-symbols:hotel"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-5  left-line line-bg-danger position-relative overflow-hidden">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Unsettled
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="ri:hotel-bed-line"
                              className="text-danger text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Unsettled}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center d-none d-sm-flex">
                        <Icon
                          icon="material-symbols:hotel"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-5  left-line line-bg-danger position-relative overflow-hidden">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Dirty
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="ri:hotel-bed-line"
                              className="text-danger text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Dirty}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center d-none d-sm-flex">
                        <Icon
                          icon="material-symbols:hotel"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-5  left-line line-bg-danger position-relative overflow-hidden">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Blocked
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="ri:hotel-bed-line"
                              className="text-danger text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Blocked}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center d-none d-sm-flex">
                        <Icon
                          icon="material-symbols:hotel"
                          className="text-base text-2xl mb-0"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-5  left-line line-bg-danger position-relative overflow-hidden">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Mgment
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="ri:hotel-bed-line"
                              className="text-danger text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{ManagementBlocked}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center d-none d-sm-flex">
                        <Icon
                          icon="material-symbols:hotel"
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
            <h6 className="text-lg fw-semibold mb-0">Overall room status</h6>
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

export default RoomStatus;
