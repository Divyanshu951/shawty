"use client";
import { createShortenLink } from "@/app/url-actions";
import { INITIAL_QUICK_URL_STATE } from "@/types/url";
import { Link, Loader2Icon, Calendar } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import Modal from "./modal";

type CreateLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateLinkModal = ({ isOpen, onClose }: CreateLinkModalProps) => {
  const [destinationUrl, setDestinationUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const [state, formAction, isPending] = useActionState(
    createShortenLink,
    INITIAL_QUICK_URL_STATE,
  );

  useEffect(() => {
    if (state.status === "success") {
      setDestinationUrl("");
      setCustomAlias("");
      setExpiresAt("");
    }
  }, [state.status]);

  const handleClose = () => {
    setDestinationUrl("");
    setCustomAlias("");
    setExpiresAt("");
    onClose();
  };

  // Minimum date for expiry: tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create a new Shawty">
      <form noValidate className="space-y-5" action={formAction}>
        {/* Destination URL */}
        <div>
          <label className="font-label-mono text-label-mono text-secondary mb-1.5 block">
            Destination URL
          </label>
          <div className="relative flex items-center">
            <span className="text-secondary absolute left-4">
              <Link size={18} />
            </span>
            <input
              type="url"
              disabled={isPending}
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              placeholder="https://example.com/your-long-url"
              name="destinationUrl"
              className="border-outline-variant/50 focus:border-primary focus:ring-primary-dark font-label-mono text-on-surface bg-surface placeholder-secondary h-12 w-full rounded-lg border py-3 pl-12 pr-4 text-base md:text-sm transition-all outline-none focus:ring-1"
            />
          </div>
        </div>

        {/* Custom Alias */}
        <div>
          <label className="font-label-mono text-label-mono text-secondary mb-1.5 block">
            Custom Alias{" "}
            <span className="text-outline text-xs">(optional)</span>
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="border-outline-variant/50 bg-surface-container flex h-11 sm:h-12 shrink-0 items-center rounded-lg border px-3">
              <span className="text-secondary whitespace-nowrap text-xs sm:text-sm">
                link.shawty.online/
              </span>
            </div>
            <input
              name="customAlias"
              disabled={isPending}
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              type="text"
              placeholder="my-custom-slug"
              className="border-outline-variant/50 focus:border-primary focus:ring-primary-dark text-on-surface bg-surface placeholder-secondary h-11 sm:h-12 min-w-0 flex-1 rounded-lg border px-3 text-base md:text-sm outline-none focus:ring-1"
            />
          </div>
          <p className="text-secondary mt-1 text-xs">
            Letters, numbers, and hyphens only. Min 3, max 30 chars.
          </p>
        </div>

        {/* Expiry Date */}
        <div>
          <label className="font-label-mono text-label-mono text-secondary mb-1.5 block">
            Expiry Date{" "}
            <span className="text-outline text-xs">(optional)</span>
          </label>
          <div className="relative flex items-center">
            <span className="text-secondary absolute left-4">
              <Calendar size={18} />
            </span>
            <input
              type="date"
              disabled={isPending}
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              name="expiresAt"
              min={minDate}
              className="border-outline-variant/50 focus:border-primary focus:ring-primary-dark font-label-mono text-on-surface bg-surface placeholder-secondary h-12 w-full rounded-lg border py-3 pl-12 pr-4 text-base md:text-sm transition-all outline-none focus:ring-1"
            />
          </div>
          <p className="text-secondary mt-1 text-xs">
            Link will automatically deactivate after this date.
          </p>
        </div>

        {/* Status Messages */}
        {state.status === "failed" && state.error && (
          <p className="text-sm font-semibold text-red-500">{state.error}</p>
        )}
        {state.status === "success" && (
          <div className="bg-surface-container rounded-lg p-3">
            <p className="text-sm font-semibold text-green-500">
              {state.message}
            </p>
            {state.url && (
              <p className="font-label-mono text-label-mono text-primary mt-1 break-all">
                {state.url}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="text-secondary hover:text-on-surface font-body-sm text-body-sm cursor-pointer rounded-lg px-5 py-3 sm:py-2.5 transition-colors text-center"
          >
            Cancel
          </button>
          <button
            disabled={isPending}
            type="submit"
            className="bg-primary-dark text-on-primary font-body-sm text-body-sm hover:bg-on-primary-fixed-variant flex cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 sm:py-2.5 font-semibold shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 text-center"
          >
            {isPending && <Loader2Icon size={16} className="animate-spin" />}
            {isPending ? "Creating..." : "Create Shawty"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateLinkModal;
