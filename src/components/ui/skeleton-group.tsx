import { Skeleton } from "./skeleton";

interface SkeletonProps {
    title: string;
  }


export function SkeletonGroup(props: SkeletonProps) {
    return (
        <>
            <div className="text-2xl text-center p-2">{props.title}</div>
            <p className="text-muted-foreground text-sm text-center">( Page: ... )</p>
            <div className="flex flex-row gap-4 p-2 flex-wrap justify-center items-center">
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
                <Skeleton className="w-[206px] h-[309px] rounded-md" />
            </div>
        </>
    )
}