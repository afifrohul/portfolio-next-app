import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonProfile() {
  return (
    <div className="flex gap-4">
      <Skeleton className="w-14 h-14 rounded-full" />
      <Skeleton className="w-14 h-14 rounded-full" />
    </div>
  );
}
