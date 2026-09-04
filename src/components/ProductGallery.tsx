import { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { PRODUCT } from "@/data/product";

export function ProductGallery() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const images = PRODUCT.images;
  const current = images[active] ?? images[0]!;

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom]);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border">
        <img
          key={active}
          src={current.src}
          alt={current.alt}
          className="animate-fade-in aspect-[3/4] w-full object-cover"
          loading="eager"
        />
        <button
          type="button"
          onClick={() => setZoom(true)}
          aria-label="تكبير الصورة"
          className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-card/85 text-foreground shadow-soft backdrop-blur transition-transform active:scale-95"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          الدخول المدرسي
        </span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`عرض الصورة ${i + 1}`}
            aria-current={i === active}
            className={`overflow-hidden rounded-2xl ring-2 transition-all ${
              i === active ? "ring-primary" : "ring-border opacity-70"
            }`}
          >
            <img src={img.src} alt={img.alt} className="aspect-square w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {zoom && (
        <div
          className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
          onClick={() => setZoom(false)}
        >
          <button
            type="button"
            aria-label="إغلاق"
            className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-card text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
}
