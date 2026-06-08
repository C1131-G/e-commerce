import { Link } from "react-router-dom";
import { ClipboardCheck, MapPinned, Phone } from "lucide-react";

function FarmerCard({ farmer }) {
  return (
    <article className="farmerCard">
      <div className="cardHeader">
        <div>
          <h3>{farmer.name}</h3>
          <p>
            {farmer.id} - {farmer.village}, {farmer.district}
          </p>
        </div>
        <span
          className={`priorityBadge ${farmer.priority === "High" ? "high" : "medium"}`}
        >
          {farmer.priority}
        </span>
      </div>

      <div className="miniGrid">
        <span>
          <Phone size={15} /> {farmer.phone}
        </span>
        <span>
          <MapPinned size={15} /> {farmer.gpsPin}
        </span>
      </div>

      <div className="cardActions">
        <Link
          className="secondaryButton"
          to={`/authorizer/farmer-profile/${farmer.id}`}
        >
          View profile
        </Link>
        <Link className="primaryButton" to="/authorizer/verification/identity">
          <ClipboardCheck size={17} />
          Start verification
        </Link>
      </div>
    </article>
  );
}

export default FarmerCard;
