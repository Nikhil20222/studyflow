import AIResponse from "./AIResponse";
import "./ExplanationPanel.css";

export default function ExplanationPanel({topic, explanation, source, loading}){
  return (
    <div className="explanation-panel">
      {topic && <p className="explanation-topic">{topic}</p>}
      <AIResponse text={explanation} source={source} loading={loading} />
    </div>
  )
}