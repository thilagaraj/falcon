import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Filter from "./Filter";
import { DataGrid } from "../common/DataGrid";
import { NAME_COLUMN_MAX_WIDTH } from "../../constants/tableConstants";

const formatAmount = (value) => {
  return typeof value === "number"
    ? new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value)
    : "0.00";
};

const ReportTable = ({ data, onFilter, collectionDetail, collectionSummary }) => {
  const columns = [
    { accessorKey: "TRDATE", header: "Date", cell: info => info.getValue()?.slice(0, 10) },
    { accessorKey: "TRTIME", header: "Time" },
    { accessorKey: "BILLNO", header: "Receipt No" },
    { accessorKey: "ROOMNO", header: "Room No" },
    { 
      accessorKey: "GUESTNAME", 
      header: "Guest Name",
      cell: info => (
        <span style={{ wordBreak: "break-word", whiteSpace: "normal", maxWidth: NAME_COLUMN_MAX_WIDTH, display: "inline-block" }}>
          {info.getValue()}
        </span>
      )
    },
    { accessorKey: "AMOUNT", header: "Amount", formatType: "AMOUNT", highlightAmount: true },
    { accessorKey: "moDE", header: "Mode", cell: info => info.getValue()?.trim() },
    { accessorKey: "TEMP1", header: "Details", cell: info => (info.row.original.TEMP1 && info.row.original.TEMP1.trim() !== '0') ? info.row.original.TEMP1 : (info.row.original.TEMP2 || '') },
    { accessorKey: "LOGER", header: "Loger" },
  ];

  return (
    <>
      <div className="card basic-data-table mb-3">
        <div className="card-header">
          <Filter onFilter={onFilter} columns={columns} tableData={data} />
        </div>
      </div>

      <div className="card basic-data-table">
        <div className="card-body">
          <DataGrid data={data} columns={columns} showPagination={false} disableSorting={true} />
        </div>
      </div>

      {(collectionDetail || collectionSummary) && (
        <Row className="mb-3">
          {collectionDetail && (
            <Col md={6} className="mb-3 mb-md-0">
              <div className="card">
                <div className="card-header">
                  <h6 className="fw-semibold mb-0">CONSOLITED DETAILED</h6>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Advance:</span>
                    <span className="fw-semibold">{formatAmount(collectionDetail.AdvanceAmount || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Room Collection:</span>
                    <span className="fw-semibold">{formatAmount(collectionDetail.RoomCollection || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Pending Collection:</span>
                    <span className="fw-semibold">{formatAmount(collectionDetail.PendingCollection || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Other Charges:</span>
                    <span className="fw-semibold">{formatAmount(collectionDetail.OtherChargesCollection || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Petty Receipt Cash:</span>
                    <span className="fw-semibold">{formatAmount(collectionDetail.PettyReceiptCash || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Petty Receipt Online:</span>
                    <span className="fw-semibold">{formatAmount(collectionDetail.PettyReceiptOnline || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-top border-2 pt-2 mt-2">
                    <span className="fw-bold">Total:</span>
                    <span className="fw-bold">{formatAmount(collectionDetail.Total || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>PaidOut/Refund:</span>
                    <span className="fw-semibold">{formatAmount(collectionDetail.Refund || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Petty Payment Cash:</span>
                    <span className="fw-semibold">{formatAmount(collectionDetail.PettyPaymentCash || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Petty Payment Online:</span>
                    <span className="fw-semibold">{formatAmount(collectionDetail.PettyPaymentOnline || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Driver Payment:</span>
                    <span className="fw-semibold">{formatAmount(collectionDetail.DriverAmount || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-top border-2 pt-2 mt-2">
                    <span className="fw-bold">Collection:</span>
                    <span className="fw-bold">{formatAmount(collectionDetail.FinalCoolectionAmt || 0)}</span>
                  </div>
                </div>
              </div>
            </Col>
          )}

          {collectionSummary && (
            <Col md={6}>
              <div className="card">
                <div className="card-header">
                  <h6 className="fw-semibold mb-0">BREAKUP SUMMARY</h6>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Cash:</span>
                    <span className="fw-semibold">{formatAmount(collectionSummary.Cash || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Card:</span>
                    <span className="fw-semibold">{formatAmount(collectionSummary.card || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Cheque:</span>
                    <span className="fw-semibold">{formatAmount(collectionSummary.Cheque || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Online:</span>
                    <span className="fw-semibold">{formatAmount(collectionSummary.Online || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Wallet:</span>
                    <span className="fw-semibold">{formatAmount(collectionSummary.wallet || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-top border-2 pt-2 mt-2">
                    <span className="fw-bold">Total Online Amount:</span>
                    <span className="fw-bold">{formatAmount(collectionSummary.Online || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Total Online & Cash Amount:</span>
                    <span className="fw-semibold">{formatAmount((collectionSummary.Online || 0) + (collectionSummary.Cash || 0))}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Bill on Hold:</span>
                    <span className="fw-semibold">{formatAmount(collectionSummary.BillOnHold || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Petty Receipt Online:</span>
                    <span className="fw-semibold">{formatAmount(collectionSummary.PettyReceiptOnline || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom">
                    <span>Petty Payment Online:</span>
                    <span className="fw-semibold">{formatAmount(collectionSummary.PettyPaymentOnline || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-top border-2 pt-2 mt-2">
                    <span className="fw-bold">Collection:</span>
                    <span className="fw-bold">{formatAmount(collectionSummary.FinalCollectionsummary || 0)}</span>
                  </div>
                </div>
              </div>
            </Col>
          )}
        </Row>
      )}


    </>
  );
};

ReportTable.propTypes = {
  data: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  collectionDetail: PropTypes.object,
  collectionSummary: PropTypes.object,
};

export default ReportTable;