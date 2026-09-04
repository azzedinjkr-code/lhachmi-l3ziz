const QA = [
  { q: "كيف يتم الدفع؟", a: "الدفع عند الاستلام، لا تدفع أي شيء قبل وصول الحقيبة إليك." },
  { q: "هل التوصيل متوفر لكل الولايات؟", a: "نعم، نوصل إلى كل ولايات الوطن (58 ولاية) إلى المكتب أو المنزل." },
  { q: "كم يستغرق التوصيل؟", a: "نتصل بك لتأكيد الطلب ثم نرسله مباشرة، ويصل عادة في غضون بضعة أيام حسب ولايتك." },
  { q: "كيف أعرف سعر التوصيل؟", a: "بعد اختيار الولاية والبلدية وطريقة التوصيل، يظهر لك السعر الإجمالي تلقائيًا في الاستمارة." },
];

export function Faq() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10">
      <h2 className="text-center text-2xl font-extrabold text-foreground">أسئلة شائعة</h2>
      <div className="mt-5 space-y-2">
        {QA.map((item) => (
          <details key={item.q} className="group rounded-2xl border border-border bg-card p-4">
            <summary className="cursor-pointer list-none text-sm font-bold text-foreground">
              {item.q}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
