export default function DashboardPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🌾 AgriMart Dashboard</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            width: "200px",
          }}
        >
          <h3>Total Farmers</h3>
          <p>120</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            width: "200px",
          }}
        >
          <h3>Total Products</h3>
          <p>350</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            width: "200px",
          }}
        >
          <h3>Total Orders</h3>
          <p>89</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            width: "200px",
          }}
        >
          <h3>Revenue</h3>
          <p>₹45,000</p>
        </div>
      </div>
    </div>
  );
}
