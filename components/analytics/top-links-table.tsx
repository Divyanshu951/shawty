"use client";
import { useState } from "react";
import { ExternalLink, Copy, Check, TrendingUp } from "lucide-react";

export type TopLinkItem = {
  id: string;
  slug: string;
  destinationUrl: string;
  clickCount: number;
  percentage: number;
};

type TopLinksTableProps = {
  links: TopLinkItem[];
};

export default function TopLinksTable({ links }: TopLinksTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (slug: string, id: string) => {
    try {
      await navigator.clipboard.writeText(`https://link.shawty.online/${slug}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const truncate = (str: string, len = 35) => {
    if (str.length <= len) return str;
    return str.slice(0, len) + "…";
  };

  return (
    <div className="bg-surface-container-lowest border-outline-variant/30 rounded-xl border p-4 sm:p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-headline-lg text-on-surface text-base sm:text-lg font-semibold">
            Top Performing Shawties
          </h3>
          <p className="font-body-sm text-xs text-secondary mt-0.5">
            Links generating the highest traffic and click engagement
          </p>
        </div>
        <div className="bg-primary-fixed text-[#9d4300] flex size-8 items-center justify-center rounded-lg">
          <TrendingUp size={16} />
        </div>
      </div>

      {links.length > 0 ? (
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-left min-w-[320px]">
            <thead>
              <tr className="border-outline-variant/30 font-label-mono text-secondary border-b text-xs">
                <th className="pb-3 font-medium">Rank & Short Link</th>
                <th className="hidden pb-3 font-medium sm:table-cell">Destination</th>
                <th className="pb-3 text-right font-medium">Clicks</th>
                <th className="hidden pb-3 text-right font-medium md:table-cell">Share</th>
                <th className="pb-3 text-right font-medium">Copy</th>
              </tr>
            </thead>
            <tbody className="divide-outline-variant/20 divide-y">
              {links.map((link, index) => {
                const shortUrl = `https://link.shawty.online/${link.slug}`;
                const isCopied = copiedId === link.id;

                return (
                  <tr key={link.id} className="group hover:bg-surface-container/30 transition-colors">
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-surface-container font-label-mono text-secondary flex size-5 shrink-0 items-center justify-center rounded text-[11px] font-bold">
                          {index + 1}
                        </span>
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-label-mono text-primary-dark hover:text-primary flex items-center gap-1 text-sm font-semibold transition-colors"
                        >
                          /{link.slug}
                          <ExternalLink size={12} className="shrink-0" />
                        </a>
                      </div>
                    </td>

                    <td className="font-body-sm text-secondary hidden py-3 pr-2 text-xs sm:table-cell">
                      <span title={link.destinationUrl}>
                        {truncate(link.destinationUrl)}
                      </span>
                    </td>

                    <td className="py-3 pr-2 text-right">
                      <span className="font-label-mono text-on-surface text-sm font-bold">
                        {link.clickCount.toLocaleString()}
                      </span>
                    </td>

                    <td className="hidden py-3 pr-2 text-right md:table-cell">
                      <div className="flex items-center justify-end gap-2">
                        <div className="bg-surface-container h-1.5 w-16 overflow-hidden rounded-full">
                          <div
                            className="bg-primary-dark h-full rounded-full"
                            style={{ width: `${Math.min(100, Math.max(5, link.percentage))}%` }}
                          />
                        </div>
                        <span className="font-label-mono text-secondary text-xs">
                          {link.percentage}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleCopy(link.slug, link.id)}
                        className="text-secondary hover:text-on-surface hover:bg-surface-container inline-flex cursor-pointer rounded-md p-2 min-h-[36px] min-w-[36px] items-center justify-center transition-colors"
                        title="Copy link"
                        aria-label="Copy short link"
                      >
                        {isCopied ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="font-body-sm text-sm text-secondary">
            No link click data recorded yet.
          </p>
        </div>
      )}
    </div>
  );
}
