export const CustomerService = {
  getCustomersMedium() {
    return Promise.resolve([
      {
        id: 1000,
        name: "James Smith",
        country: {
          name: "United States",
          code: "us",
        },
        company: "Apple",
        representative: {
          name: "Amy Elsner",
          image: "amyelsner.png",
        },
      },
      {
        id: 1001,
        name: "Maria Garcia",
        country: {
          name: "Spain",
          code: "es",
        },
        company: "Microsoft",
        representative: {
          name: "Anna Fali",
          image: "annafali.png",
        },
      },
      {
        id: 1002,
        name: "Robert Johnson",
        country: {
          name: "Canada",
          code: "ca",
        },
        company: "Google",
        representative: {
          name: "Asiya Javayant",
          image: "asiyajavayant.png",
        },
      },
      {
        id: 1003,
        name: "Linda Williams",
        country: {
          name: "Germany",
          code: "de",
        },
        company: "Amazon",
        representative: {
          name: "Bernardo Dominic",
          image: "bernardodominic.png",
        },
      },
      {
        id: 1004,
        name: "David Brown",
        country: {
          name: "Australia",
          code: "au",
        },
        company: "Facebook",
        representative: {
          name: "Elwin Sharvill",
          image: "elwinsharvill.png",
        },
      },
      {
        id: 1005,
        name: "Sophia Martinez",
        country: {
          name: "India",
          code: "in",
        },
        company: "Netflix",
        representative: {
          name: "Ioni Bowcher",
          image: "ionibowcher.png",
        },
      },
      {
        id: 1006,
        name: "William Anderson",
        country: {
          name: "Japan",
          code: "jp",
        },
        company: "Tesla",
        representative: {
          name: "Ivan Magalhaes",
          image: "ivanmagalhaes.png",
        },
      },
      {
        id: 1007,
        name: "Emma Thomas",
        country: {
          name: "Brazil",
          code: "br",
        },
        company: "Twitter",
        representative: {
          name: "Onyama Limba",
          image: "onyamalimba.png",
        },
      },
      {
        id: 1008,
        name: "Oliver Taylor",
        country: {
          name: "Italy",
          code: "it",
        },
        company: "Spotify",
        representative: {
          name: "Stephen Shaw",
          image: "stephenshaw.png",
        },
      },
      {
        id: 1009,
        name: "Isabella Moore",
        country: {
          name: "France",
          code: "fr",
        },
        company: "Samsung",
        representative: {
          name: "Xuxue Feng",
          image: "xuxuefeng.png",
        },
      },
    ]);
  },
};
