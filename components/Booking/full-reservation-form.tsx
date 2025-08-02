


// import { useEffect, useState } from "react";
// import DateTimeSection from "./date-time-section";
// import Toast from "../Toast/Toast";
// import LocationSelector from "./location-selector";
// import { Location } from "./location-selector";
// import { useNavigate } from "react-router";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../Redux_store/store";
// import { Car } from "../../Redux_store/slices/carCardGridSlice";
// import { useBookingApi } from "../API/book_car";
// import Loader from "../Loader/Loader";
// import { set_booking_toast , updateBookingInRedux } from "../../Redux_store/slices/bookingSlice";

// interface ReservationFormProps {
//   car_info: Car;
//   isEditMode?: boolean;
//   bookingData?: any;
//   canEditPickup?: boolean;
//   canEditDropoff?: boolean;
// }

// export default function ReservationForm({
//   car_info,
//   isEditMode = false,
//   bookingData,
//   canEditPickup = true,
//   canEditDropoff = true,
// }: ReservationFormProps) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { bookCar } = useBookingApi();

//   const login_info = useSelector((state: RootState) => state.user);
//   const locations = useSelector((state: RootState) => state.locationMeta);

//   const [pickupDate, setPickupDate] = useState<Date | null>(null);
//   const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
//   const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
//   const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
//   const [locationsSaved, setLocationsSaved] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const [toastType, setToastType] = useState<"success" | "alert">("alert");
//   const [loader, set_loader] = useState(false);

//   // Pre-fill fields in edit mode
//   useEffect(() => {
//     if (isEditMode && bookingData) {
//       const pickupLoc = locations[bookingData.pickupLocationId];
//       const dropoffLoc = locations[bookingData.dropoffLocationId];
//       if (pickupLoc) setPickupLocation({ ...pickupLoc, id: bookingData.pickupLocationId });
//       if (dropoffLoc) setDropoffLocation({ ...dropoffLoc, id: bookingData.dropoffLocationId });
      
//       const pickupDateObj = new Date(bookingData.pickupDate);
//     const dropoffDateObj = new Date(bookingData.dropoffDate);

//     if (!isNaN(pickupDateObj.getTime())) setPickupDate(pickupDateObj);
//     if (!isNaN(dropoffDateObj.getTime())) setDropoffDate(dropoffDateObj);
//     }
//   }, [isEditMode, bookingData, locations]);

//   const handleLocationSelect = (pickupLoc: Location | null, dropoffLoc: Location | null) => {
//     setPickupLocation(pickupLoc);
//     setDropoffLocation(dropoffLoc);
//     setLocationsSaved(false);
//   };

//   const handleDateTimeSelect = (pickupDt: Date, dropoffDt: Date) => {
//     setPickupDate(pickupDt);
//     setDropoffDate(dropoffDt);
//   };

//   const handleButtonClick = () => {
//     setShowToast(false);
    
//     setTimeout(async () => {

      


//       if ((pickupLocation && dropoffLocation) && !locationsSaved) {
//         const pickupSame = pickupDate?.toISOString() === new Date(bookingData.pickupDate).toISOString();
//         const dropoffSame = dropoffDate?.toISOString() === new Date(bookingData.dropoffDate).toISOString();
//         const pickupLocSame = pickupLocation?.id === bookingData.pickupLocationId;
//         const dropoffLocSame = dropoffLocation?.id === bookingData.dropoffLocationId;

//   if (pickupSame && dropoffSame && pickupLocSame && dropoffLocSame) {
//     setToastMessage("No changes were made to the booking.");
//     setToastType("alert");
//     setShowToast(true);
//     return;
//   }
//         setToastMessage("Save the selected locations first!");
//         setToastType("alert");
//         setShowToast(true);
//         return;
//       }

//       if (!pickupLocation || !dropoffLocation || !pickupDate || !dropoffDate) {
//         setToastMessage("Please fill the required details first");
//         setToastType("alert");
//         setShowToast(true);
//         return;
//       }

//       // if (login_info.login) {
//       //   set_loader(true);
//       //   const res = await bookCar(pickupDate, dropoffDate, car_info.carId, pickupLocation.id, dropoffLocation.id, car_info.model);
//       //   if (res?.success) {
//       //     dispatch(set_booking_toast({ status: true, message: res.message, type: "success" }));
//       //     setTimeout(() => dispatch(set_booking_toast({ status: false, message: "", type: "alert" })), 4000);
//       //     navigate("/mybookings");
//       //   } else {
//       //     setToastType("alert");
//       //     setToastMessage(res?.message || "Reservation failed");
//       //     setShowToast(true);
//       //   }
//       //   set_loader(false);
//       // } else {
//       //   setToastMessage("Login First");
//       //   setToastType("alert");
//       //   setShowToast(true);
//       //   setTimeout(() => navigate("/login"), 1000);
//       // }



//        if (!login_info.login) {
//       setToastMessage("Login First");
//       setToastType("alert");
//       setShowToast(true);
//       setTimeout(() => navigate("/login"), 1000);
//       return;
//     }

//     set_loader(true);

//     if (isEditMode && bookingData) {
//       // ✅ EDIT MODE FLOW
//       const res = await updateBooking(bookingData.id, {
//         pickupLocationId: pickupLocation.id,
//         dropoffLocationId: dropoffLocation.id,
//         pickupDate: pickupDate.toISOString(),
//         dropoffDate: dropoffDate.toISOString(),
//       });

//       if (res?.success) {
//         dispatch(updateBookingInRedux({
//           id: bookingData.id,
//           data: {
//             pickupLocationId: pickupLocation.id,
//             dropoffLocationId: dropoffLocation.id,
//             pickupDate: pickupDate.toISOString(),
//             dropoffDate: dropoffDate.toISOString(),
//           }
//         }));

//         dispatch(set_booking_toast({ status: true, message: res.message, type: "success" }));
//         setTimeout(() => dispatch(set_booking_toast({ status: false, message: "", type: "alert" })), 4000);
//         navigate("/mybookings");
//       } else {
//         setToastType("alert");
//         setToastMessage(res?.message || "Update failed");
//         setShowToast(true);
//       }
//     } else {
//       // 🆕 CREATE NEW BOOKING
//       const res = await bookCar(pickupDate, dropoffDate, car_info.carId, pickupLocation.id, dropoffLocation.id, car_info.model);

//       if (res?.success) {
//         dispatch(set_booking_toast({ status: true, message: res.message, type: "success" }));
//         setTimeout(() => dispatch(set_booking_toast({ status: false, message: "", type: "alert" })), 4000);
//         navigate("/mybookings");
//       } else {
//         setToastType("alert");
//         setToastMessage(res?.message || "Reservation failed");
//         setShowToast(true);
//       }
//     }

//     set_loader(false);
//     }, 50);

    


//   };

//   return (
//     <div className="max-w-4xl p-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-6">
//           {/* Personal Info */}
//           <div>
//             <h2 className="text-xl font-medium mb-4">Personal info</h2>
//             <div className="border border-[1.5px] rounded-lg p-4">
//               <p className="text-sm m-0">{login_info.firstname}</p>
//               <p className="text-sm text-gray-600 m-0">{login_info.email}</p>
//               <p className="text-sm text-gray-600 m-0">+38 111 111 11 11</p>
//             </div>
//           </div>

//           {/* Locations */}
//           <LocationSelector
//             onLocationSelect={handleLocationSelect}
//             onSave={() => setLocationsSaved(true)}
//             disablePickup={!canEditPickup}
//             disableDropoff={!canEditDropoff}
//             defaultPickup={pickupLocation}
//             defaultDropoff={dropoffLocation}
//           />

//           {/* Date & Time */}
//           <DateTimeSection
//   onDateTimeSelect={handleDateTimeSelect}
//   defaultPickupDate={pickupDate ?? undefined}
//   defaultDropoffDate={dropoffDate ?? undefined}
//   disablePickup={!canEditPickup}
//   disableDropoff={!canEditDropoff}
// />

//         </div>

//         {/* Car Info */}
//         <div className="bg-gray-100 h-full md:h-[420px] md:w-[85%] rounded-xl p-4">
//           <div className="aspect-video bg-gray-200 rounded-lg mb-4">
//             <img className="rounded-xl object-fill h-full w-full" src={car_info.imageUrl} alt="car" />
//           </div>
//           <h3 className="text-lg font-bold">{car_info.model}</h3>
//           <p className="text-gray-600 mb-2 text-md">{locations[car_info.location]?.locationName}</p>

//           <div className="space-y-2 mb-6 border-t-[1.5px] border-t-gray-300">
//             <div className="flex justify-between text-lg font-semibold mt-2">
//               <span>Total</span>
//               <span>$ {car_info.pricePerDay}</span>
//             </div>
//             <div className="flex justify-between text-sm text-gray-600">
//               <span>Deposit: $ 2000</span>
//             </div>
//           </div>

//           <button
//             className="w-full flex justify-center bg-red-600 text-white py-2 rounded-full font-medium cursor-pointer"
//             onClick={handleButtonClick}
//             disabled={loader}
//             style={loader ? { backgroundColor: "rgba(255, 0, 0, 0.6)" } : {}}
//           >
//             {/* <div className="w-[150px]">{loader ? "Reserving Car" : "Confirm reservation"}</div> */}
//             <div className="w-[150px]">
//             {loader ? (isEditMode ? "Saving..." : "Reserving Car") : (isEditMode ? "Save" : "Confirm reservation")}
//             </div>

//             {loader && <Loader />}
//           </button>

//           {showToast && <Toast type={toastType} message={toastMessage} />}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import DateTimeSection from "./date-time-section";
import Toast from "../Toast/Toast";
import LocationSelector, { Location } from "./location-selector";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux_store/store";
import { Car } from "../../Redux_store/slices/carCardGridSlice";
import { useBookingApi } from "../API/book_car";
import Loader from "../Loader/Loader";
import { set_booking_toast, updateBookingInRedux } from "../../Redux_store/slices/bookingSlice";

interface ReservationFormProps {
  car_info: Car;
  isEditMode?: boolean;
  bookingData?: any;
  canEditPickup?: boolean;
  canEditDropoff?: boolean;
  defaultPickupDate?: Date;
  defaultDropoffDate?: Date;
  defaultPickupLocationId?: string;
  defaultDropoffLocationId?: string;
}

export default function ReservationForm({
  car_info,
  isEditMode = false,
  bookingData,
  canEditPickup = true,
  canEditDropoff = true,
  defaultPickupDate,
 defaultDropoffDate,
  defaultPickupLocationId,
  defaultDropoffLocationId,
}: ReservationFormProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookCar, updateBooking } = useBookingApi();

  const login_info = useSelector((state: RootState) => state.user);
  const locations = useSelector((state: RootState) => state.locationMeta);

  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [locationsSaved, setLocationsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "alert">("alert");
  const [loader, set_loader] = useState(false);

  // useEffect(() => {
  //   if (isEditMode && bookingData) {
  //     const pickupLoc = locations[bookingData.pickupLocationId];
  //     const dropoffLoc = locations[bookingData.dropoffLocationId];

  //     if (pickupLoc) setPickupLocation({ ...pickupLoc, id: bookingData.pickupLocationId });
  //     if (dropoffLoc) setDropoffLocation({ ...dropoffLoc, id: bookingData.dropoffLocationId });

  //     const pickupDateObj = new Date(bookingData.pickupDate);
  //     const dropoffDateObj = new Date(bookingData.dropoffDate);

  //     if (!isNaN(pickupDateObj.getTime())) setPickupDate(pickupDateObj);
  //     if (!isNaN(dropoffDateObj.getTime())) setDropoffDate(dropoffDateObj);
  //   }
  // }, [isEditMode, bookingData, locations]);


  useEffect(() => {
    if (isEditMode && bookingData) {
      // 1) dates
      if (defaultPickupDate)  setPickupDate(defaultPickupDate);
      if (defaultDropoffDate) setDropoffDate(defaultDropoffDate);

      // 2) locations (lookup from your locationMeta slice by ID)
      const pLoc = defaultPickupLocationId
        ? locations[defaultPickupLocationId]
        : null;
      const dLoc = defaultDropoffLocationId
        ? locations[defaultDropoffLocationId]
        : null;
      if (pLoc) setPickupLocation({ ...pLoc, id: defaultPickupLocationId! });
      if (dLoc) setDropoffLocation({ ...dLoc, id: defaultDropoffLocationId! });
    }
  }, [
    isEditMode,
    bookingData,
    defaultPickupDate,
    defaultDropoffDate,
    defaultPickupLocationId,
    defaultDropoffLocationId,
  ]);

  const handleLocationSelect = (pickupLoc: Location | null, dropoffLoc: Location | null) => {
    setPickupLocation(pickupLoc);
    setDropoffLocation(dropoffLoc);
    setLocationsSaved(false);
  };

  const handleDateTimeSelect = (pickupDt: Date, dropoffDt: Date) => {
    setPickupDate(pickupDt);
    setDropoffDate(dropoffDt);
  };

  const handleButtonClick = () => {
    setShowToast(false);

    setTimeout(async () => {
      if (!pickupLocation || !dropoffLocation || !pickupDate || !dropoffDate) {
        setToastMessage("Please fill the required details first");
        setToastType("alert");
        setShowToast(true);
        return;
      }
        if (isEditMode && bookingData) {
      const pickupSame =
        pickupDate.toISOString() === new Date(bookingData.pickupDate).toISOString();
      const dropoffSame =
        dropoffDate.toISOString() === new Date(bookingData.dropoffDate).toISOString();
      const pickupLocSame = pickupLocation.id === bookingData.pickupLocationId;
      const dropoffLocSame = dropoffLocation.id === bookingData.dropoffLocationId;

      if (pickupSame && dropoffSame && pickupLocSame && dropoffLocSame) {
        setToastMessage("No changes were made to the booking.");
        setToastType("alert");
        setShowToast(true);
        return;
      }
    }

      if (!locationsSaved) {
        const pickupSame = pickupDate?.toISOString() === new Date(bookingData?.pickupDate).toISOString();
        const dropoffSame = dropoffDate?.toISOString() === new Date(bookingData?.dropoffDate).toISOString();
        const pickupLocSame = pickupLocation?.id === bookingData?.pickupLocationId;
        const dropoffLocSame = dropoffLocation?.id === bookingData?.dropoffLocationId;

        if (pickupSame && dropoffSame && pickupLocSame && dropoffLocSame) {
          setToastMessage("No changes were made to the booking.");
          setToastType("alert");
          setShowToast(true);
          return;
        }

        setToastMessage("Save the selected locations first!");
        setToastType("alert");
        setShowToast(true);
        return;
      }

      if (!login_info.login) {
        setToastMessage("Login First");
        setToastType("alert");
        setShowToast(true);
        setTimeout(() => navigate("/login"), 1000);
        return;
      }

      set_loader(true);

  //     if (isEditMode && bookingData) {
  //       const res = await updateBooking(
  //   bookingData.id,
  //   login_info.clientId!,
  //   {
  //     pickupLocationId: pickupLocation.id,
  //     dropoffLocationId: dropoffLocation.id,
  //     pickupDate: pickupDate.toISOString(),
  //     dropoffDate: dropoffDate.toISOString(),
  //   }
  // );;


  //       if (res?.success) {
  //         dispatch(updateBookingInRedux({
  //           id: bookingData.id,
  //           data: {
  //             pickupLocationId: pickupLocation.id,
  //             dropoffLocationId: dropoffLocation.id,
  //             pickupDate: pickupDate.toISOString(),
  //             dropoffDate: dropoffDate.toISOString(),
  //           }
  //         }));

  //         dispatch(set_booking_toast({ status: true, message: res.message, type: "success" }));
  //         setTimeout(() => dispatch(set_booking_toast({ status: false, message: "", type: "alert" })), 4000);
  //         navigate("/mybookings");
  //       } else {
  //         setToastType("alert");
  //         setToastMessage(res?.message || "Update failed");
  //         setShowToast(true);
  //       }
  //     } 
  if (isEditMode && bookingData) {
    console.log("clientId", login_info.clientId);
    console.log("bookingData", bookingData.id);
    console.log("pickupLocation", pickupLocation.id);
    console.log("dropoffLocation", dropoffLocation.id);
    console.log("pickupDate", pickupDate);
    console.log("dropoffDate", dropoffDate);
    set_loader(true);
  const res = await updateBooking({
    clientId: login_info.clientId!,
    bookingId: bookingData.id,
    pickupLocationId: pickupLocation.id,
    dropoffLocationId: dropoffLocation.id,
    pickupDate: pickupDate.toISOString(),
    dropoffDate: dropoffDate.toISOString(),
  });
  set_loader(false);

  

  if (res.success) {
    dispatch(updateBookingInRedux({
      id: bookingData.id,
      data: {
        pickupLocationId: pickupLocation.id,
        dropoffLocationId: dropoffLocation.id,
        pickupDate: pickupDate.toISOString(),
        dropoffDate: dropoffDate.toISOString(),
      },
    }));

     dispatch(set_booking_toast({ status: true, message: res.message, type: "success" }));
      setTimeout(() => dispatch(set_booking_toast({ status: false, message: "", type: "alert" })), 4000);
    navigate("/mybookings");
  } else {
    setToastType("alert");
    setToastMessage(res?.message || "Update failed");
    setShowToast(true);
  }
  return;
}

       else {
        const res = await bookCar(pickupDate, dropoffDate, car_info.carId, pickupLocation.id, dropoffLocation.id);

        if (res?.success) {
          dispatch(set_booking_toast({ status: true, message: res.message, type: "success" }));
          setTimeout(() => dispatch(set_booking_toast({ status: false, message: "", type: "alert" })), 4000);
          navigate("/mybookings");
        } else {
          setToastType("alert");
          setToastMessage(res?.message || "Reservation failed");
          setShowToast(true);
        }
      }

      set_loader(false);
    }, 50);
  };

  return (
    <div className="max-w-4xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-medium mb-4">Personal info</h2>
            <div className="border border-[1.5px] rounded-lg p-4">
              <p className="text-sm m-0">{login_info.firstname}</p>
              <p className="text-sm text-gray-600 m-0">{login_info.email}</p>
              <p className="text-sm text-gray-600 m-0">+38 111 111 11 11</p>
            </div>
          </div>

          <LocationSelector
            onLocationSelect={handleLocationSelect}
            onSave={() => setLocationsSaved(true)}
            disablePickup={!canEditPickup}
            disableDropoff={!canEditDropoff}
            defaultPickup={pickupLocation}
            defaultDropoff={dropoffLocation}
          />

          <DateTimeSection
            onDateTimeSelect={handleDateTimeSelect}
            defaultPickupDate={pickupDate ?? undefined}
            defaultDropoffDate={dropoffDate ?? undefined}
            disablePickup={!canEditPickup}
            disableDropoff={!canEditDropoff}
          />
        </div>

        <div className="bg-gray-100 h-full md:h-[420px] md:w-[85%] rounded-xl p-4">
          <div className="aspect-video bg-gray-200 rounded-lg mb-4">
            <img className="rounded-xl object-fill h-full w-full" src={car_info.imageUrl} alt="car" />
          </div>
          <h3 className="text-lg font-bold">{car_info.model}</h3>
          <p className="text-gray-600 mb-2 text-md">{locations[car_info.location]?.locationName}</p>

          <div className="space-y-2 mb-6 border-t-[1.5px] border-t-gray-300">
            <div className="flex justify-between text-lg font-semibold mt-2">
              <span>Total</span>
              <span>$ {car_info.pricePerDay}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Deposit: $ 2000</span>
            </div>
          </div>

          <button
            className="w-full flex justify-center bg-red-600 text-white py-2 rounded-full font-medium cursor-pointer"
            onClick={handleButtonClick}
            disabled={loader}
            style={loader ? { backgroundColor: "rgba(255, 0, 0, 0.6)" } : {}}
          >
            <div className="w-[150px]">
              {loader ? (isEditMode ? "Saving..." : "Reserving Car") : (isEditMode ? "Save" : "Confirm reservation")}
            </div>

            {loader && <Loader />}
          </button>

          {showToast && <Toast type={toastType} message={toastMessage} />}
        </div>
      </div>
    </div>
  );
}
