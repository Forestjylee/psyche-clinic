import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "心灵诊疗室 · Psyche Clinic",
  description:
    "一款心理医生模拟器：通过对话诊疗影响患者结局，养成你的诊所与医者之心。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
