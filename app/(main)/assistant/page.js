"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";
import AssistantPanel from "@/components/assistant/AssistantPanel";
import PlannerCard from "@/components/assistant/PlannerCard";
import SuggestionCard from "@/components/assistant/SuggestionCard";
import InsightCard from "@/components/assistant/InsightCard";
import WeakSubjectCard from "@/components/assistant/WeakSubjectCard";
import MotivationCard from "@/components/assistant/MotivationCard";
import {
  getTodaysPlan,
  getWeeklyPlan,
  getStudySuggestions,
  getRevisionSuggestions,
  getWeakSubjects,
  getProductivityInsights,
  getMotivationMessage,
} from "@/lib/ai/offlineEngine";
import "./assistant.css";

export default function AssistantPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData({
      todaysPlan: getTodaysPlan(),
      weeklyPlan: getWeeklyPlan(),
      suggestions: getStudySuggestions(),
      revisions: getRevisionSuggestions(),
      weakSubjects: getWeakSubjects(),
      insights: getProductivityInsights(),
      motivation: getMotivationMessage(),
    });
    setLoading(false);
  }, []);

  return (
    <div className="assistant-page">
      <div className="assistant-page-header">
        <h1 className="assistant-page-title">AI Assistant</h1>
        <p className="assistant-page-subtitle">
          Personalized study guidance — powered by AI, or the offline engine when it isn't available.
        </p>
      </div>

      <AssistantPanel />

      {loading || !data ? (
        <div className="assistant-skeleton-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height="140px" radius="16px" />
          ))}
        </div>
      ) : (
        <>
          <MotivationCard message={data.motivation} />

          <div className="assistant-main-row">
            <Card title="Today's Study Plan" action={`${data.todaysPlan.length} tasks`}>
              {data.todaysPlan.length === 0 ? (
                <p className="assistant-empty-text">No pending tasks — you're all caught up today.</p>
              ) : (
                data.todaysPlan.map((item) => (
                  <PlannerCard
                    key={item.title}
                    subject={item.subject}
                    title={item.title}
                    meta={item.reason}
                  />
                ))
              )}
            </Card>

            <Card title="Weak Subject Analysis">
              {data.weakSubjects.map((item) => (
                <WeakSubjectCard key={item.subject} {...item} />
              ))}
            </Card>
          </div>

          <Card title="Weekly Planner" action="Suggested focus">
            <div className="assistant-weekly-grid">
              {data.weeklyPlan.map((day) => (
                <PlannerCard key={day.day} subject={day.day} title={day.subject} meta={day.focus} />
              ))}
            </div>
          </Card>

          <div className="assistant-main-row">
            <Card title="Study Suggestions">
              {data.suggestions.map((text, index) => (
                <SuggestionCard key={index} text={text} />
              ))}
            </Card>

            <Card title="Revision Suggestions">
              {data.revisions.map((item) => (
                <PlannerCard
                  key={item.title}
                  subject={item.subject}
                  title={item.title}
                  meta={item.note}
                />
              ))}
            </Card>
          </div>

          <Card title="Productivity Insights">
            <div className="assistant-insights-grid">
              {data.insights.map((item) => (
                <InsightCard key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
