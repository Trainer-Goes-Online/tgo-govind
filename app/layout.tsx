import type { Metadata } from "next";
import "./funnel.css";

export const metadata: Metadata = {
  title: "Govind Das · You got everything you wanted. And you feel none of it.",
  description:
    "One paid Experiential Session with Govind Das, live and one-on-one online. A body-first diagnostic for the founder who won the material game and felt none of it. Feel the shift, or your fee is returned.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
