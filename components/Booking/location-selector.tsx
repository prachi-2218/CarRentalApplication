// import { useState } from "react"
// import { ChevronDown } from "lucide-react"
// import LocationList from "./location-list"
// import Toast from "../Toast/Toast"
// import { useSelector } from "react-redux"
// import { RootState } from "../../Redux_store/store"

// export type Location = {
//   id: string
//   locationName: string
//   locationAddress: string
//   locationImageUrl: string

// }

// type LocationSelectorProps = {
//   onLocationSelect: (pickupLocation: Location | null, dropoffLocation: Location | null) => void,
//   onSave: () => void,
// }

// export default function LocationSelector({ onLocationSelect, onSave }: LocationSelectorProps) {

//   const locations=useSelector((state:RootState)=>state.locations)

//   const [pickupLocation, setPickupLocation] = useState<Location | null>(null)
//   const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null)
//   const [showPickupDropdown, setShowPickupDropdown] = useState(false)
//   const [showDropoffDropdown, setShowDropoffDropdown] = useState(false)
//   const [isEditMode, setIsEditMode] = useState(true)
//   const [validationError, setValidationError] = useState(false)
//   const [showToast, setShowToast] = useState(false)

//   const handlePickupSelect = (location: Location) => {
//     setPickupLocation(location)
//     setShowPickupDropdown(false)
//     setValidationError(false)
//     // onLocationSelect(location, dropoffLocation)
//   }

//   const handleDropoffSelect = (location: Location) => {
//     setDropoffLocation(location)
//     setShowDropoffDropdown(false)
//     setValidationError(false)
//     // onLocationSelect(pickupLocation, location)
//   }

//   const handleSave = () => {
//     if (pickupLocation && dropoffLocation) {
//       setIsEditMode(false)
//       onLocationSelect(pickupLocation, dropoffLocation)
//       setValidationError(false)

//       onSave()    // <-- NEW: Save button dabbate hi inform ReservationForm

//       setShowToast(false)
//       setTimeout(() => setShowToast(true), 0)
//     } else {
//       setValidationError(true)
//       setTimeout(() => setValidationError(false), 2000)
//     }
//   }

//   const handleChange = () => {
//     setIsEditMode(true)
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-medium mb-4">Location</h2>

//       {isEditMode ? (
//         <div className={`border border-[1.5px] ${validationError ? "border-red-500" : ""} rounded-lg p-4`}>
//           <div className="flex justify-between items-center mb-4">
//             <span className="text-sm font-medium">Select locations</span>
//             <button
//               className={`text-sm font-medium px-4 py-1 rounded cursor-pointer`}
//               onClick={handleSave}
//             >
//               Save
//             </button>
//           </div>

//           {/* Pickup location */}
//           <div className="relative mb-4">
//             <label className="text-sm text-gray-500 mb-1 block">Pick-up location</label>
//             <div
//               className={`border border-[1px] border-gray-400 ${validationError && !pickupLocation ? "border-red-500" : ""} rounded-md p-2 flex justify-between items-center cursor-pointer`}
//               onClick={() => {
//                 setShowPickupDropdown(!showPickupDropdown)
//                 setShowDropoffDropdown(false)
//               }}
//             >
//               <span className="text-black">
//                 {pickupLocation ? pickupLocation.locationName : "Select pickup location"}
//               </span>
//               <ChevronDown className="h-4 w-4 text-gray-400" />
//             </div>

//             {showPickupDropdown && (
//               <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
//                 <LocationList
//                   locations={locations}
//                   onSelect={handlePickupSelect}
//                   selectedLocationId={pickupLocation?.id}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Dropoff location */}
//           <div className="relative">
//             <label className="text-sm text-gray-500 mb-1 block">Drop-off location</label>
//             <div
//               className={`border border-[1px] border-gray-400 ${validationError && !dropoffLocation && pickupLocation ? "border-red-500" : ""} rounded-md p-2 flex justify-between items-center ${pickupLocation ? "cursor-pointer" : "opacity-70"}`}
//               onClick={() => {
//                 if (pickupLocation) {
//                   setShowDropoffDropdown(!showDropoffDropdown)
//                   setShowPickupDropdown(false)
//                 }
//               }}
//             >
//               <span className={pickupLocation ? "text-black" : "text-gray-400"}>
//                 {dropoffLocation ? dropoffLocation.locationName : "Select drop-off location"}
//               </span>
//               <ChevronDown className="h-4 w-4 text-gray-400" />
//             </div>

//             {showDropoffDropdown && pickupLocation && (
//               <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
//                 <LocationList
//                   locations={locations}
//                   onSelect={handleDropoffSelect}
//                   selectedLocationId={dropoffLocation?.id}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Error Message */}
//           <p className={`text-red-500 text-sm mt-2 ${validationError ? "" : "invisible"}`}>
//             Please select both pickup and drop-off locations
//           </p>
//         </div>
//       ) : (
//         <div className="border rounded-lg p-4">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <p className="text-sm text-gray-500">Pick-up location</p>
//               <p className="font-medium">{pickupLocation?.locationName}</p>
//             </div>
//             <button className="text-sm font-medium cursor-pointer" onClick={handleChange}>
//               Change
//             </button>
//           </div>

//           <div>
//             <p className="text-sm text-gray-500">Drop-off location</p>
//             <p className="font-medium">{dropoffLocation?.locationName}</p>
//           </div>
//         </div>
//       )}

//       {showToast && <Toast type="success" message="Locations saved successfully!" />}
//     </div>
//   )
// }



import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import LocationList from "./location-list";
import Toast from "../Toast/Toast";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux_store/store";

export type Location = {
  id: string;
  locationName: string;
  locationAddress: string;
  locationImageUrl: string;
};

type LocationSelectorProps = {
  onLocationSelect: (pickupLocation: Location | null, dropoffLocation: Location | null) => void;
  onSave: () => void;
  disablePickup?: boolean;
  disableDropoff?: boolean;
  defaultPickup?: Location | null;
  defaultDropoff?: Location | null;
};

export default function LocationSelector({
  onLocationSelect,
  onSave,
  disablePickup = false,
  disableDropoff = false,
  defaultPickup,
  defaultDropoff,
}: LocationSelectorProps) {
  const locations = useSelector((state: RootState) => state.locations);

  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [validationError, setValidationError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (defaultPickup) setPickupLocation(defaultPickup);
    if (defaultDropoff) setDropoffLocation(defaultDropoff);
  }, [defaultPickup, defaultDropoff]);

  const handlePickupSelect = (location: Location) => {
    setPickupLocation(location);
    setShowPickupDropdown(false);
    setValidationError(false);
  };

  const handleDropoffSelect = (location: Location) => {
    setDropoffLocation(location);
    setShowDropoffDropdown(false);
    setValidationError(false);
  };

  const handleSave = () => {
    if (pickupLocation && dropoffLocation) {
      setIsEditMode(false);
      onLocationSelect(pickupLocation, dropoffLocation);
      onSave();
      setValidationError(false);
      setShowToast(false);
      setTimeout(() => setShowToast(true), 0);
    } else {
      setValidationError(true);
      setTimeout(() => setValidationError(false), 2000);
    }
  };

  const handleChange = () => {
    setIsEditMode(true);
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Location</h2>

      {isEditMode ? (
        <div
          className={`border border-[1.5px] ${validationError ? "border-red-500" : ""} rounded-lg p-4`}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Select locations</span>
            <button className="text-sm font-medium px-4 py-1 rounded cursor-pointer" onClick={handleSave}>
              Save
            </button>
          </div>

          {/* Pickup location */}
          <div className="relative mb-4">
            <label className="text-sm text-gray-500 mb-1 block">Pick-up location</label>
            <div
              className={`border border-[1px] border-gray-400 ${
                validationError && !pickupLocation ? "border-red-500" : ""
              } rounded-md p-2 flex justify-between items-center ${
                disablePickup ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => {
                if (!disablePickup) {
                  setShowPickupDropdown(!showPickupDropdown);
                  setShowDropoffDropdown(false);
                }
              }}
            >
              <span className="text-black">
                {pickupLocation ? pickupLocation.locationName : "Select pickup location"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>

            {showPickupDropdown && !disablePickup && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                <LocationList
                  locations={locations}
                  onSelect={handlePickupSelect}
                  selectedLocationId={pickupLocation?.id}
                />
              </div>
            )}
          </div>

          {/* Dropoff location */}
          <div className="relative">
            <label className="text-sm text-gray-500 mb-1 block">Drop-off location</label>
            <div
              className={`border border-[1px] border-gray-400 ${
                validationError && !dropoffLocation && pickupLocation ? "border-red-500" : ""
              } rounded-md p-2 flex justify-between items-center ${
                pickupLocation && !disableDropoff ? "cursor-pointer" : "opacity-70"
              }`}
              onClick={() => {
                if (pickupLocation && !disableDropoff) {
                  setShowDropoffDropdown(!showDropoffDropdown);
                  setShowPickupDropdown(false);
                }
              }}
            >
              <span className={pickupLocation ? "text-black" : "text-gray-400"}>
                {dropoffLocation ? dropoffLocation.locationName : "Select drop-off location"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>

            {showDropoffDropdown && pickupLocation && !disableDropoff && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                <LocationList
                  locations={locations}
                  onSelect={handleDropoffSelect}
                  selectedLocationId={dropoffLocation?.id}
                />
              </div>
            )}
          </div>

          <p className={`text-red-500 text-sm mt-2 ${validationError ? "" : "invisible"}`}>
            Please select both pickup and drop-off locations
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-500">Pick-up location</p>
              {/* <p className="font-medium">{pickupLocation?.locationName}</p> */}
             
              <p className="font-medium">{pickupLocation?.locationName || defaultPickup?.locationName}</p>

            </div>
            <button className="text-sm font-medium cursor-pointer" onClick={handleChange}>
              Change
            </button>
          </div>

          <div>
            <p className="text-sm text-gray-500">Drop-off location</p>
            <p className="font-medium">{dropoffLocation?.locationName}</p>
            {/* <p className="font-medium">{dropoffLocation?.locationName || defaultDropoff?.locationName}</p> */}

          </div>
        </div>
      )}

      {showToast && <Toast type="success" message="Locations saved successfully!" />}
    </div>
  );
}

