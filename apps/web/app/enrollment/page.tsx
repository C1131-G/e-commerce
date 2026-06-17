import EnrollmentForm from "./components/enrollment-form";
import EnrollmentHeader from "./components/enrollment-header";

export default function EnrollmentPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-10 sm:px-6 sm:py-14">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-emerald-100/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 top-36 size-64 rounded-full bg-lime-200/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        <EnrollmentHeader />
        <EnrollmentForm />
        <p className="mt-6 text-center text-xs text-slate-500">
          Your information is encrypted and used only to verify your farmer
          profile.
        </p>
      </div>
    </main>
  );
}
