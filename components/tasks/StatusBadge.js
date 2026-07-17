import "./StatusBadge.css";

const styles = {
  Pending: "status-badge pending",
  "In Progress": "status-badge in-progress",
  Completed: "status-badge completed",
  Cancelled: "status-badge cancelled",
};

export default function StatusBadge({ status, onClick }) {
  return (
    <button className={styles[status]} onClick={onClick}>
      {status}
    </button>
  );
}
