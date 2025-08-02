import React, { useEffect, useRef, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/footer";
import Main_Heading from "../Heading/Main_Heading";
import DatePicker_report from "../car-selection-components/Datepicker_report";
import ReportTable from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux_store/store";
import { setLocations } from "../../Redux_store/slices/locationSlice";
import Toast from "../Toast/Toast";
import { exportToPDF, exportToExcel } from "./exportReports";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router";

const Dashboard: React.FC = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [fetchAttempted, setFetchAttempted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState("");
  const [reportData, setReportData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.login);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "alert";
  } | null>(null);

  const [selectedRange, setSelectedRange] = useState<{
    pickupDate: Date | null;
    dropoffDate: Date | null;
  }>({
    pickupDate: null,
    dropoffDate: null,
  });

  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.locations);

  const datePickerRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);

  const isValidDate = (date: any): date is Date =>
    date instanceof Date && !isNaN(date.getTime());

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

  const displayPeriod =
    isValidDate(selectedRange.pickupDate) &&
    isValidDate(selectedRange.dropoffDate)
      ? `${formatDate(selectedRange.pickupDate)} - ${formatDate(
          selectedRange.dropoffDate
        )}`
      : "Period";

  const allowPastDates = true;

  const columnLabelMap: { [key: string]: string } = {
    startDate: "Period Start",
    endDate: "Period End",
    location: "Location",
    carModel: "Car Model",
    carID: "Car ID",
    daysPerCar: "Days of Rent (per car)",
    resDuringPeriod: "Reservations during Period",
    begMilage: "Mileage at the beginning of the period (km)",
    endMilage: "Mileage at the end of the period (km)",
    totalKilometers:
      "Total number of kilometers traveled during the period (km)",
    AvgMilage: "Average mileage per reservation (km)",
    deltaAvgMilage: "Delta of Average mileage to previous period (%)",
    avgFeedback: "Average Feedback (1 to 5)",
    minFeedback: "Minimum Feedback (1 to 5)",
    deltaAvgFeedback: "Delta of Average Feedback to previous period %",
    revenue: "Revenue for reservations finished within reported period",
    deltaRevenue: "Delta of revenue for reservations to previous period %",
    username: "Support Agent",
    email: "Support Agent email",
    bookingsHandled: "Bookings handled by Support Agent",
    agency: "CarRent Agency",
    deltaFeedbackStaff: "Delta of minimum Feedback to previous period (%)",
    revenueStaff: "Revenue (EUR)",
    deltaRevenueStaff: "Delta of revenue to previous period (%)",
  };

  const displayColumns = columns.map((key) => ({
    key,
    label: columnLabelMap[key] || key,
  }));

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/home/locations"
        );
        const data = await response.json();
        if (Array.isArray(data.content)) {
          const normalizedLocations = data.content.map((loc: any) => ({
            id: loc.id || "",
            locationName: loc.locationName,
            locationAddress: loc.locationAddress,
            locationImageUrl: loc.locationImageUrl,
          }));
          dispatch(setLocations(normalizedLocations));
        }
      } catch (error) {
        setToast({ type: "alert", message: "Failed to fetch locations." });
      }
    };
    fetchLocations();
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDatePickerOpen &&
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsDatePickerOpen(false);
      }
      if (
        isDownloadOpen &&
        downloadRef.current &&
        !downloadRef.current.contains(event.target as Node)
      ) {
        setIsDownloadOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDatePickerOpen, isDownloadOpen]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const formatToLocalISODate = (date: Date): string => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchReportData = async () => {
    setFetchAttempted(true);
    if (
      !reportType ||
      !selectedRange.pickupDate ||
      !selectedRange.dropoffDate
    ) {
      setToast({
        type: "alert",
        message: "Please select Date Range and Report Type.",
      });
      return;
    }
    setLoading(true);

    const startDate = formatToLocalISODate(selectedRange.pickupDate);
    const endDate = formatToLocalISODate(selectedRange.dropoffDate);

    const apiUrl = `https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/reports?startDate=${startDate}&endDate=${endDate}&reportType=${encodeURIComponent(
      reportType
    )}${selectedLocationId ? `&locationId=${selectedLocationId}` : ""}`;

    try {
      const response = await fetch(apiUrl);
      const json = await response.json();

      if (json.success) {
        const report = json.data.report;
        if (report.length > 0) {
          setReportData(report);
          setColumns(Object.keys(report[0]));
          setToast({
            type: "success",
            message: "Report generated successfully!",
          });
        } else {
          setReportData([]);
          setColumns([]);
        }
      } else {
        setToast({ type: "alert", message: "Failed to fetch report." });
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <>
      <Header />
      <Main_Heading heading="Dashboard" />

      <div className="bg-[#fffbf3] p-6 rounded-md">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4">
            <select
              className="border border-gray-300 rounded-md px-4 py-2 min-w-[200px] bg-[#fffbf3]"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="" disabled hidden>
                Report type
              </option>
              <option value="staff performance">Staff Performance</option>
              <option value="sales report">Sales Report</option>
            </select>

            <button
              onClick={() => {
                setIsDownloadOpen(false);
                setIsDatePickerOpen(true);
              }}
              className="border border-gray-300 rounded-md px-4 py-2 min-w-[200px] bg-[#fffbf3] text-left"
            >
              {displayPeriod}
            </button>

            <select
              className="border border-gray-300 rounded-md px-4 py-2 min-w-[200px] bg-[#fffbf3]"
              value={selectedLocationId}
              onChange={(e) => setSelectedLocationId(e.target.value)}
            >
              <option value="" disabled hidden>
                Location
              </option>
              {Array.isArray(locations) &&
                locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.locationName}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => {
                setIsDatePickerOpen(false);
                setIsDownloadOpen(false);
                fetchReportData();
              }}
              className="bg-red-600 text-white rounded-full px-6 py-2 hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  Creating
                  <Loader />
                </div>
              ) : (
                "Create report"
              )}
            </button>

            <div className="flex flex-col items-end gap-2">
              <button
                className="flex items-center gap-1 border px-4 py-2 rounded-md bg-white shadow"
                onClick={() => {
                  setIsDatePickerOpen(false);
                  setIsDownloadOpen((prev) => !prev);
                }}
              >
                Download
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 14a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm7-10a1 1 0 00-1 1v6.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V5a1 1 0 00-1-1z" />
                </svg>
              </button>

              {isDownloadOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        exportToPDF(reportData, columns);
                        setIsDownloadOpen(false);
                      }}
                    >
                      Export PDF
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        exportToExcel(reportData, "xls");
                        setIsDownloadOpen(false);
                      }}
                    >
                      Export XLS
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        exportToExcel(reportData, "csv");
                        setIsDownloadOpen(false);
                      }}
                    >
                      Export CSV
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isDatePickerOpen && (
        <div className="relative z-50">
          <div className="" ref={datePickerRef}>
            <DatePicker_report
              showMonths={2}
              showTime={false}
              minDate={allowPastDates ? new Date(2000, 0, 1) : new Date()}
              allowPastDates={true}
              send_data_to_parent={(
                _,
                __,
                ___,
                ____,
                _____,
                ______,
                _pickupDate,
                _dropoffDate
              ) => {
                if (
                  _pickupDate instanceof Date &&
                  _dropoffDate instanceof Date &&
                  !isNaN(_pickupDate.getTime()) &&
                  !isNaN(_dropoffDate.getTime())
                ) {
                  setSelectedRange({
                    pickupDate: _pickupDate,
                    dropoffDate: _dropoffDate,
                  });
                }
                setIsDatePickerOpen(false);
              }}
            />
          </div>
        </div>
      )}

      <div className="mt-8 px-6">
        {reportData.length > 0 ? (
          <ReportTable columns={displayColumns} data={reportData} />
        ) : fetchAttempted ? (
          <div className="text-center text-gray-500 text-[50px]">
            No details found
          </div>
        ) : null}
      </div>

      <div style={{ height: "250px" }}></div>
      <Footer />
      {toast && (
        <Toast type={toast.type} message={toast.message} duration={3000} />
      )}
    </>
  );
};

export default Dashboard;
