import { Backpack, Layers, Heart, Sparkles } from "lucide-react";

const FEATURES = [
  { icon: Backpack, title: "تصميم عملي", desc: "جيوب متعددة بسحابات لترتيب الكتب والأدوات" },
  { icon: Layers, title: "مساحة مناسبة", desc: "حجم يكفي لكتب ودفاتر اليوم الدراسي" },
  { icon: Heart, title: "مريحة للحمل", desc: "أحزمة مبطّنة وقابلة للتعديل حسب طول الطفل" },
  { icon: Sparkles, title: "مناسبة للمدرسة", desc: "لون كراميل هادئ ورسومات لطيفة تعجب الأطفال" },
];

export function Features() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10">
      <h2 className="text-center text-2xl font-extrabold text-foreground">مميزات الحقيبة</h2>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {FEATURES.map((f) => (
          <article
            key={f.title}
            className="rounded-2xl border border-border bg-card p-4 shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
              <f.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-3 text-sm font-bold text-foreground">{f.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
