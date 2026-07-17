import { Flame } from "lucide-react";
import "./Greeting.css";

export default function Greeting() {
  return (
    <div className="greeting">
      <div>
        <h1 className="greeting-title">Good morning, Aditi</h1>
        <p className="greeting-subtitle">
          You have 4 tasks today and 12 days left for your JEE Mains mock.
        </p>
      </div>

      <div className="greeting-streak">
        <Flame size={18} />
        <span>18 day streak</span>
      </div>
    </div>
  );
}
