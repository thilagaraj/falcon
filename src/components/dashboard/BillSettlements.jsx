import { Icon } from "@iconify/react/dist/iconify.js";

const BillSettlements = () => {
  return (
    <div className="card h-100 p-0 radius-12 mt-20">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-lg fw-semibold mb-0">Bill settlements</h6>
      </div>

      <div className="card-body p-24">
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
          <div className="col">
            <div className="card shadow-none border bg-gradient-start-2">
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Bill to company
                    </p>
                    <h6 className="mb-0">&#8377; 42,000</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
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
            <div className="card shadow-none border bg-gradient-start-2">
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Bill to room
                    </p>
                    <h6 className="mb-0">&#8377; 0.0</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
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

export default BillSettlements 
