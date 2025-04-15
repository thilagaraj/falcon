import { Icon } from "@iconify/react/dist/iconify.js";

const TotalCollections = () => {
  return (
    <div className="card h-100 p-0 radius-12 mt-20">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-lg fw-semibold mb-0">Total collections</h6>
      </div>

      <div className="card-body p-24">
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
          <div className="col">
            <div className="card shadow-none border bg-gradient-start-4">
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Total amount in hand
                    </p>
                    <h6 className="mb-0">&#8377; 42,000</h6>
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
                    <p className="fw-medium text-primary-light mb-1">Cash amount</p>
                    <h6 className="mb-0">&#8377; 0.0</h6>
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
                    <p className="fw-medium text-primary-light mb-1">Card amount</p>
                    <h6 className="mb-0">&#8377; 0.0</h6>
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
                    <p className="fw-medium text-primary-light mb-1">
                      Onine amount
                    </p>
                    <h6 className="mb-0">&#8377; 42,000</h6>
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
                    <p className="fw-medium text-primary-light mb-1">
                      Cheque amount
                    </p>
                    <h6 className="mb-0">&#8377; 42,000</h6>
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
                    <p className="fw-medium text-primary-light mb-1">
                      Wallet amount
                    </p>
                    <h6 className="mb-0">&#8377; 42,000</h6>
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
                    <p className="fw-medium text-primary-light mb-1">
                      Refund amount
                    </p>
                    <h6 className="mb-0">&#8377; 42,000</h6>
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
  );
}
export default TotalCollections;
