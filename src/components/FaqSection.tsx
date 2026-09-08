import {
  BookOpen,
  Briefcase,
  ChevronDown,
  FileCheck,
  HelpCircle,
  MapPin,
  MessageSquare,
  PhoneCall,
  Scale,
  Search,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import React, { useState } from 'react';

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  nepaliQuestion: string;
  answer: string;
  nepaliAnswer?: string;
  lawReference?: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Supreme Court & Litigation',
    question: 'How do I choose the best law firm or Supreme Court advocate in Kathmandu, Nepal?',
    nepaliQuestion: 'नेपालमा सर्वोच्च अदालत तथा उपयुक्त कानुन व्यवसायी कसरी छनोट गर्ने?',
    answer:
      'When selecting legal counsel in Nepal, verify that the advocates are actively licensed by the Nepal Bar Council (नेपाल बार काउन्सिल) with proven appearances before the Supreme Court of Nepal and Patan High Court. Bodh Law Firm Nepal, located in Putalisadak near the judicial corridor, provides dedicated senior advocate representation, complete case confidentiality, and transparent fee schedules.',
    nepaliAnswer:
      'नेपाल बार काउन्सिलबाट इजाजतप्राप्त तथा सर्वोच्च र उच्च अदालतमा वकालतको अनुभव भएका वरिष्ठ अधिवक्ताहरू छनोट गर्नुपर्दछ। बोध ल फर्म नेपालले कानुनी इमान्दारिता र पारदर्शी सेवा प्रदान गर्दछ।',
    lawReference: 'Nepal Legal Practitioners Act 2050 & Nepal Bar Council Code of Conduct'
  },
  {
    id: 'faq-2',
    category: 'Corporate & FDI',
    question: 'What is the procedure and threshold for Foreign Direct Investment (FDI) and company registration in Nepal?',
    nepaliQuestion: 'नेपालमा वैदेशिक लगानी (FDI) तथा कम्पनी दर्ताको कानुनी प्रक्रिया के हो?',
    answer:
      'Foreign Direct Investment in Nepal is governed by the Foreign Investment and Technology Transfer Act (FITTA 2075). Foreign investors must submit an application through the Department of Industry (DOI) or Investment Board Nepal (IBN), adhere to statutory minimum capital requirements (NPR 20 million), obtain foreign currency approvals from Nepal Rastra Bank (NRB), and register the legal entity at the Office of the Company Registrar (OCR). Bodh Law Firm provides complete legal structuring, joint venture drafting, and regulatory approvals.',
    nepaliAnswer:
      'FITTA २०७५ बमोजिम उद्योग विभाग वा लगानी बोर्डबाट स्वीकृति लिई, राष्ट्र बैंकको विदेशी विनिमय अनुमति तथा कम्पनी रजिष्ट्रारको कार्यालयमा दर्ता गरिन्छ।',
    lawReference: 'Foreign Investment and Technology Transfer Act 2075 (FITTA) & Companies Act 2063'
  },
  {
    id: 'faq-3',
    category: 'Family Law',
    question: 'What is the timeline and legal process for mutual consent divorce (Milaapatra) and contested divorce in Nepal?',
    nepaliQuestion: 'नेपालमा सम्बन्ध विच्छेद (सहमति वा मुद्दा) को प्रक्रिया र समय कति लाग्छ?',
    answer:
      'Under the National Civil Code 2074 (Muluki Dewani Samhita), if both husband and wife mutually agree, a mutual consent divorce (मिलापत्र सम्बन्ध विच्छेद) can be filed and concluded swiftly in the relevant District Court within 1 to 3 working days. In contested divorce petitions, court mediation is mandatory for up to one year before the bench proceeds to judgment on alimony, child custody, and partition of matrimonial property (अंशमुद्दा).',
    nepaliAnswer:
      'मुलुकी देवानी संहिता २०७४ अनुसार दुवै पक्षको सहमतिमा १-३ दिनभित्र जिल्ला अदालतबाट मिलापत्र गर्न सकिन्छ। विवादित मुद्दामा मेलमिलाप प्रक्रिया र अंश निर्धारण गरिन्छ।',
    lawReference: 'National Civil Code 2074 (Muluki Dewani Samhita), Chapter on Matrimonial Law'
  },
  {
    id: 'faq-4',
    category: 'Supreme Court & Litigation',
    question: 'How do Supreme Court extraordinary writ petitions (Habeas Corpus, Mandamus, Certiorari) work in Nepal?',
    nepaliQuestion: 'सर्वोच्च अदालतमा असाधारण अधिकारक्षेत्र अन्तर्गत रिट निवेदन कसरी दर्ता हुन्छ?',
    answer:
      'Under Article 133 of the Constitution of Nepal 2072, the Supreme Court possesses extraordinary jurisdiction to enforce fundamental rights and issue constitutional prerogative writs, including Habeas Corpus (बन्दी प्रत्यक्षीकरण), Mandamus (परमादेश), Certiorari (उत्प्रेषण), Prohibition (प्रतिषेध), and Quo Warranto (अधिकारपृच्छा). Bodh Law Firm drafts and argues urgent writs before single and division benches of the Supreme Court.',
    nepaliAnswer:
      'नेपालको संविधान २०७२ को धारा १३३ बमोजिम मौलिक हक हनन वा कानुनी त्रुटि विरुद्ध सर्वोच्च अदालतमा रिट क्षेत्राधिकार प्रयोग गरिन्छ।',
    lawReference: 'Constitution of Nepal 2072, Article 133 & Supreme Court Regulations'
  },
  {
    id: 'faq-5',
    category: 'Property & Land Disputes',
    question: 'How are land title verification, Lalpurja disputes, and Malpot registry issues resolved in Kathmandu Valley?',
    nepaliQuestion: 'काठमाडौंमा जग्गा जमिन, लालपुर्जा कीर्ते तथा मालपोत विवादको समाधान कसरी हुन्छ?',
    answer:
      'Real estate disputes often involve boundary demarcations, ancestral title claims, guthi land rights, or double registrations. Bodh Law Firm conducts historic chain-of-title searches at the Land Revenue Office (मालपोत कार्यालय) and Cadastral Survey Offices (नापी कार्यालय), represents clients in civil injunctions, title suits, and handles fraud rectification under the Land Related Acts of Nepal.',
    nepaliAnswer:
      'मालपोत र नापी कार्यालयबाट श्रेस्ता तथा फिल्डबुक अध्ययन गरी जिल्ला अदालतमा हकदाबी, रोक्का वा दर्ता बदर सम्बन्धी मुद्दा दायर गरिन्छ।',
    lawReference: 'Land Related Act 2021 & National Civil Code 2074 Property Title Sections'
  },
  {
    id: 'faq-6',
    category: 'Consultation & Fees',
    question: 'How are legal consultation fees and litigation costs calculated at Bodh Law Firm Nepal?',
    nepaliQuestion: 'बोध ल फर्ममा कानुनी परामर्श तथा मुद्दा बहसको शुल्क कसरी निर्धारण हुन्छ?',
    answer:
      'We believe in ethical, transparent pricing in accordance with Nepal Bar Council standards. Initial consultations provide clear legal roadmaps at fixed transparent rates. For ongoing corporate counsel, we offer monthly retainer packages; for litigation and arbitration, fees are structured on transparent stage-by-stage milestones (pleading drafting, evidence examination, and final bench arguments) with zero surprise costs.',
    nepaliAnswer:
      'नेपाल बार काउन्सिलको आचारसंहिता अनुरुप पारदर्शी परामर्श शुल्क र चरणबद्ध मुद्दा शुल्क संरचना निर्धारण गरिएको छ।',
    lawReference: 'Nepal Bar Council Professional Standards & Chambers Fee Schedule'
  },
  {
    id: 'faq-7',
    category: 'Corporate & FDI',
    question: 'Can Non-Resident Nepalis (NRNs) and overseas clients consult Bodh Law Firm remotely?',
    nepaliQuestion: 'विदेशमा बस्ने गैरआवासीय नेपाली (NRN) तथा विदेशी नागरिकले अनलाइन परामर्श लिन सक्छन्?',
    answer:
      'Yes. A significant portion of our clients reside in the United States, United Kingdom, Australia, Europe, and the Middle East. We conduct encrypted video consultations, provide digital document drafting, coordinate Power of Attorney (अधिकृत वारिसनामा) attestations through Nepalese embassies and consular offices abroad, and provide real-time hearing status updates.',
    nepaliAnswer:
      'हो, दूतावास मार्फत अधिकृत वारिसनामा प्रमाणित गराई भर्चुअल माध्यमबाट कानुनी परामर्श र अदालतमा बहस पैरवी गरिन्छ।',
    lawReference: 'Power of Attorney Provisions, Nepal Civil Procedure Code 2074'
  },
  {
    id: 'faq-8',
    category: 'Supreme Court & Litigation',
    question: 'What is the role of commercial arbitration in Nepal under the Arbitration Act 2038?',
    nepaliQuestion: 'नेपालमा मध्यस्थता (Arbitration) द्वारा व्यावसायिक विवाद समाधान कसरी गरिन्छ?',
    answer:
      'Commercial arbitration is widely favored for construction contracts, banking, joint ventures, and international commercial transactions to avoid court delays. Under the Arbitration Act 2038 and NEPCA (Nepal Council of Arbitration) rules, arbitral awards are binding and enforceable in District Courts. Bodh Law Firm provides seasoned party representation and arbitrator appointment advisory.',
    nepaliAnswer:
      'मध्यस्थता ऐन २०३८ अनुसार निर्माण तथा व्यावसायिक सम्झौताका विवाद छिटो र प्रभावकारी रुपमा समाधान गरी अदालतबाट फैसला कार्यान्वयन गराइन्छ।',
    lawReference: 'Arbitration Act 2038 & NEPCA Arbitration Rules'
  }
];

interface FaqSectionProps {
  onOpenConsultation?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onOpenConsultation,
  onNavigate
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-1', 'faq-2']);

  const categories = [
    'All',
    'Supreme Court & Litigation',
    'Corporate & FDI',
    'Family Law',
    'Property & Land Disputes',
    'Consultation & Fees'
  ];

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      item.question.toLowerCase().includes(query) ||
      item.nepaliQuestion.includes(query) ||
      item.answer.toLowerCase().includes(query) ||
      (item.nepaliAnswer && item.nepaliAnswer.includes(query)) ||
      (item.lawReference && item.lawReference.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="faq"
      className="py-12 border-b border-[#211d16] bg-[#070605] text-[#ded9cd]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1c1913]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a160e] border border-[#c5a059]/40 text-[#c5a059] text-[11px] uppercase tracking-wider font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Legal Knowledge Base & FAQs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f3ece0] mt-2">
              Frequently Asked Legal Questions
            </h2>
            <p className="text-xs text-[#8c887d] mt-1.5 max-w-2xl leading-relaxed">
              Clear answers regarding Supreme Court litigation, company registration, foreign direct investment (FDI), land disputes, and divorce law under the legal framework of Nepal.
            </p>
          </div>

          {/* Quick Consultation Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="px-4 py-2.5 bg-[#c5a059] hover:bg-[#d4b050] text-black font-semibold text-xs transition-colors flex items-center gap-2 shadow cursor-pointer"
                id="faq-book-consult-btn"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Ask an Advocate Directly</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 whitespace-nowrap text-xs transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
                    : 'bg-[#12100d] text-[#8c887d] hover:text-[#f3ece0] border border-[#242018]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#c5a059] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legal questions, FDI, Civil Code..."
              className="w-full pl-9 pr-3 py-2 bg-[#12100d] border border-[#2e2a22] focus:border-[#c5a059] text-xs text-[#f3ece0] placeholder-[#666] outline-none transition-colors"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-6 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-[#0d0c09] border border-[#1f1c16]">
              <p className="text-xs text-[#8c887d]">
                No legal questions found matching &ldquo;{searchQuery}&rdquo;.
              </p>
              {onOpenConsultation && (
                <button
                  onClick={onOpenConsultation}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#c5a059] hover:underline"
                >
                  <span>Submit your specific query to our chambers</span>
                  <span>→</span>
                </button>
              )}
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`border transition-colors ${
                    isOpen
                      ? 'border-[#c5a059]/60 bg-[#12100c]'
                      : 'border-[#221f18] bg-[#0c0b08] hover:border-[#383327]'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-semibold text-[#c5a059] bg-[#1a160d] px-2 py-0.5 border border-[#c5a059]/30">
                          {faq.category}
                        </span>
                        <span className="text-[11px] text-[#7d796e] font-serif">
                          {faq.nepaliQuestion}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-serif font-medium text-[#f3ece0] leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`p-1.5 rounded bg-[#1c1811] text-[#c5a059] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#c5a059] text-black' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-[#b8b3a6] leading-relaxed border-t border-[#221f18]/60 space-y-3 animate-fadeIn">
                      <p className="text-xs sm:text-sm text-[#cdc8bc] leading-relaxed">
                        {faq.answer}
                      </p>

                      {faq.nepaliAnswer && (
                        <div className="p-2.5 bg-[#17140e] border-l-2 border-[#c5a059] text-[11px] text-[#a8a395]">
                          <strong className="text-[#c5a059] block font-serif mb-0.5">
                            नेपाली कानुनी सारांश:
                          </strong>
                          {faq.nepaliAnswer}
                        </div>
                      )}

                      {faq.lawReference && (
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1e1b15] text-[11px] text-[#7a766c]">
                          <div className="flex items-center gap-1.5">
                            <FileCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                            <span>Statutory Reference: <span className="text-[#a09c90]">{faq.lawReference}</span></span>
                          </div>

                          {onOpenConsultation && (
                            <button
                              onClick={onOpenConsultation}
                              className="text-[#c5a059] hover:underline font-medium flex items-center gap-1 cursor-pointer"
                            >
                              <span>Consult on this topic</span>
                              <span>→</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bar Council Compliance Disclaimer */}
        <div className="mt-8 p-3.5 bg-[#0e0d0a] border border-[#211d16] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-[#787469]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
            <span>
              Disclaimer: FAQs are provided for general legal awareness in Nepal and do not constitute formal legal counsel. For specific case evaluation, consult Bodh Law Firm advocates directly.
            </span>
          </div>
          <span className="shrink-0 text-[#a09c91] font-mono text-[10px]">
            Nepal Bar Council Rules Compliant
          </span>
        </div>
      </div>
    </section>
  );
};
