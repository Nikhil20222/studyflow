import Card from "@/components/ui/Card";
import "./UpcomingExams.css";

const exams = [
  { name: "JEE Mains Mock 4", date: "12 days left", ready: 72 },
  { name: "Chemistry Unit Test", date: "5 days left", ready: 40 },
  { name: "NEET Full Syllabus Test", date: "28 days left", ready: 85 },
];

export default function UpcomingExams() {
  return (
    <Card title="Upcoming Exams">
      <ul className="exam-list">
        {exams.map((exam) => (
          <li key={exam.name} className="exam-item">
            <div className="exam-info">
              <p className="exam-name">{exam.name}</p>
              <span className="exam-date">{exam.date}</span>
            </div>
            <div className="exam-ready-track">
              <div className="exam-ready-fill" style={{ width: `${exam.ready}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
