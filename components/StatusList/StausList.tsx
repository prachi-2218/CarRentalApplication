import React from "react";
import "./StatusList.css";

interface StatusListProps {
  statuses: string[];
  selectedStatus: string | null;
  onStatusClick: (status: string | null) => void;
}

const StatusList: React.FC<StatusListProps> = ({ statuses, selectedStatus, onStatusClick }) => {
  return (
    <div className="status-list-container">
      {statuses.map((status) => (
        <div
          key={status}
          className={`status-item ${selectedStatus === status ? "active" : ""}`}
          onClick={() => onStatusClick(selectedStatus === status ? null : status)}
        >
          {status}
        </div>
      ))}
    </div>
  );
};

export default StatusList;











