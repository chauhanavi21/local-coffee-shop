export type MenuCategory =
  | "coffee"
  | "tea"
  | "breakfast"
  | "baked-goods"
  | "lunch";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  tag?: string;
}

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: "coffee", label: "Coffee & Espresso" },
  { id: "tea", label: "Tea" },
  { id: "breakfast", label: "Breakfast" },
  { id: "baked-goods", label: "Baked Goods" },
  { id: "lunch", label: "Lunch" },
];

/** Real menu items — Professor Java's Coffee Sanctuary (Grubhub / in-store) */
export const menuItems: MenuItem[] = [
  // The Classics
  {
    id: "cafe-latte",
    name: "Café Latte",
    description: "Espresso and steamed milk.",
    price: 3.9,
    category: "coffee",
    image: "/images/menu-flat-white.jpg",
    tag: "Best Seller",
  },
  {
    id: "fresh-roasted-coffee",
    name: "Fresh Roasted Coffee",
    description: "Medium roast, brewed from beans roasted in-house.",
    price: 3.0,
    category: "coffee",
    image: "/images/menu-pour-over.jpg",
  },
  {
    id: "espresso",
    name: "Espresso",
    description: "Double shot of house-roasted espresso.",
    price: 2.35,
    category: "coffee",
    image: "/images/menu-espresso.jpg",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: "Espresso, steamed milk, and foam.",
    price: 3.9,
    category: "coffee",
    image: "/images/menu-cortado.jpg",
  },
  {
    id: "mocha-latte",
    name: "Mocha Latte",
    description: "Café latte with chocolate.",
    price: 3.9,
    category: "coffee",
    image: "/images/menu-autumn-latte.jpg",
  },
  {
    id: "americano",
    name: "Americano",
    description: "Espresso and hot water.",
    price: 2.7,
    category: "coffee",
    image: "/images/menu-espresso.jpg",
  },
  {
    id: "macchiato",
    name: "Macchiato",
    description: "Espresso marked with foam.",
    price: 3.0,
    category: "coffee",
    image: "/images/menu-espresso.jpg",
  },
  {
    id: "red-eye",
    name: "Red Eye",
    description: "Fresh roasted coffee with a shot of espresso.",
    price: 3.2,
    category: "coffee",
    image: "/images/menu-pour-over.jpg",
  },
  {
    id: "hot-chocolate",
    name: "Hot Chocolate",
    description: "Steamed milk and chocolate.",
    price: 3.3,
    category: "coffee",
    image: "/images/menu-autumn-latte.jpg",
  },
  // Specialty Lattes
  {
    id: "cappawappacino",
    name: "Cappawappacino Latte",
    description: "Caramel, cinnamon, hazelnut, and vanilla.",
    price: 4.75,
    category: "coffee",
    image: "/images/menu-autumn-latte.jpg",
    tag: "Fan Favorite",
  },
  {
    id: "caramel-turtle",
    name: "Caramel Turtle Latte",
    description: "Almond Roca, caramel, and chocolate.",
    price: 4.75,
    category: "coffee",
    image: "/images/menu-autumn-latte.jpg",
  },
  {
    id: "nutty-irishman",
    name: "Nutty Irishman Latte",
    description: "Hazelnut and Irish cream.",
    price: 4.75,
    category: "coffee",
    image: "/images/menu-flat-white.jpg",
  },
  {
    id: "chunky-monkey",
    name: "Chunky Monkey Latte",
    description: "Banana and chocolate.",
    price: 4.75,
    category: "coffee",
    image: "/images/menu-autumn-latte.jpg",
  },
  {
    id: "sassy-seth",
    name: "The Sassy Seth Latte",
    description: "Almond Roca, caramel, and vanilla.",
    price: 4.75,
    category: "coffee",
    image: "/images/menu-flat-white.jpg",
  },
  // Java Bombers & Javachino
  {
    id: "vanilla-bean-bomber",
    name: "Vanilla Bean Java Bomber",
    description: "Steamed cream, double espresso, vanilla syrup, whipped cream.",
    price: 4.2,
    category: "coffee",
    image: "/images/menu-cold-brew.jpg",
  },
  {
    id: "mocha-roca-javachino",
    name: "Mocha Roca Javachino",
    description: "Almond roca and chocolate blended with espresso, cream, and ice.",
    price: 5.7,
    category: "coffee",
    image: "/images/menu-cold-brew.jpg",
  },
  // Tea
  {
    id: "chai-latte",
    name: "Chai Latte",
    description: "Vanilla chai tea, cinnamon, and vanilla. Honey included.",
    price: 4.75,
    category: "tea",
    image: "/images/menu-chai.jpg",
  },
  {
    id: "london-fog",
    name: "London Fog Tea Latte",
    description: "Earl grey tea, cinnamon, and vanilla. Honey included.",
    price: 4.75,
    category: "tea",
    image: "/images/menu-earl-grey.jpg",
  },
  {
    id: "mo-chai",
    name: "Mo Chai Tea Latte",
    description: "Chai latte with chocolate. Honey included.",
    price: 4.75,
    category: "tea",
    image: "/images/menu-chai.jpg",
  },
  {
    id: "organic-black-tea",
    name: "Black Organic Loose-Leaf Tea",
    description: "Organic loose-leaf black tea, brewed to order.",
    price: 3.6,
    category: "tea",
    image: "/images/menu-earl-grey.jpg",
  },
  {
    id: "organic-green-tea",
    name: "Green Organic Loose-Leaf Tea",
    description: "Organic loose-leaf green tea, brewed to order.",
    price: 3.6,
    category: "tea",
    image: "/images/menu-matcha.jpg",
  },
  // Breakfast
  {
    id: "eggs-cheese-sandwich",
    name: "Eggs and Cheese Sandwich",
    description:
      "Home-baked eggs and cheese on croissant, bagel, or bread. Served with fresh fruit.",
    price: 9.6,
    category: "breakfast",
    image: "/images/menu-croissant.jpg",
    tag: "Best Seller",
  },
  {
    id: "breakfast-quesadilla",
    name: "Breakfast Quesadilla",
    description:
      "Home-baked eggs and cheese in a folded quesadilla. Served with fresh fruit.",
    price: 8.5,
    category: "breakfast",
    image: "/images/menu-croissant.jpg",
    tag: "Best Seller",
  },
  {
    id: "sarahs-wrap",
    name: "Sarah's Psychedelic Breakfast Wrap",
    description: "Mushrooms, tomatoes, and cheese. Served with fresh fruit.",
    price: 8.5,
    category: "breakfast",
    image: "/images/menu-croissant.jpg",
  },
  {
    id: "wap-wrap",
    name: "WAP Breakfast Wrap",
    description: "Roasted red peppers, artichokes, and cheese. Served with fresh fruit.",
    price: 6.95,
    category: "breakfast",
    image: "/images/menu-croissant.jpg",
  },
  {
    id: "pigwich",
    name: "Pigwich Specialties",
    description: "Eggs, bacon, ham, cheese, and mayo on a croissant.",
    price: 9.95,
    category: "breakfast",
    image: "/images/menu-croissant.jpg",
  },
  {
    id: "professor-specialties",
    name: "Professor Specialties",
    description: "Croissant with melted butter, cinnamon, and sugar.",
    price: 4.8,
    category: "breakfast",
    image: "/images/menu-croissant.jpg",
  },
  {
    id: "granola-parfait",
    name: "Granola Yogurt Parfait",
    description: "House-made granola layered with yogurt.",
    price: 8.35,
    category: "breakfast",
    image: "/images/menu-tart.jpg",
  },
  {
    id: "oatmeal",
    name: "Oatmeal",
    description: "Hot oatmeal, made to order.",
    price: 8.35,
    category: "breakfast",
    image: "/images/menu-banana-bread.jpg",
  },
  // Baked Goods
  {
    id: "cinnamon-bun",
    name: "Cinnamon Bun",
    description: "Fresh-baked daily in-house.",
    price: 3.5,
    category: "baked-goods",
    image: "/images/menu-croissant.jpg",
    tag: "Baked Fresh",
  },
  {
    id: "brownie",
    name: "Brownie",
    description: "Flavors rotate daily — ask your barista what's fresh.",
    price: 3.9,
    category: "baked-goods",
    image: "/images/menu-banana-bread.jpg",
  },
  {
    id: "awesome-bar",
    name: "Awesome Bar",
    description:
      "Almond flour crust, raspberry jam, toasted coconut and almond crumble. Vegan & gluten free.",
    price: 3.95,
    category: "baked-goods",
    image: "/images/menu-tart.jpg",
  },
  {
    id: "heavenly-oat-bar",
    name: "Heavenly Oat Bar",
    description:
      "Oatmeal and maple syrup crust with vegan chocolate and peanut butter. Vegan & gluten free.",
    price: 3.95,
    category: "baked-goods",
    image: "/images/menu-banana-bread.jpg",
  },
  {
    id: "muffin",
    name: "Muffin",
    description: "Flavors rotate daily — call ahead to see what's in the case.",
    price: 3.5,
    category: "baked-goods",
    image: "/images/menu-croissant.jpg",
  },
  {
    id: "scone",
    name: "Scone",
    description: "Flavors rotate daily — baked fresh every morning.",
    price: 3.5,
    category: "baked-goods",
    image: "/images/menu-croissant.jpg",
  },
  // Lunch
  {
    id: "pesto-chicken-panini",
    name: "Simon's Pesto Chicken Panini",
    description:
      "Roasted chicken, spinach, tomato, pesto, and cheese on white. Served with chips.",
    price: 15.6,
    category: "lunch",
    image: "/images/menu-croissant.jpg",
  },
  {
    id: "professor-veggie-panini",
    name: "Professor Veggie Panini",
    description:
      "Spinach, tomato, mushrooms, onion, pesto, and cheese on white. Served with chips.",
    price: 15.6,
    category: "lunch",
    image: "/images/menu-croissant.jpg",
  },
  {
    id: "blt",
    name: "Jessa's BLT Sandwich",
    description: "Bacon, tomato, lettuce, and mayo on toasted wheat. Served with chips.",
    price: 15.6,
    category: "lunch",
    image: "/images/menu-croissant.jpg",
  },
  {
    id: "space-monkey-panini",
    name: "The Space Monkey Panini",
    description:
      "Turkey, ham, Thousand Island, roasted red peppers, and Swiss. Served with chips.",
    price: 15.6,
    category: "lunch",
    image: "/images/menu-croissant.jpg",
  },
  {
    id: "cup-of-soup",
    name: "Cup of Soup",
    description: "Soup of the day — ask what's on the board.",
    price: 4.5,
    category: "lunch",
    image: "/images/menu-tart.jpg",
  },
  {
    id: "house-salad",
    name: "House Salad",
    description:
      "Romaine, tomatoes, onions, cucumbers, and balsamic vinaigrette.",
    price: 11.95,
    category: "lunch",
    image: "/images/menu-tart.jpg",
  },
  {
    id: "vegan-chili",
    name: "Vegan Chili",
    description: "Served with pita chips and fresh fruit.",
    price: 9.95,
    category: "lunch",
    image: "/images/menu-tart.jpg",
  },
];

/** Retail beans — Coffee by the Pound (in-store) */
export const retailBeans = [
  {
    name: "Guatemalan Antigua",
    price: 12.95,
    note: "Medium body · Very aromatic",
  },
  {
    name: "Ethiopian Harrar",
    price: 14.95,
    note: "Full body · Earthy undertones",
  },
  {
    name: "French Roast",
    price: 12.95,
    note: "Dark · Deep, bold flavor",
  },
  {
    name: "House Espresso",
    price: 12.95,
    note: "Indonesian beans · Rich & robust",
  },
  {
    name: "Summer Solstice Blend",
    price: 12.95,
    note: "Dark blend · Latin America & Africa",
  },
  {
    name: "Bali Kintamani",
    price: 14.95,
    note: "Bright · Rich body",
  },
];
