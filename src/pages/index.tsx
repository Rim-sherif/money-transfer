import Image from "next/image";
<<<<<<< HEAD
import "@/styles/style.css";
import Link from "next/link";
import { useState } from "react";
import "swiper/css";














const navigationItems = [
  { text: "التطبيق", href: "/app", isActive: false },
  { text: "آراء العملاء", href: "/testimonials", isActive: false },
  { text: "نبذة عنا", href: "/about", isActive: false },
  { text: "الرئيسية", href: "/", isActive: true },
];

interface ActionButtonProps {
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text }) => (
  <div className="flex flex-col self-stretch my-auto w-40 text-xs font-bold leading-6 text-center text-gray-400 rounded-none">
    <div className="z-10 gap-2.5 self-stretch px-8 py-3 rounded-lg bg-zinc-800 bg-opacity-30 min-h-[48px] max-md:px-5">
      {text}
    </div>

  </div>
);

interface NavigationLinkProps {
  text: string;
  isActive?: boolean;
}


const NavigationLink = ({ text, href, isActive }: { text: string; href: string; isActive?: boolean }) => (
  <Link href={href}>
    <button className={`gap-2.5 px-4 py-3 my-auto ${isActive ? "font-bold text-gray-400 border-b-2 border-gray-400" : "text-white"}`}>{text}</button>
  </Link>
);

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="flex overflow-hidden flex-col bg-imgg" >
        <nav className="flex fixed justify-between items-center px-8 py-4 w-full  bg-opacity-90 z-50">
          {/* Hamburger Menu for Mobile */}
          <button
            className="block md:hidden text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? "✖️" : "☰"}
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-neutral-900 rounded-full">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11C21 16.5228 16.5228 21 11 21M21 11C21 5.47715 16.5228 1 11 1M21 11C21 9.34315 16.5228 8 11 8C5.47715 8 1 9.34315 1 11M21 11C21 12.6569 16.5228 14 11 14C5.47715 14 1 12.6569 1 11M11 21C5.47715 21 1 16.5228 1 11M11 21C13.2091 21 15 16.5228 15 11C15 5.47715 13.2091 1 11 1M11 21C8.79086 21 7 16.5228 7 11C7 5.47715 8.79086 1 11 1M1 11C1 5.47715 5.47715 1 11 1" stroke="#A5CBAD" strokeWidth="1.5" />
              </svg>

            </div>
            <Link href="login">
              <button className="px-4 py-2 text-xs font-bold text-gray-400 bg-zinc-800 rounded-lg" lang="ar">
                تجربة مجانية
              </button>
            </Link>
          </div>

          <div className="hidden md:flex  gap-4 items-center">
            {navigationItems.map((item, index) => (
              <NavigationLink key={index} {...item} />
            ))}
          </div>

          {/* Company Logo */}
          <Image
            width={300}
            height={300}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/82abf788e81d00493505b733772e69127dd1ec73b52053d9ddbb4f60508f2764"
            className="object-contain w-36"
            alt="Company Logo"
          />
        </nav>
        {menuOpen && (
          <div className="flex flex-col-reverse md:hidden bg-black bg-opacity-90 text-white p-4 fixed w-full mt-10">
            {navigationItems.map((item, index) => (
              <NavigationLink key={index} {...item} />
            ))}
          </div>
        )}
        <main className="flex flex-col items-center justify-center w-full px-4 font-bold text-center mt-6">
          <div className="flex z-10 shrink-0 gap-2.5 h-[159px] rounded-full w-[115px]" />
          <div className="flex flex-col items-center w-full max-w-[1054px]">
            <div className="flex flex-col items-center w-full px-4">
              <h1 className="text-5xl text-white leading-[60px] max-w-[848px] sm:text-3xl sm:leading-[45px] " >
                إدارة الإيرادات المتكررة أصبحت{" "}
                <span className="text-[#A5CBAD]">أسهل وأكثر ذكاءً </span>مع منصتنا المتكاملة
              </h1>
              <p className="mt-6 text-base leading-8 text-neutral-400 max-w-[616px] sm:mt-4 sm:text-sm sm:leading-6" lang="ar">
                كل ما تحتاجه لإدارة أعمالك في مكان واحد! منصة مبتكرة توفر لك أدوات ذكية لتنظيم الاشتراكات،
                تتبع الإيرادات المتكررة، وتحقيق نمو مستدام بسهولة وكفاءة.
              </p>
              <div className="flex gap-4 items-center mt-6">
                <ActionButton text="كيف يعمل" />
                <ActionButton text="تجربة مجانية" />
              </div>
            </div>
            <Image
              
              loading="lazy"
              src="/Dashboard 1.png"
              className="object-contain mt-10 w-full aspect-[1.74] rounded-[48px] sm:mt-6"
              alt="Platform interface showcase"
              width={600}
              height={600}
            />

          </div>
          <div className="flex z-10 mt-0 w-full min-h-[227px] max-md:mt-0 max-md:max-w-full" />
        </main>
      </div>
      <div className="flex flex-col items-center px-16 max-md:pl-5 bg-img2 bg-black">
        <div className="flex relative gap-2 justify-center items-start px-24 pt-10 pb-20 max-w-full rounded-[120px] w-[1360px] max-md:px-5">
          <div className="flex z-0 flex-col justify-center items-center my-auto min-w-[240px] w-[968px] max-md:max-w-full">
            <div className="flex flex-col items-center max-w-full w-[968px]">
              <h1 className="text-3xl font-bold text-right text-white">
                ما هي بوابة الدفع الخاصة بنا
              </h1>
              <p className="mt-12 text-base leading-6 text-center text-neutral-400 w-[714px] max-md:mt-10 max-md:max-w-full">
                بوابتنا مصممة لتكون الحل الأمثل لقبول المدفوعات من عملائك بكل سهولة وسرعة. سواء كنت تدير نشاطًا تجاريًا محليًا أو عالميًا، يمكنك ربط منصتك بنا لتحصل على تجربة متكاملة. نوفر لك أدوات متطورة لاستلام الأموال بمرونة، دعم مختلف طرق الدفع، وإدارة عملياتك المالية من مكان واحد. مع التركيز على الأمان والكفاءة، ستتمكن من تتبع عمليات الدفع، تحليل الإيرادات، وضمان تجربة سلسة لعملائك دون أي تعقيد.
              </p>
            </div>
            <div className="flex pt-2.5 mt-16 max-w-full w-[333px] max-md:mt-10">
              <Image src="/Frame 27.png" width="800" height="900" alt="" />
            </div>
          </div>
        </div>
      </div><div className="flex flex-col lg:flex-row gap-4 items-center py-16 px-6 lg:px-32 text-right w-full bg-black">
        <div className="flex flex-col flex-1 shrink self-stretch my-auto w-full basis-0  max-md:max-w-full">
          <div className="self-center text-2xl font-bold text-white max-md:max-w-full">
            تعرف علي أهم الخدمات التي نقدمها لك
          </div>
          <div className="flex flex-wrap gap-6 items-center mt-20 w-full text-black max-md:mt-10 max-md:max-w-full">
            <div className={`flex overflow-hidden flex-col flex-1 shrink self-stretch px-16 pt-16 my-auto bg-neutral-400 basis-0 min-w-[260px] rounded-[72px] max-md:px-5`}>
              <div className="flex flex-col">

                <svg width="80" height="81" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg" className=" self-end ">
                  <path d="M40 26.7238V40.0571L48.3333 48.3904" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.6808 18.7379L17.6987 17.7558L17.6987 17.7558L18.6808 18.7379ZM14.4595 22.9592L13.0706 22.9661C13.0744 23.7277 13.6909 24.3442 14.4525 24.348L14.4595 22.9592ZM22.9377 24.3907C23.7047 24.3945 24.3297 23.7758 24.3335 23.0088C24.3374 22.2417 23.7187 21.6168 22.9516 21.6129L22.9377 24.3907ZM15.8057 14.467C15.8019 13.6999 15.1769 13.0813 14.4099 13.0851C13.6428 13.089 13.0241 13.7139 13.028 14.481L15.8057 14.467ZM11.3889 40.0571C11.3889 39.2901 10.7671 38.6682 10 38.6682C9.23294 38.6682 8.61111 39.2901 8.61111 40.0571H11.3889ZM55.6954 67.2459C56.3594 66.8618 56.5863 66.0122 56.2022 65.3482C55.8181 64.6842 54.9685 64.4573 54.3045 64.8414L55.6954 67.2459ZM64.7843 54.3617C64.4002 55.0256 64.6271 55.8753 65.2911 56.2594C65.955 56.6434 66.8047 56.4165 67.1888 55.7526L64.7843 54.3617ZM17.9162 17.7509C17.3711 18.2906 17.3667 19.17 17.9064 19.7151C18.4461 20.2602 19.3255 20.2645 19.8706 19.7249L17.9162 17.7509ZM62.0887 17.969C49.7812 5.66147 29.9071 5.54741 17.6987 17.7558L19.6629 19.72C30.7679 8.61495 48.8831 8.69179 60.1245 19.9332L62.0887 17.969ZM17.6987 17.7558L13.4774 21.9771L15.4416 23.9412L19.6629 19.72L17.6987 17.7558ZM14.4525 24.348L22.9377 24.3907L22.9516 21.6129L14.4665 21.5703L14.4525 24.348ZM15.8484 22.9522L15.8057 14.467L13.028 14.481L13.0706 22.9661L15.8484 22.9522ZM40 11.446C55.8015 11.446 68.6111 24.2556 68.6111 40.0571H71.3889C71.3889 22.7215 57.3356 8.66824 40 8.66824V11.446ZM40 68.6682C24.1985 68.6682 11.3889 55.8586 11.3889 40.0571H8.61111C8.61111 57.3927 22.6644 71.446 40 71.446V68.6682ZM54.3045 64.8414C50.0976 67.275 45.2136 68.6682 40 68.6682V71.446C45.715 71.446 51.0771 69.9174 55.6954 67.2459L54.3045 64.8414ZM68.6111 40.0571C68.6111 45.2708 67.2179 50.1548 64.7843 54.3617L67.1888 55.7526C69.8603 51.1343 71.3889 45.7721 71.3889 40.0571H68.6111ZM19.8706 19.7249C25.0414 14.6053 32.1504 11.446 40 11.446V8.66824C31.3892 8.66824 23.5859 12.1373 17.9162 17.7509L19.8706 19.7249Z" fill="white" />
                </svg>

                <div className="flex flex-col mt-8 w-full">
                  <div className="text-2xl font-semibold leading-none">تفعيل فوري</div>
                  <div className="mt-3 text-sm font-medium leading-5">تفعيل فوري يضمن بدء استخدام المنصة مباشرة دون أي تأخير، لتبسيط عملياتك والانطلاق في إدارة اشتراكاتك بكفاءة</div>
                </div>
              </div>
              <svg width="72" height="82" viewBox="0 0 72 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M46.7869 23.4844C46.7869 23.4844 59.241 29.8111 62.1933 40.525C65.1458 51.2385 57.8971 62.5411 57.8971 62.5411C57.8971 62.5411 45.8615 56.4733 42.9086 45.7596C39.9561 35.0461 46.7869 23.4844 46.7869 23.4844Z" fill="white" />
                <path d="M0.0144921 39.6079C0.0144921 39.6079 1.28258 25.6966 10.143 18.9887C19.003 12.2807 32.1858 14.8315 32.1858 14.8315C32.1858 14.8315 31.0033 28.2582 22.1433 34.9666C13.2833 41.6746 0.0144921 39.6079 0.0144921 39.6079Z" fill="white" />
                <path d="M51.7794 8.3078C51.7794 12.8644 48.0854 16.5583 43.5288 16.5583C38.9722 16.5583 35.2783 12.8644 35.2783 8.3078C35.2783 3.75117 38.9722 0.0572453 43.5288 0.0572453C48.0854 0.0572453 51.7794 3.75117 51.7794 8.3078Z" fill="white" />
                <path d="M35.2053 48.4997C34.6912 51.759 31.6322 53.9845 28.3729 53.4704C25.1136 52.9563 22.8881 49.8973 23.4022 46.638C23.9162 43.3786 26.9752 41.1531 30.2346 41.6672C33.4939 42.1813 35.7194 45.2403 35.2053 48.4997Z" fill="white" />
                <path d="M3.98303 81.9937H21.0531L21.0531 64.9235C11.6057 65.0204 3.98303 72.6228 3.98303 81.9937Z" fill="white" />
                <path d="M38.1233 81.9937H21.0532L21.0532 64.9235C30.5006 65.0204 38.1233 72.6228 38.1233 81.9937Z" fill="white" />
              </svg>

            </div>
            <div className={`flex overflow-hidden flex-col flex-1 shrink self-stretch px-16 pt-16 my-auto bg-[#F58C7B] basis-0 min-w-[260px] rounded-[72px] max-md:px-5`}>
              <div className="flex flex-col">
                <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg" className="self-end">
                  <rect x="5.66666" y="5.05713" width="25" height="20" rx="5" stroke="white" strokeWidth="2.08333" />
                  <rect x="30.6666" y="35.0571" width="25" height="20" rx="5" stroke="white" strokeWidth="2.08333" />
                  <path d="M51.7021 10.0571L54.9343 13.2894C55.9106 14.2657 55.9106 15.8486 54.9343 16.8249L51.7021 20.0571M40.6666 15.0571L54.2021 15.0571" stroke="white" strokeWidth="2.08333" strokeLinecap="round" />
                  <path d="M9.63112 40.0571L6.39889 43.2894C5.42258 44.2657 5.42258 45.8486 6.39889 46.8249L9.63112 50.0571M20.6667 45.0571L7.13112 45.0571" stroke="white" strokeWidth="2.08333" strokeLinecap="round" />
                </svg>

                <div className="flex flex-col mt-8 w-full">
                  <div className="text-2xl font-semibold leading-none">تحويل عملات تلقائي</div>
                  <div className="mt-3 text-sm font-medium leading-5">نظام تحويل عملات تلقائي يتيح لك قبول المدفوعات بسهولة بأي عملة ، مع توفير تجربة دفع سلسة لعملائك دون أي تعقيدات</div>
                </div>
              </div>
              <svg width="72" height="82" viewBox="0 0 72 82" fill="none" xmlns="http://www.w3.org/2000/svg" className="object-contain mt-8 aspect-[0.88]">
                <path d="M46.7869 23.4844C46.7869 23.4844 59.241 29.8111 62.1933 40.525C65.1458 51.2385 57.8971 62.5411 57.8971 62.5411C57.8971 62.5411 45.8615 56.4733 42.9086 45.7596C39.9561 35.0461 46.7869 23.4844 46.7869 23.4844Z" fill="white" />
                <path d="M0.0144921 39.6079C0.0144921 39.6079 1.28258 25.6966 10.143 18.9887C19.003 12.2807 32.1858 14.8315 32.1858 14.8315C32.1858 14.8315 31.0033 28.2582 22.1433 34.9666C13.2833 41.6746 0.0144921 39.6079 0.0144921 39.6079Z" fill="white" />
                <path d="M51.7794 8.3078C51.7794 12.8644 48.0854 16.5583 43.5288 16.5583C38.9722 16.5583 35.2783 12.8644 35.2783 8.3078C35.2783 3.75117 38.9722 0.0572453 43.5288 0.0572453C48.0854 0.0572453 51.7794 3.75117 51.7794 8.3078Z" fill="white" />
                <path d="M35.2053 48.4997C34.6912 51.759 31.6322 53.9845 28.3729 53.4704C25.1136 52.9563 22.8881 49.8973 23.4022 46.638C23.9162 43.3786 26.9752 41.1531 30.2346 41.6672C33.4939 42.1813 35.7194 45.2403 35.2053 48.4997Z" fill="white" />
                <path d="M3.98303 81.9937H21.0531L21.0531 64.9235C11.6057 65.0204 3.98303 72.6228 3.98303 81.9937Z" fill="white" />
                <path d="M38.1233 81.9937H21.0532L21.0532 64.9235C30.5006 65.0204 38.1233 72.6228 38.1233 81.9937Z" fill="white" />
              </svg>
            </div>
            <div className={`flex overflow-hidden flex-col flex-1 shrink self-stretch px-16 pt-16 my-auto bg-[#A5CBAD] basis-0 min-w-[260px] rounded-[72px] max-md:px-5`}>
              <div className="flex flex-col">
                <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg" className="self-end">
                  <path d="M61.8334 40.5571C61.8334 54.6404 50.4166 66.0571 36.3334 66.0571C22.2501 66.0571 10.8334 54.6404 10.8334 40.5571C10.8334 26.4739 22.2501 15.0571 36.3334 15.0571C50.4166 15.0571 61.8334 26.4739 61.8334 40.5571Z" stroke="white" strokeWidth="2.5" />
                  <path d="M45.3334 7.29932C42.4724 6.49013 39.4534 6.05713 36.3334 6.05713C33.2133 6.05713 30.1944 6.49013 27.3334 7.29932" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M40.8334 42.0571C40.8334 44.5424 38.8187 46.5571 36.3334 46.5571C33.8481 46.5571 31.8334 44.5424 31.8334 42.0571C31.8334 39.5718 33.8481 37.5571 36.3334 37.5571C38.8187 37.5571 40.8334 39.5718 40.8334 42.0571Z" stroke="white" strokeWidth="2.5" />
                  <path d="M36.3334 36.0571V27.0571" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex flex-col mt-8 w-full">
                  <div className="text-2xl font-semibold leading-none"> دعم فني 24 ساعة</div>
                  <div className="mt-3 text-sm font-medium leading-5">فريق دعم فني متواجد على مدار الساعة لضمان تجربة سلسة وخالية من أي عقبات. نحن هنا لمساعدتك في أي وقت، وكل يوم</div>
                </div>
              </div>
              <svg width="72" height="82" viewBox="0 0 72 82" fill="none" xmlns="http://www.w3.org/2000/svg" className="object-contain mt-8 aspect-[0.88]">
                <path d="M46.7869 23.4844C46.7869 23.4844 59.241 29.8111 62.1933 40.525C65.1458 51.2385 57.8971 62.5411 57.8971 62.5411C57.8971 62.5411 45.8615 56.4733 42.9086 45.7596C39.9561 35.0461 46.7869 23.4844 46.7869 23.4844Z" fill="white" />
                <path d="M0.0144921 39.6079C0.0144921 39.6079 1.28258 25.6966 10.143 18.9887C19.003 12.2807 32.1858 14.8315 32.1858 14.8315C32.1858 14.8315 31.0033 28.2582 22.1433 34.9666C13.2833 41.6746 0.0144921 39.6079 0.0144921 39.6079Z" fill="white" />
                <path d="M51.7794 8.3078C51.7794 12.8644 48.0854 16.5583 43.5288 16.5583C38.9722 16.5583 35.2783 12.8644 35.2783 8.3078C35.2783 3.75117 38.9722 0.0572453 43.5288 0.0572453C48.0854 0.0572453 51.7794 3.75117 51.7794 8.3078Z" fill="white" />
                <path d="M35.2053 48.4997C34.6912 51.759 31.6322 53.9845 28.3729 53.4704C25.1136 52.9563 22.8881 49.8973 23.4022 46.638C23.9162 43.3786 26.9752 41.1531 30.2346 41.6672C33.4939 42.1813 35.7194 45.2403 35.2053 48.4997Z" fill="white" />
                <path d="M3.98303 81.9937H21.0531L21.0531 64.9235C11.6057 65.0204 3.98303 72.6228 3.98303 81.9937Z" fill="white" />
                <path d="M38.1233 81.9937H21.0532L21.0532 64.9235C30.5006 65.0204 38.1233 72.6228 38.1233 81.9937Z" fill="white" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black px-8 py-12 sm:px-16 md:px-32 md:py-28">
        <div className="flex flex-col md:flex-row justify-between bg-[#A5CBAD] rounded-3xl gap-4">
          <Image
            width={654}
            height={386}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d0239ca7eb2d30a2cac43584d4f3f153e32fba5858a5974ca53cbe0a235eb06?apiKey=e5206c7ab90c497bbb63352a863ec8f5&"
            alt="App preview showcase"
            className="object-contain rounded-3xl aspect-[1.35] h-auto max-w-full md:w-[654px]"
          />

          <div className="text-right justify-items-start py-8 md:py-24 px-6 md:px-14">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter leading-8 md:leading-10 text-black">
              حمّل التطبيق الآن واستمتع بخدماتنا المميزة
            </h2>
            <p className="mt-5 text-sm md:text-xl leading-6 md:leading-8 text-neutral-700">
              يوفّر لك تجربة متكاملة لإدارة عمليات الدفع بسهولة ومعرفة التدفقات المالية المستقبلية بكل دقة.
            </p>
            <button
              className="flex gap-2 justify-center items-center px-8 py-3 md:px-12 md:py-5 text-sm md:text-base font-semibold text-center text-black bg-red-400 rounded-3xl min-h-[50px] md:min-h-[60px]"
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.875 10.1128H3.125"
                  stroke="black"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.75 4.48779L3.125 10.1128L8.75 15.7378"
                  stroke="black"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="self-stretch my-auto"> أبدأ الآن</span>
            </button>
=======
import LocalizationLink from "./LocalizationLink";
import "swiper/css";


export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <div className="mx-auto max-w-full">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 min-h-screen pt-16 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            >
              <circle
                r={512}
                cx={512}
                cy={512}
                fill="url(#radial-gradient)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="radial-gradient">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-56 lg:text-left">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Boost your productivity. Start using our app today.
              </h2>
              <p className="mt-6 text-pretty text-lg/8 text-gray-300">
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <LocalizationLink
                  href="login"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </LocalizationLink>
                <a href="#" className="text-sm/6 font-semibold text-white">
                  Learn more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="relative mt-32 h-80 lg:mt-24 sm:block hidden">
              <Image
                alt="App screenshot"
                src="/Low code development-pana.png"
                width={1300}
                height={2080}
                className="absolute left-0 top-0 w-[60rem] max-w-none min-h-[520px] rounded-md bg-white/5 ring-1 ring-white/10"
              />
            </div>
>>>>>>> 290ede3709e415cc2dfdd9e63c24115e614456d6
          </div>
        </div>
      </div>
    </>
  );
}


