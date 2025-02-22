import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/ocr-a" rel="stylesheet" />
      </head>
      <body className="bg-gray-100 antialiased">{children}</body>
    </html>
  );
}
