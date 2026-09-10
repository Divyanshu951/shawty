"use client";
import {
  Copy,
  Check,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Clock,
  BarChart3,
  Loader2Icon,
} from "lucide-react";
import { useState } from "react";
import { deleteLink, toggleLinkActive } from "@/app/link-actions";
import EditLinkModal from "./edit-link-modal";

type LinkData = {
  id: string;
  slug: string;
  destinationUrl: string;
  clickCount: number;
  isActive: boolean;
  expiresAt: Date | null;
  createdAt: Date;
};

type LinkCardProps = {
  link: LinkData;
};

const LinkCard = ({ link }: LinkCardProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isActive, setIsActive] = useState(link.isActive);

  const shortUrl = `https://link.shawty.online/${link.slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleToggle = async () => {
    setIsToggling(true);
    const result = await toggleLinkActive(link.id);
    if (result.status === "success") {
      setIsActive(!isActive);
    }
    setIsToggling(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    setIsDeleting(true);
    await deleteLink(link.id);
    setIsDeleting(false);
  };

  const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date();

  const truncateUrl = (url: string, maxLen = 50) => {
    if (url.length <= maxLen) return url;
    return url.slice(0, maxLen) + "…";
  };

  return (
    <>
      <div
        className={`bg-surface-container-lowest border-outline-variant/30 group relative rounded-xl border p-4 sm:p-5 transition-all duration-200 hover:shadow-md ${!isActive || isExpired ? "opacity-60" : ""}`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Link info */}
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label-mono text-primary-dark hover:text-primary flex items-center gap-1 text-sm font-bold transition-colors truncate max-w-full"
              >
                <span className="truncate break-all">link.shawty.online/{link.slug}</span>
                <ExternalLink size={14} className="shrink-0" />
              </a>

              {/* Status badges */}
              {!isActive && (
                <span className="bg-surface-container text-secondary rounded-full px-2 py-0.5 text-xs font-semibold">
                  Inactive
                </span>
              )}
              {isExpired && (
                <span className="bg-error-container text-on-error-container rounded-full px-2 py-0.5 text-xs font-semibold">
                  Expired
                </span>
              )}
            </div>

            <p
              className="font-body-sm text-body-sm text-secondary truncate"
              title={link.destinationUrl}
            >
              → {truncateUrl(link.destinationUrl)}
            </p>

            <div className="text-secondary flex flex-wrap items-center gap-x-4 gap-y-1 text-xs pt-0.5">
              <span className="flex items-center gap-1">
                <BarChart3 size={12} />
                {link.clickCount} click{link.clickCount !== 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {new Date(link.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              {link.expiresAt && (
                <span className="flex items-center gap-1">
                  Expires{" "}
                  {new Date(link.expiresAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>

          {/* Right: Actions (touch friendly on mobile with min 40px targets) */}
          <div className="border-outline-variant/20 flex shrink-0 items-center justify-between sm:justify-end gap-1 border-t pt-2.5 sm:border-t-0 sm:pt-0">
            <button
              onClick={handleCopy}
              title="Copy short link"
              className="text-secondary hover:text-on-surface hover:bg-surface-container cursor-pointer rounded-lg p-2 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors"
              aria-label="Copy short link"
            >
              {isCopied ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <Copy size={18} />
              )}
            </button>

            <button
              onClick={() => setShowEditModal(true)}
              title="Edit link"
              className="text-secondary hover:text-on-surface hover:bg-surface-container cursor-pointer rounded-lg p-2 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors"
              aria-label="Edit link"
            >
              <Edit2 size={18} />
            </button>

            <button
              onClick={handleToggle}
              disabled={isToggling}
              title={isActive ? "Deactivate link" : "Activate link"}
              className="text-secondary hover:text-on-surface hover:bg-surface-container cursor-pointer rounded-lg p-2 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors disabled:opacity-50"
              aria-label={isActive ? "Deactivate link" : "Activate link"}
            >
              {isToggling ? (
                <Loader2Icon size={18} className="animate-spin" />
              ) : isActive ? (
                <ToggleRight size={22} className="text-primary" />
              ) : (
                <ToggleLeft size={22} />
              )}
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              title="Delete link"
              className="text-secondary hover:text-error hover:bg-error-container/30 cursor-pointer rounded-lg p-2 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors disabled:opacity-50"
              aria-label="Delete link"
            >
              {isDeleting ? (
                <Loader2Icon size={18} className="animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditLinkModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          link={link}
        />
      )}
    </>
  );
};

export default LinkCard;
