import AIResponse from "./AIResponse";
import "./SummaryCard.css";

export default function summaryCard({
  noteTitle, summary, source, loading
}){
  return(
    <div className="summary-card">
      {noteTitle && <p className= "summary-card-note">{noteTitle}</p>}
      <AIResponse text={summary} source={source} loading={loading} />
    </div>
  );
}