

import React, { useState, useEffect } from "react";

interface ExperienceModalProps {
  isOpen: boolean;
  carName: string;
  bookingId: string;
  carId: string;
  clientId: string;
  onClose: () => void;
  onSubmitFeedback: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
  carName,
  bookingId,
  carId,
  clientId,
  onSubmitFeedback,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [commentTouched, setCommentTouched] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchExistingFeedback = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/feedbacks/getFeedback?bookingId=${bookingId}`
        );

        // const res = await fetch(`http://localhost:8080/feedbacks/getFeedback?bookingId=${bookingId}`)
        if (!res.ok) throw new Error("Failed to fetch feedback");

        const data = await res.json();

        if (data?.rating) setRating(data.rating);
        if (data?.feedbackText) {
          setComment(data.feedbackText);
          setCommentTouched(true);
          setHasSubmitted(true); // show "Update"
        }
      } catch (err) {
        console.error("Error fetching feedback:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExistingFeedback();
  }, [isOpen, bookingId]);

  useEffect(() => {
    if (rating !== 0 && !commentTouched) {
      setComment(getDefaultFeedback(rating));
    }
  }, [rating, commentTouched]);

  const getDefaultFeedback = (stars: number): string => {
    switch (stars) {
      case 1:
        return "Very disappointed with the experience.";
      case 2:
        return "Not satisfied. Needs improvement.";
      case 3:
        return "It was okay, could be better.";
      case 4:
        return "Good experience overall!";
      case 5:
        return "Excellent service! Highly recommend.";
      default:
        return "";
    }
  };

  const handleRatingClick = (index: number) => {
    setRating(index);
    if (!comment.trim()) {
      setComment(getDefaultFeedback(index));
    }
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      setError("Please write your feedback");
      return;
    }

    setError(null);

    const feedbackData = {
      bookingId,
      carId,
      clientId,
      feedbackText: comment,
      rating,
      date: new Date(),
    };

    const method = hasSubmitted ? "PUT" : "POST";
    const isLocal = true; // ← set to false in production
const BASE_URL = isLocal
  ? "https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/feedbacks"
  : "https:";

const url = hasSubmitted ? `${BASE_URL}/updateFeedback` : BASE_URL;


    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      console.log("Feedback submitted:", feedbackData);

      setHasSubmitted(true);
      onSubmitFeedback();
      onClose();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        className="p-4 w-[400px] h-[365px] max-w-xs shadow-lg"
        style={{ backgroundColor: "#FFFBF3", borderRadius: "8px" }}
      >
        <h2 className="text-lg font-semibold mb-1">How was your experience?</h2>
        <p className="text-black-600 mb-3 text-l">{carName}</p>

        {loading ? (
          <div className="shimmer-wrapper">
            <div className="shimmer-line" />
            <div className="shimmer-line" />
            <div className="shimmer-line short" />
          </div>
        ) : (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate your experience
            </label>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`w-6 h-6 cursor-pointer transition-colors ${
                    (hoverRating || rating) >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.943a1 1 0 00.95.69h4.14c.969 0 1.371 1.24.588 1.81l-3.356 2.44a1 1 0 00-.364 1.118l1.287 3.943c.3.921-.755 1.688-1.538 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.782.57-1.837-.197-1.538-1.118l1.287-3.943a1 1 0 00-.364-1.118l-3.356-2.44c-.783-.57-.38-1.81.588-1.81h4.14a1 1 0 00.95-.69l1.286-3.943z" />
                </svg>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review
              </label>
              <textarea
                className="block w-full p-2 border border-gray-300 rounded-xl resize overflow-auto focus:outline-none focus:ring-2 focus:ring-black-500 text-sm"
                rows={4}
                placeholder="Add your comment"
                value={comment}
                onChange={(e) => {
                  setCommentTouched(true);
                  setComment(e.target.value);
                }}
                style={{
                  maxHeight: "100px",
                  maxWidth: "290px",
                  paddingBottom: "2rem",
                }}
              />
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>

            <div className="flex gap-2">
              <button
                className="w-1/2 px-5 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="w-1/2 px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                onClick={handleSubmit}
              >
                {hasSubmitted ? "Update" : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExperienceModal;
