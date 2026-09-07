import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center gap-4">
      <Loader2Icon size={32} className="animate-spin" />
      <span className="italic">Loading dashboard...</span>
    </div>
  );
}
