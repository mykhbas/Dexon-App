import Nav from "./component/navbar";
import Footer from "./component/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Dexon App</title>
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
