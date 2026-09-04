import mainImg from "@/assets/bag-main.jpg.asset.json";
import pocketImg from "@/assets/bag-detail-pocket.jpg.asset.json";
import zipImg from "@/assets/bag-detail-zip.jpg.asset.json";
import strapsImg from "@/assets/bag-detail-straps.jpg.asset.json";

// معلومات المنتج والسعر — قابلة للتعديل بسهولة
export const PRODUCT = {
  name: "حقيبة مدرسية Rodess",
  tagline: "حقيبة عصرية وعملية ترافق ولدك طول العام الدراسي",
  short:
    "حقيبة ظهر بلون كراميل هادئ، بجيب أمامي مطرّز برسومات لطيفة ومحفظة صغيرة بشعار Rodess، مع أحزمة مبطّنة قابلة للتعديل وجيوب متعددة تكفي لكل أدوات المدرسة.",
  price: 1500,
  currency: "دج",
  images: [
    { src: mainImg.url, alt: "حقيبة مدرسية Rodess بلون كراميل — صورة كاملة" },
    { src: pocketImg.url, alt: "الجيب الأمامي المطرّز والمحفظة الصغيرة بشعار Rodess" },
    { src: strapsImg.url, alt: "الأحزمة المبطّنة القابلة للتعديل والجيب الجانبي" },
    { src: zipImg.url, alt: "الجيوب السفلية بسحابات وقاعدة الحقيبة" },
  ],
} as const;
