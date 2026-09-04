import { BadgeCheck, Truck, Store } from "lucide-react";

const ITEMS = [
  { icon: BadgeCheck, label: "الدفع عند الاستلام" },
  { icon: Truck, label: "التوصيل إلى كل الولايات" },
  { icon: Store, label: "مكتب أو منزل" },
];

export function TrustBar() {
  return (
    <div className="border-y border-border bg-secondary">
      <ul className="mx-auto flex max-w-3xl items-stretch justify-between gap-2 px-4 py-3">
        {ITEMS.map((i) => (
          <li key={i.label} className="flex flex-1 flex-col items-center gap-1 text-center">
            <i.icon className="h-5 w-5 text-primary" />
            <span className="text-[11px] font-semibold leading-tight text-secondary-foreground">{i.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
