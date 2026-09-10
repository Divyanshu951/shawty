import AppleAuthButton from "@/components/apple-auth-button";
import GoogleAuthButton from "@/components/google-auth-button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="bg-background-neutral flex h-full w-full items-center justify-center">
      <div className="w-full max-w-md px-8">
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-bold tracking-tight">Welcome</h1>

          <p className="text-muted-foreground leading-relaxed">
            Create an account to get started in minutes.
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
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            Sign in
          </Link>
        </p>

        <div className="my-8 flex items-center gap-4">
          <div className="bg-border h-px flex-1" />
          <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
            Quick & Secure
          </span>
          <div className="bg-border h-px flex-1" />
        </div>

        <div className="text-muted-foreground text-center text-xs leading-relaxed">
          <div className="">
            By creating an account you agree to the{" "}
            <Link
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-600"
            >
              Terms of Service
            </Link>{" "}
            and our{" "}
            <Link
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-600"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
