import { Link } from "react-router-dom";
import FarmerTable from "../../components/authorizer/FarmerTable.jsx";
import MapCard from "../../components/authorizer/MapCard.jsx";
import {
  dashboardCards,
  farmers,
  verificationStages,
} from "../../data/stages.js";

function Dashboard() {
  const urgentFarmers = [...farmers].sort((a, b) => {
    if (a.priority === b.priority)
      return a.assignedDate.localeCompare(b.assignedDate);
    return a.priority === "High" ? -1 : 1;
  });

  return (
    <section className="pageStack">
      <div className="pageTitle">
        <div>
          <p className="eyebrow">Authorizer Dashboard</p>
          <h1>Farm Verification Stages, Reports and Navigation</h1>
        </div>
        <Link className="primaryButton" to="/authorizer/assigned-farmers">
          View assignments
        </Link>
      </div>

      <div className="summaryGrid">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className={`summaryCard ${card.tone}`} key={card.label}>
              <Icon size={23} />
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </article>
          );
        })}
      </div>

      <section className="splitGrid">
        <div className="panel">
          <div className="panelHeader">
            <div>
              <p className="eyebrow">Urgency order</p>
              <h2>Assigned verification tasks</h2>
            </div>
            <Link className="textLink" to="/authorizer/verification/identity">
              Start verification
            </Link>
          </div>
          <FarmerTable farmers={urgentFarmers} />
        </div>

        <div className="panel">
          <div className="panelHeader">
            <div>
              <p className="eyebrow">Stage progress</p>
              <h2>Verification process</h2>
            </div>
          </div>
          <div className="stageMiniList">
            {verificationStages.map((stage) => (
              <Link key={stage.id} to={stage.route}>
                <span>Stage {stage.number}</span>
                <strong>{stage.title}</strong>
              </Link>
            ))}
          </div>
          <MapCard farmer={farmers[0]} />
        </div>
      </section>
    </section>
  );
}

export default Dashboard;
