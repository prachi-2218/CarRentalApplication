import React from "react";
import "./BookingCard.css";
import Button from "./Button";
import CancelBookingModal from "../Modals/CancelBooking";
import ExperienceModal from "../Modals/Feedback";
import { useDispatch, useSelector } from "react-redux";
import {
  openCancelModal,
  closeCancelModal,
  openFeedbackModal,
  closeFeedbackModal,
  submitFeedback,
  setSelectedBookingForEdit
} from "../../Redux_store/slices/bookingSlice";
import { RootState } from "../../Redux_store/store";
import { useNavigate } from "react-router-dom";



interface CarCardProps {
  carImage: string;
  carName: string;
  order: string;
  status: string;
  id: string;
  carId: string;
  clientId: string;
}

const BookingCard: React.FC<CarCardProps> = ({
  carImage,
  carName,
  order,
  status,
  id,
  carId,
  clientId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeCancelModalId, activeFeedbackModalId, bookings } = useSelector(
    (state: RootState) => state.booking
  );

  const feedbackSubmitted = bookings.find(
    (b) => b.id === id
  )?.feedbackSubmitted;

  const statusLower = status?.trim().toLowerCase();
  const isReservedType =
    statusLower === "reserved" || statusLower === "reserved by sa";
  const isServiceProvided = statusLower === "service provided";
  const isBookingFinished = statusLower === "booking finished";
  const isServiceStarted = statusLower === "service started"
  const isCancelled = statusLower === "cancelled";
  const isEditable = isReservedType || isServiceStarted;

  return (
    <div className="w-full bg-[#F0F0F0] p-3 rounded-xl">
      <div className="car-image-wrapper">
      <div
  className={`status-tag ${
    status === 'Service provided'
      ? 'text-black'
      : status === 'Reserved' || status === 'Reserved by SA'
      ? 'text-green-500'
      : status === 'Service started'
      ? 'text-blue-500'
      : status === 'Cancelled'
      ? 'text-red-500'
      : status === 'Booking finished'
      ? 'text-yellow-500'
      : 'text-gray-500'
  }`}
>
  {status}
</div>
        <img src={carImage} alt={carName} className="car-image" />
      </div>

      <div className="mt-2 car-info">
        <div className="car-name">{carName}</div>
        <div className="order-id">{order}</div>
      </div>

      <div className="mt-2 action-buttons">
        {isServiceProvided ? (
          <Button
            text={feedbackSubmitted ? "View feedback" : "Leave feedback"}
            variant={feedbackSubmitted ? "view-feedback" : "feedback"}
            onClick={() => dispatch(openFeedbackModal(id))}
          />
        ) : isBookingFinished ? (
          <Button text="View feedback" variant="view-feedback" />
        ) : isServiceStarted ? (
          // <div style={{ height: "42px", width: "100%" }}></div>
//           <Button
//   text="Edit"
//   variant="edit"
//   onClick={() => {
//     dispatch(setSelectedBookingForEdit(id));
//     const bookingId = order.startsWith("ORD-") ? order.split("ORD-")[1] : order;
//     navigate(`/edit-booking/${clientId}/${bookingId}`);
//   }}
// />
            <Button
           text="Edit"
            variant="edit"
            onClick={() => {
              // 1️⃣ grab the full booking object by id
              const bookingObj = bookings.find(b => b.id === id);
              const bookingId = order.startsWith("ORD-") ? order.split("ORD-")[1] : order;
              if (!bookingObj) return; // nothing to do if missing

              // 2️⃣ dispatch the *object* so EditBooking.tsx can read all fields
              dispatch(setSelectedBookingForEdit(id));

              // 3️⃣ navigate to your existing route by id
              navigate(`/edit-booking/${clientId}/${bookingId}`);
            }}
          />
        ) : 
        isCancelled ? 
        <div style={{ height: "42px", width: "100%" }}></div> :
         (
          <>
            {(isReservedType || status === "") && (
              <>
                <Button
                  text="Cancel"
                  variant="cancel"
                  onClick={() => dispatch(openCancelModal(id))}
                />
                {isEditable && (
              <Button
  text="Edit"
  variant="edit"
  onClick={() => {
    dispatch(setSelectedBookingForEdit(id)); // ✅ SET booking in Redux
    const bookingId = order.startsWith("ORD-") ? order.split("ORD-")[1] : order;
    navigate(`/edit-booking/${clientId}/${bookingId}`);
  }}
/>
            )}
              </>
            )}
          </>
        )}
      </div>

      {!isServiceProvided && !isBookingFinished && (
        <div className="support-text">
          <span className="question-text">Have any questions?</span>
          <Button text="Support chat" variant="support-chat" />
        </div>
      )}
      <CancelBookingModal
        buttonClicked={activeCancelModalId === id}
        closeModal={() => dispatch(closeCancelModal())}
      />
      <ExperienceModal
        isOpen={activeFeedbackModalId === id}
        onClose={() => dispatch(closeFeedbackModal())}
        carName={carName}
        bookingId={id}
        carId={carId}
        clientId={clientId}
        // onClose={() => dispatch(closeFeedbackModal())}
        onSubmitFeedback={() => {
          dispatch(submitFeedback(id));
          dispatch(closeFeedbackModal());
        }}
      />
    </div>
  );
};

export default BookingCard;
