import { createFileRoute } from "@tanstack/react-router";
import { PRODUCT } from "@/data/product";
import { ProductGallery } from "@/components/ProductGallery";
import { Features } from "@/components/Features";
import { TrustBar } from "@/components/TrustBar";
import { OrderForm } from "@/components/OrderForm";
import { Faq } from "@/components/Faq";
import rodessLogo from "@/assets/rodess-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "حقيبة مدرسية Rodess — 1500 دج مع الدفع عند الاستلام" },
      {
        name: "description",
        content:
          "حقيبة مدرسية عصرية وعملية للأطفال بلون كراميل، أحزمة مبطّنة وجيوب متعددة. 1500 دج، توصيل إلى كل الولايات والدفع عند الاستلام.",
      },
      { property: "og:title", content: "حقيبة مدرسية Rodess — 1500 دج" },
      {
        property: "og:description",
        content: "حقيبة مدرسية عملية ومريحة لطفلك. اطلبها الآن، الدفع عند الاستلام والتوصيل لكل الولايات.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const scrollToOrder = () =>
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-background pb-24">
      <header className="relative border-b border-border bg-card shadow-header">
        <div className="mx-auto flex h-20 max-w-3xl items-center justify-between gap-3 px-4">
          <div className="flex min-w-0 items-center gap-2.5" dir="ltr">
            <img
              src={rodessLogo}
              alt="شعار متجر Rodess للحقائب المدرسية"
              width={512}
              height={512}
              className="h-12 w-12 shrink-0 object-contain"
            />
            <div className="min-w-0">
              <span className="block text-xl font-black leading-none text-foreground">Rodess</span>
              <span className="mt-1 block text-[10px] font-bold text-muted-foreground" dir="rtl">
                حقائب مدرسية
              </span>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-secondary px-3.5 py-2 text-xs font-extrabold text-secondary-foreground">
            <span className="h-2 w-2 rounded-full bg-cta" aria-hidden="true" />
            عرض الدخول المدرسي
          </span>
        </div>
      </header>

      <section className="mx-auto w-full max-w-3xl px-4">
        <ProductGallery />
        <div className="animate-slide-up mt-6 text-center">
          <h1 className="text-[26px] font-extrabold leading-snug text-foreground">{PRODUCT.tagline}</h1>
          <p className="mt-1 text-sm font-bold text-primary">{PRODUCT.name}</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {PRODUCT.short}
          </p>
          <div className="mt-5 flex items-baseline justify-center gap-2">
            <span className="text-4xl font-extrabold text-foreground">
              {PRODUCT.price.toLocaleString("en-US")}
            </span>
            <span className="text-lg font-bold text-primary">{PRODUCT.currency}</span>
          </div>
          <button type="button" onClick={scrollToOrder} className="btn-cta mt-5 w-full max-w-sm">
            اطلب الآن
          </button>
        </div>
      </section>

      <div className="mt-8">
        <TrustBar />
      </div>

      <Features />

      <section className="mx-auto w-full max-w-3xl px-4 pb-4">
        <div className="rounded-3xl bg-primary p-6 text-center shadow-soft">
          <h2 className="text-xl font-extrabold text-primary-foreground">لماذا تختارها؟</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/85">
            حقيبة واحدة تكفي لكل العام: جيوب مرتّبة تحمي الكتب، أحزمة مبطّنة ترتاح على كتفَي طفلك، ولون
            كراميل أنيق لا يُظهر الاستعمال. بسعر 1500 دج والدفع عند الاستلام.
          </p>
          <button type="button" onClick={scrollToOrder} className="btn-outline mt-5">
            اطلبها الآن
          </button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-8">
        <div className="grid grid-cols-3 gap-2">
          {PRODUCT.images.slice(1).map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="aspect-square w-full rounded-2xl object-cover ring-1 ring-border"
            />
          ))}
        </div>
      </section>

      <OrderForm />
      <Faq />

      <footer className="mx-auto max-w-3xl px-4 pb-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Rodess — الدفع عند الاستلام في كل الولايات
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="shrink-0 text-right">
            <p className="text-[11px] text-muted-foreground">السعر</p>
            <p className="text-base font-extrabold text-foreground">
              {PRODUCT.price.toLocaleString("en-US")} {PRODUCT.currency}
            </p>
          </div>
          <button type="button" onClick={scrollToOrder} className="btn-cta flex-1">
            اطلب الآن
          </button>
        </div>
      </div>
    </main>
  );
}
