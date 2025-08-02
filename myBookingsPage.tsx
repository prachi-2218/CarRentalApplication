import { RootState } from "./Redux_store/store";
import { useSelector } from "react-redux";
import BookingBoard from "./components/BookingBoard/BookingBoard";
import Header from "./components/header/Header";
import Footer from "./components/footer/footer";
import Main_Heading from "./components/Heading/Main_Heading";
import { Navigate } from "react-router";

const MyBookings:React.FC=()=>{
    const login = useSelector((state: RootState) => state.user.login);
    return (
        <>
        <Header/>
        <Main_Heading heading="My Bookings" />
        {login ? (<BookingBoard />) : (<Navigate to="/login" replace />)}
        <Footer/>
        </>
    );
}

export default MyBookings;