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
