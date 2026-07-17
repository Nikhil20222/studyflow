import "./globals.css";

export const metadata = {
  title: "StudyFlow — Your Personal AI Study Operating System",
  description: "A premium study planner and productivity dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
