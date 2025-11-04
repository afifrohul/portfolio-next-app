import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonProject() {
  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="order-2 md:order-1">
          <Skeleton className="w-[50px] h-4 rounded-xs mb-2" />
          <Skeleton className="w-[200px] h-5 rounded-sm mb-3" />
          <div className="space-y-2  mb-4  ">
            <Skeleton className="w-full h-2 rounded-sm" />
            <Skeleton className="w-full h-2 rounded-sm" />
            <Skeleton className="w-[250px] h-2 rounded-sm" />
          </div>
          <div className="flex gap-4 items-center my-4">
            <Skeleton className="w-5 h-5 rounded-sm" />
            <Skeleton className="w-5 h-5 rounded-sm" />
            <Skeleton className="w-5 h-5 rounded-sm" />
          </div>
          <Skeleton className="w-[120px] h-8 rounded-sm" />
        </div>
        <Skeleton className="w-full h-[150px] lg:h-full rounded-sm order-1 lg:order-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Skeleton className="w-full h-[150px] md:h-full rounded-sm" />
        <div className="">
          <Skeleton className="w-[50px] h-4 rounded-xs mb-2" />
          <Skeleton className="w-[200px] h-5 rounded-sm mb-3" />
          <div className="space-y-2  mb-4  ">
            <Skeleton className="w-full h-2 rounded-sm" />
            <Skeleton className="w-full h-2 rounded-sm" />
            <Skeleton className="w-[250px] h-2 rounded-sm" />
          </div>
          <div className="flex gap-4 items-center my-4">
            <Skeleton className="w-5 h-5 rounded-sm" />
            <Skeleton className="w-5 h-5 rounded-sm" />
            <Skeleton className="w-5 h-5 rounded-sm" />
          </div>
          <Skeleton className="w-[120px] h-8 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
