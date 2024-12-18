import Nav from "./component/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Dexon App</title>
      </head>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
