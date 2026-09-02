import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-sm max-md:px-4">
      <h1 className="text-primary text-8xl font-bold md:text-9xl">404</h1>
      <div className="my-5 h-1 w-16 rounded md:my-7"></div>
      <p className="text-2xl font-bold text-gray-800 md:text-3xl">
        Page Not Found
      </p>
      <p className="mt-4 max-w-md text-center text-sm text-gray-500 md:text-base">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div className="mt-6 flex items-center gap-4">
        <Link
          href="/"
          className="rounded-md bg-gray-800 px-7 py-2.5 text-white transition-all hover:bg-black active:scale-95"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
