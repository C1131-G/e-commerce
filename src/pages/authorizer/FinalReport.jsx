import ReportForm from "../../components/authorizer/ReportForm.jsx";
import { verificationStages } from "../../data/stages.js";

function FinalReport() {
  return (
    <section className="pageStack">
      <div className="pageTitle">
        <div>
          <p className="eyebrow">Final Report Submission</p>
          <h1>Submit verification report to Admin</h1>
        </div>
      </div>

      <section className="splitGrid">
        <div className="panel">
          <div className="panelHeader">
            <h2>Stage summary</h2>
          </div>
          <div className="reportStageList">
            {verificationStages.map((stage, index) => (
              <article key={stage.id}>
                <span>Stage {stage.number}</span>
                <strong>{stage.title}</strong>
                <small>{index === 5 ? "Pending review" : "Pass"}</small>
              </article>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panelHeader">
            <h2>Overall recommendation</h2>
          </div>
          <ReportForm />
        </div>
      </section>
    </section>
  );
}

export default FinalReport;
