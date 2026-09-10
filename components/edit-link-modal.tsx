"use client";
import { updateLink } from "@/app/link-actions";
import { Link, Loader2Icon, Calendar } from "lucide-react";
import { useState } from "react";
import Modal from "./modal";

type EditLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
  link: {
    id: string;
    slug: string;
    destinationUrl: string;
    expiresAt: Date | null;
  };
};

const EditLinkModal = ({ isOpen, onClose, link }: EditLinkModalProps) => {
  const [destinationUrl, setDestinationUrl] = useState(link.destinationUrl);
  const [customAlias, setCustomAlias] = useState(link.slug);
  const [expiresAt, setExpiresAt] = useState(
    link.expiresAt ? link.expiresAt.toISOString().split("T")[0] : "",
  );
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError("");
    setSuccess("");

    const result = await updateLink({
      id: link.id,
      destinationUrl,
      customAlias,
      expiresAt: expiresAt || undefined,
    });

    setIsPending(false);

    if (result.status === "failed") {
      setError(result.error);
    } else {
      setSuccess(result.message);
      setTimeout(() => {
        onClose();
      }, 800);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Shawty">
      <form noValidate className="space-y-5" onSubmit={handleSubmit}>
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
              className="border-outline-variant/50 focus:border-primary focus:ring-primary-dark font-label-mono text-on-surface bg-surface placeholder-secondary h-12 w-full rounded-lg border py-3 pl-12 pr-4 text-base md:text-sm transition-all outline-none focus:ring-1"
            />
          </div>
        </div>

        {/* Custom Alias */}
        <div>
          <label className="font-label-mono text-label-mono text-secondary mb-1.5 block">
            Custom Alias
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="border-outline-variant/50 bg-surface-container flex h-11 sm:h-12 shrink-0 items-center rounded-lg border px-3">
              <span className="text-secondary whitespace-nowrap text-xs sm:text-sm">
                link.shawty.online/
              </span>
            </div>
            <input
              disabled={isPending}
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              type="text"
              placeholder="my-custom-slug"
              className="border-outline-variant/50 focus:border-primary focus:ring-primary-dark text-on-surface bg-surface placeholder-secondary h-11 sm:h-12 min-w-0 flex-1 rounded-lg border px-3 text-base md:text-sm outline-none focus:ring-1"
            />
          </div>
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
              min={minDate}
              className="border-outline-variant/50 focus:border-primary focus:ring-primary-dark font-label-mono text-on-surface bg-surface placeholder-secondary h-12 w-full rounded-lg border py-3 pl-12 pr-4 text-base md:text-sm transition-all outline-none focus:ring-1"
            />
          </div>
          {expiresAt && (
            <button
              type="button"
              onClick={() => setExpiresAt("")}
              className="text-primary mt-1 cursor-pointer text-xs hover:underline"
            >
              Remove expiry
            </button>
          )}
        </div>

        {/* Status Messages */}
        {error && (
          <p className="text-sm font-semibold text-red-500">{error}</p>
        )}
        {success && (
          <p className="text-sm font-semibold text-green-500">{success}</p>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
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
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditLinkModal;
