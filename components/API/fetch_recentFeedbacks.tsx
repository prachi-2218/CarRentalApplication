import { useEffect, useState } from "react";

interface Feedback {
  carImage: string;
  carName: string;
  buyingYear: string;
  rating: number;
  serviceRating: number;
  feedback: string;
  customerName: string;
  location: string;
  date: string;
}

const API_URL_FEEDBACKS =
  "https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/feedbacks/recent";


const useRecentFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to fetch a single car by ID
  // const fetchCarById = async (carId: string) => {
  //   try {
  //     const res = await fetch(`${API_URL_CAR_BY_ID}/${carId}`);
  //     if (!res.ok) throw new Error("Car fetch failed");
  //     return await res.json();
  //   } catch (err) {
  //     console.error(`Error fetching car with id ${carId}:`, err);
  //     return null;
  //   }
  // };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(API_URL_FEEDBACKS);
        if (!response.ok) throw new Error("Failed to fetch feedbacks");

        const result = await response.json();

        const mapped = await Promise.all(
          result.content.map(async (item: any) => {
            
            // const car = await fetchCarById(item.car_id);
            // const carName = car?.model || `Car ${index + 1}`;
            

            return {
              carImage:`https://pbe-team-7-backend-asset-bucket.s3.ap-southeast-2.amazonaws.com/${item.car_id}/${item.car_id}_1.jpg`,
              carName:item.carModel,
              buyingYear: "", // optional: if available
              rating: item.rating || 0,
              serviceRating: item.rating || 0,
              feedback: item.feedbackText || "",
              customerName: item.client_name || "Anonymous",
              location: "", // optional: if available
              date: item.date || "",
            };
          })
        );

        setFeedbacks(mapped);
        setLoading(false);
      } catch (err) {
        console.error("Error in useRecentFeedbacks:", err);
        setError("Failed to fetch feedbacks");
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return { feedbacks, loading, error };
};

export default useRecentFeedbacks;
