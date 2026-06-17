import { Leaf } from "@phosphor-icons/react/dist/ssr";

export default function EnrollmentHeader() {
  return (
    <header className="mb-8 text-center">
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
        <Leaf size={30} weight="duotone" />
      </div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
        Grow with us
      </p>
      <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        Farmer enrollment
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
        Create your verified farmer profile and start selling directly through
        the Agri marketplace.
      </p>
    </header>
  );
}
