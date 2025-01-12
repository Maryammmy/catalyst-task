export default function CardSkeleton({ cards }: { cards: number }) {
  return (
    <div className="flex flex-col md:flex-row gap-5 flex-wrap items-center justify-center py-5">
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="w-[300px] h-[350px] bg-gray-200 animate-pulse rounded-md"
          ></div>
        ))}
    </div>
  );
}
