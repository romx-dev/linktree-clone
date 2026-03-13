import { BarChart3, LayoutDashboard, Palette, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

type SidebarNavItem = {
  label: string;
  Icon: typeof LayoutDashboard;
  active: boolean;
};

const navItems: SidebarNavItem[] = [
  { label: "Links", Icon: LayoutDashboard, active: true },
  { label: "Appearance", Icon: Palette, active: false },
  { label: "Analytics", Icon: BarChart3, active: false },
  { label: "Settings", Icon: Settings, active: false },
];

export default function DashboardSidebar() {
  return (
    <aside className="w-full bg-white p-6 border-b border-gray-100 md:w-64 md:border-r md:border-b-0 flex flex-col">
      <div className="flex items-center gap-2 mb-6 pl-1">
        <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
            fill="black"
          />
        </svg>
        <span className="text-xl font-bold tracking-tight">AjudaRapida</span>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              item.active
                ? "bg-[#F9E565] text-black"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            href="#"
          >
            <item.Icon className="h-5 w-5" />
            {item.label}
          </a>
        ))}
      </nav>
      <div className="mt-6 rounded-2xl bg-[#FDF9D9] p-5 text-sm text-gray-700">
        <h3 className="font-bold text-xs uppercase tracking-[0.4em] text-gray-900 mb-1">
          Upgrade to Pro
        </h3>
        <p className="text-xs leading-relaxed mb-4 text-gray-600">
          Get your racual desktop link management
        </p>
        <Button className="w-full rounded-xl bg-black px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-900">
          Get it Now
        </Button>
      </div>
    </aside>
  );
}
