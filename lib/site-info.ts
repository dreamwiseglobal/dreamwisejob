export const siteInfo = {
  name: "PracaPolska",
  tagline: "Your Gateway to Work in Poland",
  description:
    "Connecting skilled workers from around the world with trusted Polish employers. Legal contracts, accommodation support, and a smooth onboarding process.",
  shortDescription: "Poland's leading job platform for international workers.",
  email: "contact@pracapolska.pl",
  phone: "+48 732 097 929",
  address: "ul. Marszałkowska 84, 00-514 Warsaw, Poland",
  founded: "2019",
  totalJobs: "2,400+",
  totalEmployers: "850+",
  totalPlaced: "18,000+",
  socials: {
    facebook: "https://facebook.com/pracapolska",
    instagram: "https://instagram.com/pracapolska",
    linkedin: "https://linkedin.com/company/pracapolska",
    twitter: "https://twitter.com/pracapolska",
  },
  nav: [
    { label: "Jobs", href: "/jobs" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About", href: "/about" },
    // { label: "Contact", href: "/contact" },
  ],
  stats: [
    { label: "Active Jobs", value: "2,400+" },
    { label: "Trusted Employers", value: "850+" },
    { label: "Workers Placed", value: "18,000+" },
    { label: "Countries Reached", value: "32" },
  ],
  howItWorks: [
    {
      step: "01",
      title: "Browse & Apply",
      description:
        "Search through verified job listings. Filter by salary, category, or location and apply in minutes.",
    },
    {
      step: "02",
      title: "Get Verified",
      description:
        "Our team reviews your application and verifies documents to ensure a smooth legal work permit process.",
    },
    {
      step: "03",
      title: "Arrive & Start",
      description:
        "We coordinate accommodation, travel support, and employer onboarding so your first day is stress-free.",
    },
  ],
  contactEmail: "pracapolska@gmail.com",
} as const;
