import { MapPinned, Navigation } from "lucide-react";

function MapCard({ farmer, large = false }) {
  return (
    <section className={`mapCard ${large ? "large" : ""}`}>
      <div className="mapGrid">
        <MapPinned size={large ? 52 : 34} />
        <strong>Submitted GPS pin</strong>
        <span>{farmer.gpsPin}</span>
        <small>Current location: {farmer.currentLocation}</small>
      </div>
      <div className="mapFooter">
        <span>
          <Navigation size={16} /> {farmer.distance}
        </span>
        <span>{farmer.travelTime}</span>
      </div>
    </section>
  );
}

export default MapCard;
