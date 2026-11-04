// All Garcode copy and links live here. Edit text in this file; the components only handle layout.
// Source: copy.md (Garcode Website Copy Document).
//
// Anything Garcode still has to supply is written as todo("…"). It shows on the page as a
// dashed "To confirm" box so it is easy to spot in review. Replace each todo(...) with the
// real text (a plain string) before launch. Search this file for `todo(` to find them all.

export type Todo = { readonly todo: string };
export type Copy = string | Todo;
export const todo = (label: string): Todo => ({ todo: label });
export const isTodo = (v: Copy): v is Todo => typeof v === "object" && v !== null && "todo" in v;

// Link to Garcode Academy's enrolment page (from the Contact section of copy.md).
const ACADEMY_URL = "https://bit.ly/garcodeacademy";

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
    academyUrl: ACADEMY_URL,
    academyLabel: "bit.ly/garcodeacademy",
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
    { label: "School of Life", href: "/school-of-life" },
    { label: "Our Work", href: "/work" },
    { label: "Advantage", href: "/advantage" },
    { label: "About", href: "/about" },
  ],
} as const;

/* ======================================================================
   Page 1 · Home  (/)
   ====================================================================== */
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

/* ======================================================================
   Page 2 · Our Core Services  (/services)
   ====================================================================== */
export const services = {
  meta: {
    title: "Your Partner in Digital Transformation | Garcode",
    description:
      "Garcode is a digital transformation partner for African businesses and learners: software development, UI/UX, analytics, cloud integration, and training for businesses, schools and children.",
  },
  hero: {
    eyebrow: "Our Core Services",
    title: "Your Partner in",
    accent: "Digital Transformation",
    lead:
      "Garcode does more than write code: we build digital products and we train the people who use them, from business teams to schoolchildren. Wherever you are on your digital journey, we work alongside you to help you grow.",
    primary: { label: "Request a Proposal", href: "/contact?interest=software" },
  },
  whatWeDo: {
    eyebrow: "What We Do",
    title: "Products we build. People we train.",
    groups: [
      {
        label: "Build",
        items: [
          { icon: "devices", title: "Web & Mobile App Development", body: "Websites, web platforms and mobile apps that are fast, secure and easy for your customers to use." },
          { icon: "puzzle", title: "Custom Software Solutions", body: "When off-the-shelf tools don't fit, we build software around your processes, not the other way round." },
          { icon: "pen", title: "UI/UX Design Services", body: "Beautiful, user-centred interfaces, designed in Figma and backed by solid design systems, so your product feels as good as it works." },
          { icon: "chart", title: "Analytics & Dashboard Development", body: "Turn raw data into clear insights. We build dashboards that help you see what is happening in your business and decide what to do next." },
          { icon: "cloud", title: "Cloud & System Integration", body: "Connect the tools you already use, move to the cloud, and keep your systems talking to each other." },
        ],
      },
      {
        label: "Train",
        items: [
          { icon: "team", title: "Digital Training for Businesses", body: "We get your team up to speed on the latest technology and on what will actually benefit your business, from AI and automation to everyday digital tools." },
          // TODO (copy.md): CONFIRM how programmes are structured for schools
          { icon: "school", title: "Coding & Digital Skills Training for Schools", body: "We train students in coding, ethical AI use and building software applications, right in your school." },
          { icon: "spark", title: "Holiday & After-School Programmes for Children", body: "Hands-on coding and AI programmes that children can join during school holidays and after school." },
        ],
      },
    ],
  },
  industries: {
    eyebrow: "Industries We Serve",
    items: ["Education", "Fintech", "Health", "Real Estate", "NGOs", "Startups"],
  },
  why: {
    eyebrow: "Why Businesses Choose Garcode",
    title: "A partner, not just a vendor.",
    items: [
      { icon: "globe", title: "Culturally aware.", body: "We build with an understanding of the people and markets you serve." },
      { icon: "shield", title: "Reliable.", body: "Robust, secure software that is there when you need it." },
      { icon: "team", title: "Collaborative.", body: "We work alongside you as a partner, not just a vendor." },
    ],
  },
  cta: {
    eyebrow: "Start a project",
    title: "Have a project in mind?",
    body: "Tell us what you want to build and we'll send you a proposal.",
    primary: { label: "Request a Proposal", href: "/contact?interest=software" },
  },
} as const;

/* ======================================================================
   Page 3 · Cross-Continental Advantage  (/advantage)
   ====================================================================== */
export const advantage = {
  meta: {
    title: "The Garcode Advantage: Rooted in Africa, Built for the World",
    description:
      "Garcode combines deep understanding of African markets with global tools, standards and ways of working.",
  },
  hero: {
    eyebrow: "The Cross-Continental Advantage",
    title: "Rooted in Africa.",
    accent: "Built to Work Anywhere.",
    lead:
      "Good technology has to fit the place it is used and meet the standard of the world it connects to. Garcode is built to do both.",
  },
  pillars: [
    {
      icon: "pin",
      title: "Local Understanding",
      body: "We are an African company building for African realities. That means software designed with a real understanding of how your customers, learners and teams live and work, not a foreign template with a new logo.",
    },
    {
      icon: "globe",
      title: "Global Standards",
      body: "Our training and our software are built on the tools professionals use worldwide: Figma and Adobe XD for design, Python, SQL, Excel and Power BI for data, and modern practices for planning, launching and scaling digital products.",
      tools: ["Figma", "Adobe XD", "Python", "SQL", "Excel", "Power BI"],
    },
    {
      icon: "route",
      title: "Work Across Borders",
      body: "Online and on-site options mean our programmes and projects are not limited by location. Learners and clients can work with us wherever they are.",
    },
  ],
  forYou: {
    eyebrow: "What This Means for You",
    title: "One team, fluent in the local and the global.",
    items: [
      { icon: "briefcase", who: "For African businesses", body: "World-class software that is built around your market." },
      { icon: "globe", who: "For international partners and clients", body: "A reliable team on the ground in Africa that speaks both the local and the global language of business." },
      { icon: "school", who: "For learners", body: "Skills that are valued here and everywhere, and a portfolio that proves them." },
    ],
  },
  cta: {
    eyebrow: "Partnerships",
    title: "Looking to partner with Garcode?",
    primary: { label: "Get in Touch", href: "/contact" },
  },
} as const;

/* ======================================================================
   Page 4 · Selected Previous Work  (/work)
   ====================================================================== */
export type CaseStudy = {
  title: Copy;
  client: Copy;
  industry: Copy;
  service: Copy;
  challenge: Copy;
  delivered: Copy;
  result: Copy;
};

export const work = {
  meta: {
    title: "Our Work | Garcode",
    description: "See the products, platforms and training programmes Garcode has delivered.",
  },
  hero: {
    eyebrow: "Selected Previous Work",
    title: "Work We're",
    accent: "Proud Of",
    lead:
      "Every Garcode project starts with a real problem and ends with a lasting solution. Here is a selection of what we've built and delivered.",
  },
  caseStudies: [
    {
      title: "AI Compliance Training for an Insurance Company",
      client: todo("Client name, and whether we may name them"),
      industry: "Insurance",
      service: "AI compliance training",
      challenge: todo("One or two sentences on what the team needed to understand about AI and compliance"),
      delivered: todo("One or two sentences on the training: format, number of staff, topics covered"),
      result: todo("Outcome or feedback"),
    },
    {
      title: todo("Project name"),
      client: todo("Client"),
      industry: todo("Industry"),
      service: todo("Service"),
      challenge: todo("The challenge"),
      delivered: todo("What we delivered"),
      result: todo("The result"),
    },
    {
      // A school training programme or student showcase project works well here.
      title: todo("Project name or training programme"),
      client: todo("Client or school"),
      industry: todo("Industry"),
      service: todo("Service"),
      challenge: todo("The challenge"),
      delivered: todo("What we delivered"),
      result: todo("The result"),
    },
  ] as CaseStudy[],
  // Optional in copy.md. Set show: false to hide the section.
  students: {
    show: true,
    eyebrow: "Student Projects",
    title: "Built by Garcode learners",
    items: [
      { project: todo("Project name"), student: todo("Student name"), track: todo("Track") },
      { project: todo("Project name"), student: todo("Student name"), track: todo("Track") },
      { project: todo("Project name"), student: todo("Student name"), track: todo("Track") },
    ] as { project: Copy; student: Copy; track: Copy }[],
  },
  cta: {
    eyebrow: "Your project next",
    title: "Want results like these?",
    primary: { label: "Request a Proposal", href: "/contact?interest=software" },
  },
};

/* ======================================================================
   Page 5 · Learning Tracks & Curriculum  (/academy)
   ====================================================================== */
export const academy = {
  meta: {
    title: "Tech Training & Courses | Garcode Academy",
    description:
      "Project-based tech training in software development, UI/UX, data science, AI and product management. Online and on-site.",
  },
  hero: {
    eyebrow: "Garcode Academy",
    title: "Learn It. Build It.",
    accent: "Get Paid for It.",
    lead:
      "Garcode Academy trains the next generation of innovators through real projects and real mentorship, so every lesson leads to something you can show the world.",
    primary: { label: "Enrol Now", href: ACADEMY_URL },
    secondary: { label: "Talk to Us First", href: "/contact?interest=myself" },
  },
  tracks: {
    eyebrow: "Our Learning Tracks",
    title: "Pick a track. Build real things.",
    items: [
      { icon: "layers", title: "Fullstack Software Development", body: "Learn to build complete web and mobile applications, from the interface people see to the systems running behind it. You'll plan, build, launch and scale real digital products." },
      { icon: "pen", title: "UI/UX Design", body: "Design beautiful, user-centred interfaces using Figma, Adobe XD and design systems." },
      { icon: "chart", title: "Data Science & Analytics", body: "Turn raw data into insights using Python, Excel, Power BI and SQL." },
      { icon: "spark", title: "AI Fundamentals & Automation", body: "Understand how AI works, use it responsibly and ethically, and automate real work with it." },
      { icon: "route", title: "Product Management", body: "Learn how to plan, launch and scale digital products successfully." },
    ],
    more: "More tracks loading.",
  },
  boomers: {
    tag: "New in November",
    title: "Tech Boomers",
    // Intro line reuses the Tech Boomers copy from the home page (copy.md, Page 1).
    lead: "You're not too old to be tech-savvy!",
    body: "Garcode is launching a new course, Tech Boomers, in November. You will learn the digital skills to keep you on par with the latest generation, equipping you with the tech knowledge to ensure you stay relevant in an increasingly digital world.",
    details: [
      { label: "Who it's for", value: todo("Who it's for") },
      { label: "What it covers", value: todo("What it covers") },
      { label: "Format", value: todo("Online or on-site") },
      { label: "Duration", value: todo("Duration") },
      { label: "Start date", value: todo("Start date") },
      { label: "Fee", value: todo("Fee") },
    ] as { label: string; value: Copy }[],
    primary: { label: "Register Your Interest", href: "/contact?interest=boomers" },
  },
  experience: {
    eyebrow: "The Learning Experience",
    title: "Learn the way tech teams actually work.",
    items: [
      { icon: "layers", title: "Project-based learning.", body: "Every lesson leads to a tangible project." },
      { icon: "mentor", title: "Mentorship.", body: "Learn directly from professionals working in tech." },
      { icon: "team", title: "Collaborative teams.", body: "Work with designers, developers and data analysts, just like a real tech company." },
      { icon: "clock", title: "Flexible learning options.", body: "Online and on-site options to fit your schedule." },
    ],
  },
  whoWeTrain: {
    eyebrow: "Who We Train",
    title: "From the classroom to the boardroom.",
    items: [
      // TODO (copy.md): CONFIRM wording on how school fees are structured
      { icon: "school", title: "Schools", body: "We bring coding, ethical AI use and software building directly into your classrooms.", link: { label: "Training for my school", href: "/contact?interest=school" } },
      { icon: "child", title: "Children and teens", body: "After-school and holiday programmes where young learners explore coding and AI.", link: { label: "Training for my child", href: "/contact?interest=child" } },
      { icon: "user", title: "Individuals and professionals", body: "Career-focused tracks for anyone ready to build digital skills.", link: { label: "Training for myself", href: "/contact?interest=myself" } },
      { icon: "briefcase", title: "Businesses", body: "Practical digital training for your team, from the latest tools to AI and compliance support.", link: { label: "Training for my team", href: "/contact?interest=business-training" } },
    ],
  },
  graduate: {
    eyebrow: "You'll Graduate With",
    items: ["A strong portfolio", "Professional certificates", "Career launch guidance", "Access to our alumni network"],
    closing: "We don't only teach skills. We shape leaders.",
  },
  cta: {
    eyebrow: "Enrolment open",
    title: "Join the next cohort",
    primary: { label: "Enrol Now", href: ACADEMY_URL },
    secondary: { label: "Talk to Us First", href: "/contact?interest=myself" },
  },
} as const;

/* ======================================================================
   Page 6 · Testimonials  (/testimonials)
   ====================================================================== */
export type Testimonial = { quote: Copy; name: Copy; detail: Copy };

export const testimonials = {
  meta: {
    title: "Reviews & Testimonials | Garcode",
    description: "Hear from the clients, learners and partners who have worked with Garcode.",
  },
  hero: {
    eyebrow: "Testimonials",
    title: "Don't Just Take",
    accent: "Our Word for It",
    lead: "Our best proof is the people we've worked with. Here's what they say.",
  },
  groups: [
    {
      title: "Client Testimonials",
      items: [
        { quote: todo("Real quote from a client about the project or working relationship"), name: todo("Name"), detail: todo("Role, Company") },
        { quote: todo("Second client quote"), name: todo("Name"), detail: todo("Role, Company") },
      ],
    },
    {
      title: "Student & Alumni Stories",
      items: [
        { quote: todo("Real quote from a graduate about the experience, or what they built or earned afterwards"), name: todo("Name"), detail: todo("Track · Where they are now") },
        { quote: todo("Second student or parent quote"), name: todo("Name"), detail: todo("Track / Parent of …") },
      ],
    },
    {
      title: "Partner & School Feedback",
      items: [
        { quote: todo("Quote from a school head, teacher or organisation partner"), name: todo("Name"), detail: todo("Role, School/Organisation") },
      ],
    },
  ] as { title: string; items: Testimonial[] }[],
  cta: {
    eyebrow: "Your turn",
    title: "Be our next success story",
    primary: { label: "Get in Touch", href: "/contact" },
  },
};

/* ======================================================================
   Page 7 · About the Founder & Founding Philosophy  (/about)
   ====================================================================== */
export const about = {
  meta: {
    title: "About Garcode & Our Founder, Pastor Shalom Gar",
    description: "Meet the founder behind Garcode and the thinking that shapes our training and our software.",
  },
  hero: {
    eyebrow: "About Garcode",
    title: "The Founder",
    accent: "Behind Garcode",
  },
  founder: {
    name: "Pastor Shalom Gar",
    role: "Founder, CEO & Chairman",
    bio: todo("2–3 sentences on his background, what led him to start Garcode, and any credentials he wants listed"),
    photo: "Pastor Shalom Gar", // TODO: professional photo
  },
  name: {
    eyebrow: "The Story Behind the Name",
    paragraphs: [
      "The name “Garcode” was inspired by something we see on products used literally every day- The Barcode. It is simple yet valuable for connecting us to information quite effectively.",
      "By removing the “bar” from “barcode” and replacing it with the surname of our Founder & CEO, Rev Shalom Gar, we make a simple statement - This is the kind of technology we are committed to building.",
    ],
  },
  philosophy: {
    eyebrow: "Our Founding Philosophy",
    title: "What we believe.",
    items: [
      { title: "Don't only teach skills. Shape leaders.", body: "Skills get people hired. Leadership builds economies. Everything we teach is meant to produce people who will lead Africa's transformation, not just take part in it." },
      { title: "Build with Africa, not just for Africa.", body: "We design culturally aware solutions and work as a collaborative ally, because the people closest to a problem should help shape its solution." },
      { title: "Learning should lead to earning.", body: "We teach by building real projects, with real mentors, so learners leave with proof of what they can do." },
      { title: "Every enterprise can thrive in the digital age.", body: "We are committed to collaboration and inclusivity, and to unlocking the potential of every organisation we serve." },
    ],
  },
  cta: {
    eyebrow: "Be part of it",
    title: "Join the mission",
    primary: { label: "Work With Us", href: "/contact" },
    secondary: { label: "Learn With Us", href: "/academy" },
  },
} as const;

/* ======================================================================
   Page 8 · Contact  (/contact)
   ====================================================================== */
export const contact = {
  meta: {
    title: "Contact Garcode | Book a Free Consultation",
    description: "Book a free consultation, request a software proposal or enrol in a Garcode training programme.",
  },
  hero: {
    eyebrow: "Contact",
    title: "Let's Build",
    accent: "Something Together",
    lead:
      "Whether you want to build a product, train your team, or start learning to code, we'd love to hear from you. Book a free consultation or request a proposal today.",
  },
  channels: [
    {
      title: "For Business & Projects",
      lines: [
        { icon: "mail", label: "tech.garcode@gmail.com", href: "mailto:tech.garcode@gmail.com" },
        { icon: "mail", label: "info@garcodedigital.com", href: "mailto:info@garcodedigital.com" },
        { icon: "phone", label: "08063124009", href: "tel:+2348063124009" },
      ],
    },
    {
      title: "For Training & Enrollment",
      lines: [
        { icon: "link", label: "bit.ly/garcodeacademy", href: ACADEMY_URL },
        { icon: "phone", label: "08063124009", href: "tel:+2348063124009" },
      ],
    },
  ],
  form: {
    title: "Send us a message",
    // `value` is what the ?interest= link parameter uses (e.g. /contact?interest=boomers)
    interests: [
      { value: "software", label: "Software development" },
      { value: "uiux", label: "UI/UX design" },
      { value: "analytics", label: "Analytics & dashboards" },
      { value: "cloud", label: "Cloud & system integration" },
      { value: "business-training", label: "Digital or AI training for my business" },
      { value: "boomers", label: "Boomers course" },
      { value: "school", label: "Training for my school" },
      { value: "child", label: "Training for my child" },
      { value: "myself", label: "Training for myself" },
      { value: "other", label: "Something else" },
    ],
    button: "Send My Request",
    confirmation: "Thank you. We've received your message and will get back to you within 24 hours.",
    error: "We couldn't send your message just now. Please try again, or email us directly at",
    // Inbox that receives enquiries. CONTACT_TO in the environment overrides it (see .env.example).
    to: "info@garcodedigital.com",
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
      { label: "School of Life", href: "/school-of-life" },
      { label: "About the Founder", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;
