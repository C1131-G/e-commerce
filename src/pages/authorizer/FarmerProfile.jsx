import { Link, useParams } from "react-router-dom";
import { ClipboardCheck, Leaf, Phone, Ruler, UserRound } from "lucide-react";
import DocumentViewer from "../../components/authorizer/DocumentViewer.jsx";
import MapCard from "../../components/authorizer/MapCard.jsx";
import { farmers } from "../../data/stages.js";

function FarmerProfile() {
  const { farmerId } = useParams();
  const farmer = farmers.find((item) => item.id === farmerId) ?? farmers[0];

  return (
    <section className="pageStack">
      <div className="pageTitle">
        <div>
          <p className="eyebrow">Read only profile</p>
          <h1>{farmer.name}</h1>
        </div>
        <Link className="primaryButton" to="/authorizer/verification/identity">
          <ClipboardCheck size={17} />
          Start verification
        </Link>
      </div>

      <section className="splitGrid">
        <div className="panel">
          <div className="profileHeader">
            <span className="avatarCircle">
              <UserRound size={34} />
            </span>
            <div>
              <h2>{farmer.name}</h2>
              <p>{farmer.bio}</p>
            </div>
          </div>

          <div className="infoGrid">
            <span>
              <Phone size={17} /> Phone <strong>{farmer.phone}</strong>
            </span>
            <span>
              <Ruler size={17} /> Land <strong>{farmer.landSize}</strong>
            </span>
            <span>
              <Leaf size={17} /> Crops <strong>{farmer.crops}</strong>
            </span>
            <span>
              Ownership <strong>{farmer.ownership}</strong>
            </span>
            <span>
              Method <strong>{farmer.farmingMethod}</strong>
            </span>
            <span>
              Status <strong>{farmer.status}</strong>
            </span>
          </div>
        </div>

        <MapCard farmer={farmer} large />
      </section>

      <section className="splitGrid">
        <DocumentViewer
          title="Submitted documents"
          documents={farmer.documents}
          photos={farmer.photos}
        />
        <DocumentViewer
          title="Last two years records"
          documents={farmer.records}
        />
      </section>
    </section>
  );
}

export default FarmerProfile;
