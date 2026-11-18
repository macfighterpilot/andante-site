// English copy. Facts taken from Andante's public Instagram (@andante.horseriding) are marked SOURCE: IG.
// Anything marked TODO(andante) is plausible demo copy that Guia & Zoe must confirm or rewrite.
// Prices are never invented: every experience shows "On request".

const en = {
  meta: {
    title: "Andante · Horseback Experiences in Tuscany",
    description:
      "Andante designs small-group horseback experiences in Tuscany: beach rides with lunch on the sand, starlit dinners in the Maremma hills and multi-day journeys. All levels welcome.",
  },
  nav: {
    experiences: "Experiences",
    about: "About",
    tuscany: "Tuscany",
    gallery: "Gallery",
    faq: "FAQ",
    enquire: "Plan your ride",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    eyebrow: "Horseback Experience Designer · Tuscany", // SOURCE: IG bio
    title: "Tuscany, at the pace of the horse.",
    subtitle:
      "Shaping unique equestrian experiences: rides along the Maremma shore, long tables set in nature and evenings that end under the stars.", // first clause SOURCE: IG bio
    primary: "Plan your ride",
    secondary: "Explore experiences",
    scroll: "Scroll",
  },
  intro: {
    kicker: "Andante",
    title: "In music, andante means “at a walking pace”.",
    body: "That is how we like to discover Tuscany: slowly, on horseback, with time to look around. Every day is designed by us, from the trail to the table, for small groups of riders who want more than a ride.", // TODO(andante): confirm wording and tone
    pillars: [
      {
        title: "All levels welcome",
        body: "First time in the saddle or a seasoned rider, we match each guest with the right horse and pace.", // SOURCE: IG "Adatto a tutti i livelli"
      },
      {
        title: "Tables set in nature",
        body: "Lunch on the sand, dinner under the stars: meals are part of the experience, prepared and set by our team.", // SOURCE: IG captions
      },
      {
        title: "Small groups",
        body: "Limited saddles on every date, so the day stays personal and relaxed.", // SOURCE: IG "Posti limitati"
      },
    ],
  },
  experiences: {
    kicker: "Experiences",
    title: "Ways to ride with us",
    intro: "Set dates throughout the season, or a day designed around you. Every experience can be booked privately.", // TODO(andante): confirm private bookings
    priceLabel: "Price",
    price: "On request",
    durationLabel: "Duration",
    levelLabel: "Level",
    whereLabel: "Where",
    includesLabel: "Includes",
    cta: "Enquire",
    items: [
      {
        id: "beach-day",
        name: "Beach Day Ride",
        tagline: "A full day on the Maremma shore, with lunch on the sand",
        description:
          "We ride along the beaches of southern Tuscany, stop for a long lunch set right on the sand by our staff, and when the season allows, swim with the horses.", // SOURCE: IG (Ansedonia, 9:30–17, lunch on the sand, bathing with horses)
        where: "Ansedonia, Maremma coast",
        duration: "Full day · 9:30 to 17:00",
        level: "All levels",
        includes: "Horse and tack, guide, lunch",
        season: "Autumn and spring dates", // TODO(andante): confirm season
        image: "beachGallop",
      },
      {
        id: "starlit-dinner",
        name: "Sunset Ride & Starlit Dinner",
        tagline: "Afternoon in the saddle, dinner under the stars, ride home by night",
        description:
          "An afternoon trek through the hills and vineyards of the Maremma hinterland, a candlelit dinner in the open and a quiet night ride back.", // SOURCE: IG (September, dinner under the stars, night return)
        where: "Maremma hinterland, near Capalbio",
        duration: "Afternoon to late evening",
        level: "All levels",
        includes: "Horse and tack, guide, dinner",
        season: "Late summer", // TODO(andante): confirm season
        image: "starlitDinner",
      },
      {
        id: "countryside-day",
        name: "Countryside Day Trek",
        tagline: "Olive groves, country lanes and lunch in the shade",
        description:
          "A day riding the trails around Capalbio, with lunch set among the olive trees before the ride back.", // SOURCE: IG (daily trek with lunch, Capalbio)
        where: "Capalbio, Tuscany",
        duration: "Full day",
        level: "All levels",
        includes: "Horse and tack, guide, lunch",
        season: "Spring to autumn", // TODO(andante): confirm season
        image: "oliveGroveLunch",
      },
      {
        id: "two-day-trek",
        name: "Two-Day Trek",
        tagline: "More time in the saddle, with a night out",
        description:
          "For riders who want more: two days on horseback through the Maremma with an overnight stop, dinner included.", // SOURCE: IG (2-day trek with a night out, Capalbio)
        where: "Maremma, Tuscany",
        duration: "2 days, 1 night",
        level: "Confident riders", // TODO(andante): confirm minimum level
        includes: "Horse and tack, guide, meals, overnight stay", // TODO(andante): confirm what is included
        season: "Selected weekends", // TODO(andante)
        image: "beachRiders",
      },
      {
        id: "journeys",
        name: "Tuscan Journeys",
        tagline: "Multi-day rides through the heart of Tuscany",
        description:
          "Rides of several days across the Sienese countryside, following stretches of the Via Francigena towards Monteriggioni, with local riding culture and food along the way.", // SOURCE: IG "Andante suggests" (9–11 Oct, Siena, Via Francigena, Monteriggioni)
        where: "Siena and the Via Francigena",
        duration: "3 days and more",
        level: "Confident riders", // TODO(andante): confirm
        includes: "On request", // TODO(andante)
        season: "Selected dates",
        image: "monteriggioni",
      },
      {
        id: "private",
        name: "Private & Tailor-made",
        tagline: "Your day, designed from scratch",
        description:
          "Couples, families, friends or companies: tell us what you imagine and we design the ride, the table and the timing around you.", // TODO(andante): confirm this offer exists
        where: "Across Tuscany",
        duration: "Flexible",
        level: "All levels",
        includes: "Designed with you",
        season: "All year, on request",
        image: "valDOrcia",
      },
    ],
  },
  process: {
    kicker: "How it works",
    title: "From first message to first stride",
    steps: [
      { title: "Tell us about you", body: "Dates, how many riders, everyone's experience. A few lines are enough." },
      { title: "We design the day", body: "We suggest the right experience, horses and timing, and send you every detail." },
      { title: "Ride Tuscany", body: "Arrive, meet your horse and let us take care of the rest, table included." },
    ],
  },
  about: {
    kicker: "About us",
    title: "Founded by Guia & Zoe",
    body: [
      "Andante was founded by Guia Simonetti and Zoe Mazzon, two riders with a shared love for horses, open landscapes and good food.", // SOURCE: IG bio (founders)
      "We design every experience ourselves: we choose the trails, look after the horses and set the tables, so our guests can simply enjoy the ride.", // TODO(andante): replace with their real story
    ],
    signature: "Guia & Zoe",
    founders: [
      { name: "Guia Simonetti", role: "Co-founder", instagram: "https://www.instagram.com/guiasimonetti/" },
      { name: "Zoe Mazzon", role: "Co-founder", instagram: "https://www.instagram.com/zoemazzon/" },
    ],
    imageCaption: "Lunch on the beach, Ansedonia",
  },
  tuscany: {
    kicker: "Tuscany",
    title: "Where we ride",
    intro: "From the dunes of the Maremma coast to the hills of Siena, southern Tuscany is still best seen from the saddle.",
    places: [
      {
        name: "The Maremma coast",
        body: "Long sandy beaches around Ansedonia and Orbetello, wide enough for a canter at the water's edge.",
        image: "beachSilhouette",
      },
      {
        name: "The Maremma hills",
        body: "Vineyards, olive groves and quiet lanes around Capalbio, the setting of our evening rides.",
        image: "hillsDusk",
      },
      {
        name: "Siena & the Via Francigena",
        body: "The ancient pilgrims' road towards the walled village of Monteriggioni, for longer journeys.",
        image: "monteriggioni",
      },
    ],
  },
  gallery: {
    kicker: "Gallery",
    title: "Moments from the saddle",
    follow: "Follow us on Instagram",
  },
  faq: {
    kicker: "FAQ",
    title: "Good to know",
    items: [
      {
        q: "Do I need riding experience?",
        a: "No. Most of our experiences are open to all levels, from complete beginners to experienced riders. Tell us about every rider when you enquire and we will pair each person with the right horse and pace. Multi-day treks require confident riders.", // SOURCE: IG "all levels"; multi-day TODO(andante)
      },
      {
        q: "What should I wear and bring?",
        a: "Long, comfortable trousers, closed shoes with a small heel or riding boots, a light layer and sun protection. We provide helmets. For beach days, bring a swimsuit and a towel.", // TODO(andante): confirm kit list and helmets
      },
      {
        q: "Is it safe?",
        a: "Our horses are calm, well known to us and used to every kind of rider. Every ride is led by an experienced guide and we adapt the route and pace to the group and the weather.", // TODO(andante): add insurance / qualifications
      },
      {
        q: "Can children join?",
        a: "Yes, children are welcome on selected experiences from a minimum age, always accompanied by an adult. Get in touch and we will suggest the best option for your family.", // TODO(andante): minimum age and weight limits
      },
      {
        q: "Are meals included? Can you cater for dietary needs?",
        a: "Lunch or dinner is included in our day and evening experiences. Let us know about allergies or dietary preferences when you enquire.", // SOURCE: IG "lunch/dinner included"
      },
      {
        q: "What happens if the weather is bad?",
        a: "We keep an eye on the forecast and will contact you to move your date or adapt the route if conditions are not safe.", // TODO(andante): cancellation policy
      },
      {
        q: "How do I book?",
        a: "Send us an enquiry with your dates and group. We reply personally with availability, details and price.",
      },
    ],
  },
  enquiry: {
    kicker: "Plan your ride",
    title: "Tell us about your ride",
    intro: "Share a few details and we will reply personally with availability and a tailored proposal.",
    emailLabel: "Prefer email?",
    fields: {
      name: "Full name",
      email: "Email",
      country: "Country of residence",
      dateFrom: "Preferred date",
      dateTo: "Flexible until (optional)",
      riders: "Number of riders",
      level: "Riding level",
      experience: "Experience",
      message: "Anything we should know?",
      messagePlaceholder: "Occasion, ages of the riders, dietary needs, questions…",
    },
    levels: [
      { value: "never", label: "Never ridden" },
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate (walk, trot, canter)" },
      { value: "advanced", label: "Advanced" },
      { value: "mixed", label: "Mixed group" },
    ],
    experienceOther: "Not sure yet, advise me",
    submit: "Send enquiry",
    privacy: "We only use your details to reply to this enquiry.",
    errors: {
      required: "Please fill in this field.",
      email: "Please enter a valid email address.",
      riders: "Please enter a number between 1 and 30.",
      dateOrder: "This date must be after the preferred date.",
      datePast: "Please choose a future date.",
    },
    success: {
      title: "Thank you, {name}.",
      body: "Your email app should now open with your enquiry ready to send to {email}. If it did not, use the button below.",
      openMail: "Open email",
      again: "Send another enquiry",
    },
    mailSubject: "Ride enquiry: {experience} · {date}",
    demoNote: "Preview: no data is stored. Sending happens from your own email app.",
  },
  footer: {
    tagline: "Shaping unique equestrian experiences", // SOURCE: IG bio
    contact: "Contact",
    follow: "Follow",
    photos: "Photo credits",
    photosNote: "Placeholder photos from Wikimedia Commons, used under their licences:",
    rights: "Andante",
    preview: "Preview website, not yet published.",
  },
};

export default en;
