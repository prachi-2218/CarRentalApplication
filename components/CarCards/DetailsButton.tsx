import React, {useState} from 'react';

import Modal from '../car-selection-components/Modal';
import CarSelection from '../car-selection-components/CarSelection';

interface DetailsButtonProps {
  onClick?: () => void;
}

const DetailsButton: React.FC<DetailsButtonProps> = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setModalOpen(true);
        }}
        className="mt-2 text-sm text-black underline hover:text-gray-800 transition-colors duration-200"
      >
        See more details
      </button>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <CarSelection onClose={() => setModalOpen(false)} />
      </Modal>
    </>
  );
};

export default DetailsButton;
