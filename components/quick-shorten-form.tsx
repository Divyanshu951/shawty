"use client";
import { createShortenLink } from "@/app/url-actions";
import { INITIAL_QUICK_URL_STATE } from "@/types/url";
import { Link, Loader2Icon } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import ClickToCopyButton from "./click-to-copy-button";

const QuickShortenForm = () => {
  const [destinationUrl, setDestinationUrl] = useState<string>("");
  const [customAlias, setCustomAlias] = useState<string>("");

  const [state, formAction, isPending] = useActionState(
    createShortenLink,
    INITIAL_QUICK_URL_STATE,
  );

  useEffect(() => {
    if (state.status === "success") {
      setCustomAlias("");
      setDestinationUrl("");
    }
  }, [state.status]);

  return (
    <form noValidate className="space-y-3" action={formAction}>
      <div className="relative flex items-center rounded-md shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
        <span className="text-secondary absolute left-4">
          <Link size={18} />
        </span>

        <input
          type="url"
          disabled={isPending}
          value={destinationUrl}
          onChange={(e) => setDestinationUrl(e.target.value)}
          placeholder="Paste a long URL here..."
          name="destinationUrl"
          className="border-outline-variant/50 focus:border-primary focus:ring-primary-dark font-label-mono text-label-mono text-on-surface bg-surface-container-lowest placeholder-secondary h-14 w-full rounded-[8px] border py-4 pr-32 pl-12 transition-all outline-none focus:ring-1"
        />

        <button
          disabled={isPending}
          type="submit"
          className="bg-primary-dark text-on-primary font-body-sm text-body-sm hover:bg-on-primary-fixed-variant absolute top-2 right-2 bottom-2 cursor-pointer rounded-[6px] px-4 font-semibold transition-colors disabled:cursor-not-allowed"
        >
          Shorten
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="border-outline-variant/50 bg-surface-container flex h-11 items-center rounded-md border px-3">
          <span className="text-secondary text-sm">link.shawty.online/</span>
        </div>

        <input
          name="customAlias"
          disabled={isPending}
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
          type="text"
          placeholder="custom-alias"
          className="border-outline-variant/50 focus:border-primary focus:ring-primary-dark text-on-surface bg-surface-container-lowest placeholder-secondary h-11 flex-1 rounded-md border px-3 text-sm outline-none focus:ring-1"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-secondary flex gap-10 text-xs">
          Optional. Use letters, numbers, and hyphens.
        </p>
        {state.status === "failed" && (
          <p className="text-sm font-semibold text-red-500">{state.error}</p>
        )}
        {state.status === "success" && (
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-green-500">
              {state.message}
            </p>
            {state.url && <ClickToCopyButton destinationUrl={state.url} />}
          </div>
        )}
        {isPending && (
          <p>
            <Loader2Icon size={18} className="animate-spin" />
          </p>
        )}
      </div>
    </form>
  );
};

export default QuickShortenForm;
