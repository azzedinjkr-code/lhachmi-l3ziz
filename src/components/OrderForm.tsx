import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Loader2, MapPin, Package, Phone, ShoppingBag, User } from "lucide-react";
import { WILAYAS, getWilaya } from "@/data/algeria";
import { PRODUCT } from "@/data/product";
import { GOOGLE_SHEETS_WEB_APP_URL } from "@/data/order-config";

type Delivery = "desk" | "home";

type Errors = Partial<Record<"name" | "phone" | "wilaya" | "commune" | "delivery", string>>;

const dz = (n: number) => n.toLocaleString("en-US");

export function OrderForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  const [delivery, setDelivery] = useState<Delivery | "">("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const selected = useMemo(() => (wilaya ? getWilaya(wilaya) : undefined), [wilaya]);
  const communes = selected?.communes ?? [];

  const shipping =
    selected && delivery ? (delivery === "desk" ? selected.deskPrice : selected.homePrice) : 0;
  const showTotals = Boolean(selected && commune && delivery);
  const total = PRODUCT.price + shipping;

  const validate = () => {
    const e: Errors = {};
    if (name.trim().length < 3) e.name = "الرجاء إدخال الاسم الكامل";
    if (!/^0[567]\d{8}$/.test(phone.replace(/\s/g, "")))
      e.phone = "رقم هاتف جزائري غير صحيح (مثال: 0551234567)";
    if (!wilaya) e.wilaya = "الرجاء اختيار الولاية";
    if (!commune) e.commune = "الرجاء اختيار البلدية";
    if (!delivery) e.delivery = "الرجاء اختيار طريقة التوصيل";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    if (!GOOGLE_SHEETS_WEB_APP_URL) {
      setSubmitError("خدمة استقبال الطلبات قيد الإعداد. يرجى المحاولة لاحقًا.");
      return;
    }

    setSubmitError("");
    setSending(true);

    try {
      await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.replace(/\s/g, ""),
          wilaya: selected?.name ?? "",
          commune,
          delivery: delivery === "desk" ? "المكتب" : "المنزل",
          productPrice: PRODUCT.price,
          shippingPrice: shipping,
          total,
          product: PRODUCT.name,
        }),
      });
      setDone(true);
    } catch {
      setSubmitError("تعذّر إرسال الطلب. تحقق من اتصال الإنترنت وحاول مرة أخرى.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <section id="order" className="mx-auto w-full max-w-md px-4 py-14">
        <div className="animate-fade-in rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
          <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
          <h2 className="mt-4 text-xl font-extrabold text-foreground">تم تسجيل طلبك بنجاح ✅</h2>
          <p className="mt-2 text-sm text-muted-foreground">سنتواصل معك هاتفيًا لتأكيد الطلب.</p>
          <div className="mt-5 space-y-1 rounded-2xl bg-secondary p-4 text-sm text-secondary-foreground">
            <p>
              الاسم: <strong>{name}</strong>
            </p>
            <p>
              الهاتف: <strong dir="ltr">{phone}</strong>
            </p>
            <p>
              العنوان: <strong>{commune} — {selected?.name}</strong>
            </p>
            <p>
              الإجمالي: <strong>{dz(total)} {PRODUCT.currency}</strong>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="mx-auto w-full max-w-md px-4 py-12">
      <h2 className="text-center text-2xl font-extrabold text-foreground">استمارة الطلب</h2>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        املأ معلوماتك وسنتصل بك لتأكيد الطلب — الدفع عند الاستلام
      </p>

      <form onSubmit={submit} noValidate className="mt-6 space-y-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
        <Field label="الاسم الكامل" error={errors.name}>
          <input
            className="field"
            placeholder="أدخل اسمك الكامل"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </Field>

        <Field label="رقم الهاتف" error={errors.phone}>
          <input
            className="field"
            dir="ltr"
            inputMode="tel"
            placeholder="05xxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
        </Field>

        <Field label="الولاية" error={errors.wilaya}>
          <select
            className="field"
            value={wilaya}
            onChange={(e) => {
              setWilaya(e.target.value);
              setCommune("");
            }}
          >
            <option value="">اختر الولاية</option>
            {WILAYAS.map((w) => (
              <option key={w.code} value={w.code}>
                {w.code} - {w.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="البلدية" error={errors.commune}>
          <select
            className="field"
            value={commune}
            disabled={!selected}
            onChange={(e) => setCommune(e.target.value)}
          >
            <option value="">{selected ? "اختر البلدية" : "اختر الولاية أولاً"}</option>
            {communes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        {selected && commune && (
          <div className="animate-fade-in space-y-2">
            <span className="block text-sm font-bold text-foreground">طريقة التوصيل</span>
            {(
              [
                { key: "desk", label: "التوصيل إلى المكتب", price: selected.deskPrice },
                { key: "home", label: "التوصيل إلى المنزل", price: selected.homePrice },
              ] as const
            ).map((o) => (
              <label
                key={o.key}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-colors ${
                  delivery === o.key ? "border-primary bg-secondary" : "border-border bg-background"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    className="h-5 w-5 accent-[var(--primary)]"
                    checked={delivery === o.key}
                    onChange={() => setDelivery(o.key)}
                  />
                  <span className="text-sm font-semibold text-foreground">{o.label}</span>
                </span>
                <span className="text-sm font-bold text-primary">
                  {dz(o.price)} {PRODUCT.currency}
                </span>
              </label>
            ))}
            {errors.delivery && <p className="text-xs font-semibold text-destructive">{errors.delivery}</p>}
          </div>
        )}

        {showTotals && (
          <div className="animate-fade-in space-y-2 rounded-2xl bg-secondary p-4 text-sm text-secondary-foreground">
            <Row label="سعر المنتج" value={`${dz(PRODUCT.price)} ${PRODUCT.currency}`} />
            <Row label="التوصيل" value={`${dz(shipping)} ${PRODUCT.currency}`} />
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between text-base font-extrabold text-foreground">
              <span>السعر الإجمالي</span>
              <span>
                {dz(total)} {PRODUCT.currency}
              </span>
            </div>
          </div>
        )}

        {submitError && (
          <p role="alert" className="rounded-2xl bg-destructive/10 p-3 text-center text-sm font-semibold text-destructive">
            {submitError}
          </p>
        )}

        <button type="submit" disabled={sending} className="btn-cta w-full">
          {sending ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : "تأكيد الطلب"}
        </button>
      </form>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-foreground">{label}</span>
      {children}
      {error && <p className="mt-1 text-xs font-semibold text-destructive">{error}</p>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
