export default function Header() {
  return (
    <header
      style={{
        height: 70,
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 25px",
      }}
    >
      <h2>Dashboard</h2>

      <div>
        Welcome, Ramakant 👋
      </div>
    </header>
  );
}