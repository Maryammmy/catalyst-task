export default function SingleSkeleton({ cards }: { cards: number }) {
  return (
    <div className="py-8 px-5">
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex flex-col gap-5">
            <div className="w-[200px] md:w-[400px] h-[20px] bg-gray-200 animate-pulse rounded-md"></div>
            <div className="flex flex-col  md:flex-row flex-wrap gap-5">
              <div className="w-[280px] md:w-[600px] h-[350px] bg-gray-200 animate-pulse rounded-md"></div>
              <div className="w-[280px] md:w-[600px] h-[350px] bg-gray-200 animate-pulse rounded-md"></div>
            </div>
            <div className=" flex flex-col gap-4">
              <div className="w-[200px] h-[20px] bg-gray-200 animate-pulse rounded-md"></div>
              <div className="w-[170px] h-[20px] bg-gray-200 animate-pulse rounded-md"></div>
              <div className="w-[120px] h-[20px] bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          </div>
        ))}
    </div>
  );
}
