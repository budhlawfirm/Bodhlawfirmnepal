import {
  BlogPost,
  ContactInquiry,
  PracticeArea,
  SiteContent,
  TeamMember,
  Testimonial
} from '../types';

export const initialSiteContent: SiteContent = {
  hero: {
    eyebrow: "YOUR TRUST. OUR COMMITMENT.",
    title: "Defending Rights.\nDelivering Justice.",
    subtitle: "Bodh Law Firm Nepal is dedicated to providing exceptional legal services with integrity, professionalism, and a client-first approach.",
    primaryCtaText: "OUR SERVICES",
    secondaryCtaText: "CONTACT US",
    bgImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=85",
    sliderImages: [
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=85",
      "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1920&q=85",
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1920&q=85",
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=85"
    ],
    slideInterval: 10
  },
  about: {
    eyebrow: "ABOUT US",
    title: "Advocates for Justice.\nPartners in Success.",
    paragraph1: "Bodh Law Firm Nepal is a full-service law firm providing comprehensive legal solutions to individuals, businesses, and organizations across Nepal.",
    paragraph2: "We combine in-depth legal knowledge with practical strategies to protect your rights and help you achieve your objectives.",
    ctaText: "READ MORE ABOUT US",
    image: "/assets/about-library.jpg",
    yearsOfExcellence: 12,
    barAffiliation: "Registered with Nepal Bar Council & Supreme Court Bar Association"
  },
  pillars: [
    {
      id: "p-1",
      title: "Client Focused",
      description: "Your goals are our priority. We listen, we care, we deliver.",
      icon: "users"
    },
    {
      id: "p-2",
      title: "Legal Excellence",
      description: "Experienced advocates delivering strategic and effective solutions.",
      icon: "scale"
    },
    {
      id: "p-3",
      title: "Integrity & Trust",
      description: "We uphold the highest standards of ethics, transparency and honesty.",
      icon: "shield"
    },
    {
      id: "p-4",
      title: "Result Oriented",
      description: "We are committed to achieving the best possible outcomes for our clients.",
      icon: "handshake"
    }
  ],
  stats: [
    {
      id: "s-1",
      value: "10+",
      label: "Years of Excellence",
      icon: "award"
    },
    {
      id: "s-2",
      value: "500+",
      label: "Clients Served",
      icon: "users"
    },
    {
      id: "s-3",
      value: "1000+",
      label: "Cases Handled",
      icon: "briefcase"
    },
    {
      id: "s-4",
      value: "95%",
      label: "Client Satisfaction",
      icon: "trophy"
    }
  ],
  mountainRange: {
    bannerImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=85",
    eyebrow: "ROOTED IN NEPAL • UPHOLDING THE LAW",
    title: "Standing Resolute Like the Himalayas",
    subtitle: "Just as the majestic Himalayan peaks of Nepal stand timeless and unwavering above the clouds, Bodh Law Chambers stands steadfast in defending constitutional liberty, corporate integrity, and justice across the nation.",
    quote: "यतो धर्मस्ततो जयः",
    quoteTranslation: "Where there is adherence to Law and Righteousness, there Victory abides.",
    peaks: [
      {
        id: "peak-everest",
        name: "Mt. Everest (Sagarmatha)",
        nepaliName: "सगरमाथा",
        altitude: "8,848.86 m",
        significance: "Apex Court Excellence: Reflecting our commitment to the highest echelon of Supreme Court appellate jurisprudence and constitutional writ defense.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: "peak-machhapuchhre",
        name: "Machhapuchhre (Fishtail)",
        nepaliName: "माछापुच्छ्रे",
        altitude: "6,993 m",
        significance: "Sacred Integrity: Untouched and unbreached, embodying pristine attorney-client trust and unwavering Nepal Bar Council ethical standards.",
        image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: "peak-amadablam",
        name: "Ama Dablam",
        nepaliName: "आमा दब्लम",
        altitude: "6,812 m",
        significance: "Precision & Structure: The iconic Himalayan spire symbolizing meticulous cross-border contract structuring, FDI approvals, and dispute resolution.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: "peak-annapurna",
        name: "Annapurna Massif",
        nepaliName: "अन्नपूर्ण",
        altitude: "8,091 m",
        significance: "Comprehensive Fortitude: The vast massif representing multi-disciplinary practice from banking and tax to intellectual property and arbitration.",
        image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },
  contactInfo: {
    firmName: "Bodh Law Firm Nepal",
    tagline: "Defending Rights. Delivering Justice.",
    address: "Bhawan Marg, Kathmandu",
    city: "Kathmandu",
    country: "Nepal",
    phone: "+9779864432081",
    mobile: "+9779864432081",
    emergencyHotline: "+9779864432081",
    email: "contact@bodhlawfirm.com.np",
    consultationEmail: "consult@bodhlawfirm.com.np",
    website: "bodhlawfirm.com.np",
    whatsappNumber: "+9779864432081",
    whatsappDirectUrl: "https://wa.me/9779864432081?text=Hello%20Bodh%20Law%20Firm,%20I%20would%20like%20to%20schedule%20a%20legal%20consultation.",
    instagramUrl: "https://instagram.com/bodhlawfirm.nepal",
    linkedinUrl: "https://linkedin.com/company/bodh-law-firm-nepal",
    facebookUrl: "https://facebook.com/bodhlawfirm",
    workingHours: "Sunday – Friday: 9:00 AM – 6:00 PM (NPT)",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199a00000001%3A0x1!2sBhawan%20Marg%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1720000000000!5m2!1sen!2snp"
  }
};

export const initialPracticeAreas: PracticeArea[] = [
  {
    id: "pa-1",
    title: "Corporate & Commercial Law",
    slug: "corporate-commercial-law",
    icon: "building",
    shortDescription: "Business formation, contracts, compliance and advisory.",
    fullDescription: "Bodh Law Firm Nepal advises domestic and international companies on all aspects of corporate law, from entity formation and licensing to complex mergers, joint ventures, and statutory regulatory compliance.",
    order: 1,
    featured: true,
    subSections: [
      {
        id: "sub-1-1",
        title: "Company Formation & Registration",
        description: "Registration of private and public limited companies at the Office of the Company Registrar (OCR), tax registrations (PAN/VAT), and local government licensing across Nepal.",
        keyServices: [
          "Articles & Memorandum of Association Drafting",
          "OCR Online Filings & Compliance",
          "Tax (PAN/VAT) and Social Security Fund (SSF) Setup",
          "Shareholder & Promoters Agreements"
        ]
      },
      {
        id: "sub-1-2",
        title: "Foreign Direct Investment (FDI) in Nepal",
        description: "Guiding global investors and multinational corporations through Department of Industry (DOI) approvals, Nepal Rastra Bank inward remittance clearances, and bilateral investment treaties.",
        keyServices: [
          "FDI Approval via Automatic & Regular Route",
          "NRB Capital Remittance Clearances",
          "Joint Venture Negotiation",
          "Liaison & Branch Office Setup in Nepal"
        ]
      },
      {
        id: "sub-1-3",
        title: "Commercial Contracts & Regulatory Compliance",
        description: "Drafting, negotiating, and auditing bespoke business contracts, supply chain agreements, franchise treaties, and ensuring corporate governance under the Companies Act.",
        keyServices: [
          "Bespoke Vendor & Client Contracts",
          "Non-Disclosure Agreements (NDA) & Non-Compete",
          "Annual Statutory Filing & Audit Facilitation",
          "Labor & Employment Code Compliance"
        ]
      },
      {
        id: "sub-1-4",
        title: "Mergers, Acquisitions & Corporate Restructuring",
        description: "Complete legal due diligence, share purchase agreements (SPA), asset transfers, and antitrust review for domestic and cross-border M&A transactions.",
        keyServices: [
          "Comprehensive Legal Due Diligence Audits",
          "Share Purchase & Asset Transfer Agreements",
          "Corporate Restructuring & Spin-offs",
          "Competition Law & Monopolies Advisory"
        ]
      }
    ]
  },
  {
    id: "pa-2",
    title: "Banking & Finance Law",
    slug: "banking-finance-law",
    icon: "landmark",
    shortDescription: "Banking matters, recovery, securities and finance advisory.",
    fullDescription: "Representing leading commercial banks, development financial institutions, and borrowers in complex syndicated loans, loan restructuring, debt recovery litigation, and compliance with Nepal Rastra Bank directives.",
    order: 2,
    featured: true,
    subSections: [
      {
        id: "sub-2-1",
        title: "Loan Documentation & Consortium Lending",
        description: "Drafting and reviewing consortium loan agreements, debenture trust deeds, hypothecation agreements, and personal/corporate guarantee instruments.",
        keyServices: [
          "Syndicated Credit Facilities",
          "Security Creation & Charge Registration",
          "Inter-creditor Agreements",
          "Project Financing Legal Advisory"
        ]
      },
      {
        id: "sub-2-2",
        title: "Debt Recovery & Tribunal Litigation",
        description: "Enforcing financial claims before the Debt Recovery Tribunal (DRT) and Debt Recovery Appellate Tribunal (DRAT), as well as collateral auctions under the Banking Offences Act.",
        keyServices: [
          "DRT Petition Drafting & Representation",
          "Auction Verification & Injunction Defense",
          "Banking Offence Defense & Compliance",
          "Settlement Negotiation & Restructuring"
        ]
      },
      {
        id: "sub-2-3",
        title: "Fintech, Payment Gateways & NRB Clearances",
        description: "Advising Payment System Operators (PSO) and Payment Service Providers (PSP) on licensing under Nepal Rastra Bank payment regulations and cybersecurity standards.",
        keyServices: [
          "NRB Payment Licensing Applications",
          "Fintech Terms of Service & User Policies",
          "AML/CFT Compliance Advisory",
          "Cross-Border Remittance Regulations"
        ]
      }
    ]
  },
  {
    id: "pa-3",
    title: "Litigation & Dispute Resolution",
    slug: "litigation-dispute-resolution",
    icon: "scale",
    shortDescription: "Civil, criminal, commercial and constitutional matters.",
    fullDescription: "Our courtroom advocates have extensive advocacy experience appearing before the Supreme Court of Nepal, High Courts (Patan and regional benches), District Courts, and arbitral tribunals across the nation.",
    order: 3,
    featured: true,
    subSections: [
      {
        id: "sub-3-1",
        title: "Supreme Court & High Court Appellate Practice",
        description: "Filing and arguing Extraordinary Jurisdiction writ petitions (Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto) and constitutional challenges.",
        keyServices: [
          "Constitutional Writ Petitions & PILs",
          "Appeals & Revision Petitions",
          "Interim Injunctions & Stay Order Petitions",
          "Execution of Foreign Judgments & Decrees"
        ]
      },
      {
        id: "sub-3-2",
        title: "Commercial Arbitration & Alternative Dispute Resolution (ADR)",
        description: "Representing contractors, developers, and corporations in arbitration proceedings under the Nepal Council of Arbitration (NEPCA) and international ICC/UNCITRAL rules.",
        keyServices: [
          "Arbitration Clause Drafting & Interpretation",
          "Arbitral Tribunal Representation",
          "Challenge and Enforcement of Arbitral Awards",
          "Court-Annexed & Private Mediation"
        ]
      },
      {
        id: "sub-3-3",
        title: "White-Collar Crime & Commercial Offenses",
        description: "Defending executives and corporate entities in revenue investigation cases (DRI), Anti-Money Laundering (FIU/DMLI), and Commission for Investigation of Abuse of Authority (CIAA) proceedings.",
        keyServices: [
          "CIAA Investigation Legal Advisory",
          "Department of Revenue Investigation Inquiries",
          "Bail Applications & Courtroom Defense",
          "Internal Corporate Fraud Investigations"
        ]
      }
    ]
  },
  {
    id: "pa-4",
    title: "Real Estate & Property Law",
    slug: "real-estate-property-law",
    icon: "home",
    shortDescription: "Property transactions, due diligence, title verification and disputes.",
    fullDescription: "Navigating Nepal's complex land tenure systems with forensic title searches, land revenue office (Malpot) procedures, Guthi land regularizations, and large-scale real estate development contracts.",
    order: 4,
    featured: true,
    subSections: [
      {
        id: "sub-4-1",
        title: "Forensic Title Verification & Cadastral Due Diligence",
        description: "Checking Land Ownership Certificates (Lalpurja), historical revenue records (Dhadda), and court encumbrance certificates to guarantee unencumbered ownership.",
        keyServices: [
          "Malpot Office Historical Title Search",
          "Survey Office (Napi) Cadastral Boundary Check",
          "Guthi & Forest Land Exemption Verification",
          "Title Defect Remediation"
        ]
      },
      {
        id: "sub-4-2",
        title: "Conveyancing, Registration & Lease Agreements",
        description: "Executing deed transfers (Rajinama), exchange deeds, long-term commercial leases, and joint development agreements between landowners and developers.",
        keyServices: [
          "Sale Deed Drafting & Malpot Registration",
          "Commercial Lease & Rent Agreements",
          "Joint Development Agreement (JDA) Drafting",
          "Tenancy Settlement & Eviction Proceedings"
        ]
      },
      {
        id: "sub-4-3",
        title: "Boundary, Encroachment & Partition Litigation",
        description: "Resolving ancestral land partitions (Ansha-Banda), boundary disputes, easement rights (Bato / drainage), and municipal planning permission disputes.",
        keyServices: [
          "Land Partition Suits in District Courts",
          "Easement & Right of Way Injunctions",
          "Encroachment Demolition Orders",
          "Municipal Building Code Appeals"
        ]
      }
    ]
  },
  {
    id: "pa-5",
    title: "Family Law",
    slug: "family-law",
    icon: "heart",
    shortDescription: "Divorce, child custody, marriage, inheritance and family disputes.",
    fullDescription: "Providing compassionate, confidential, and highly competent legal counsel for sensitive domestic matters, divorce settlements, child guardianship, and estate inheritance disputes under the National Civil Code.",
    order: 5,
    featured: true,
    subSections: [
      {
        id: "sub-5-1",
        title: "Divorce & Matrimonial Settlement",
        description: "Mutual consent divorce (Sambandha Bichhed) filings, contested divorce proceedings, maintenance allowances (Kharacha), and equitable property settlements.",
        keyServices: [
          "Mutual Consent Divorce Facilitation",
          "Contested Divorce Litigation",
          "Interim Alimony & Property Allocation",
          "Court Marriage Registration for Nepalis & Foreigners"
        ]
      },
      {
        id: "sub-5-2",
        title: "Child Custody, Guardianship & Child Support",
        description: "Protecting the rights and welfare of children through custodial petitions, visitation schedules, and cross-border child relocation disputes.",
        keyServices: [
          "Legal & Physical Custody Representation",
          "Child Maintenance Petitions",
          "Parental Guardianship Certifications",
          "Supervised Visitation Agreements"
        ]
      },
      {
        id: "sub-5-3",
        title: "Estate Succession & Ancestral Partition (Ansha)",
        description: "Guiding families through ancestral property claims, probate of wills (Ichhyapatra), gift deeds (Daan-Bakshish), and inheritance tax regularizations.",
        keyServices: [
          "Ansha-Banda Deed Execution",
          "Chhotpatra (Separation of Kitchen) Deeds",
          "Will Drafting & Judicial Probate",
          "Disputed Succession Litigation"
        ]
      }
    ]
  },
  {
    id: "pa-6",
    title: "Intellectual Property Law",
    slug: "intellectual-property-law",
    icon: "shield-check",
    shortDescription: "Trademarks, copyrights, patents and IP protection.",
    fullDescription: "Protecting brands, creative works, and technological innovations in Nepal through proactive registrations at the Department of Industry (DOI), custom border enforcement, and aggressive anti-counterfeit actions.",
    order: 6,
    featured: true,
    subSections: [
      {
        id: "sub-6-1",
        title: "Trademark Registration & Opposition Proceedings",
        description: "Conducting search clearances, preparing and filing trademark applications, managing gazette publications, and prosecuting opposition proceedings before the DOI.",
        keyServices: [
          "DOI Brand Clearance & Pre-Filing Search",
          "Trademark Application Filing & Prosecution",
          "Third-Party Opposition Petitions",
          "Trademark Renewals & Portfolio Management"
        ]
      },
      {
        id: "sub-6-2",
        title: "Anti-Counterfeiting & IP Enforcement Litigation",
        description: "Conducting market raids with local police and DOI authorities to seize counterfeit goods, filing copyright and trademark infringement suits, and securing damages.",
        keyServices: [
          "Cease-and-Desist Notices & Cease Undertakings",
          "Administrative Raids & Product Confiscation",
          "Infringement Lawsuits in High Courts",
          "Customs Recordation & Border Seizure"
        ]
      },
      {
        id: "sub-6-3",
        title: "Copyright, Software & Technology Licensing",
        description: "Registering copyrights at the Nepal Copyright Registrar's Office, drafting software licensing agreements, SaaS contracts, and trade secret protection policies.",
        keyServices: [
          "Copyright Registration for Media & Software",
          "Software Licensing & SaaS Master Agreements",
          "Non-Disclosure & Trade Secret Audits",
          "Franchise & Technology Transfer Clearances"
        ]
      }
    ]
  }
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: "tm-1",
    name: "Adv. Rameshwor Shrestha",
    role: "Senior Advocate & Managing Partner",
    photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&auto=format&fit=crop&q=80",
    bio: "Over 22 years of distinguished legal practice in Nepal. Former legal advisor to commercial financial institutions and lead counsel in benchmark Supreme Court commercial cases.",
    education: "LL.M. in Commercial Law, Tribhuvan University; Member of International Bar Association",
    barRegistration: "Nepal Bar Council Reg No. 4512",
    email: "rameshwor@bodhlawfirm.com",
    phone: "+977 980 111 2233",
    specializations: ["Corporate Law", "Commercial Litigation", "Cross-Border M&A", "Constitutional Law"],
    order: 1
  },
  {
    id: "tm-2",
    name: "Adv. Sushila Karki Thapa",
    role: "Partner - Banking & Corporate Finance",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    bio: "Specializes in project finance, consortium loans, FDI clearances, and fintech regulatory compliance. Advises prominent multilateral development banks operating in South Asia.",
    education: "LL.M. in International Trade & Finance, National Law School of India University",
    barRegistration: "Nepal Bar Council Reg No. 7820",
    email: "sushila@bodhlawfirm.com",
    phone: "+977 980 222 3344",
    specializations: ["Banking & Securities", "Fintech Regulations", "Project Financing", "Debt Restructuring"],
    order: 2
  },
  {
    id: "tm-3",
    name: "Adv. Bipin Adhikari",
    role: "Partner - Litigation & Dispute Resolution",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
    bio: "Veteran courtroom strategist with over 450 appearances before the Supreme Court of Nepal and Patan High Court. Known for persuasive appellate advocacy and commercial arbitration.",
    education: "LL.B., Nepal Law Campus; Fellow, Chartered Institute of Arbitrators (CIArb)",
    barRegistration: "Nepal Bar Council Reg No. 6140",
    email: "bipin@bodhlawfirm.com",
    phone: "+977 980 333 4455",
    specializations: ["Commercial Arbitration", "Civil & Property Disputes", "High Court Litigation", "CIAA Defense"],
    order: 3
  },
  {
    id: "tm-4",
    name: "Adv. Prakriti Acharya",
    role: "Senior Associate - Real Estate & Property",
    photo: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&auto=format&fit=crop&q=80",
    bio: "Renowned expert in Nepalese land tenure laws, Malpot title search, and complex real estate conveyancing for infrastructure projects and residential developments.",
    education: "B.A. LL.B., Kathmandu School of Law",
    barRegistration: "Nepal Bar Council Reg No. 9931",
    email: "prakriti@bodhlawfirm.com",
    phone: "+977 980 444 5566",
    specializations: ["Land Title Verification", "Joint Venture Real Estate", "Malpot Proceedings", "Easement Rights"],
    order: 4
  },
  {
    id: "tm-5",
    name: "Adv. Niraj Sharma",
    role: "Associate - Intellectual Property & Tech Law",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    bio: "Pioneering tech and IP counsel in Nepal. Regularly handles trademark opposition disputes before the Department of Industry and advises startups on data privacy and AI regulations.",
    education: "LL.B., Tribhuvan University; Certified Information Privacy Professional",
    barRegistration: "Nepal Bar Council Reg No. 11204",
    email: "niraj@bodhlawfirm.com",
    phone: "+977 980 555 6677",
    specializations: ["Trademarks & Copyright", "Cyber Law & IT Contracts", "Anti-Counterfeit Enforcement", "Data Privacy"],
    order: 5
  }
];

export const initialBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "Navigating Foreign Direct Investment (FDI) in Nepal: Key Legal Updates",
    slug: "navigating-fdi-in-nepal-legal-guide",
    excerpt: "A comprehensive breakdown of recent amendments to the Foreign Investment and Technology Transfer Act (FITTA), automatic route approvals, and minimum capital requirements for foreign investors.",
    content: `Nepal has witnessed strategic updates to its foreign investment policy aimed at attracting global capital. Under the Foreign Investment and Technology Transfer Act (FITTA) and recent circulars from the Department of Industry (DOI) and Nepal Rastra Bank (NRB), procedures have been significantly streamlined.

### Key Regulatory Highlights:
1. **Automatic Route Approvals**: For designated manufacturing, IT, and tourism sectors, foreign investors can now receive fast-track automatic clearance without discretionary delays.
2. **Threshold Adjustments**: While the general minimum threshold remains standard, tech and knowledge-based startups benefit from relaxed compliance mechanisms.
3. **Repatriation Safeguards**: NRB has introduced digitized portals for repatriation of dividends and capital divestment proceeds.

At Bodh Law Firm Nepal, our corporate team guides foreign principals through end-to-end DOI documentation, company incorporation, and banking clearances.`,
    authorName: "Adv. Sushila Karki Thapa",
    authorRole: "Partner - Banking & Corporate Finance",
    authorPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80",
    category: "Corporate & FDI",
    publishedDate: "September 2, 2026",
    readTime: "5 min read",
    tags: ["FDI", "Corporate Law", "Investment in Nepal", "FITTA"]
  },
  {
    id: "blog-2",
    title: "Commercial Arbitration in Nepal: Understanding NEPCA Rules & Enforcement",
    slug: "commercial-arbitration-nepal-nepca-rules",
    excerpt: "Why institutional arbitration is rapidly replacing traditional courtroom litigation for major construction, joint-venture, and commercial contract disputes in Kathmandu.",
    content: `When contractual disagreements emerge in high-value infrastructure or commercial ventures, traditional courtroom proceedings can take considerable time. Alternative Dispute Resolution (ADR), particularly commercial arbitration governed by the Arbitration Act of Nepal, offers speed, neutrality, and commercial confidentiality.

### Why Opt for Commercial Arbitration?
- **Speedy Adjudication**: Arbitral tribunals must render awards within strict statutory deadlines unless mutually extended.
- **Subject-Matter Expertise**: Parties can select arbitrators with specialized knowledge in civil engineering, finance, or international trade.
- **Enforceability**: Arbitral awards carry the force of a court decree and are enforceable via the District Courts under Section 31 of the Arbitration Act.

Carefully drafted dispute escalation clauses can save companies millions in potential litigation costs.`,
    authorName: "Adv. Bipin Adhikari",
    authorRole: "Partner - Litigation & Dispute Resolution",
    authorPhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&auto=format&fit=crop&q=80",
    category: "Dispute Resolution",
    publishedDate: "August 24, 2026",
    readTime: "6 min read",
    tags: ["Arbitration", "ADR", "NEPCA", "Contract Law"]
  },
  {
    id: "blog-3",
    title: "Essential Due Diligence Checklist Before Purchasing Real Estate in Nepal",
    slug: "real-estate-due-diligence-checklist-nepal",
    excerpt: "Crucial legal steps to verify Lalpurja certificates, investigate Malpot historical dhadda ledgers, identify Guthi land restrictions, and avoid land fraud.",
    content: `Real estate transactions in Kathmandu Valley and major metropolitan centers require rigorous title investigation. Relying solely on a Land Ownership Certificate (Lalpurja) is a common mistake that can lead to costly disputes.

### 5 Non-Negotiable Checks:
1. **Malpot Dhadda Investigation**: Check the physical ledger for unregistered mortgages, court injunctions, or family claims.
2. **Survey Office (Napi) Verification**: Cross-reference physical boundary pegs with official cadastral maps (Trace Naksha).
3. **Guthi & Public Land Clearance**: Ensure the parcel is not classified as Rajguthi or designated for public amenities.
4. **Easement & Right of Way (Bato)**: Verify legal access on public roads to avoid landlocked properties.
5. **Municipal Building By-Laws**: Review FAR (Floor Area Ratio) and setback regulations prior to purchase.`,
    authorName: "Adv. Prakriti Acharya",
    authorRole: "Senior Associate - Real Estate & Property",
    authorPhoto: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000&auto=format&fit=crop&q=80",
    category: "Property Law",
    publishedDate: "August 12, 2026",
    readTime: "7 min read",
    tags: ["Real Estate", "Due Diligence", "Malpot", "Property Law"]
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "t-1",
    clientName: "Ramesh P.",
    clientTitle: "Business Owner",
    clientPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    quote: "Bodh Law Firm provided us with clear legal guidance and outstanding support throughout our corporate acquisition. Truly professional and reliable.",
    rating: 5,
    practiceArea: "Corporate & Commercial Law"
  },
  {
    id: "t-2",
    clientName: "Sushma K.",
    clientTitle: "Entrepreneur",
    clientPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    quote: "Their team is knowledgeable, responsive and committed. We highly recommend Bodh Law Firm for any complex regulatory or commercial legal matters in Nepal.",
    rating: 5,
    practiceArea: "Banking & Finance Law"
  },
  {
    id: "t-3",
    clientName: "Arjun B.",
    clientTitle: "Managing Director",
    clientPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    quote: "Excellent service with a client-first approach. They delivered results beyond our expectations in our High Court commercial dispute.",
    rating: 5,
    practiceArea: "Litigation & Dispute Resolution"
  },
  {
    id: "t-4",
    clientName: "Maya Shrestha",
    clientTitle: "CEO, Himalayan Tech Innovations",
    clientPhoto: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&auto=format&fit=crop&q=80",
    quote: "Bodh Law Firm handled our trademark registration and software IP licensing with incredible speed and diligence. They are our trusted legal counsel in Nepal.",
    rating: 5,
    practiceArea: "Intellectual Property Law"
  }
];

export const initialContactInquiries: ContactInquiry[] = [];
