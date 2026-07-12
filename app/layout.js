import "./globals.css";

export const metadata = {
  title: "AI Investment Research Dashboard",
  description: "Investment Research using Gemini + LangChain"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        {children}

      </body>
    </html>
  );
}