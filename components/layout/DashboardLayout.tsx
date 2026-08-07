import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          background: "#f3f4f6",
          minHeight: "100vh",
        }}
      >
        <Header />

        <main
          style={{
            padding: 30,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}