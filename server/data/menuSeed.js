/** Menu images are external food photos; seed sync updates MongoDB on server start. */
function img(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600&h=480&fit=crop`;
}

function photo(id) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=480&q=80`;
}

export const MENU_SEED = [
  // Coffee & espresso
  { slug: "cafe-latte", name: "Café Latte", description: "Espresso and steamed milk.", price: 3.9, category: "coffee", image: img(302899), tag: "Best Seller", featured: true, sortOrder: 1 },
  { slug: "fresh-roasted-coffee", name: "Fresh Roasted Coffee", description: "Medium roast, brewed from beans roasted in-house.", price: 3.0, category: "coffee", image: img(1695052), sortOrder: 2 },
  { slug: "espresso", name: "Espresso", description: "Double shot of house-roasted espresso.", price: 2.35, category: "coffee", image: photo("photo-1510591509098-f4fdc6d0ff04"), sortOrder: 3 },
  { slug: "cappuccino", name: "Cappuccino", description: "Espresso, steamed milk, and foam.", price: 3.9, category: "coffee", image: img(312418), sortOrder: 4 },
  { slug: "mocha-latte", name: "Mocha Latte", description: "Café latte with chocolate.", price: 3.9, category: "coffee", image: img(926361), sortOrder: 5 },
  { slug: "americano", name: "Americano", description: "Espresso and hot water.", price: 2.7, category: "coffee", image: img(1036444), sortOrder: 6 },
  { slug: "macchiato", name: "Macchiato", description: "Espresso marked with foam.", price: 3.0, category: "coffee", image: photo("photo-1485808191679-5f86510681a2"), sortOrder: 7 },
  { slug: "red-eye", name: "Red Eye", description: "Fresh roasted coffee with a shot of espresso.", price: 3.2, category: "coffee", image: photo("photo-1442512595331-e89e73853f31"), sortOrder: 8 },
  { slug: "hot-chocolate", name: "Hot Chocolate", description: "Steamed milk and chocolate.", price: 3.3, category: "coffee", image: img(6113390), sortOrder: 9 },
  { slug: "cappawappacino", name: "Cappawappacino Latte", description: "Caramel, cinnamon, hazelnut, and vanilla.", price: 4.75, category: "coffee", image: img(312420), tag: "Fan Favorite", featured: true, sortOrder: 10 },
  { slug: "caramel-turtle", name: "Caramel Turtle Latte", description: "Almond Roca, caramel, and chocolate.", price: 4.75, category: "coffee", image: photo("photo-1517701604599-bb29b565090c"), sortOrder: 11 },
  { slug: "nutty-irishman", name: "Nutty Irishman Latte", description: "Hazelnut and Irish cream.", price: 4.75, category: "coffee", image: img(3627560), sortOrder: 12 },
  { slug: "chunky-monkey", name: "Chunky Monkey Latte", description: "Banana and chocolate.", price: 4.75, category: "coffee", image: photo("photo-1572490122747-3968b75cc699"), sortOrder: 13 },
  { slug: "sassy-seth", name: "The Sassy Seth Latte", description: "Almond Roca, caramel, and vanilla.", price: 4.75, category: "coffee", image: img(7240978), sortOrder: 14 },
  { slug: "vanilla-bean-bomber", name: "Vanilla Bean Java Bomber", description: "Steamed cream, double espresso, vanilla syrup, whipped cream.", price: 4.2, category: "coffee", image: photo("photo-1579888071069-c107a6f79d82"), sortOrder: 15 },
  { slug: "mocha-roca-javachino", name: "Mocha Roca Javachino", description: "Almond roca and chocolate blended with espresso, cream, and ice.", price: 5.7, category: "coffee", image: img(1405750), sortOrder: 16 },
  // Tea
  { slug: "chai-latte", name: "Chai Latte", description: "Vanilla chai tea, cinnamon, and vanilla. Honey included.", price: 4.75, category: "tea", image: img(1417945), sortOrder: 17 },
  { slug: "london-fog", name: "London Fog Tea Latte", description: "Earl grey tea, cinnamon, and vanilla. Honey included.", price: 4.75, category: "tea", image: photo("photo-1544787219-7f47ccb76574"), sortOrder: 18 },
  { slug: "mo-chai", name: "Mo Chai Tea Latte", description: "Chai latte with chocolate. Honey included.", price: 4.75, category: "tea", image: photo("photo-1571934811356-5cc061b6821f"), sortOrder: 19 },
  { slug: "organic-black-tea", name: "Black Organic Loose-Leaf Tea", description: "Organic loose-leaf black tea, brewed to order.", price: 3.6, category: "tea", image: photo("photo-1499638673689-79a0b5115d87"), sortOrder: 20 },
  { slug: "organic-green-tea", name: "Green Organic Loose-Leaf Tea", description: "Organic loose-leaf green tea, brewed to order.", price: 3.6, category: "tea", image: photo("photo-1564890369478-c89ca6d9cde9"), sortOrder: 21 },
  // Breakfast
  { slug: "eggs-cheese-sandwich", name: "Eggs and Cheese Sandwich", description: "Home-baked eggs and cheese on croissant, bagel, or bread. Served with fresh fruit.", price: 9.6, category: "breakfast", image: photo("photo-1528735602780-2552fd46c7af"), tag: "Best Seller", featured: true, sortOrder: 22 },
  { slug: "breakfast-quesadilla", name: "Breakfast Quesadilla", description: "Home-baked eggs and cheese in a folded quesadilla. Served with fresh fruit.", price: 8.5, category: "breakfast", image: photo("photo-1618040996337-56904b7850b9"), tag: "Best Seller", sortOrder: 23 },
  { slug: "sarahs-wrap", name: "Sarah's Psychedelic Breakfast Wrap", description: "Mushrooms, tomatoes, and cheese. Served with fresh fruit.", price: 8.5, category: "breakfast", image: photo("photo-1626700051175-6818013e1d4f"), sortOrder: 24 },
  { slug: "wap-wrap", name: "WAP Breakfast Wrap", description: "Roasted red peppers, artichokes, and cheese. Served with fresh fruit.", price: 6.95, category: "breakfast", image: photo("photo-1604909052743-94e838986d24"), sortOrder: 25 },
  { slug: "pigwich", name: "Pigwich Specialties", description: "Eggs, bacon, ham, cheese, and mayo on a croissant.", price: 9.95, category: "breakfast", image: img(139746), sortOrder: 26 },
  { slug: "professor-specialties", name: "Professor Specialties", description: "Croissant with melted butter, cinnamon, and sugar.", price: 4.8, category: "breakfast", image: img(14587648), sortOrder: 27 },
  { slug: "granola-parfait", name: "Granola Yogurt Parfait", description: "House-made granola layered with yogurt.", price: 8.35, category: "breakfast", image: photo("photo-1488477181946-6428a0291777"), sortOrder: 28 },
  { slug: "oatmeal", name: "Oatmeal", description: "Hot oatmeal, made to order.", price: 8.35, category: "breakfast", image: photo("photo-1517673400267-0251440c45dc"), sortOrder: 29 },
  // Baked goods
  { slug: "cinnamon-bun", name: "Cinnamon Bun", description: "Fresh-baked daily in-house.", price: 3.5, category: "baked-goods", image: img(776314), tag: "Baked Fresh", sortOrder: 30 },
  { slug: "brownie", name: "Brownie", description: "Flavors rotate daily — ask your barista what's fresh.", price: 3.9, category: "baked-goods", image: photo("photo-1606313564200-e75d5e30476c"), sortOrder: 31 },
  { slug: "awesome-bar", name: "Awesome Bar", description: "Almond flour crust, raspberry jam, toasted coconut and almond crumble. Vegan & gluten free.", price: 3.95, category: "baked-goods", image: photo("photo-1627308595229-7830a5c91f9f"), sortOrder: 32 },
  { slug: "heavenly-oat-bar", name: "Heavenly Oat Bar", description: "Oatmeal and maple syrup crust with vegan chocolate and peanut butter. Vegan & gluten free.", price: 3.95, category: "baked-goods", image: photo("photo-1603532648955-039310d9ed75"), sortOrder: 33 },
  { slug: "muffin", name: "Muffin", description: "Flavors rotate daily — call ahead to see what's in the case.", price: 3.5, category: "baked-goods", image: photo("photo-1607958996333-41aef7caefaa"), sortOrder: 34 },
  { slug: "scone", name: "Scone", description: "Flavors rotate daily — baked fresh every morning.", price: 3.5, category: "baked-goods", image: photo("photo-1509440159596-0249088772ff"), sortOrder: 35 },
  // Lunch
  { slug: "pesto-chicken-panini", name: "Simon's Pesto Chicken Panini", description: "Roasted chicken, spinach, tomato, pesto, and cheese on white. Served with chips.", price: 15.6, category: "lunch", image: photo("photo-1528736235302-52922df5c122"), sortOrder: 36 },
  { slug: "professor-veggie-panini", name: "Professor Veggie Panini", description: "Spinach, tomato, mushrooms, onion, pesto, and cheese on white. Served with chips.", price: 15.6, category: "lunch", image: photo("photo-1528735602780-2552fd46c7af"), sortOrder: 37 },
  { slug: "blt", name: "Jessa's BLT Sandwich", description: "Bacon, tomato, lettuce, and mayo on toasted wheat. Served with chips.", price: 15.6, category: "lunch", image: photo("photo-1553909489-cd47e0ef937f"), sortOrder: 38 },
  { slug: "space-monkey-panini", name: "The Space Monkey Panini", description: "Turkey, ham, Thousand Island, roasted red peppers, and Swiss. Served with chips.", price: 15.6, category: "lunch", image: photo("photo-1509722747041-616f39b57569"), sortOrder: 39 },
  { slug: "cup-of-soup", name: "Cup of Soup", description: "Soup of the day — ask what's on the board.", price: 4.5, category: "lunch", image: photo("photo-1547592166-23ac45744acd"), sortOrder: 40 },
  { slug: "house-salad", name: "House Salad", description: "Romaine, tomatoes, onions, cucumbers, and balsamic vinaigrette.", price: 11.95, category: "lunch", image: photo("photo-1512621776951-a57141f2eefd"), sortOrder: 41 },
  { slug: "vegan-chili", name: "Vegan Chili", description: "Served with pita chips and fresh fruit.", price: 9.95, category: "lunch", image: photo("photo-1604908176997-125f25cc6f3d"), sortOrder: 42 },
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
