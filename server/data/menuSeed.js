function pexels(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600`;
}

/** Each product gets a unique stock photo URL (stored in MongoDB, not duplicated locally). */
export const MENU_SEED = [
  { slug: "cafe-latte", name: "Café Latte", description: "Espresso and steamed milk.", price: 3.9, category: "coffee", image: pexels(302899), tag: "Best Seller", featured: true, sortOrder: 1 },
  { slug: "fresh-roasted-coffee", name: "Fresh Roasted Coffee", description: "Medium roast, brewed from beans roasted in-house.", price: 3.0, category: "coffee", image: pexels(324028), sortOrder: 2 },
  { slug: "espresso", name: "Espresso", description: "Double shot of house-roasted espresso.", price: 2.35, category: "coffee", image: pexels(312088), sortOrder: 3 },
  { slug: "cappuccino", name: "Cappuccino", description: "Espresso, steamed milk, and foam.", price: 3.9, category: "coffee", image: pexels(414630), sortOrder: 4 },
  { slug: "mocha-latte", name: "Mocha Latte", description: "Café latte with chocolate.", price: 3.9, category: "coffee", image: pexels(449431), sortOrder: 5 },
  { slug: "americano", name: "Americano", description: "Espresso and hot water.", price: 2.7, category: "coffee", image: pexels(886521), sortOrder: 6 },
  { slug: "macchiato", name: "Macchiato", description: "Espresso marked with foam.", price: 3.0, category: "coffee", image: pexels(962913), sortOrder: 7 },
  { slug: "red-eye", name: "Red Eye", description: "Fresh roasted coffee with a shot of espresso.", price: 3.2, category: "coffee", image: pexels(1002638), sortOrder: 8 },
  { slug: "hot-chocolate", name: "Hot Chocolate", description: "Steamed milk and chocolate.", price: 3.3, category: "coffee", image: pexels(1440383), sortOrder: 9 },
  { slug: "cappawappacino", name: "Cappawappacino Latte", description: "Caramel, cinnamon, hazelnut, and vanilla.", price: 4.75, category: "coffee", image: pexels(1556688), tag: "Fan Favorite", featured: true, sortOrder: 10 },
  { slug: "caramel-turtle", name: "Caramel Turtle Latte", description: "Almond Roca, caramel, and chocolate.", price: 4.75, category: "coffee", image: pexels(867452), sortOrder: 11 },
  { slug: "nutty-irishman", name: "Nutty Irishman Latte", description: "Hazelnut and Irish cream.", price: 4.75, category: "coffee", image: pexels(1022373), sortOrder: 12 },
  { slug: "chunky-monkey", name: "Chunky Monkey Latte", description: "Banana and chocolate.", price: 4.75, category: "coffee", image: pexels(1125764), sortOrder: 13 },
  { slug: "sassy-seth", name: "The Sassy Seth Latte", description: "Almond Roca, caramel, and vanilla.", price: 4.75, category: "coffee", image: pexels(1267320), sortOrder: 14 },
  { slug: "vanilla-bean-bomber", name: "Vanilla Bean Java Bomber", description: "Steamed cream, double espresso, vanilla syrup, whipped cream.", price: 4.2, category: "coffee", image: pexels(1405750), sortOrder: 15 },
  { slug: "mocha-roca-javachino", name: "Mocha Roca Javachino", description: "Almond roca and chocolate blended with espresso, cream, and ice.", price: 5.7, category: "coffee", image: pexels(1482805), sortOrder: 16 },
  { slug: "chai-latte", name: "Chai Latte", description: "Vanilla chai tea, cinnamon, and vanilla. Honey included.", price: 4.75, category: "tea", image: pexels(1417945), sortOrder: 17 },
  { slug: "london-fog", name: "London Fog Tea Latte", description: "Earl grey tea, cinnamon, and vanilla. Honey included.", price: 4.75, category: "tea", image: pexels(230477), sortOrder: 18 },
  { slug: "mo-chai", name: "Mo Chai Tea Latte", description: "Chai latte with chocolate. Honey included.", price: 4.75, category: "tea", image: pexels(1417948), sortOrder: 19 },
  { slug: "organic-black-tea", name: "Black Organic Loose-Leaf Tea", description: "Organic loose-leaf black tea, brewed to order.", price: 3.6, category: "tea", image: pexels(1417947), sortOrder: 20 },
  { slug: "organic-green-tea", name: "Green Organic Loose-Leaf Tea", description: "Organic loose-leaf green tea, brewed to order.", price: 3.6, category: "tea", image: pexels(1417946), sortOrder: 21 },
  { slug: "eggs-cheese-sandwich", name: "Eggs and Cheese Sandwich", description: "Home-baked eggs and cheese on croissant, bagel, or bread. Served with fresh fruit.", price: 9.6, category: "breakfast", image: pexels(6294480), tag: "Best Seller", featured: true, sortOrder: 22 },
  { slug: "breakfast-quesadilla", name: "Breakfast Quesadilla", description: "Home-baked eggs and cheese in a folded quesadilla. Served with fresh fruit.", price: 8.5, category: "breakfast", image: pexels(6932688), tag: "Best Seller", sortOrder: 23 },
  { slug: "sarahs-wrap", name: "Sarah's Psychedelic Breakfast Wrap", description: "Mushrooms, tomatoes, and cheese. Served with fresh fruit.", price: 8.5, category: "breakfast", image: pexels(6297648), sortOrder: 24 },
  { slug: "wap-wrap", name: "WAP Breakfast Wrap", description: "Roasted red peppers, artichokes, and cheese. Served with fresh fruit.", price: 6.95, category: "breakfast", image: pexels(6934216), sortOrder: 25 },
  { slug: "pigwich", name: "Pigwich Specialties", description: "Eggs, bacon, ham, cheese, and mayo on a croissant.", price: 9.95, category: "breakfast", image: pexels(6975644), sortOrder: 26 },
  { slug: "professor-specialties", name: "Professor Specialties", description: "Croissant with melted butter, cinnamon, and sugar.", price: 4.8, category: "breakfast", image: pexels(2133), sortOrder: 27 },
  { slug: "granola-parfait", name: "Granola Yogurt Parfait", description: "House-made granola layered with yogurt.", price: 8.35, category: "breakfast", image: pexels(2135), sortOrder: 28 },
  { slug: "oatmeal", name: "Oatmeal", description: "Hot oatmeal, made to order.", price: 8.35, category: "breakfast", image: pexels(248046), sortOrder: 29 },
  { slug: "cinnamon-bun", name: "Cinnamon Bun", description: "Fresh-baked daily in-house.", price: 3.5, category: "baked-goods", image: pexels(267805), tag: "Baked Fresh", sortOrder: 30 },
  { slug: "brownie", name: "Brownie", description: "Flavors rotate daily — ask your barista what's fresh.", price: 3.9, category: "baked-goods", image: pexels(4695588), sortOrder: 31 },
  { slug: "awesome-bar", name: "Awesome Bar", description: "Almond flour crust, raspberry jam, toasted coconut and almond crumble. Vegan & gluten free.", price: 3.95, category: "baked-goods", image: pexels(5949883), sortOrder: 32 },
  { slug: "heavenly-oat-bar", name: "Heavenly Oat Bar", description: "Oatmeal and maple syrup crust with vegan chocolate and peanut butter. Vegan & gluten free.", price: 3.95, category: "baked-goods", image: pexels(5937507), sortOrder: 33 },
  { slug: "muffin", name: "Muffin", description: "Flavors rotate daily — call ahead to see what's in the case.", price: 3.5, category: "baked-goods", image: pexels(2136), sortOrder: 34 },
  { slug: "scone", name: "Scone", description: "Flavors rotate daily — baked fresh every morning.", price: 3.5, category: "baked-goods", image: pexels(2945020), sortOrder: 35 },
  { slug: "pesto-chicken-panini", name: "Simon's Pesto Chicken Panini", description: "Roasted chicken, spinach, tomato, pesto, and cheese on white. Served with chips.", price: 15.6, category: "lunch", image: pexels(5938), sortOrder: 36 },
  { slug: "professor-veggie-panini", name: "Professor Veggie Panini", description: "Spinach, tomato, mushrooms, onion, pesto, and cheese on white. Served with chips.", price: 15.6, category: "lunch", image: pexels(5936), sortOrder: 37 },
  { slug: "blt", name: "Jessa's BLT Sandwich", description: "Bacon, tomato, lettuce, and mayo on toasted wheat. Served with chips.", price: 15.6, category: "lunch", image: pexels(769289), sortOrder: 38 },
  { slug: "space-monkey-panini", name: "The Space Monkey Panini", description: "Turkey, ham, Thousand Island, roasted red peppers, and Swiss. Served with chips.", price: 15.6, category: "lunch", image: pexels(1279330), sortOrder: 39 },
  { slug: "cup-of-soup", name: "Cup of Soup", description: "Soup of the day — ask what's on the board.", price: 4.5, category: "lunch", image: pexels(2097090), sortOrder: 40 },
  { slug: "house-salad", name: "House Salad", description: "Romaine, tomatoes, onions, cucumbers, and balsamic vinaigrette.", price: 11.95, category: "lunch", image: pexels(5937508), sortOrder: 41 },
  { slug: "vegan-chili", name: "Vegan Chili", description: "Served with pita chips and fresh fruit.", price: 9.95, category: "lunch", image: pexels(5937509), sortOrder: 42 },
];

export const RETAIL_SEED = [
  { name: "Guatemalan Antigua", price: 12.95, note: "Medium body · Very aromatic", sortOrder: 1 },
  { name: "Ethiopian Harrar", price: 14.95, note: "Full body · Earthy undertones", sortOrder: 2 },
  { name: "French Roast", price: 12.95, note: "Dark · Deep, bold flavor", sortOrder: 3 },
  { name: "House Espresso", price: 12.95, note: "Indonesian beans · Rich & robust", sortOrder: 4 },
  { name: "Summer Solstice Blend", price: 12.95, note: "Dark blend · Latin America & Africa", sortOrder: 5 },
  { name: "Bali Kintamani", price: 14.95, note: "Bright · Rich body", sortOrder: 6 },
];

export const MENU_CATEGORIES = [
  { id: "coffee", label: "Coffee & Espresso" },
  { id: "tea", label: "Tea" },
  { id: "breakfast", label: "Breakfast" },
  { id: "baked-goods", label: "Baked Goods" },
  { id: "lunch", label: "Lunch" },
];
