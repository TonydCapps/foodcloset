/**
 * DATA.JS - Food Box and Meal Locations
 * 
 * HOW TO ADD NEW LOCATIONS:
 * 1. Copy a resource object below
 * 2. Fill in the details (name, address, coordinates, etc.)
 * 3. To find coordinates: Go to google.com/maps, search the address, and copy the numbers from the URL
 *    URL format: https://maps.google.com/?q=LATITUDE,LONGITUDE
 */

const resources = [
    {
        id: 1,
        name: "Downtown Bremerton Food Box",
        type: "food-box",
        address: "123 Pacific Avenue, Bremerton, WA 98310",
        phone: "(360) 555-0101",
        latitude: 47.5730,
        longitude: -122.6231,
        hours: "Monday - Friday: 9 AM - 5 PM",
        description: "Free grocery boxes available to Kitsap County residents in need.",
        notes: "First come, first served. No registration required."
    },
    {
        id: 2,
        name: "Silverdale Community Meals",
        type: "meal-site",
        address: "456 Bay Street, Silverdale, WA 98315",
        phone: "(360) 555-0202",
        latitude: 47.6550,
        longitude: -122.6600,
        hours: "Daily: 12 PM - 2 PM",
        description: "Hot meals served daily for anyone in the community.",
        notes: "Dietary restrictions accommodated when possible. Takeout available."
    },
    {
        id: 3,
        name: "Port Orchard Soup Kitchen",
        type: "soup-kitchen",
        address: "789 Bay Street, Port Orchard, WA 98366",
        phone: "(360) 555-0303",
        latitude: 47.5330,
        longitude: -122.6180,
        hours: "Tuesday, Thursday, Saturday: 6 PM - 8 PM",
        description: "Evening soup and bread served to the community.",
        notes: "Warm seating area available. Coffee and tea provided."
    },
    {
        id: 4,
        name: "Kitsap County Library Food Pantry",
        type: "food-box",
        address: "321 Library Lane, Port Orchard, WA 98366",
        phone: "(360) 555-0404",
        latitude: 47.5400,
        longitude: -122.6250,
        hours: "Monday, Wednesday, Friday: 10 AM - 3 PM",
        description: "Food pantry located inside the Port Orchard library.",
        notes: "Located near the main entrance. Bags available for carrying items."
    },
    {
        id: 5,
        name: "Bremerton Community Center Kitchen",
        type: "meal-site",
        address: "654 Church Street, Bremerton, WA 98310",
        phone: "(360) 555-0505",
        latitude: 47.5750,
        longitude: -122.6200,
        hours: "Sunday - Friday: 11 AM - 1 PM",
        description: "Free lunch served to anyone in need.",
        notes: "Volunteers available to assist. Indoor and outdoor seating."
    },
    {
        id: 6,
        name: "The Lord's Neighborhood Diner",
        type: "soup-kitchen",
        address: "St. Paul's Episcopal Church, 700 Callahan Dr, Bremerton, WA 98310",
        phone: "(360) 555-0606",
        website: "http://thelordsneighborhooddiner.blogspot.com/",
        latitude: 47.578379,
        longitude: -122.632656,
        hours: "Saturday: 2:30 PM",
        description: "Hot, nutritious meals served every Saturday with compassion and dignity.",
        notes: "All are welcome; free clothing may also be available when supplies last."
    },
    {
        id: 7,
        name: "Central Kitsap Food Bank",
        type: "food-box",
        address: "3537 Anderson Hill Rd, Silverdale, WA 98383",
        phone: "(360) 692-9818",
        website: "https://ckfoodbank.org/",
        latitude: 47.6442,
        longitude: -122.6878,
        hours: "Monday - Friday: 9 AM - 4 PM",
        description: "Provides grocery-style food assistance to Central Kitsap families.",
        notes: "Clients can shop in a welcoming environment; call ahead for current procedures."
    },
    {
        id: 8,
        name: "Silverdale Community Church",
        type: "meal-site",
        address: "9982 Silverdale Way NW, Silverdale, WA 98383",
        phone: "(360) 692-9813",
        website: "https://silverdalechurch.org/",
        latitude: 47.6710,
        longitude: -122.6860,
        hours: "Sunday: 10:30 AM",
        description: "A community church offering connection, worship, and local support services.",
        notes: "Visit their website for current service times and community event details."
    },
    {
        id: 9,
        name: "Helpline House",
        type: "food-box",
        address: "901 Hildebrand Lane NE, Bainbridge Island, WA 98110",
        phone: "(206) 842-7621",
        website: "https://helplinehouse.org/",
        latitude: 47.6412,
        longitude: -122.5194,
        hours: "Monday - Friday: 9 AM - 5 PM",
        description: "Provides food bank access, housing support, and resource navigation for neighbors.",
        notes: "Open to any Washington State resident; call for latest service details."
    },
    {
        id: 10,
        name: "Fishline",
        type: "food-box",
        address: "19705 Viking Ave NW, Poulsbo, WA 98370",
        phone: "(360) 779-5190",
        website: "https://fishlinehelps.org/",
        latitude: 47.7508,
        longitude: -122.6653,
        hours: "Monday - Saturday: 9 AM - 5 PM",
        description: "A food bank offering groceries and support services to help neighbors thrive.",
        notes: "Visit the website for program details and volunteer opportunities."
    },
    {
        id: 11,
        name: "St. Vincent de Paul Bremerton",
        type: "food-box",
        address: "1117 N. Callow Ave, Bremerton, WA 98312",
        phone: "(360) 377-2929",
        website: "https://www.svdpbremerton.com/",
        latitude: 47.6312,
        longitude: -122.6781,
        hours: "Monday - Friday: 10 AM - 2 PM",
        description: "Neighborhood Market and resource center providing food assistance in Bremerton.",
        notes: "No ID or proof of address needed; guests may visit once per week."
    }
];

/**
 * RESOURCE TYPES AND ICONS
 * These define how different resource types appear on the map
 */
const resourceTypes = {
    "food-box": {
        label: "Food Box",
        emoji: "📦",
        color: "#f39c12",
        description: "Free grocery boxes"
    },
    "meal-site": {
        label: "Free Meals",
        emoji: "🍽️",
        color: "#e74c3c",
        description: "Hot meals served"
    },
    "soup-kitchen": {
        label: "Soup Kitchen",
        emoji: "🍲",
        color: "#c0392b",
        description: "Soup and bread"
    }
};
