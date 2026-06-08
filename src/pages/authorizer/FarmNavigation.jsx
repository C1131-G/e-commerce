import { ExternalLink, LocateFixed, Navigation } from "lucide-react";
import MapCard from "../../components/authorizer/MapCard.jsx";
import { farmers } from "../../data/stages.js";

function FarmNavigation() {
  const farmer = farmers[0];

  return (
    <section className="pageStack">
      <div className="pageTitle">
        <div>
          <p className="eyebrow">Navigation and Maps</p>
          <h1>Farm Navigation</h1>
        </div>
        <button className="primaryButton" type="button">
          <ExternalLink size={17} />
          Open maps app
        </button>
      </div>

      <section className="splitGrid">
        <div className="panel">
          <div className="panelHeader">
            <h2>{farmer.name}'s pinned farm location</h2>
          </div>
          <div className="routeGrid">
            <span>
              <LocateFixed size={17} /> Submitted pin{" "}
              <strong>{farmer.gpsPin}</strong>
            </span>
            <span>
              <Navigation size={17} /> Current location{" "}
              <strong>{farmer.currentLocation}</strong>
            </span>
            <span>
              Distance <strong>{farmer.distance}</strong>
            </span>
            <span>
              Estimated travel time <strong>{farmer.travelTime}</strong>
            </span>
          </div>
        </div>

        <MapCard farmer={farmer} large />
      </section>
    </section>
  );
}

export default FarmNavigation;
