import db from "@/db";
import { urlTable } from "@/db/schemas";

const Page = async () => {
  // const links = await db.select().from(urlTable);
  // console.log(links);

  return (
    <div>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            My Shawties
          </h2>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            Manage, organize, and track lightning-fast shortened URLs with rich
            analytics.
          </p>
        </div>
        <p className="font-headline-lg-mobile text-body-sm flex items-center gap-3 text-xl">
          <span className="relative flex size-3">
            <span className="bg-primary-dark absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-primary-dark relative inline-flex size-3 rounded-full" />
          </span>
          142 total shortlinks
        </p>
      </div>
    </div>
  );
};

export default Page;
