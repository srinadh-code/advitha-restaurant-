export const HOTEL = {
  name: "Mulugu Hotel & Restaurant",
  tagline: "Luxury Stay · Family Dining · Tourism",
  phone: "+919550726815",
  whatsapp: "919550726815",
  email: "info@muluguhotel.com",
  address: "Main Road, Mulugu, Telangana 506343",
  mapsEmbed:
    "https://www.google.com/maps?q=Mulugu,Telangana&output=embed",
  social: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    youtube: "#",
  },
};

export type Room = {
  id: string;
  name: string;
  category: string;
  price: number;
  capacity: string;
  image: string;
  description: string;
  amenities: string[];
};

export const ROOMS: Room[] = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    category: "Deluxe",
    price: 2499,
    capacity: "2 Adults",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
    description: "Elegant deluxe room with warm interiors, king bed and city views.",
    amenities: ["King Bed", "AC", "Free WiFi", "Smart TV", "Mini Bar"],
  },
  {
    id: "premium",
    name: "Premium Room",
    category: "Premium",
    price: 3499,
    capacity: "2 Adults + 1 Child",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    description: "Spacious premium room with luxe furnishings and a private balcony.",
    amenities: ["King Bed", "Balcony", "Free WiFi", "Smart TV", "Tea/Coffee"],
  },
  {
    id: "family",
    name: "Family Suite",
    category: "Suite",
    price: 5499,
    capacity: "4 Guests",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
    description: "Two-bedroom suite designed for families, with living area and dining.",
    amenities: ["2 Bedrooms", "Living Room", "Free WiFi", "Kitchenette"],
  },
  {
    id: "executive",
    name: "Executive Room",
    category: "Executive",
    price: 4299,
    capacity: "2 Adults",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
    description: "Business-class room with workspace, lounge access and premium amenities.",
    amenities: ["Workspace", "Lounge Access", "Free WiFi", "Espresso Machine"],
  },
];

export type Food = {
  id: string;
  name: string;
  category: "Veg" | "Non Veg" | "Starters" | "Drinks" | "Ice Creams" | "Restaurant Specials";
  price: number;
  image: string;
  description: string;
};

export const FOODS: Food[] = [
  { id: "f1", name: "Paneer Butter Masala", category: "Veg", price: 260, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80", description: "Cottage cheese in rich tomato-cashew gravy." },
  { id: "f2", name: "Veg Biryani", category: "Veg", price: 220, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80", description: "Long-grain basmati layered with garden vegetables." },
  { id: "f3", name: "Dal Tadka", category: "Veg", price: 180, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80", description: "Yellow lentils tempered with cumin and garlic." },
  { id: "f4", name: "Chicken Biryani", category: "Non Veg", price: 320, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80", description: "Hyderabadi dum biryani with tender chicken." },
  { id: "f5", name: "Mutton Curry", category: "Non Veg", price: 420, image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80", description: "Slow-cooked mutton in aromatic spices." },
  { id: "f6", name: "Tandoori Chicken", category: "Non Veg", price: 380, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80", description: "Clay-oven roasted chicken marinated in yogurt." },
  { id: "f7", name: "Paneer Tikka", category: "Starters", price: 280, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80", description: "Char-grilled paneer cubes with bell peppers." },
  { id: "f8", name: "Chicken 65", category: "Starters", price: 290, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80", description: "Spicy fried chicken tossed with curry leaves." },
  { id: "f9", name: "Veg Manchurian", category: "Starters", price: 240, image: "https://images.unsplash.com/photo-1626777553635-2cf6f15f1d12?w=800&q=80", description: "Indo-Chinese fried vegetable balls in tangy sauce." },
  { id: "f10", name: "Fresh Lime Soda", category: "Drinks", price: 90, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80", description: "Chilled lime with soda — sweet, salt or mixed." },
  { id: "f11", name: "Mango Lassi", category: "Drinks", price: 120, image: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=800&q=80", description: "Creamy yogurt blended with Alphonso mango." },
  { id: "f12", name: "Filter Coffee", category: "Drinks", price: 80, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", description: "South Indian style decoction coffee." },
  { id: "f13", name: "Vanilla Sundae", category: "Ice Creams", price: 150, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&q=80", description: "Classic vanilla with chocolate sauce and nuts." },
  { id: "f14", name: "Choco Brownie Scoop", category: "Ice Creams", price: 180, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80", description: "Warm brownie topped with chocolate ice cream." },
  { id: "f15", name: "Kulfi Falooda", category: "Ice Creams", price: 160, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80", description: "Indian-style kulfi with falooda and rose syrup." },
  { id: "f16", name: "Mulugu Royal Thali", category: "Restaurant Specials", price: 499, image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80", description: "Chef's signature thali — a tour of regional flavors." },
  { id: "f17", name: "Andhra Meals Special", category: "Restaurant Specials", price: 399, image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&q=80", description: "Authentic Andhra meals with 12 traditional items." },
  { id: "f18", name: "Tandoori Platter", category: "Restaurant Specials", price: 599, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80", description: "Assorted kebabs from our wood-fired tandoor." },
];

export const SERVICES = [
  { icon: "Bed", title: "Luxury Rooms", desc: "Elegant rooms with modern amenities." },
  { icon: "UtensilsCrossed", title: "Family Dining", desc: "Multi-cuisine restaurant for all guests." },
  { icon: "Wifi", title: "Free WiFi", desc: "High-speed internet across the property." },
  { icon: "Car", title: "Parking", desc: "Spacious secure parking on-site." },
  { icon: "ConciergeBell", title: "Room Service", desc: "24/7 in-room dining and concierge." },
  { icon: "PartyPopper", title: "Event Hall", desc: "Party hall for functions and gatherings." },
];

export type Tourism = {
  id: string;
  name: string;
  category: "Temples" | "Waterfalls" | "Historical Places" | "Parks" | "Adventure Spots" | "View Points";
  image: string;
  description: string;
  distance: string;
  hours: string;
};

export const TOURISM: Tourism[] = [
  { id: "t1", name: "Ramappa Temple", category: "Temples", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80", description: "UNESCO World Heritage 13th-century temple of stunning Kakatiya architecture.", distance: "18 km", hours: "6 AM – 6 PM" },
  { id: "t2", name: "Bogatha Waterfalls", category: "Waterfalls", image: "https://images.unsplash.com/photo-1467890947394-8171244e5410?w=1200&q=80", description: "Often called the Niagara of Telangana — a breathtaking cascade.", distance: "45 km", hours: "8 AM – 5 PM" },
  { id: "t3", name: "Laknavaram Lake", category: "View Points", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80", description: "Scenic lake with a hanging suspension bridge and island cottages.", distance: "30 km", hours: "9 AM – 6 PM" },
  { id: "t4", name: "Medaram Jatara Grounds", category: "Historical Places", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80", description: "Site of the world's largest tribal congregation in Asia.", distance: "55 km", hours: "All day" },
  { id: "t5", name: "Eturnagaram Sanctuary", category: "Adventure Spots", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80", description: "Dense forest wildlife sanctuary with safaris and trekking.", distance: "60 km", hours: "7 AM – 5 PM" },
  { id: "t6", name: "Mallur Hanuman Temple", category: "Temples", image: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=1200&q=80", description: "Ancient cave temple atop a scenic hillock.", distance: "25 km", hours: "6 AM – 8 PM" },
  { id: "t7", name: "Kakatiya Rock Garden", category: "Parks", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80", description: "Landscaped park ideal for family picnics.", distance: "12 km", hours: "9 AM – 8 PM" },
  { id: "t8", name: "Pakhal Lake", category: "View Points", image: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200&q=80", description: "Ancient artificial lake surrounded by forests.", distance: "40 km", hours: "8 AM – 6 PM" },
];

export const REVIEWS = [
  { name: "Anita Reddy", role: "Guest, Hyderabad", text: "Beautiful property, warm staff, and unforgettable Andhra meals!", rating: 5 },
  { name: "Rohit Sharma", role: "Family Stay", text: "Spacious family suite, kids loved the pool and dining.", rating: 5 },
  { name: "Priya Iyer", role: "Tourism Group", text: "Perfect base to explore Ramappa and Laknavaram. Highly recommended.", rating: 5 },
  { name: "Vikram Singh", role: "Business Traveller", text: "Executive room was top-notch and WiFi rock-solid.", rating: 5 },
];

export const GALLERY = {
  Hotel: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",
    "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80",
  ],
  Rooms: [
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
  ],
  Restaurant: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80",
  ],
  Tourism: [
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80",
    "https://images.unsplash.com/photo-1467890947394-8171244e5410?w=1200&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
  ],
  "Customer Experiences": [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=80",
    "https://images.unsplash.com/photo-1521334884684-d80222895322?w=1200&q=80",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=80",
  ],
} as const;

export const DEMO_USERS = [
  { email: "admin@mulugu.com", password: "admin123", role: "admin", name: "Admin User" },
  { email: "reception@mulugu.com", password: "recep123", role: "receptionist", name: "Front Desk" },
  { email: "user@mulugu.com", password: "user123", role: "customer", name: "Guest User" },
] as const;