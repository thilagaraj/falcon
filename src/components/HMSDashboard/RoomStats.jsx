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
            <div className="row row-cols-xxxl-6 row-cols-xxl-6 row-cols-xl-3 row-cols-lg-5 row-cols-sm-1 row-cols-1 gy-4">
              <div className="col">
                <div className="card shadow-none border bg-success-50 left-line line-bg-success position-relative overflow-hidden">
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Vacant rooms
                        </p>
                        <h6 className="mb-0">{Vacant}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-success rounded-circle d-flex justify-content-center align-items-center">
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
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Unsettled rooms
                        </p>
                        <h6 className="mb-0">{Unsettled}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-warning-900 rounded-circle d-flex justify-content-center align-items-center">
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
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Dirty rooms
                        </p>
                        <h6 className="mb-0">{Dirty}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-primary rounded-circle d-flex justify-content-center align-items-center">
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
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Mgment blocked
                        </p>
                        <h6 className="mb-0">{ManagementBlocked}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-cyan-900 rounded-circle d-flex justify-content-center align-items-center">
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
                  <div className="card-body p-20">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Blocked rooms
                        </p>
                        <h6 className="mb-0">{Blocked}</h6>
                      </div>
                      <div className="w-50-px h-50-px bg-neutral-900 rounded-circle d-flex justify-content-center align-items-center">
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
