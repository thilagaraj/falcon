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
          <div className="card-body p-24 px-10">
            <div className="row row-cols-xxxl-5 row-cols-xxl-4 row-cols-xl-4 row-cols-lg-4 row-cols-sm-2 row-cols-3 gy-4 gx-2">
              <div className="col">
                <div className="card shadow-none border bg-custom-color1 custom-color1 line-bg-color1 left-line position-relative overflow-hidden">
                  <div className="card-body px-10">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Vacant
                        </p>
                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="custom-color1 text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Vacant}</span>
                        </h6>
                      </div>
                      <div className=" w-50-px h-50-px icon-bg-custom-color1 rounded-circle d-flex justify-content-center align-items-center d-none d-sm-flex">
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
                <div className="card border bg-custom-color2 custom-color2 line-bg-color2 left-line position-relative overflow-hidden">
                  <div className="card-body px-10">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Occupied
                        </p>
                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="custom-color2 text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Occupied}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px icon-bg-custom-color2 rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
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
                <div className="card  border left-line bg-custom-color3 custom-color3 line-bg-color3 position-relative overflow-hidden">
                  <div className="card-body px-10">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Dirty
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="custom-color3 text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Dirty}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px icon-bg-custom-color3 rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
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
                <div className="card border left-line bg-custom-color4 custom-color4 line-bg-color4 position-relative overflow-hidden">
                  <div className="card-body px-10">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Blocked
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="custom-color4 text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Blocked}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px icon-bg-custom-color4 rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
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
                <div className="card border left-line bg-custom-color5 custom-color5 line-bg-color5 position-relative overflow-hidden">
                  <div className="card-body px-10">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Mgment
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="custom-color5 text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{ManagementBlocked}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px icon-bg-custom-color5 rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
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
                <div className="card border left-line bg-custom-color6 custom-color6 line-bg-color6 position-relative overflow-hidden">
                  <div className="card-body px-10">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">
                          Unsettled
                        </p>

                        <h6 className="mb-0 d-flex align-items-center gap-2">
                          <span className="d-flex d-sm-none">
                            <Icon
                              icon="material-symbols-light:hotel-rounded"
                              className="custom-color6 text-2xl mb-0"
                            ></Icon>
                          </span>
                          <span>{Unsettled}</span>
                        </h6>
                      </div>
                      <div className="w-50-px h-50-px icon-bg-custom-color6 rounded-circle d-flex justify-content-center align-items-center  d-none d-sm-flex">
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
