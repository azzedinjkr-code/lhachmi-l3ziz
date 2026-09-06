import { createFileRoute } from "@tanstack/react-router";
import { PRODUCT } from "@/data/product";
import { ProductGallery } from "@/components/ProductGallery";
import { Features } from "@/components/Features";
import { TrustBar } from "@/components/TrustBar";
import { OrderForm } from "@/components/OrderForm";
import { Faq } from "@/components/Faq";
import backzoneLogo from "@/assets/backzone-logo.png.asset.json";

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
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content: "حقيبة مدرسية عملية ومريحة لطفلك. اطلبها الآن، الدفع عند الاستلام والتوصيل لكل الولايات.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "حقيبة مدرسية Rodess — 1500 دج" },
      {
        name: "twitter:description",
        content: "حقيبة مدرسية عملية ومريحة لطفلك، مع الدفع عند الاستلام والتوصيل لكل الولايات.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const scrollToOrder = () =>
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-background">
      <header className="relative border-b border-border bg-card shadow-header">
        <div className="mx-auto flex h-24 max-w-3xl items-center justify-between gap-3 px-4" dir="ltr">
          <div className="flex min-w-0 items-center" dir="ltr">
            <img
              src={backzoneLogo.url}
              alt="شعار متجر BackZone للحقائب المدرسية"
              width={1254}
              height={1254}
              className="h-20 w-20 shrink-0 rounded-lg object-contain"
            />
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-secondary px-3.5 py-2 text-xs font-extrabold text-secondary-foreground" dir="rtl">
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
          <div className="mt-5 flex flex-col items-center justify-center gap-1">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl font-extrabold text-foreground">
                {PRODUCT.price.toLocaleString("en-US")}
              </span>
              <span className="text-lg font-bold text-primary">{PRODUCT.currency}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground line-through">
                {PRODUCT.originalPrice.toLocaleString("en-US")} {PRODUCT.currency}
              </span>
              <span className="rounded-full bg-cta/10 px-2 py-0.5 font-extrabold text-cta">
                وفّر {PRODUCT.originalPrice - PRODUCT.price} {PRODUCT.currency}
              </span>
            </div>
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
            كراميل أنيق لا يُظهر الاستعمال. السعر الأصلي {PRODUCT.originalPrice.toLocaleString("en-US")} {PRODUCT.currency}،
            الآن بـ {PRODUCT.price.toLocaleString("en-US")} {PRODUCT.currency} فقط مع الدفع عند الاستلام.
          </p>
          <button type="button" onClick={scrollToOrder} className="btn-outline mt-5">
            اطلبها الآن
          </button>
        </div>
      </section>

      <OrderForm />
      <Faq />

      <footer className="mx-auto max-w-3xl px-4 pb-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Rodess — الدفع عند الاستلام في كل الولايات
      </footer>
    </main>
  );
}
