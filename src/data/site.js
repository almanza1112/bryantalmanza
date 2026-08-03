export const SITE = {
  name: "Bryant Almanza",
  role: "Full Stack Developer",
  email: "almanza1112@gmail.com",
  location: "Northern New Jersey",
  github: "https://github.com/almanza1112",
  business: "https://almanzatech.com",
  upwork: "https://www.upwork.com/freelancers/bryanta4",
  formEndpoint: "https://getform.io/f/e30fd60b-e282-40eb-aeb7-c4652c1b1633",
};

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

/** Module-level so the active-section observer isn't rebuilt every render. */
export const NAV_IDS = NAV_LINKS.map((l) => l.id);
