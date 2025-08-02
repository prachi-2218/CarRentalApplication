export type Car = {
    name: string;
    location: string;
    rating: number;
    characteristics: {
      transmission: string;
      engine: string;
      fuel: string;
      seats: number;
      consumption: string;
    };
};
  
export const carData: Car = {
    name: "Audi A6 Quattro 2023",
    location: "Ukraine, Kyiv",
    rating: 4.8,
    characteristics: {
      transmission: "Automatic",
      engine: "3.0 turbo",
      fuel: "Petrol",
      seats: 5,
      consumption: "10.0 l | 100 km.",
    },
};
  