import { Icon } from "@iconify/react/dist/iconify.js";
import ReactApexChart from "react-apexcharts";

const RoomStats = ({ data }) => {
  const { Vacant, Occupied, Unsettled, Dirty, Blocked, ManagementBlocked } =
    data;

  return (
    <div className="row gy-4">
      <div className="col col-lg-12">
        <div className="card h-100 p-0 radius-12">
          <div className="card-header border-bottom bg-base py-16 px-24">
            <h6 className="text-lg fw-semibold mb-0">HMS Dashboard</h6>
          </div>
          <div className="card-body p-24">
            <div className="row row-cols-xxxl-5 row-cols-xxl-4 row-cols-xl-4 row-cols-lg-4 row-cols-sm-2 row-cols-2 gy-4">
              <div className="col">
                <div className="card shadow-none border bg-success-50 left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body px-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Vacant
                        </p>
                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="text-success text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Vacant}</span>
                        </h6>
                      </div>
                      <div className=" w-50-px h-50-px bg-success rounded-circle d-flex justify-content-center align-items-center d-none d-sm-flex">
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
                <div className="card border bg-danger-50 left-line line-bg-danger position-relative overflow-hidden">
                  <div className="card-body px-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Occupied
                        </p>
                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="text-danger text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Occupied}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
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
                <div className="card  border bg-neutral-200 left-line line-bg-neutral position-relative overflow-hidden">
                  <div className="card-body px-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Dirty
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="text-neutral text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Dirty}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-neutral-900 rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
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
                <div className="card border bg-primary-50 left-line line-bg-primary position-relative overflow-hidden">
                  <div className="card-body px-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Blocked
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="text-primary text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Blocked}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-primary rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
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
                <div className="card border bg-cyan-50 left-line line-bg-cyan position-relative overflow-hidden">
                  <div className="card-body px-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Mgment
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="text-cyan text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{ManagementBlocked}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-cyan-900 rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
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
                <div className="card border bg-warning-50 left-line line-bg-warning position-relative overflow-hidden">
                  <div className="card-body px-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Unsettled
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="text-warning-600 text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Unsettled}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px bg-warning-900 rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
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

export default RoomStats;
