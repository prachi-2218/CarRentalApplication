import Footer from "./components/footer/footer";
import Header from "./components/header/Header";
import EditBookingPage from "./components/editBooking/EditBooking";
import Main_Heading from "./components/Heading/Main_Heading";

export default function EditBookingPages() {
  return (
    <>
      <Header />
      <Main_Heading heading="Booking Modification" />
      <main style={{ minHeight: "80vh", padding: "2rem" }}>
        <EditBookingPage />
      </main>
      <Footer />
    </>
  );
}
