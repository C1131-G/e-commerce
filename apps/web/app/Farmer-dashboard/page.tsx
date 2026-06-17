import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

import styles from "./farmer-dashboard.module.css";

export default function FarmerDashboard() {
  const stats = [
    {
      title: "Active Listings",
      value: "12",
    },
    {
      title: "Total Stock",
      value: "850 KG",
    },
    {
      title: "Pending Orders",
      value: "5",
    },
    {
      title: "Revenue",
      value: "Rs 25,000",
    },
  ];

  const products = [
    {
      name: "Tomato",
      status: "Approved",
      stock: "100 KG",
    },
    {
      name: "Onion",
      status: "Pending",
      stock: "50 KG",
    },
    {
      name: "Potato",
      status: "Rejected",
      stock: "20 KG",
    },
  ];

  return (
    <div className={styles.dashboardPage}>
      <h1 className={styles.title}>Farmer Dashboard</h1>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {stats.map((item, index) => (
          <div className={styles.statCard} key={index}>
            <h2 className={styles.statTitle}>{item.title}</h2>
            <p className={styles.statValue}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Low Stock Alert */}
      <div className={styles.alert}>
        Low Stock Warning: Potato stock is below 25 KG
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button className={styles.addButton} type="button">
          Add New Listing
        </button>

        <button className={styles.ordersButton} type="button">
          View Orders
        </button>
      </div>

      {/* Product Listings */}
      <div className={styles.listings}>
        <h2 className={styles.sectionTitle}>My Listings</h2>

        <Table>
          <TableHeader>
            <TableRow className={styles.tableHeaderRow}>
              <TableHead>Crop</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
