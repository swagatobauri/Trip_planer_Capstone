export const SelectTravelsList =[
    {
      id: 1,
      title: "Just Me",
      desc: "Solo travel for personal adventures or self-discovery.",
      icon: "🧍",
      peopleCount: 1
    },
    {
      id: 2,
      title: "Couple",
      desc: "Perfect for romantic getaways or quality time together.",
      icon: "👫",
      peopleCount: 2
    },
    {
      id: 3,
      title: "Family",
      desc: "Enjoy bonding time with kids and elders on a family-friendly trip.",
      icon: "👨‍👩‍👧‍👦",
      peopleCount: 4 
    },
    {
      id: 4,
      title: "Friends",
      desc: "Fun and laughter on group trips with your best buddies.",
      icon: "🧑‍🤝‍🧑",
      peopleCount: 5
    },
    {
      id: 5,
      title: "Work Team",
      desc: "Plan retreats or team-building activities with colleagues.",
      icon: "💼",
      peopleCount: 6
    }
  ];
  


export const SelectBudgetOptions =[
    {
      "id": 1,
      "title": "Backpacker",
      "desc": "Minimal spending with hostels, street food, and public transport.",
      "icon": "🎒",
      "people": 2100
    },
    {
      "id": 2,
      "title": "Budget Friendly",
      "desc": "Affordable hotels, local eateries, and basic sightseeing.",
      "icon": "💸",
      "people": 1870
    },
    {
      "id": 3,
      "title": "Mid-Range",
      "desc": "Comfortable hotels, guided tours, and a few indulgences.",
      "icon": "💰",
      "people": 1545
    },
    {
      "id": 4,
      "title": "Luxury",
      "desc": "High-end accommodations, fine dining, and private experiences.",
      "icon": "🛎️",
      "people": 980
    },
    {
      "id": 5,
      "title": "Ultra Luxury",
      "desc": "Five-star everything — private jets, villas, and elite experiences.",
      "icon": "👑",
      "people": 300
    }
  ];

export const AI_PROMPT = `Generate Travel Plan for Location : {location}, for {days} days for {traveler} traveler with a {budget} budget , Give me a Hotels options list with
HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place
Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {days} days with each day plan with best
time to visit in JSON format.`