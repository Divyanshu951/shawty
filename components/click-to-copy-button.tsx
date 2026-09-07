"use client";

import { Check, Copy, Loader2Icon } from "lucide-react";
import { useState } from "react";

const ClickToCopyButton = ({ destinationUrl }: { destinationUrl: string }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      // Use the browser's native Clipboard API
      setIsCopying(true);
      await navigator.clipboard.writeText(destinationUrl);
      setIsCopying(false);
      setIsCopied(true);

      // Revert the button text back to normal after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface border-outline-variant/40 flex min-w-20 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-lg border px-1 py-1 text-xs font-semibold transition-colors"
      title="Copy to clipboard"
    >
      {isCopied ? (
        isCopying ? (
          <Loader2Icon size={16} />
        ) : (
          <Check size={16} />
        )
      ) : (
        <>
          <span className="material-symbols-outlined text-base" id="copy-icon">
            <Copy size={14} />
          </span>
          <span id="copy-text">Copy</span>
        </>
      )}
    </button>
  );
};

export default ClickToCopyButton;
