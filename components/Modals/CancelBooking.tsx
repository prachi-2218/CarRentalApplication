import { useEffect, useState } from "react";

const CancelBookingModal = ({ buttonClicked, closeModal }: { buttonClicked: boolean, closeModal: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // If buttonClicked is true, open the modal
    if (buttonClicked) {
      setIsModalOpen(true);
    }
  }, [buttonClicked]);

  const handleCancel = () => {
    setIsModalOpen(false);
    closeModal();  
  };

  const handleResume = () => {
    setIsModalOpen(false);
    closeModal();  
  };

  return (
    <div className={`fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 ${isModalOpen ? 'block' : 'hidden'}`}>
      <div className="shadow-xl p-6 w-[400px] h-[200px] max-w-sm" style={{ borderRadius: "8px", backgroundColor: "#FFFBF3" }}>
        <h2 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "Inter" }}>Cancel booking?</h2>
        <p className="text-md text-gray-600 mb-6">
          You are about to cancel your booking. <br />
          Are you sure you want to proceed?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
          >
            Cancel booking
          </button>
          <button
            onClick={handleResume}
            className=" w-1/2 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition"
          >
            Resume booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
