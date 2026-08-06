import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "暖心小诊室 · Cozy Clinic",
  description:
    "一款温馨的心理咨询模拟器：通过对话陪伴影响客户的结局，经营你的小诊室，守住每一盏心里的灯。",
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
