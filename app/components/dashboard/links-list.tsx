import type { Link as PrismaLink } from "@/app/generated/prisma/client";
import LinkRow from "@/app/components/dashboard/link-row";

type LinksListProps = {
  links: PrismaLink[];
};

export default function LinksList({ links }: LinksListProps) {
  return (
    <div className="max-w-3xl space-y-4">
      {links.map((link) => (
        <LinkRow key={link.id} link={link} />
      ))}
    </div>
  );
}
