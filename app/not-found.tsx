import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="bg-surface flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="relative">
        <span className="font-display-lg text-primary-dark/10 select-none text-9xl font-black md:text-[12rem]">
          404
        </span>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-headline-lg text-on-surface text-3xl font-bold md:text-4xl">
            Page Not Found
          </h1>
          <p className="font-body-sm text-secondary mt-2 max-w-md text-sm md:text-base">
            The page you are looking for might have been moved, expired, or does not exist.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/dashboard"
          className="bg-primary-dark text-on-primary hover:bg-on-primary-fixed-variant font-body-sm flex items-center gap-2 rounded-lg px-6 py-3 font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Home size={18} />
          Go to Dashboard
        </Link>
        <Link
          href="/"
          className="border-outline-variant/50 text-secondary hover:text-on-surface hover:bg-surface-container font-body-sm flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
