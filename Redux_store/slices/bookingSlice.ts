import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Booking {
  id: string;
  status: string;
  carImage: string;
  carName: string;
  order: string;
  carId: string;
  clientId: string;
  feedbackSubmitted: boolean;
  pickupLocationId: string;
  dropoffLocationId: string;
  pickupDate: string;
  dropoffDate: string;

}

interface BookingState {
  bookings: Booking[];
  selectedStatus: string;
  activeCancelModalId: string | null;
  activeFeedbackModalId: string | null;
  data_fetched: boolean;
  booking_data_send: boolean;
  booking_toast: {
    status: boolean;
    message: string;
    type: "success" | "alert";
  };
  is_data_fetched: boolean;
  selectedBookingForEdit: Booking | null;
}

const preserved_state: BookingState = {
  bookings: [], // ✅ No static carList
  selectedStatus: "All Bookings",
  activeCancelModalId: null,
  activeFeedbackModalId: null,
  data_fetched: false,
  booking_data_send: false,
  booking_toast: {
    status: false,
    message: "",
    type: "alert",
  },
  is_data_fetched: false,
  selectedBookingForEdit: null,
};

const initialState: BookingState = {
  bookings: [], // ✅ No static carList
  selectedStatus: "All Bookings",
  activeCancelModalId: null,
  activeFeedbackModalId: null,
  data_fetched: false,
  booking_data_send: false,
  booking_toast: {
    status: false,
    message: "",
    type: "alert",
  },
  is_data_fetched: false,
  selectedBookingForEdit: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookings(state, action: PayloadAction<Booking[]>) {
      state.bookings = action.payload;
    },
    setSelectedStatus(state, action: PayloadAction<string>) {
      state.selectedStatus = action.payload;
    },
    submitFeedback(state, action: PayloadAction<string>) {
      const booking = state.bookings.find((b) => b.id === action.payload);
      if (booking) {
        booking.feedbackSubmitted = true;
      }
    },
    openCancelModal(state, action: PayloadAction<string>) {
      state.activeCancelModalId = action.payload;
    },
    closeCancelModal(state) {
      state.activeCancelModalId = null;
    },
    openFeedbackModal(state, action: PayloadAction<string>) {
      state.activeFeedbackModalId = action.payload;
    },
    closeFeedbackModal(state) {
      state.activeFeedbackModalId = null;
    },
    set_data_fetched(state, action: PayloadAction<boolean>) {
      state.data_fetched = action.payload;
    },
    set_booking_data_send(state, action: PayloadAction<boolean>) {
      state.booking_data_send = action.payload;
    },
    set_booking_toast(
      state,
      action: PayloadAction<{
        status: boolean;
        message: string;
        type: "success" | "alert";
      }>
    ) {
      state.booking_toast = action.payload;
    },
    set_is_data_fetched(state, action: PayloadAction<boolean>) {
      state.is_data_fetched = action.payload;
    },
    set_state_to_old_bookings() {
      return JSON.parse(JSON.stringify(preserved_state));
    },
    setSelectedBookingForEdit(state, action: PayloadAction<string>) {
  const booking = state.bookings.find(b => b.id === action.payload);
  if (booking) {
    state.selectedBookingForEdit = booking;
  }
},
updateBookingInRedux(state, action: PayloadAction<{ id: string; data: Partial<Booking> }>) {
  const bookingIndex = state.bookings.findIndex(b => b.id === action.payload.id);
  if (bookingIndex !== -1) {
    state.bookings[bookingIndex] = {
      ...state.bookings[bookingIndex],
      ...action.payload.data,
    };
  }
  if (state.selectedBookingForEdit?.id === action.payload.id) {
        state.selectedBookingForEdit = {
          ...state.selectedBookingForEdit,
          ...action.payload.data,
        };
      }
},
  },
});

export const {
  setBookings,
  setSelectedStatus,
  submitFeedback,
  openCancelModal,
  closeCancelModal,
  openFeedbackModal,
  closeFeedbackModal,
  set_data_fetched,
  set_booking_data_send,
  set_booking_toast,
  set_is_data_fetched,
  set_state_to_old_bookings,
  setSelectedBookingForEdit,
  updateBookingInRedux,

} = bookingSlice.actions;

export default bookingSlice.reducer;
