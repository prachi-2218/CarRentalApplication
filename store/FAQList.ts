export interface FAQ {
    id: number;
    question: string;
    answer: string;
  }
  
  export const faqList: FAQ[] = [
    {
      id: 1,
      question: "What documents do I need to rent a car?",
      answer:
        "To rent a car, you will need a valid driver's license, a credit card in your name, and a government-issued photo ID (such as a passport or national ID). International renters may also need to present an International Driving Permit (IDP) in addition to their home country driver’s license.",
    },
    {
      id: 2,
      question: "Is there a n age requirement to rent a car?",
      answer:
        "Yes, most rental companies require renters to be at least 21 years old. Some may charge an additional fee for drivers under 25.",
    },
    {
      id: 3,
      question: "Can I add an additional driver to my rental?",
      answer:
        "Yes, additional drivers can typically be added at the rental counter. They must meet the same age and license requirements.",
    },
    {
      id: 4,
      question: "What should I do if the rental car breaks down or I get into an accident?",
      answer:
        "Contact the rental company immediately. They will provide instructions and assistance. Emergency numbers are usually listed in the rental agreement.",
    },
    {
      id: 5,
      question: "Is there a mileage limit on my rental?",
      answer:
        "This depends on the rental agreement. Some rentals come with unlimited mileage, while others may have restrictions.",
    },
  ];
  