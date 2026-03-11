type LinkLimitCounterProps = {
  count: number;
  maxLinks: number | null | undefined;
};

export default function LinkLimitCounter({
  count,
  maxLinks,
}: LinkLimitCounterProps) {
  const maxLabel = maxLinks === Infinity ? "∞" : maxLinks;

  return (
    <div className="text-sm text-[#6B7280]">
      {count} / {maxLabel} links
    </div>
  );
}
