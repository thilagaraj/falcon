import { Icon } from "@iconify/react/dist/iconify.js";
import ReactApexChart from "react-apexcharts";

const PettyCollections = ({ data }) => {
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
        height: 100,
        width: 100,
      },
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
            <div className="row row-cols-xxxl-3 row-cols-lg-5 row-cols-sm-1 row-cols-1 gy-4">
              <div className="col">
                <div className="card shadow-none border bg-gradient-start-5">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Vacant rooms
                        </p>
                        <h6 className="mb-0">{Vacant}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
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
                <div className="card shadow-none border bg-gradient-start-5">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Occupied rooms
                        </p>
                        <h6 className="mb-0">{Occupied}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
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
                <div className="card shadow-none border bg-gradient-start-5">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Unsettled rooms
                        </p>
                        <h6 className="mb-0">{Unsettled}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
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
                <div className="card shadow-none border bg-gradient-start-5">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Dirty rooms
                        </p>
                        <h6 className="mb-0">{Dirty}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
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
                <div className="card shadow-none border bg-gradient-start-5">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Blocked rooms
                        </p>
                        <h6 className="mb-0">{Blocked}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
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
                <div className="card shadow-none border bg-gradient-start-5">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Management Blocked
                        </p>
                        <h6 className="mb-0">{ManagementBlocked}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
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

          <div className="card-body p-24">
            <div className="mx-auto">
              <ReactApexChart
                options={chartOptions.options}
                series={chartOptions.series}
                type="donut"
                width={400}               
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PettyCollections;
