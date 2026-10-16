/* EASTC site config — swap values here.
   Placeholders stay until a person replaces them.
   The browser never sends yocoSecretKey. */
window.EASTC_CONFIG = {
  payments: {
    provider: "yoco",
    /* Test mode is on until this is set to false. */
    testMode: true,
    /* Public key placeholder. Card details stay on Yoco, so the page does not use this key. */
    yocoPublicKey: "YOCO_PUBLIC_KEY",
    /* Server-only placeholder. Do not paste a live secret into this public file. */
    yocoSecretKey: "YOCO_SECRET_KEY",
    /* Paste a Yoco payment-link URL, or a URL that contains {amount} {amountCents} {reference}. */
    yocoPaymentLinkUrl: "YOCO_PAYMENT_LINK_URL",
    /* Your server URL. It creates a Yoco Checkout and returns { "redirectUrl": "https://..." }. */
    yocoCheckoutEndpoint: "YOCO_CHECKOUT_ENDPOINT",
    itemName: "Student fees",
    currency: "ZAR",
    minRand: 2
  },

  eft: {
    bankName: "[Bank name to be confirmed]",
    accountName: "[Account name to be confirmed]",
    accountNumber: "[Account number to be confirmed]",
    branchCode: "[Branch code to be confirmed]",
    accountType: "[Account type to be confirmed]",
    referenceHelp: "Use your student number or invoice number as the payment reference."
  },

  contact: {
    endpoint: "CONTACT_FORM_ENDPOINT",
    mailto: "queries@eastc.co.za",
    phoneDisplay: "011 394 1488",
    phoneTel: "+27113941488",
    mobileDisplay: "082 605 1134",
    mobileTel: "+27826051134",
    /* No WhatsApp number is published on this site. */
    whatsappNumber: "WHATSAPP_NUMBER",
    email: "queries@eastc.co.za",
    address: "43 Maxwell Street, Kempton Park",
    addressNote: "eastc.co.za publishes the street address as 43b Maxwell Street, Kempton Park, 1619."
  },

  departments: [
    { id: "admissions", name: "Admissions", person: "[Name to be confirmed]", email: "[Email to be confirmed]", phone: "[Phone to be confirmed]" },
    { id: "finance", name: "Finance", person: "[Name to be confirmed]", email: "[Email to be confirmed]", phone: "[Phone to be confirmed]" },
    { id: "student-support", name: "Student support", person: "[Name to be confirmed]", email: "[Email to be confirmed]", phone: "[Phone to be confirmed]" },
    { id: "management", name: "Management", person: "[Name to be confirmed]", email: "[Email to be confirmed]", phone: "[Phone to be confirmed]" }
  ],

  /* Published on eastc.co.za contact page. */
  hours: [
    "Full-time study: Monday to Thursday 08:00–16:00, Friday 08:00–13:00.",
    "Office: Monday to Friday 08:00–17:00, Saturday 08:00–13:00.",
    "Part-time study: Saturdays 08:00–15:30 for 9 consecutive Saturdays."
  ],

  leadership: {
    ceo: {
      role: "Chief Executive Officer",
      name: "[Name to be confirmed]",
      title: "[Title to be confirmed]",
      image: "placeholder-ceo.svg"
    },
    managingDirector: {
      role: "Managing Director",
      name: "[Name to be confirmed]",
      title: "[Title to be confirmed]",
      image: "placeholder-md.svg"
    }
  },

  funding: [
    { name: "Fundi", detail: "Student loans in South Africa.", href: "https://www.fundi.co.za/" },
    { name: "FNB student loan", detail: "First National Bank student loan.", href: "https://www.fnb.co.za/loans/student-loans.html" },
    { name: "Standard Bank student loan", detail: "Standard Bank student finance.", href: "https://www.standardbank.co.za/southafrica/personal/products-and-services/borrow-for-your-needs/student-loans/student-loans" },
    { name: "Absa student loan", detail: "Absa student loan.", href: "https://www.absa.co.za/offers/personal/student-loan/" },
    { name: "Nedbank student loan", detail: "Nedbank student loan.", href: "https://personal.nedbank.co.za/borrow/student-loans/ready-to-apply.html" },
    {
      name: "EASTC Foundation Scholarship and Access Fund",
      detail: "The Foundation site describes Scholarship and Access: bursaries, rural student support, and women in technical fields. A page that uses this fund name on its own is to be confirmed.",
      href: "https://eastechfoundation.co.za/"
    }
  ],

  accommodation: [
    "eastc.co.za lists shared accommodation at R2,100 for short courses only. Students supply their own food and bedding.",
    "The same site says the premises and accommodation have 24-hour security, and that other accommodation fees are available on request at reception.",
    "Room availability, and the fee for any programme that is not a short course, are to be confirmed."
  ],

  accreditation: [
    "Programmes are designed to DHET standards.",
    "This website publishes the reference DHET 2019/FE07/D33.",
    "The brochure on eastc.co.za publishes accreditation number ACC17/07/00004.",
    "Which programmes those references cover is to be confirmed."
  ],

  entities: {
    holdings: {
      name: "EASTC Holdings",
      mark: "EH",
      tagline: "Technocentric Varsity",
      courses: [
        "EASTC Technical School: CAPS curriculum, Grade R to Grade 12.",
        "Artisanal College: short skill courses, learnerships, apprenticeships, ARPL, and a trade test centre.",
        "EASTC Varsity: NATED N3 to N6 in engineering studies and business studies.",
        "EASTECH Institute: higher certificates and degrees in Water Engineering, IT, Cyber Security, and Digital Marketing.",
        "Places and the next intake on each campus are to be confirmed."
      ],
      managingDirector: {
        role: "Managing Director, EASTC Holdings",
        name: "[Name to be confirmed]",
        title: "[Title to be confirmed]",
        image: "placeholder-md.svg"
      }
    },
    "technical-school": {
      name: "EASTC Technical School",
      mark: "TS",
      tagline: "CAPS · Grade R–12",
      courses: [
        "CAPS curriculum from Grade R to Grade 12 on the Maxwell Street campus.",
        "Foundation phase: Grade R–3.",
        "Intermediate and senior phase: Grade 4–9, with the workshop exposure described on this site.",
        "FET and matric: Grade 10–12, with a view into NATED, trades, and Institute programmes.",
        "Places and the next intake are to be confirmed."
      ],
      managingDirector: {
        role: "Managing Director, EASTC Technical School",
        name: "[Name to be confirmed]",
        title: "[Title to be confirmed]",
        image: "placeholder-md.svg"
      }
    },
    "artisanal-college": {
      name: "Artisanal College",
      mark: "AC",
      tagline: "Trades · Trade tests · ARPL",
      courses: [
        "Short skills from 3 weeks, learnerships of 12 months, and apprenticeships of 36 months.",
        "ARPL (artisan recognition of prior learning) and custom programmes for employers and SETAs.",
        "This site names plumbing and bricklaying for the trade test centre. The scope of that listing is to be confirmed.",
        "This site lists 26 trades and 146+ programmes since 2006, including electrical, plumbing, carpentry, welding, boilermaking, millwright, fitting and turning, air-conditioning and refrigeration, diesel mechanic, solar PV technician, panel beating, and petrol mechanic.",
        "Places and the next start date are to be confirmed."
      ],
      managingDirector: {
        role: "Managing Director, Artisanal College",
        name: "[Name to be confirmed]",
        title: "[Title to be confirmed]",
        image: "placeholder-md.svg"
      }
    },
    "eastc-varsity": {
      name: "EASTC Varsity",
      mark: "EV",
      tagline: "NATED N3–N6",
      courses: [
        "NATED N3, N4, N5, and N6.",
        "Engineering studies.",
        "Business studies.",
        "Places and the next intake are to be confirmed."
      ],
      managingDirector: {
        role: "Managing Director, EASTC Varsity",
        name: "[Name to be confirmed]",
        title: "[Title to be confirmed]",
        image: "placeholder-md.svg"
      }
    }
  }
};
