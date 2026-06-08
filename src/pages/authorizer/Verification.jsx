import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertTriangle, Camera, CheckCircle2, Upload } from "lucide-react";
import DocumentViewer from "../../components/authorizer/DocumentViewer.jsx";
import MapCard from "../../components/authorizer/MapCard.jsx";
import StageChecklist from "../../components/authorizer/StageChecklist.jsx";
import VerificationStepper from "../../components/authorizer/VerificationStepper.jsx";
import { farmers, verificationStages } from "../../data/stages.js";

function Verification() {
  const { stageId } = useParams();
  const activeStage =
    verificationStages.find((stage) => stage.id === stageId) ??
    verificationStages[0];
  const farmer = farmers[0];
  const [completedStages, setCompletedStages] = useState(["identity"]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [stageStatus, setStageStatus] = useState("Pending");

  const progress = useMemo(
    () =>
      Math.round((completedStages.length / verificationStages.length) * 100),
    [completedStages],
  );

  const toggleChecklistItem = (item) => {
    setCheckedItems((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item],
    );
  };

  const markComplete = () => {
    setCompletedStages((current) =>
      current.includes(activeStage.id) ? current : [...current, activeStage.id],
    );
    setStageStatus("Completed");
  };

  return (
    <section className="verificationPage">
      <VerificationStepper
        stages={verificationStages}
        activeStageId={activeStage.id}
        completedStages={completedStages}
      />

      <div className="pageStack">
        <div className="pageTitle">
          <div>
            <p className="eyebrow">Reusable verification screen</p>
            <h1>
              Stage {activeStage.number}: {activeStage.title}
            </h1>
          </div>
          <span
            className={`priorityBadge ${activeStage.priority === "High" ? "high" : "medium"}`}
          >
            {activeStage.priority}
          </span>
        </div>

        <section className="panel">
          <div className="progressTop">
            <span>
              {farmer.name} - {farmer.id}
            </span>
            <strong>{progress}% completed</strong>
          </div>
          <div className="progressBar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p className="mutedText">{activeStage.description}</p>
          <p className="flowText">{activeStage.userFlow}</p>
        </section>

        <section className="splitGrid">
          <div className="panel">
            <div className="panelHeader">
              <h2>Stage checklist</h2>
              <span className="statusBadge">{stageStatus}</span>
            </div>
            <StageChecklist
              checklist={activeStage.checklist}
              checkedItems={checkedItems}
              onToggle={toggleChecklistItem}
            />
          </div>

          <MapCard farmer={farmer} />
        </section>

        <section className="panel">
          <div className="panelHeader">
            <h2>Stage inputs</h2>
          </div>
          <div className="formGrid">
            {activeStage.fields.map((field) => (
              <label key={field}>
                {field}
                <input placeholder={`Enter ${field.toLowerCase()}`} />
              </label>
            ))}
            <label className="wideField">
              Notes
              <textarea
                rows="4"
                placeholder="Capture on-site verification notes"
              />
            </label>
          </div>

          <div className="actionRow">
            <button className="secondaryButton" type="button">
              <Upload size={17} />
              Upload document
            </button>
            <button className="secondaryButton" type="button">
              <Camera size={17} />
              Upload photo
            </button>
            <button
              className="primaryButton"
              type="button"
              onClick={markComplete}
            >
              <CheckCircle2 size={17} />
              Mark stage complete
            </button>
            <button
              className="dangerButton"
              type="button"
              onClick={() => setStageStatus("Issue flagged")}
            >
              <AlertTriangle size={17} />
              Flag mismatch
            </button>
          </div>
        </section>

        <section className="splitGrid">
          <DocumentViewer
            title="Reference documents"
            documents={farmer.documents}
            photos={farmer.photos}
          />
          <DocumentViewer title="Two year records" documents={farmer.records} />
        </section>

        <div className="nextAction">
          <Link className="primaryButton" to="/authorizer/final-report">
            Open final report
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Verification;
