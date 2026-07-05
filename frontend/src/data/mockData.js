// Mock content — mimics an admin-editable CMS. Persisted to localStorage on admin edits.

export const siteSettings = {
  site_name: 'NN Venture',
  tagline: 'Founder-Led Corporate Portfolio',
  short_description: 'A founder-led venture portfolio building diversified initiatives across business, technology, and impact — from Bangladesh.',
  email: '[Business Email]',
  phone: '[Phone Number]',
  whatsapp: '[WhatsApp Number]',
  address: '[Head Office Address, Bangladesh]',
  business_hours: 'Sun – Thu · 10:00 – 18:00 (GMT+6)',
  social_facebook: '#',
  social_linkedin: '#',
  social_youtube: '#',
  social_instagram: '#',
  footer_description: 'NN Venture is a founder-led corporate portfolio presenting venture initiatives, business capabilities, strategic collaboration opportunities, and impact-focused growth from Bangladesh.',
};

export const brandValues = [
  { title: 'Execution', copy: 'Ideas hold no weight without disciplined delivery.' },
  { title: 'Integrity', copy: 'Every relationship is built on trust and transparency.' },
  { title: 'Innovation', copy: 'We back structural change, not surface novelty.' },
  { title: 'Collaboration', copy: 'The strongest ventures are built with the right partners.' },
  { title: 'Impact', copy: 'Business must serve business, community, and country.' },
  { title: 'Long-Term Growth', copy: 'We build for decades — not quarters.' },
];

export const founder = {
  full_name: '[Founder Name]',
  designation: 'Founder & Lead Strategist',
  photo_url: 'https://images.pexels.com/photos/325685/pexels-photo-325685.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  short_bio: 'Founder and Lead Strategist of NN Venture, working across venture building, business development, strategic collaboration, digital growth, and impact-focused initiatives.',
  long_bio: 'Through NN Venture, [Founder Name] operates at the intersection of business strategy, venture coordination and long-term impact. The mandate is simple: build initiatives that create measurable business value, structured partnerships, and generational outcomes for Bangladesh.',
  vision: 'A structured, founder-led venture platform representing credible business growth, innovation, and collaboration from Bangladesh — recognised on the regional stage.',
  leadership_philosophy: 'Lead with clarity, operate with discipline, partner with intent. Every venture is treated as a long-term commitment — not a bet.',
  expertise: [
    'Corporate Venture Building',
    'Strategic Partnerships',
    'Digital & Brand Strategy',
    'Operational Coordination',
    'Investor Relations',
    'Community-Led Growth',
  ],
  achievements: [
    '[Notable Achievement 1 — editable]',
    '[Notable Achievement 2 — editable]',
    '[Notable Achievement 3 — editable]',
  ],
  social: { linkedin: '#', twitter: '#', facebook: '#' },
};

export const heroMetrics = [
  { label: 'Venture Initiatives', value: '20+', note: 'Editable — verify before publishing' },
  { label: 'Sectors Engaged', value: '08', note: 'Digital, retail, agri, community, more' },
  { label: 'Years of Leadership', value: '10+', note: 'Founder track record' },
  { label: 'Strategic Partners', value: '35+', note: 'Editable' },
];

export const businessVerticals = [
  { title: 'Digital Ventures', desc: 'SaaS, agencies, media, and consumer platforms.', icon: 'Cpu' },
  { title: 'Commerce & Retail', desc: 'E-commerce, distribution and retail operations.', icon: 'ShoppingBag' },
  { title: 'Agri & Rural Growth', desc: 'Agritech, rural markets, and supply chains.', icon: 'Sprout' },
  { title: 'Real Estate & Assets', desc: 'Managed real-estate, holding and asset strategy.', icon: 'Building2' },
  { title: 'Education & Skills', desc: 'Learning platforms, training and skill programmes.', icon: 'GraduationCap' },
  { title: 'Community Impact', desc: 'Local development and social initiatives.', icon: 'Users' },
];

export const ventures = [
  {
    slug: 'nn-digital-studio',
    name: 'NN Digital Studio',
    category: 'Digital Ventures',
    sector: 'Digital Services',
    status: 'Active',
    role: 'Founder / Operator',
    short_description: 'A founder-led digital studio delivering strategy, brand, and technology for growth-stage businesses.',
    long_description: 'NN Digital Studio partners with founders and mid-market operators to translate ambition into digital execution — from brand systems to platform builds and growth programmes.',
    audience: 'Founders, SMEs, family-run businesses digitising for the first time.',
    problem: 'Growing businesses struggle to align brand, digital and operations under one strategic partner.',
    solution: 'A senior-led studio that integrates strategy, brand and build under one operating model.',
    stage: 'Scaling — Serving active clients',
    impact: '[Editable: verified engagements & retained clients]',
    logo: null,
    featured: true,
    image: 'https://images.unsplash.com/photo-1498262257252-c282316270bc',
    published: true,
  },
  {
    slug: 'nn-commerce',
    name: 'NN Commerce',
    category: 'Commerce & Retail',
    sector: 'E-commerce & Distribution',
    status: 'Active',
    role: 'Operator / Partner',
    short_description: 'Category-focused commerce operations with distribution and fulfilment across Bangladesh.',
    long_description: 'A commerce arm operating focused product categories, backed by direct sourcing, structured merchandising and country-wide fulfilment.',
    audience: 'Bangladeshi consumers and B2B distribution partners.',
    problem: 'Local commerce lacks operational structure and consistent trust.',
    solution: 'Category-led ownership, disciplined sourcing and transparent fulfilment.',
    stage: 'Live operations',
    impact: '[Editable: verified GMV, orders, cities served]',
    logo: null,
    featured: true,
    image: 'https://images.pexels.com/photos/67301/abstract-architecture-background-blue-67301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    published: true,
  },
  {
    slug: 'nn-agri',
    name: 'NN Agri Initiative',
    category: 'Agri & Rural Growth',
    sector: 'Agriculture / Rural',
    status: 'Building',
    role: 'Founder / Strategic Coordinator',
    short_description: 'An agri-focused initiative connecting rural producers to structured markets and finance.',
    long_description: 'The initiative builds structured linkages between producers, aggregators and buyers, supported by digital tools and community-level coordination.',
    audience: 'Smallholder producers, aggregators, retail buyers.',
    problem: 'Rural producers remain fragmented and price-taken.',
    solution: 'Structured aggregation with digital traceability and cooperative buyer pools.',
    stage: 'Pilot design',
    impact: '[Editable: pilot districts and volumes]',
    image: 'https://images.unsplash.com/photo-1486551937199-baf066858de7',
    published: true,
  },
  {
    slug: 'nn-realty',
    name: 'NN Realty & Holdings',
    category: 'Real Estate & Assets',
    sector: 'Real Estate / Asset Management',
    status: 'Active',
    role: 'Investor / Coordinator',
    short_description: 'Real-estate and holding operations with structured asset stewardship.',
    long_description: 'Managed properties and holding-level coordination for long-horizon assets, focused on capital preservation and disciplined growth.',
    audience: 'Family holdings, JV partners.',
    problem: 'Fragmented family assets underperform without structured stewardship.',
    solution: 'Institutional-style coordination applied to founder-led portfolios.',
    stage: 'Ongoing operations',
    impact: '[Editable — verify before publishing]',
    image: 'https://images.pexels.com/photos/2747599/pexels-photo-2747599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    published: true,
  },
  {
    slug: 'nn-learning',
    name: 'NN Learning',
    category: 'Education & Skills',
    sector: 'Education / Training',
    status: 'Upcoming',
    role: 'Founder',
    short_description: 'A skills-first learning platform designed for the Bangladeshi workforce.',
    long_description: 'A learning venture in early design — focused on employable skills, delivered through blended cohorts and industry partnerships.',
    audience: 'Young professionals, career-transition learners.',
    problem: 'Skills training is often disconnected from real employment pathways.',
    solution: 'Cohorted programmes co-designed with hiring partners.',
    stage: 'Design',
    impact: '[To be reported]',
    image: 'https://images.pexels.com/photos/31500951/pexels-photo-31500951.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    published: true,
  },
  {
    slug: 'nn-media',
    name: 'NN Media Lab',
    category: 'Digital Ventures',
    sector: 'Media / Content',
    status: 'Building',
    role: 'Founder',
    short_description: 'A media lab producing founder-first, business-first storytelling.',
    long_description: 'A studio-format media operation focused on business, ventures, and leadership stories from Bangladesh — long-form and structured.',
    audience: 'Founders, operators, business audiences.',
    problem: 'Bangladesh lacks structured founder-first business media.',
    solution: 'Long-form editorial + video, produced with newsroom discipline.',
    stage: 'Pre-launch',
    impact: '[Editable]',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
    published: true,
  },
  {
    slug: 'nn-community',
    name: 'NN Community Initiative',
    category: 'Community Impact',
    sector: 'Community / Social',
    status: 'Active',
    role: 'Founder / Coordinator',
    short_description: 'Local community initiative focused on opportunity creation and knowledge sharing.',
    long_description: 'A structured community programme rooted in the founder\u2019s home region — organised around opportunity creation, learning and civic contribution.',
    audience: 'Local youth, small entrepreneurs.',
    problem: 'Local communities lack structured access to opportunity networks.',
    solution: 'A repeatable programme of skill sessions, mentorship, and micro-support.',
    stage: 'Ongoing',
    impact: '[Verify participation before publishing]',
    image: 'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6',
    published: true,
  },
  {
    slug: 'nn-consulting',
    name: 'NN Strategic Consulting',
    category: 'Digital Ventures',
    sector: 'Consulting',
    status: 'Active',
    role: 'Partner',
    short_description: 'Founder-level advisory for growth-stage operators and family businesses.',
    long_description: 'A senior advisory practice for founder-led businesses navigating growth, restructuring or new market entry.',
    audience: 'Founders, family businesses, JV partners.',
    problem: 'Growth-stage operators lack access to structured founder-level advisory.',
    solution: 'Senior-led engagements with a bias for execution.',
    stage: 'Active engagements',
    impact: '[Editable]',
    image: 'https://images.pexels.com/photos/7424584/pexels-photo-7424584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    published: true,
  },
];

export const services = [
  { slug: 'business-partnership', title: 'Business Partnership', who: 'Founders and operators seeking a strategic partner.', we: 'Structured JV frameworks, deal architecture, and ongoing coordination.', outcome: 'A disciplined partnership vehicle designed for long-term compounding.' },
  { slug: 'venture-building', title: 'Venture Building', who: 'Concepts requiring operator-led execution from Day 0.', we: 'Concept validation, team, systems and go-to-market design.', outcome: 'A live venture with credible economics and clear operating model.' },
  { slug: 'strategic-consulting', title: 'Strategic Consulting', who: 'Growth-stage founders and family businesses.', we: 'Strategic review, growth architecture, and execution roadmapping.', outcome: 'A prioritised 12–24 month roadmap grounded in reality.' },
  { slug: 'digital-transformation', title: 'Digital Transformation', who: 'Traditional operators moving to digital-first models.', we: 'Digital audit, systems selection, and phased rollout.', outcome: 'A digitally coherent business with measurable adoption.' },
  { slug: 'brand-development', title: 'Brand Development', who: 'Ventures ready to invest in brand as a growth lever.', we: 'Positioning, identity systems and brand-led product decisions.', outcome: 'A brand that trades trust into transaction.' },
  { slug: 'marketing-growth', title: 'Marketing & Growth Support', who: 'Ventures with product-market fit ready to scale.', we: 'Growth architecture, funnels, content and channel design.', outcome: 'Predictable pipeline and repeatable acquisition.' },
  { slug: 'local-business', title: 'Local Business Development', who: 'Operators seeking regional / district-level expansion.', we: 'Distribution mapping, local partnerships, on-ground coordination.', outcome: 'Structured local presence with clear economics.' },
  { slug: 'community-projects', title: 'Community Impact Projects', who: 'Corporates and philanthropies seeking credible delivery partners.', we: 'Programme design, community coordination, and measurement.', outcome: 'Impact you can report, defend, and repeat.' },
  { slug: 'investment-jv', title: 'Investment / Joint Venture', who: 'Strategic investors and JV counterparts.', we: 'Term architecture, due diligence support, structuring.', outcome: 'A well-structured investment vehicle with governance clarity.' },
  { slug: 'operational-coordination', title: 'Operational Coordination', who: 'Founders needing an operating layer they can trust.', we: 'Fractional COO-style coordination across ventures.', outcome: 'Fewer fires, more forward motion.' },
];

export const impactMetrics = [
  { label: 'Employment Opportunities Created', value: '150+', note: 'Editable — verify before publishing' },
  { label: 'Community Members Engaged', value: '2,000+', note: 'Across active programmes' },
  { label: 'Partner Organisations', value: '35+', note: 'Editable' },
  { label: 'Districts Touched', value: '12', note: 'Bangladesh · editable' },
];

export const impactStories = [
  { title: 'Structured Local Distribution', category: 'Business Impact', challenge: 'Fragmented distribution in a semi-urban market.', action: 'Deployed structured local partners with disciplined SKU control.', outcome: 'Consistent availability and predictable local sell-through.', proof: '[Verify before publishing]' },
  { title: 'Community Skills Programme', category: 'Community Impact', challenge: 'Local youth lacked exposure to employable skills.', action: 'Ran cohorted skills sessions with mentorship pairing.', outcome: 'Documented graduates transitioning to income opportunities.', proof: '[Editable]' },
  { title: 'Digital Transformation Rollout', category: 'Digital Impact', challenge: 'A traditional operator running paper-based systems.', action: 'Phased digital audit and systems adoption over 6 months.', outcome: 'Operations moved to digital-first with measurable adoption.', proof: '[Editable]' },
];

export const journey = [
  { year: '2014', title: 'Foundational Work', desc: 'Early ventures and operator experience across trade, services and community work.' },
  { year: '2017', title: 'First Structured Venture', desc: 'First formally structured venture initiative under founder leadership.' },
  { year: '2019', title: 'Digital Practice', desc: 'Launched digital services practice serving growth-stage operators.' },
  { year: '2021', title: 'Portfolio Consolidation', desc: 'Consolidated multiple initiatives under a coordinated venture portfolio.' },
  { year: '2023', title: 'Community Programme Scale-Up', desc: 'Local community initiative expanded across programme cycles.' },
  { year: '2024', title: 'NN Venture Formalisation', desc: 'NN Venture formalised as a founder-led corporate venture portfolio.' },
  { year: '2025', title: 'Portfolio Expansion', desc: 'Active ventures across digital, commerce, agri, education and impact.' },
];

export const testimonials = [
  { quote: '[Testimonial placeholder — request from a verified partner before publishing]', person: '[Person Name]', designation: '[Designation]', org: '[Organisation]' },
  { quote: '[Testimonial placeholder — request from a verified client before publishing]', person: '[Person Name]', designation: '[Designation]', org: '[Organisation]' },
];

export const partners = [
  '[Partner Logo 1]', '[Partner Logo 2]', '[Partner Logo 3]',
  '[Partner Logo 4]', '[Partner Logo 5]', '[Partner Logo 6]', '[Partner Logo 7]',
];

export const gallery = [
  { title: 'Founder Portrait', category: 'Founder', image: 'https://images.pexels.com/photos/325685/pexels-photo-325685.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { title: 'Executive Session', category: 'Founder', image: 'https://images.pexels.com/photos/30692588/pexels-photo-30692588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { title: 'Skyline · Dhaka', category: 'Location', image: 'https://images.pexels.com/photos/34671320/pexels-photo-34671320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { title: 'Corporate Skyline', category: 'Location', image: 'https://images.pexels.com/photos/12666339/pexels-photo-12666339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { title: 'NN Digital Studio', category: 'Ventures', image: 'https://images.unsplash.com/photo-1498262257252-c282316270bc' },
  { title: 'NN Commerce', category: 'Ventures', image: 'https://images.pexels.com/photos/67301/abstract-architecture-background-blue-67301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { title: 'Community Programme', category: 'Community', image: 'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6' },
  { title: 'Consulting Engagement', category: 'Team', image: 'https://images.pexels.com/photos/7424584/pexels-photo-7424584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
];

export const documents = [
  { title: 'Company Profile', type: 'PDF', note: 'Upload company profile PDF from admin.' },
  { title: 'Founder Profile', type: 'PDF', note: 'Founder biography and executive summary.' },
  { title: 'Capability Statement', type: 'PDF', note: 'One-page capability summary.' },
  { title: 'Venture Portfolio Deck', type: 'PDF', note: 'Deck across active ventures.' },
];

export const heroImage = 'https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9kZXJuJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzgyNjU5Nzc1fDA&ixlib=rb-4.1.0&q=85';
export const secondaryHero = 'https://images.unsplash.com/photo-1619218070141-bcfeb8b93074?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwyfHxkYXJrJTIwbW9kZXJuJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzgyNjU5Nzc1fDA&ixlib=rb-4.1.0&q=85';
export const goldTexture = 'https://images.pexels.com/photos/30232780/pexels-photo-30232780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
export const architectureImg = 'https://images.pexels.com/photos/3137050/pexels-photo-3137050.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
