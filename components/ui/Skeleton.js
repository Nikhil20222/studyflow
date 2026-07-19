import "./Skeleton.css";

export default function Skeleton({ height = "16px", width = "100%", radius = "8px" }) {
  return (
    <span
      className="skeleton"
      style={{ height, width, borderRadius: radius }}
    />
  );
}
