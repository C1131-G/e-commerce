import { Link } from "react-router-dom";

function FarmerTable({ farmers }) {
  return (
    <div className="tableFrame">
      <table>
        <thead>
          <tr>
            <th>Farmer</th>
            <th>Location</th>
            <th>Assigned</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer) => (
            <tr key={farmer.id}>
              <td>
                <strong>{farmer.name}</strong>
                <small>{farmer.id}</small>
              </td>
              <td>
                {farmer.village}, {farmer.district}
              </td>
              <td>{farmer.assignedDate}</td>
              <td>
                <span className="statusBadge">{farmer.status}</span>
              </td>
              <td>
                <span
                  className={`priorityBadge ${farmer.priority === "High" ? "high" : "medium"}`}
                >
                  {farmer.priority}
                </span>
              </td>
              <td>
                <Link
                  className="textLink"
                  to={`/authorizer/farmer-profile/${farmer.id}`}
                >
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FarmerTable;
