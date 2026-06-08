import { NavLink } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

function VerificationStepper({ stages, activeStageId, completedStages }) {
  return (
    <aside className="stepper">
      <p className="eyebrow">Verification stages</p>
      {stages.map((stage) => {
        const Icon = stage.icon;
        const done = completedStages.includes(stage.id);
        return (
          <NavLink
            key={stage.id}
            to={stage.route}
            className={`stepLink ${activeStageId === stage.id ? "active" : ""}`}
          >
            <span className="stepIcon">
              <Icon size={18} />
            </span>
            <span>
              <strong>Stage {stage.number}</strong>
              <small>{stage.title}</small>
            </span>
            {done && <CheckCircle2 size={17} />}
          </NavLink>
        );
      })}
    </aside>
  );
}

export default VerificationStepper;
