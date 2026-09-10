import AppleAuthButton from "@/components/apple-auth-button";
import GoogleAuthButton from "@/components/google-auth-button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="bg-background-neutral flex h-full w-full items-center justify-center">
      <div className="w-full max-w-md px-8">
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-bold tracking-tight">
            Welcome back
          </h1>

          <p className="text-muted-foreground leading-relaxed">
            Sign in to pick up right where you left off.
          </p>
        </div>

        <div className="text-muted-foreground mb-3 text-sm">
          Connect to Shawty with:
        </div>

        <div className="grid grid-cols-1 gap-3">
          <GoogleAuthButton />
          {/* <AppleAuthButton /> */}
        </div>

        <p className="text-muted-foreground mt-5 text-sm">
          New here?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            Create an account
          </Link>
        </p>

        <div className="my-8 flex items-center gap-4">
          <div className="bg-border h-px flex-1" />
          <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
            Quick & Secure
          </span>
          <div className="bg-border h-px flex-1" />
        </div>

        <p className="text-muted-foreground text-center text-xs leading-relaxed">
          Protected by industry-standard authentication.
        </p>
      </div>
    </div>
  );
};

export default Page;
