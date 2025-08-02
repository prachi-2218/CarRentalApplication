
import React, { useEffect, useState, ChangeEvent } from "react";
import "./CarSelector.css";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import {
  updateFilter,
  resetFilters,
  // setDropoffOptions,
} from "../../Redux_store/slices/carSlice";
import { RootState } from "../../Redux_store/store";
import { useFindCarApi } from "../API/fetch_car";
// import { userFindLocation } from "../API/fetch_location";

// const availableLocations = ["New York", "Miami", "Los Angeles"];



const CarSelector: React.FC = () => {
  const {findCarApiCall}=useFindCarApi()
  const availableLocations=useSelector((state:RootState)=>state.locations)
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.carFilter);

  const [toastMessage, setToastMessage] = useState("");
  const [loader,set_loader]=useState<boolean>(false)

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handlePickupDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedPickupDate = e.target.value;
    dispatch(updateFilter({ key: "pickupDate", value: selectedPickupDate }));
    
  };

  const handleDropoffDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDropoffDate = e.target.value;
    const pickupDate = new Date(filters.pickupDate);
    const dropoffDate = new Date(selectedDropoffDate);
    if (dropoffDate < pickupDate) {
      dispatch(updateFilter({ key: "dropoffDate", value: filters.pickupDate }));
    } else {
      dispatch(updateFilter({ key: "dropoffDate", value: selectedDropoffDate }));
    }
  };

  const handlePickupLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPickupLocation = e.target.value;
    dispatch(updateFilter({ key: "pickupLocation", value: selectedPickupLocation }));

    if (selectedPickupLocation) {
      // const updatedDropoffOptions = availableLocations.filter(
      //   (loc) => loc.locationName !== selectedPickupLocation
      // );
      // dispatch(setDropoffOptions(updatedDropoffOptions));
      dispatch(updateFilter({ key: "pickupLocation", value: e.target.value }));
    }
  };

  const handleDropoffLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFilter({ key: "dropoffLocation", value: e.target.value }));
  };

  const handleSearch = async() => {
    if (
     
      !(
        filters.carCategory ||
        filters.engineType ||
        filters.gearbox ||
        filters.maxPrice ||
        filters.minPrice ||
         filters.pickupLocation ||
      filters.dropoffLocation ||
      filters.pickupDate ||
      filters.dropoffDate 
      )
    ) {
      setToastMessage("Choose Some Filters First");
      return;
    }

    console.log("Selected Filters:", filters);
    set_loader(true)
    await findCarApiCall(1,filters.pickupLocation,filters.dropoffLocation,filters.pickupDate,filters.dropoffDate,filters.carCategory,filters.gearbox,filters.engineType,filters.minPrice,filters.maxPrice)
    set_loader(false)
    if (location.pathname === "/") navigate("/cars");
    setToastMessage("");
  };

  const clearFilters = () => {
    findCarApiCall(1)
    dispatch(resetFilters());
  };

  return (
    <div className="px-[10px]">
      <div className="car-filters-container" style={{ position: "relative" }}>
        {toastMessage && (
          <div className="toast_filter">
            <span>{toastMessage}</span>
            <button className="close-btn" onClick={() => setToastMessage("")}>
              &times;
            </button>
          </div>
        )}

        <div className="clear-filters" onClick={clearFilters}>
          Clear All Filters
        </div>

        <div className="row">
          <div className="field compact">
            <label>Pick-up location</label>
            <select value={filters.pickupLocation} onChange={handlePickupLocationChange}>
              <option value="">Choose Location</option>
              {availableLocations.map((location, index) => (
                <option key={index} value={location.id}>
                  {location.locationName}
                </option>
              ))}
            </select>
          </div>

          <div className={`field compact`}>
            <label className="gray-label">Drop-off location</label>
            <select
              value={filters.dropoffLocation}
              onChange={handleDropoffLocationChange}
            >
              <option value="">Choose Location</option>
              {availableLocations.map((location, index) => (
                <option key={index} value={location.id}>
                  {location.locationName}
                </option>
              ))}
            </select>
          </div>

          <div className="field compact">
            <label className="gray-label">Pick-up Date</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={filters.pickupDate}
              onChange={handlePickupDateChange}
            />
          </div>

          <div className="field compact">
            <label className="gray-label">Drop-off Date</label>
            <input
              type="date"
              value={filters.dropoffDate}
              onChange={handleDropoffDateChange}
              min={filters.pickupDate}
            />
          </div>
        </div>

        <div className="row second-row">
          <div className="field compact">
            <label className="gray-label">Car category</label>
            <select
              value={filters.carCategory}
              onChange={(e) =>
                dispatch(updateFilter({ key: "carCategory", value: e.target.value }))
              }
            >
              <option value="">Select Category</option>
              <option value="Passenger Car">Passenger Car</option>
              <option value="SUV">SUV</option>
            </select>
          </div>

          <div className="field compact">
            <label className="gray-label">Gearbox</label>
            <select
              value={filters.gearbox}
              onChange={(e) =>
                dispatch(updateFilter({ key: "gearbox", value: e.target.value as number|string }))
              }
            >
              <option value="">Select Gearbox</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div className="field compact">
            <label className="gray-label">Type of engine</label>
            <select
              value={filters.engineType}
              onChange={(e) =>
                dispatch(updateFilter({ key: "engineType", value: e.target.value }))
              }
            >
              <option value="">Select Engine Type</option>
              {["Diesel", "Petrol", "Electric", "Hybrid"].map((engine, index) => (
                <option key={index} value={engine}>
                  {engine}
                </option>
              ))}
            </select>
          </div>

  

<div className="w-full max-w-md bg-[#fffaf3]">
  <div className="flex justify-between items-center mb-2">
    <span className="text-gray-600 text-sm">Price per day</span>
    <span className="text-black text-sm font-semibold">
      ${filters.minPrice} - ${filters.maxPrice}
    </span>
  </div>

  <div className="relative h-6">
    {/* Full gray track */}
    <div className="absolute top-1/2 transform -translate-y-1/2 h-1 w-full bg-gray-300 rounded" />

    {/* Red selected range */}
    <div
      className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-red-600 rounded"
      style={{
        left: `${((filters.minPrice - 0) / (10000 - 0)) * 100}%`,
        right: `${100 - ((filters.maxPrice - 0) / (10000 - 0)) * 100}%`,
      }}
    />

    {/* Range Inputs */}
    <input
      type="range"
      min={0}
      max={10000}
      value={filters.minPrice}
      onChange={(e) =>
        dispatch(
          updateFilter({
            key: "minPrice",
            value: Math.min(Number(e.target.value), filters.maxPrice - 1),
          })
        )
      }
      className="absolute w-full h-6 appearance-none pointer-events-none"
    />
    <input
      type="range"
      min={0}
      max={10000}
      value={filters.maxPrice}
      onChange={(e) =>
        dispatch(
          updateFilter({
            key: "maxPrice",
            value: Math.max(Number(e.target.value), filters.minPrice + 1),
          })
        )
      }
      className="absolute w-full h-6 appearance-none pointer-events-none"
    />

    {/* Thumb styling */}
    <style >{`
      input[type='range']::-webkit-slider-thumb {
        appearance: none;
        height: 20px;
        width: 6px;
        background: #d32f2f;
        border-radius: 3px;
        margin-top: -2px;
        pointer-events: all;
        cursor: pointer;
      }
      input[type='range']::-moz-range-thumb {
        height: 20px;
        width: 10px;
        background: #d32f2f;
        border: none;
        border-radius: 3px;
        pointer-events: all;
        cursor: pointer;
      }
    `}</style>
  </div>
</div>


          <button className={`find-btn ${loader ? "bg-red-600/60" : "bg-red-500"} cursor-pointer h-[80%] w-full rounded-3xl flex items-center justify-center`} onClick={handleSearch} disabled={loader}>
            <div className="w-[50%]">
              {
                 loader ? "Finding" : "Find a car"
              }
            </div>
            <div className="w-[5%]">
              {
                loader ? 
                <Loader/> : ""
              }
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarSelector;
