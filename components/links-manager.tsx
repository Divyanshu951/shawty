"use client";
import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Link2,
  TrendingUp,
  Globe2,
  ArrowUpDown,
} from "lucide-react";
import LinkCard from "./link-card";
import CreateLinkModal from "./create-link-modal";

type LinkData = {
  id: string;
  slug: string;
  destinationUrl: string;
  clickCount: number;
  isActive: boolean;
  expiresAt: Date | null;
  createdAt: Date;
};

type LinksManagerProps = {
  links: LinkData[];
};

type FilterStatus = "all" | "active" | "inactive";
type SortOption = "newest" | "oldest" | "clicks";

export default function LinksManager({ links }: LinksManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter and sort links
  const filteredLinks = useMemo(() => {
    return links
      .filter((link) => {
        // Status filter
        if (statusFilter === "active" && !link.isActive) return false;
        if (statusFilter === "inactive" && link.isActive) return false;

        // Search query
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase().trim();
        return (
          link.slug.toLowerCase().includes(query) ||
          link.destinationUrl.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        if (sortBy === "oldest") {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
        if (sortBy === "clicks") {
          return b.clickCount - a.clickCount;
        }
        return 0;
      });
  }, [links, searchQuery, statusFilter, sortBy]);

  // Aggregate stats
  const totalLinks = links.length;
  const activeLinks = links.filter((l) => l.isActive).length;
  const totalClicks = links.reduce((sum, l) => sum + l.clickCount, 0);

  return (
    <div className="space-y-6">
      {/* Header with Title and Action Button */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            My Shawties
          </h2>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            Manage, organize, and track lightning-fast shortened URLs with rich
            analytics.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary-dark text-on-primary font-body-sm text-body-sm hover:bg-on-primary-fixed-variant flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
        >
          <Plus size={20} />
          <span>Make a new Shawty</span>
        </button>
      </div>

      {/* Metric chips */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-surface-container-lowest border-outline-variant/30 flex items-center gap-4 rounded-xl border p-4 shadow-sm">
          <div className="bg-primary-fixed flex size-12 shrink-0 items-center justify-center rounded-lg text-[#9d4300]">
            <Link2 size={24} />
          </div>
          <div>
            <p className="font-body-sm text-body-sm text-secondary">
              Total Shawties
            </p>
            <p className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {totalLinks}
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest border-outline-variant/30 flex items-center gap-4 rounded-xl border p-4 shadow-sm">
          <div className="bg-primary-fixed flex size-12 shrink-0 items-center justify-center rounded-lg text-[#9d4300]">
            <Globe2 size={24} />
          </div>
          <div>
            <p className="font-body-sm text-body-sm text-secondary">
              Active Links
            </p>
            <p className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {activeLinks}
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest border-outline-variant/30 flex items-center gap-4 rounded-xl border p-4 shadow-sm">
          <div className="bg-primary-fixed flex size-12 shrink-0 items-center justify-center rounded-lg text-[#9d4300]">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="font-body-sm text-body-sm text-secondary">
              Total Clicks
            </p>
            <p className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {totalClicks}
            </p>
          </div>
        </div>
      </div>

      {/* Search, Filter, and Sort Controls */}
      <div className="bg-surface-container-lowest border-outline-variant/30 flex flex-col gap-4 rounded-xl border p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="text-secondary absolute top-1/2 left-3.5 -translate-y-1/2"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by alias or destination URL..."
            className="border-outline-variant/50 focus:border-primary focus:ring-primary-dark font-body-sm text-on-surface bg-surface placeholder-secondary h-11 w-full rounded-lg border pr-4 pl-10 text-base transition-all outline-none focus:ring-1 md:text-sm"
          />
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Status Tabs */}
          <div className="bg-surface-container flex w-full rounded-lg p-1 sm:w-auto">
            <button
              onClick={() => setStatusFilter("all")}
              className={`font-body-sm flex-1 rounded-md px-3 py-2 text-center text-xs font-medium transition-all sm:flex-initial sm:py-1.5 ${
                statusFilter === "all"
                  ? "bg-surface text-on-surface shadow-xs"
                  : "text-secondary hover:text-on-surface"
              }`}
            >
              All ({totalLinks})
            </button>
            <button
              onClick={() => setStatusFilter("active")}
              className={`font-body-sm flex-1 rounded-md px-3 py-2 text-center text-xs font-medium transition-all sm:flex-initial sm:py-1.5 ${
                statusFilter === "active"
                  ? "bg-surface text-on-surface shadow-xs"
                  : "text-secondary hover:text-on-surface"
              }`}
            >
              Active ({activeLinks})
            </button>
            <button
              onClick={() => setStatusFilter("inactive")}
              className={`font-body-sm flex-1 rounded-md px-3 py-2 text-center text-xs font-medium transition-all sm:flex-initial sm:py-1.5 ${
                statusFilter === "inactive"
                  ? "bg-surface text-on-surface shadow-xs"
                  : "text-secondary hover:text-on-surface"
              }`}
            >
              Inactive ({totalLinks - activeLinks})
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="border-outline-variant/50 bg-surface flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 sm:w-auto sm:justify-start">
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} className="text-secondary shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="font-body-sm text-on-surface cursor-pointer bg-transparent text-base outline-none md:text-sm"
              >
                <option value="newest" className="bg-surface text-on-surface">
                  Newest First
                </option>
                <option value="oldest" className="bg-surface text-on-surface">
                  Oldest First
                </option>
                <option value="clicks" className="bg-surface text-on-surface">
                  Most Clicks
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Links List or Empty State */}
      {filteredLinks.length > 0 ? (
        <div className="space-y-3">
          {filteredLinks.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      ) : (
        <div className="bg-surface-container-lowest border-outline-variant/30 flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center shadow-xs">
          <div className="bg-surface-container text-secondary mb-4 flex size-16 items-center justify-center rounded-full">
            <SlidersHorizontal size={28} />
          </div>
          {searchQuery || statusFilter !== "all" ? (
            <>
              <h3 className="font-headline-lg text-on-surface text-lg font-semibold">
                No matching Shawties found
              </h3>
              <p className="font-body-sm text-body-sm text-secondary mt-1 max-w-sm">
                Try adjusting your search terms or filters to find what
                you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                className="text-primary font-body-sm mt-4 cursor-pointer text-sm font-semibold hover:underline"
              >
                Reset filters
              </button>
            </>
          ) : (
            <>
              <h3 className="font-headline-lg text-on-surface text-lg font-semibold">
                No Shawties created yet
              </h3>
              <p className="font-body-sm text-body-sm text-secondary mt-1 max-w-sm">
                Shorten your first link to start tracking clicks, geographic
                data, and sharing sleek URLs.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-primary-dark text-on-primary hover:bg-on-primary-fixed-variant font-body-sm mt-5 flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold shadow-sm transition-all"
              >
                <Plus size={16} />
                <span>Create your first Shawty</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Create Link Modal */}
      {showCreateModal && (
        <CreateLinkModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}
