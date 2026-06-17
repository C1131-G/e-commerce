import { Check } from "@phosphor-icons/react";

const steps = ["Personal info", "Farm details", "Verification", "Review"];

interface EnrollmentStepperProps {
  activeStep: number;
}

export default function EnrollmentStepper({
  activeStep,
}: EnrollmentStepperProps) {
  return (
    <nav aria-label="Enrollment progress" className="mb-8">
      <ol className="grid grid-cols-4">
        {steps.map((step, index) => {
          const isComplete = index < activeStep;
          const isActive = index === activeStep;

          return (
            <li
              key={step}
              aria-current={isActive ? "step" : undefined}
              className="relative flex flex-col items-center"
            >
              {index > 0 ? (
                <span
                  className={`absolute right-1/2 top-5 h-0.5 w-full ${
                    index <= activeStep ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                  aria-hidden="true"
                />
              ) : null}

              <span
                className={`relative z-10 flex size-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                  isComplete
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : (isActive
                      ? "border-emerald-600 bg-white text-emerald-700"
                      : "border-slate-200 bg-white text-slate-400")
                }`}
              >
                {isComplete ? <Check size={18} weight="bold" /> : index + 1}
              </span>
              <span
                className={`mt-2 hidden text-center text-xs font-semibold sm:block ${
                  isActive ? "text-emerald-700" : "text-slate-500"
                }`}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
