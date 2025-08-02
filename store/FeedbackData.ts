import car1 from '../assets/images/car1.jpg';
import car2 from '../assets/images/car2.jpg';
import car3 from '../assets/images/car3.jpg';
export interface Feedback {
    id: number;
    name: string;
    location: string;
    date: string;
    orderId: string;
    carName: string;
    imageUrl: string;
    rating: number;
    comment: string;
  }
  
  export const feedbacks: Feedback[] = [
    {
      id: 1,
      name: "Sarah L.",
      location: "New York, USA",
      date: "05.10.2024",
      orderId: "#2437 (06.11.24)",
      carName: "Mercedes-Benz A class 2019",
      imageUrl: car1,
      rating: 4,
      comment: "Fantastic service from start to finish! The booking process was smooth, and the staff was incredibly helpful...",
    },
    {
      id: 2,
      name: "Sarah L.",
      location: "New York, USA",
      date: "05.10.2024",
      orderId: "#2437 (06.11.24)",
      carName: "Porsche 911 2021",
      imageUrl: car2,
      rating: 4,
      comment: "",
    },
    {
      id: 3,
      name: "Sarah L.",
      location: "New York, USA",
      date: "05.10.2024",
      orderId: "#2437 (06.11.24)",
      carName: "Nissan Z 2024",
      imageUrl: car3,
      rating: 4,
      comment: "Fantastic service from start to finish!",
    },
    {
        id: 4,
        name: "Michael D.",
        location: "Los Angeles, USA",
        date: "04.15.2024",
        orderId: "#2438 (06.11.24)",
        carName: "Toyota Supra 2022",
        imageUrl: car1,
        rating: 5,
        comment: "Loved the Supra. Fast and clean. Would rent again!",
      },
      {
        id: 5,
        name: "Anna R.",
        location: "Chicago, USA",
        date: "03.20.2024",
        orderId: "#2439 (06.11.24)",
        carName: "Audi A4 2023",
        imageUrl: car2,
        rating: 3,
        comment: "Decent experience but had some delays at pickup.",
      },
      {
        id: 6,
        name: "John K.",
        location: "Miami, USA",
        date: "02.11.2024",
        orderId: "#2440 (06.11.24)",
        carName: "BMW X5 2020",
        imageUrl: car3,
        rating: 5,
        comment: "Best rental experience I’ve had so far.",
      },
      {
        id: 7,
        name: "Emily T.",
        location: "Dallas, USA",
        date: "01.30.2024",
        orderId: "#2441 (06.11.24)",
        carName: "Tesla Model 3 2021",
        imageUrl: car1,
        rating: 5,
        comment: "The electric drive was a dream!",
      },
      {
        id: 8,
        name: "Raj P.",
        location: "Seattle, USA",
        date: "01.10.2024",
        orderId: "#2442 (06.11.24)",
        carName: "Hyundai Sonata 2022",
        imageUrl: car2,
        rating: 4,
        comment: "Great value for the price.",
      },
      {
        id: 9,
        name: "Laura G.",
        location: "Austin, USA",
        date: "12.25.2023",
        orderId: "#2443 (06.11.24)",
        carName: "Chevrolet Camaro 2021",
        imageUrl: car3,
        rating: 5,
        comment: "Fun and sporty! Loved every minute of it.",
      },
    
  ];
  