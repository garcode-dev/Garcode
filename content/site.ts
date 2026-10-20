// All Garcode copy and links live here. Edit text in this file; the components only handle layout.
// Source: copy.md (Garcode Website Copy Document).

export const site = {
  name: "Garcode",
  tagline: "Your Partner in Digital Transformation",
  meta: {
    title: "Garcode | Build Skills. Build Software. Build the Future.",
    description:
      "Garcode is a creative technology academy and software development hub empowering Africa's digital future. Learn with us or build with us.",
  },
  contact: {
    emails: ["info@garcodedigital.com", "tech.garcode@gmail.com"],
    phone: "08063124009",
    phoneHref: "tel:+2348063124009",
  },
  // TODO: add Garcode's social profile URLs
  social: [
    { name: "TikTok", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "YouTube", href: "#" },
    { name: "LinkedIn", href: "#" },
  ],
  nav: [
    { label: "Services", href: "/services" },
    { label: "Academy", href: "/academy" },
    { label: "Our Work", href: "/work" },
    { label: "Advantage", href: "/advantage" },
    { label: "About", href: "/about" },
  ],
} as const;

export const home = {
  hero: {
    eyebrow: "Your Partner in Digital Transformation",
    titleStart: "Build Skills. Build Software.",
    titleAccent: "Build the Future.",
    lead:
      "Garcode is a creative technology academy and software development hub. We equip Africa's next generation of innovators with future-ready digital skills, and we give businesses the professional tech solutions they need to grow.",
    primary: { label: "Explore Our Training", href: "/academy" },
    secondary: { label: "Request a Proposal", href: "/contact" },
    // TODO: replace with Garcode photos in /public/images (recommended 900×1000 each)
    photos: ["Learners at work", "Team building software", "Training session"],
  },
  partner: {
    eyebrow: "Who we are",
    title: "Your Partner in Digital Transformation",
    paragraphs: [
      "Garcode is a collaborative ally for African businesses on their journey toward embracing and integrating digital technologies. Our mission is to empower them with innovative, reliable and culturally aware software solutions that drive digital transformation and sustainable growth.",
      "We are dedicated to being a trusted partner, fostering collaboration and inclusivity, and unlocking the potential of every enterprise we serve to thrive in the digital age.",
    ],
    photo: "Working with a client team",
  },
  ways: {
    eyebrow: "Learn with us or build with us",
    title: "Four Ways to Work With Garcode",
    items: [
      {
        title: "Learn to build.",
        body: "Hands-on training in coding, software development, UI/UX design, data, product management and responsible AI, for schools, young people and professionals.",
        link: { label: "Explore Learning Tracks", href: "/academy" },
      },
      {
        title: "Tech Boomers, our new course, launches in November.",
        body: "You're not too old to be tech-savvy! In our newest course, you will learn the digital skills to keep you on par with the latest generation, equipping you with the tech knowledge to ensure you stay relevant in an increasingly digital world.",
        link: { label: "Learn More", href: "/academy#tech-boomers" },
        tag: "New · November",
        featured: true,
      },
      {
        title: "Build with us.",
        body: "Web and mobile apps, custom software, dashboards and system integrations, made for the way African businesses actually operate.",
        link: { label: "See Our Services", href: "/services" },
      },
      {
        title: "Get your team up to speed.",
        body: "Digital training that shows businesses and organisations which technology is worth adopting and how to use it, from AI to compliance.",
        link: { label: "Talk to Us", href: "/contact" },
      },
    ],
  },
  different: {
    title: "Why Garcode Is Different",
    start: "We teach and build, using real projects, providing real mentorship.",
    dim: "We connect learning to earning - skills are only useful when they lead somewhere.",
    end: "We help you create impact through technology, whether you are a learner, a school or a business.",
    pillars: ["Real projects", "Real mentorship", "Learning to earning"],
  },
  expect: {
    eyebrow: "Our promise",
    title: "What You Can Expect From Us",
    items: [
      { icon: "bulb", title: "Innovation.", body: "We sit at the forefront of technology, offering cutting-edge solutions that push the boundaries of what is possible." },
      { icon: "shield", title: "Reliability.", body: "We are a dependable partner. Our services are robust, secure and available when you need them." },
      { icon: "growth", title: "Empowerment.", body: "Our tools and training give African businesses and learners the resources to succeed and grow." },
    ],
    photos: ["Mentorship", "Product demo"],
  },
  mission: {
    title: "Our Mission",
    text: "To raise a digitally empowered generation that leads Africa's transformation through technology, creativity and innovation.",
  },
  cta: {
    eyebrow: "Let's get started",
    title: "Ready to build your next digital product, or your next career?",
    body: "Book a free consultation or request a proposal today.",
    primary: { label: "Book a Free Consultation", href: "/contact" },
    secondary: { label: "Request a Proposal", href: "/contact" },
  },
} as const;

export const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Our Core Services", href: "/services" },
      { label: "Cross-Continental Advantage", href: "/advantage" },
      { label: "Our Work", href: "/work" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Garcode",
    links: [
      { label: "Garcode Academy", href: "/academy" },
      { label: "Tech Boomers", href: "/academy#tech-boomers" },
      { label: "About the Founder", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;
