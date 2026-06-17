"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  MapPin,
  ShieldCheck,
  User,
} from "@phosphor-icons/react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useState } from "react";

import {
  farmTypes,
  initialEnrollmentData,
  validateEnrollmentStep,
} from "../schemas/enrollment-schema";
import type {
  EnrollmentData,
  EnrollmentErrors,
  EnrollmentField,
} from "../schemas/enrollment-schema";
import EnrollmentStepper from "./enrollment-stepper";

const stepContent = [
  {
    description: "We will use these details to create your farmer profile.",
    icon: User,
    title: "Tell us about yourself",
  },
  {
    description: "Help buyers understand where and how you produce.",
    icon: MapPin,
    title: "Add your farm details",
  },
  {
    description: "A quick verification keeps our marketplace trustworthy.",
    icon: ShieldCheck,
    title: "Verify your identity",
  },
  {
    description: "Make sure everything is correct before submitting.",
    icon: CheckCircle,
    title: "Review your application",
  },
] as const;

const Field = ({ label, error, className = "", ...inputProps }: FieldProps) => {
  const errorId = `${inputProps.name}-error`;

  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        {...inputProps}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-100"
        }`}
      />
      {error ? (
        <span
          id={errorId}
          className="text-xs font-medium text-red-600"
          role="alert"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
};

const SelectField = ({
  label,
  error,
  ...selectProps
}: {
  label: string;
  name: EnrollmentField;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}) => (
  <label className="grid gap-2">
    <span className="text-sm font-semibold text-slate-700">{label}</span>
    <select
      {...selectProps}
      className={`rounded-xl border bg-slate-50 px-4 py-3 text-sm outline-none transition focus:bg-white focus:ring-4 ${
        error
          ? "border-red-400 focus:ring-red-100"
          : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-100"
      }`}
    >
      <option value="">Select an activity</option>
      {farmTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
    {error ? (
      <span className="text-xs font-medium text-red-600" role="alert">
        {error}
      </span>
    ) : null}
  </label>
);

const ReviewRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
      {label}
    </dt>
    <dd className="mt-0.5 text-sm font-medium text-slate-700">{value}</dd>
  </div>
);

const ReviewGroup = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
    <h3 className="mb-4 font-bold text-slate-900">{title}</h3>
    <dl className="space-y-3">{children}</dl>
  </section>
);

const Review = ({ data }: { data: EnrollmentData }) => (
  <div className="grid gap-4 sm:grid-cols-2">
    <ReviewGroup title="Personal information">
      <ReviewRow label="Name" value={data.fullName} />
      <ReviewRow label="Email" value={data.email} />
      <ReviewRow label="Phone" value={data.phone} />
    </ReviewGroup>
    <ReviewGroup title="Farm information">
      <ReviewRow label="Farm" value={data.farmName} />
      <ReviewRow label="Activity" value={data.farmType} />
      <ReviewRow label="Size" value={`${data.farmSize} acres`} />
      <ReviewRow label="Location" value={`${data.district}, ${data.state}`} />
    </ReviewGroup>
  </div>
);

const EnrollmentForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<EnrollmentData>(
    initialEnrollmentData
  );
  const [errors, setErrors] = useState<EnrollmentErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentStep = stepContent[activeStep] ?? stepContent[0];
  const StepIcon = currentStep.icon;

  const updateField = (
    field: EnrollmentField,
    value: EnrollmentData[EnrollmentField]
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    updateField(event.target.name as EnrollmentField, event.target.value);
  };

  const goForward = () => {
    const nextErrors = validateEnrollmentStep(formData, activeStep);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setActiveStep((step) => Math.min(step + 1, stepContent.length - 1));
    }
  };

  const goBack = () => {
    setErrors({});
    setActiveStep((step) => Math.max(step - 1, 0));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (activeStep < stepContent.length - 1) {
      goForward();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 700);
  };

  if (isComplete) {
    return (
      <section className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-xl shadow-emerald-950/5 sm:p-12">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle size={38} weight="fill" />
        </div>
        <h2 className="mt-5 font-heading text-2xl font-bold text-slate-950">
          Application submitted
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
          Thank you, {formData.fullName}. We sent a confirmation to{" "}
          <strong className="font-semibold text-slate-800">
            {formData.email}
          </strong>
          . Your farmer profile is now under review.
        </p>
        <button
          type="button"
          onClick={() => {
            setFormData(initialEnrollmentData);
            setActiveStep(0);
            setIsComplete(false);
          }}
          className="mt-7 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
        >
          Start another enrollment
        </button>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/80 bg-white/95 p-5 shadow-xl shadow-emerald-950/5 backdrop-blur sm:p-8"
      noValidate
    >
      <EnrollmentStepper activeStep={activeStep} />

      <div className="mb-7 flex items-start gap-3 border-b border-slate-100 pb-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <StepIcon size={22} weight="duotone" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Step {activeStep + 1} of {stepContent.length}
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-950">
            {currentStep.title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {currentStep.description}
          </p>
        </div>
      </div>

      <div className="min-h-72">
        {activeStep === 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              className="sm:col-span-2"
              label="Full name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g. Arjun Sharma"
              autoComplete="name"
              error={errors.fullName}
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="arjun@example.com"
              autoComplete="email"
              error={errors.email}
            />
            <Field
              label="Phone number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+91 98765 43210"
              autoComplete="tel"
              error={errors.phone}
            />
          </div>
        ) : null}

        {activeStep === 1 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Farm name"
              name="farmName"
              value={formData.farmName}
              onChange={handleInputChange}
              placeholder="Green Valley Farm"
              error={errors.farmName}
            />
            <Field
              label="Farm size (acres)"
              name="farmSize"
              type="number"
              min="0.1"
              step="0.1"
              value={formData.farmSize}
              onChange={handleInputChange}
              placeholder="12.5"
              error={errors.farmSize}
            />
            <SelectField
              label="Primary activity"
              name="farmType"
              value={formData.farmType}
              onChange={handleInputChange}
              error={errors.farmType}
            />
            <Field
              label="District"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              placeholder="Your district"
              error={errors.district}
            />
            <Field
              className="sm:col-span-2"
              label="State"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="Your state"
              error={errors.state}
            />
          </div>
        ) : null}

        {activeStep === 2 ? (
          <div className="space-y-6">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Enter a government-issued farmer or identity number. The number
              will be used only for account verification.
            </div>
            <Field
              label="Farmer or identity number"
              name="identityNumber"
              value={formData.identityNumber}
              onChange={handleInputChange}
              placeholder="Enter ID number"
              error={errors.identityNumber}
            />
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-300">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(event) =>
                  updateField("termsAccepted", event.target.checked)
                }
                className="mt-0.5 size-4 accent-emerald-600"
                aria-label="Confirm declaration"
              />
              <span className="text-sm leading-6 text-slate-600">
                I confirm that the information provided is accurate and I am
                authorized to represent this farm.
                {errors.termsAccepted ? (
                  <span className="block text-red-600" role="alert">
                    {errors.termsAccepted}
                  </span>
                ) : null}
              </span>
            </label>
          </div>
        ) : null}

        {activeStep === 3 ? <Review data={formData} /> : null}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={activeStep === 0}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-0"
        >
          <ArrowLeft size={17} weight="bold" />
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-w-36 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-60"
        >
          {(() => {
            if (isSubmitting) {
              return "Submitting...";
            }
            if (activeStep === stepContent.length - 1) {
              return "Submit application";
            }
            return "Continue";
          })()}
          {isSubmitting ? null : <ArrowRight size={17} weight="bold" />}
        </button>
      </div>
    </form>
  );
};

interface FieldProps {
  label: string;
  name: EnrollmentField;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  min?: string;
  step?: string;
}

export default EnrollmentForm;
