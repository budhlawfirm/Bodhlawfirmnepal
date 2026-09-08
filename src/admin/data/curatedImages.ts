export interface CuratedImage {
  id: string;
  category: 'hero' | 'about' | 'law' | 'team' | 'blogs' | 'mountains';
  title: string;
  url: string;
  description: string;
}

export const curatedImages: CuratedImage[] = [
  // Heroes / Law Imagery / Courtrooms
  {
    id: 'hero-1',
    category: 'hero',
    title: 'Supreme Court & Classical Columns',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=85',
    description: 'Neoclassical courthouse pillars bathed in dramatic warm legal lighting'
  },
  {
    id: 'hero-2',
    category: 'hero',
    title: 'Grand Law Library & Gavel',
    url: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1920&q=85',
    description: 'Hardwood mahogany legal library with leather-bound statutory law books'
  },
  {
    id: 'hero-3',
    category: 'hero',
    title: 'Senior Advocate Desk & Scales of Justice',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1920&q=85',
    description: 'Executive chambers desk with fountain pen, open legal brief, and brass scales'
  },
  {
    id: 'hero-4',
    category: 'hero',
    title: 'Courtroom Archive & Judicial Precedents',
    url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=85',
    description: 'Historic law library corridors and Supreme Court case precedence journals'
  },
  {
    id: 'hero-5',
    category: 'hero',
    title: 'Modern Appellate Chambers & Boardroom',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=85',
    description: 'Prestigious corporate legal boardroom for international arbitration and transactions'
  },
  {
    id: 'hero-6',
    category: 'hero',
    title: 'Lady Justice Relief & Judicial Benches',
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1920&q=85',
    description: 'Grand appellate courtroom architecture reflecting constitutional heritage'
  },

  // Nepal Mountain Range Showcase
  {
    id: 'mt-everest',
    category: 'mountains',
    title: 'Mount Everest (Sagarmatha) Golden Alpenglow',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=85',
    description: 'The highest summit on Earth (8,848.86m), reflecting Supreme Court pinnacle excellence'
  },
  {
    id: 'mt-machhapuchhre',
    category: 'mountains',
    title: 'Machhapuchhre (Fishtail) Sacred Annapurna Spire',
    url: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=1920&q=85',
    description: 'The sacred unclimbed peak of Nepal (6,993m), symbolizing unyielding legal ethics'
  },
  {
    id: 'mt-amadablam',
    category: 'mountains',
    title: 'Ama Dablam Himalayan Monument',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
    description: 'Iconic Himalayan pyramid (6,812m), representing precision drafting and structural advocacy'
  },
  {
    id: 'mt-annapurna',
    category: 'mountains',
    title: 'Annapurna Massif Snowy Panorama',
    url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=85',
    description: 'Majestic 8,000m Himalayan range across Central Nepal, representing broad legal fortitude'
  },
  {
    id: 'mt-panoramic-range',
    category: 'mountains',
    title: 'Great Himalayan Range Panorama at Sunrise',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
    description: 'Sweeping ridgeline of the Nepal Himalayas glowing in morning light'
  },

  // About / Chambers / Atmosphere
  {
    id: 'about-1',
    category: 'about',
    title: 'Senior Advocate Law Chambers & Desk',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    description: 'Executive desk with fountain pen, open legal brief, and law volumes'
  },
  {
    id: 'about-2',
    category: 'about',
    title: 'Legal Archive & Case Files Room',
    url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80',
    description: 'Chambers reference room with law journals and case precedence reports'
  },
  {
    id: 'about-3',
    category: 'about',
    title: 'Supreme Court Benches & Corridor',
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    description: 'Grand library corridor reflecting tradition and courtroom history'
  },

  // Team / Advocates Portraits
  {
    id: 'team-male-1',
    category: 'team',
    title: 'Senior Advocate (Male, Charcoal Suit)',
    url: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
    description: 'Managing partner with confident demeanor in dark legal attire'
  },
  {
    id: 'team-female-1',
    category: 'team',
    title: 'Senior Partner (Female, Corporate Blazer)',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    description: 'Head of banking, corporate finance and foreign investment'
  },
  {
    id: 'team-male-2',
    category: 'team',
    title: 'Arbitration Counsel (Male, Glasses)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    description: 'Commercial arbitration and dispute resolution specialist'
  },
  {
    id: 'team-female-2',
    category: 'team',
    title: 'Associate Attorney (Female, Formal)',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    description: 'Intellectual property and constitutional writ practitioner'
  },

  // Blogs / Practice Area Covers
  {
    id: 'blog-fdi',
    category: 'blogs',
    title: 'Cross-Border Investment & Currency',
    url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80',
    description: 'Financial documents, charts, and international corporate transactions'
  },
  {
    id: 'blog-gavel',
    category: 'blogs',
    title: 'Bronze Scales of Justice & Gavel',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
    description: 'Supreme court constitutional review and judicial precedent'
  },
  {
    id: 'blog-realestate',
    category: 'blogs',
    title: 'Commercial Real Estate & Property Titles',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    description: 'Modern glass architecture representing commercial property transactions'
  },
  {
    id: 'blog-arbitration',
    category: 'blogs',
    title: 'Dispute Settlement & Contract Signing',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
    description: 'Contract signature and bilateral commercial dispute resolution'
  },
  {
    id: 'blog-ip',
    category: 'blogs',
    title: 'Technology & Intellectual Property',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
    description: 'Digital innovation, patent documentation and trademark protection'
  }
];
