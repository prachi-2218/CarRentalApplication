// import { useState } from "react"
// import DatePicker from "../car-selection-components/DatePicker"

// type DateTimeSectionProps = {
//   // onDateTimeSelect: (pickupDate: string, dropoffDate: string, pickupTime: string, dropoffTime: string) => void
//   onDateTimeSelect: (pickupDate: Date, dropoffDate: Date) => void
// }

// export default function DateTimeSection({ onDateTimeSelect }: DateTimeSectionProps) {
//   // State for selected dates and times
//   const [pickupDate, setPickupDate] = useState<string | null>(null)
//   const [dropoffDate, setDropoffDate] = useState<string | null>(null)
//   const [pickupTime, setPickupTime] = useState("00:00")
//   const [dropoffTime, setDropoffTime] = useState("00:00")


//   // State for edit mode
//   const [isEditMode, setIsEditMode] = useState(false)

//   function set_date_data(pickup_month:string,dropoff_month:string,pickup_date:string,dropoff_date:string,pickup_time:string,dropoff_time:string,actual_pickup_date:Date,actual_dropoff_date:Date){
//     // console.log(actual_pickup_date,actual_dropoff_date)
//     setPickupTime(pickup_time)
//     setDropoffTime(dropoff_time)
//     setPickupDate(`${pickup_month} ${pickup_date}`)
//     setDropoffDate(`${dropoff_month} ${dropoff_date}`)
//     onDateTimeSelect(actual_pickup_date, actual_dropoff_date); // pass data to parent
//     setIsEditMode(false)
//   }
  
//   return (
//     <>
//     <div>
//       <h2 className="text-xl font-medium mb-4">Dates & Time</h2>

//       {/* {isEditMode ? (
//         <DateTimePicker onSave={handleSave} onCancel={() => setIsEditMode(false)} />
//       ) : ( */}
//         <div className="relative border border-[1.5px] rounded-lg p-4">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <p className="text-sm text-gray-500">Pick-up date & Time</p>
//               <p className="font-medium">
//                 {pickupDate ? `${pickupDate} | ${pickupTime}` : "Choose Pickup Date"}
//               </p>
//             </div>
//             <button className="text-sm font-medium cursor-pointer" onClick={() => setIsEditMode(!isEditMode)}>
//               Change
//             </button>
//           </div>

//           <div>
//             <p className="text-sm text-gray-500">Drop-off date & Time</p>
//             <p className="font-medium">
//               {dropoffDate ? `${dropoffDate} | ${dropoffTime}` : "Choose Drop off Date"}
//             </p>
//           </div>
//           {
//             isEditMode && 
//           <DatePicker send_data_to_parent={set_date_data}/>
//           }
//         </div>
//       {/* )} */}
//     </div>
  
//     </>
//   )
// }


import { useEffect, useState } from "react";
import DatePicker from "../car-selection-components/DatePicker";

type DateTimeSectionProps = {
  onDateTimeSelect: (pickupDate: Date, dropoffDate: Date) => void;
  defaultPickupDate?: Date;
  defaultDropoffDate?: Date;
  disablePickup?: boolean;
  disableDropoff?: boolean;
};

export default function DateTimeSection({
  onDateTimeSelect,
  defaultPickupDate,
  defaultDropoffDate,
  disablePickup = false,
  disableDropoff = false,
}: DateTimeSectionProps) {
  const [pickupDate, setPickupDate] = useState<string | null>(null);
  const [dropoffDate, setDropoffDate] = useState<string | null>(null);
  const [pickupTime, setPickupTime] = useState("00:00");
  const [dropoffTime, setDropoffTime] = useState("00:00");

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (defaultPickupDate) {
      setPickupDate(`${defaultPickupDate.toLocaleString("default", { month: "short" })} ${defaultPickupDate.getDate()}`);
      setPickupTime(defaultPickupDate.toTimeString().slice(0, 5));
    }
    if (defaultDropoffDate) {
      setDropoffDate(`${defaultDropoffDate.toLocaleString("default", { month: "short" })} ${defaultDropoffDate.getDate()}`);
      setDropoffTime(defaultDropoffDate.toTimeString().slice(0, 5));
    }
  }, [defaultPickupDate, defaultDropoffDate]);

  function set_date_data(
    pickup_month: string,
    dropoff_month: string,
    pickup_date: string,
    dropoff_date: string,
    pickup_time: string,
    dropoff_time: string,
    actual_pickup_date: Date,
    actual_dropoff_date: Date
  ) {
    setPickupTime(pickup_time);
    setDropoffTime(dropoff_time);
    setPickupDate(`${pickup_month} ${pickup_date}`);
    setDropoffDate(`${dropoff_month} ${dropoff_date}`);
    onDateTimeSelect(actual_pickup_date, actual_dropoff_date);
    setIsEditMode(false);
  }

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Dates & Time</h2>
      <div className="relative border border-[1.5px] rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm text-gray-500">Pick-up date & Time</p>
            <p className="font-medium">
              {pickupDate ? `${pickupDate} | ${pickupTime}` : "Choose Pickup Date"}
            </p>

          </div>
          <button
            className="text-sm font-medium cursor-pointer"
            onClick={() => {
              if (!(disablePickup && disableDropoff)) {
                setIsEditMode(!isEditMode);
              }
            }}
          >
            Change
          </button>
        </div>

        <div>
          <p className="text-sm text-gray-500">Drop-off date & Time</p>
          <p className="font-medium">
            {dropoffDate ? `${dropoffDate} | ${dropoffTime}` : "Choose Drop off Date"}
          </p>
        </div>

        {/* {isEditMode && (
          <DatePicker send_data_to_parent={set_date_data} />
        )} */}
        {isEditMode && (
          <DatePicker
            // seed both calendars & time inputs
            currentDateTime={{
              pickupDate: defaultPickupDate ?? null,
              pickupTime: defaultPickupDate?.toTimeString().slice(0, 5) ?? null,
              dropoffDate: defaultDropoffDate ?? null,
              dropoffTime: defaultDropoffDate?.toTimeString().slice(0, 5) ?? null,
            }}
            // lock left calendar if disablePickup
            disablePickup={disablePickup}
            onClose={() => setIsEditMode(false)}
            send_data_to_parent={set_date_data}
          />
        )}
      </div>
    </div>
  );
}
