"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, MessageCircle } from "lucide-react";
import Link from "next/link";

const categories = [
  { id: "all", label: "All Questions" },
  { id: "application", label: "Applying for Jobs" },
  { id: "legal", label: "Legal & Permits" },
  { id: "accommodation", label: "Accommodation" },
  { id: "salary", label: "Salary & Benefits" },
  { id: "process", label: "Our Process" },
];

const faqs = [
  // Application
  {
    id: 1,
    category: "application",
    question: "How do I apply for a job through DreamWise?",
    answer:
      "Simply browse our job listings at dreamwisejob.vercel.app/jobs, filter by category, salary, or location, and click Apply. You'll fill in your details and upload basic documents. Our team reviews every application within 2–3 business days and contacts you directly.",
  },
  {
    id: 2,
    category: "application",
    question: "What documents do I need to apply?",
    answer:
      "For initial application you only need a valid passport. After selection, we'll request additional documents such as your CV, educational certificates, and a clean criminal record certificate. We guide you through every step — you won't be left guessing.",
  },
  {
    id: 3,
    category: "application",
    question: "Can I apply if I don't speak Polish?",
    answer:
      "Yes. Most of our employer partners operate in international environments and do not require Polish. Basic English or your native language is usually sufficient. Some roles (e.g. customer-facing or office roles) may require Polish — this is always stated clearly in the job listing.",
  },
  {
    id: 4,
    category: "application",
    question: "Is there a fee to apply through DreamWise?",
    answer:
      "No. Applying through DreamWise is completely free for workers. We are paid by the employer, never by you. If anyone asks you to pay to access a job through us, please report it immediately to contact@dreamwise.pl.",
  },
  {
    id: 5,
    category: "application",
    question:
      "How long does the whole process take from application to starting work?",
    answer:
      "Typically 4–8 weeks depending on your country of origin and the employer's timeline. EU/EEA citizens can start much faster (sometimes within 2 weeks). Non-EU workers need a work permit which takes 3–6 weeks. We keep you updated at every stage.",
  },

  // Legal
  {
    id: 6,
    category: "legal",
    question: "Will I have a legal employment contract?",
    answer:
      "Yes, always. Every job we place comes with a full legal employment contract (Umowa o pracę) signed with a registered Polish employer. We do not work with agencies or employers offering informal arrangements. Your rights are protected under Polish and EU labour law.",
  },
  {
    id: 7,
    category: "legal",
    question: "What is a work permit and do I need one?",
    answer:
      "Citizens of EU/EEA countries do not need a work permit — they can work in Poland freely. Citizens of Ukraine, Nepal, India, Pakistan, and most other non-EU countries need a work permit (zezwolenie na pracę). DreamWise and your employer handle the entire permit application — you don't pay for it and you don't need to understand Polish bureaucracy.",
  },
  {
    id: 8,
    category: "legal",
    question: "What happens to my permit if I want to change jobs?",
    answer:
      "A Polish work permit is tied to a specific employer. If you wish to change employers, a new permit must be issued. DreamWise can assist with this process. We recommend staying with your first employer for at least 6–12 months before transferring to build a stable work history in Poland.",
  },
  {
    id: 9,
    category: "legal",
    question: "Will I be registered for social insurance (ZUS)?",
    answer:
      "Yes. All our employer partners are obligated to register you with ZUS (Zakład Ubezpieczeń Społecznych) — Poland's social insurance system. This gives you access to healthcare, paid sick leave, and pension contributions from your very first day of work.",
  },
  {
    id: 10,
    category: "legal",
    question: "Can my family join me in Poland?",
    answer:
      "After establishing legal residence and stable employment, you can apply for family reunification. This is a separate process from your work permit. DreamWise does not manage this process directly but can refer you to trusted immigration lawyers in Warsaw who specialise in family reunification.",
  },

  // Accommodation
  {
    id: 11,
    category: "accommodation",
    question: "Does DreamWise help with finding accommodation?",
    answer:
      "Yes. We partner with verified housing providers near major employer sites. We can arrange accommodation before you arrive so you have a place to go directly from the airport. Many of our employer partners also offer employer-provided or subsidised housing.",
  },
  {
    id: 12,
    category: "accommodation",
    question: "How much does accommodation cost?",
    answer:
      "Costs vary by city and type. On average, shared worker accommodation costs 600–1,200 PLN per month (approx. €140–€280). Warsaw and Kraków are more expensive; smaller industrial towns are cheaper. In many cases the employer deducts accommodation costs directly from your salary — this is always disclosed upfront.",
  },
  {
    id: 13,
    category: "accommodation",
    question: "Is employer-provided accommodation safe and legal?",
    answer:
      "We only partner with employers whose accommodation meets Polish housing standards. Every housing arrangement we facilitate includes a written agreement, stated costs, and your right to terminate it independently of your employment contract — your housing is never used as leverage over your job.",
  },

  // Salary
  {
    id: 14,
    category: "salary",
    question: "What is the minimum wage in Poland?",
    answer:
      "As of 2025, the minimum wage in Poland is 4,300 PLN gross per month (approx. €1,000). Most jobs listed on DreamWise pay above the minimum wage. Net (take-home) pay after taxes and social contributions is typically around 3,100–3,300 PLN for minimum wage roles.",
  },
  {
    id: 15,
    category: "salary",
    question: "How and when will I be paid?",
    answer:
      "Polish law requires employers to pay salaries at least once a month, typically at the end of the month or on the 10th of the following month. Payment is made directly to your Polish bank account. We recommend opening a free account with mBank, PKO, or Revolut upon arrival.",
  },
  {
    id: 16,
    category: "salary",
    question: "Are there opportunities for overtime pay?",
    answer:
      "Yes. Polish labour law requires overtime to be paid at 150% of your normal rate (or 200% on Sundays and public holidays). Many factory and warehouse roles offer regular overtime. Your contract will always specify your base hours and overtime terms.",
  },
  {
    id: 17,
    category: "salary",
    question: "How do I send money home from Poland?",
    answer:
      "Most workers use Wise (formerly TransferWise), Western Union, or Remitly for international transfers. These services offer competitive exchange rates. Wise in particular is very popular among our community for transfers to Ukraine, Nepal, India, and Pakistan.",
  },

  // Process
  {
    id: 18,
    category: "process",
    question: "What makes DreamWise different from other recruitment agencies?",
    answer:
      "We focus exclusively on international workers coming to Poland. Our team includes native speakers of Ukrainian, Nepali, Hindi, and Russian. We handle the full journey — not just the job match — including permits, housing, and airport pickup coordination. Since 2019 we have placed over 18,000 workers with verified, legal employers.",
  },
  {
    id: 19,
    category: "process",
    question: "How do you verify the employers you work with?",
    answer:
      "Every employer on our platform is verified: we check their KRS (company registration), tax status, and labour inspection history. We visit sites in person and interview current workers. Employers who receive complaints from workers are investigated and removed from our platform.",
  },
  {
    id: 20,
    category: "process",
    question: "What support is available after I start working?",
    answer:
      "Our support doesn't end on your first day. You have access to our WhatsApp support line in your language for the first 90 days. We also run a community group for DreamWise workers in Poland where you can ask questions, share tips, and connect with other workers from your country.",
  },
  {
    id: 21,
    category: "process",
    question: "What happens if there is a problem with my employer?",
    answer:
      "Contact us immediately at contact@dreamwise.pl or +48 732 097 929. We take worker complaints seriously. We will mediate with the employer directly. In serious cases (unpaid wages, unsafe conditions, harassment) we will help you find an alternative placement and can refer you to the Polish National Labour Inspectorate (PIP).",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border-b transition-colors duration-200 ${
        isOpen ? "border-[var(--slate-border)]" : "border-[var(--slate-border)]"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-[15px] font-medium leading-snug transition-colors duration-200 ${
            isOpen
              ? "text-[var(--blue-deep)]"
              : "text-[var(--slate-dark)] group-hover:text-[var(--blue-deep)]"
          }`}
        >
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? "bg-[var(--blue-deep)] text-white"
              : "bg-[var(--blue-tint)] text-[var(--blue-deep)] group-hover:bg-[var(--blue-pale)]"
          }`}
        >
          {isOpen ? (
            <Minus className="w-3 h-3" />
          ) : (
            <Plus className="w-3 h-3" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[14px] leading-relaxed text-[var(--slate-muted)] pr-10">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState<number | null>(1);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "all" || f.category === activeCategory;
    const matchSearch =
      search.trim() === "" ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen bg-[var(--slate-warm)] pt-16">
      {/* Hero */}
      <section className="bg-[var(--blue-deep)] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[var(--teal-light)] text-sm font-semibold tracking-widest uppercase mb-3">
            Help Center
          </p>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[var(--blue-pale)] text-base md:text-lg mb-8 max-w-xl mx-auto">
            Everything you need to know about working in Poland through
            DreamWise.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--slate-muted)]" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveCategory("all");
              }}
              className="w-full pl-11 pr-4 py-3 bg-white text-[var(--slate-dark)] placeholder:text-[var(--slate-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal-medium)]"
            />
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[var(--blue-medium)] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-center gap-x-10 gap-y-2">
          {[
            { value: "21", label: "questions answered" },
            { value: "18,000+", label: "workers placed" },
            { value: "850+", label: "verified employers" },
            { value: "since 2019", label: "serving workers" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 text-white/80 text-sm"
            >
              <span className="font-bold text-white">{s.value}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar categories */}
          <aside className="lg:w-56 flex-shrink-0">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--slate-muted)] mb-3 lg:mb-4">
              Categories
            </p>
            <nav className="flex flex-row lg:flex-col gap-2 flex-wrap">
              {categories.map((cat) => {
                const count =
                  cat.id === "all"
                    ? faqs.length
                    : faqs.filter((f) => f.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSearch("");
                      setOpenId(null);
                    }}
                    className={`flex items-center justify-between gap-2 px-3 py-2 text-sm text-left transition-all duration-150 ${
                      activeCategory === cat.id
                        ? "bg-[var(--blue-deep)] text-white font-medium"
                        : "bg-white text-[var(--slate-dark)] hover:bg-[var(--blue-tint)] hover:text-[var(--blue-deep)] border border-[var(--slate-border)]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        activeCategory === cat.id
                          ? "bg-white/20 text-white"
                          : "bg-[var(--blue-tint)] text-[var(--blue-deep)]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* FAQ list */}
          <div className="flex-1 min-w-0">
            {search.trim() !== "" && (
              <p className="text-sm text-[var(--slate-muted)] mb-4">
                {filtered.length === 0
                  ? `No results for "${search}"`
                  : `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"`}
              </p>
            )}

            {filtered.length === 0 ? (
              <div className="bg-white border border-[var(--slate-border)] p-10 text-center">
                <p className="text-[var(--slate-muted)] text-sm mb-4">
                  Can&apos;t find what you&apos;re looking for?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[var(--blue-deep)] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[var(--blue-medium)] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Ask us directly
                </Link>
              </div>
            ) : (
              <div className="bg-white border border-[var(--slate-border)] px-5 sm:px-7">
                {filtered.map((faq) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openId === faq.id}
                    onToggle={() =>
                      setOpenId(openId === faq.id ? null : faq.id)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--slate-border)] bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center">
          <div className="w-12 h-12 bg-[var(--teal-tint)] flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-5 h-5 text-[var(--teal-deep)]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--slate-dark)] mb-2">
            Still have questions?
          </h2>
          <p className="text-[var(--slate-muted)] text-sm mb-6 max-w-md mx-auto">
            Our team speaks English, Ukrainian, Nepali, Hindi, and Russian. We
            reply within one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-[var(--blue-deep)] text-white px-6 py-3 text-sm font-semibold hover:bg-[var(--blue-medium)] transition-colors"
            >
              Contact us
            </Link>
            <a
              href="mailto:contact@dreamwise.pl"
              className="border border-[var(--slate-border)] text-[var(--slate-dark)] px-6 py-3 text-sm font-semibold hover:border-[var(--blue-deep)] hover:text-[var(--blue-deep)] transition-colors"
            >
              contact@dreamwise.pl
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
