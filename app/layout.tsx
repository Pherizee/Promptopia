import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover & share AI Prompts",
};

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Readonly<LayoutProps>) => {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
