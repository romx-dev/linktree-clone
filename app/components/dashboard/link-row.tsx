import { deleteLink } from "@/app/actions";
import type { Link as PrismaLink } from "@/app/generated/prisma/client";

type LinkRowProps = {
  link: PrismaLink;
};

export default function LinkRow({ link }: LinkRowProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg shadow-black/5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
        <svg
          className="h-5 w-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-900 mb-1">
          {link.title}
        </h4>
        <input
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300"
          type="text"
          value={link.url}
          readOnly
        />
      </div>
      <div className="ml-4 flex items-center">
        <div className="relative inline-flex h-6 w-12 items-center">
          <input
            id={`toggle-${link.id}`}
            type="checkbox"
            defaultChecked
            className="peer sr-only"
          />
          <label
            htmlFor={`toggle-${link.id}`}
            className="block h-6 w-12 rounded-full bg-[#D1D5DB] transition peer-checked:bg-black"
          />
          <span className="pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-5 peer-checked:shadow-md" />
        </div>
        <form action={deleteLink} className="ml-3">
          <input type="hidden" name="linkId" value={link.id} />
          <button
            type="submit"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 transition hover:text-red-500"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
