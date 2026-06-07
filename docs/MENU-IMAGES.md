# Menu image reference

## Recommended size

| Use | Size | Aspect ratio |
|-----|------|--------------|
| Menu cards | **600 × 480 px** | 5:4 |
| Home featured | **600 × 750 px** | 4:5 (crop from 600×480 works) |

Store image URLs in MongoDB (`MenuItem.image`). Restart the API to sync seed URLs, or update directly in Atlas.

## Current seed URLs (Pexels, free to use)

### Featured (home page)
| Item | URL |
|------|-----|
| Café Latte | https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?w=600&h=480&fit=crop |
| Cappawappacino Latte | https://images.pexels.com/photos/312420/pexels-photo-312420.jpeg?w=600&h=480&fit=crop |
| Eggs and Cheese Sandwich | https://images.pexels.com/photos/6529912/pexels-photo-6529912.jpeg?w=600&h=480&fit=crop |

### Coffee
| Slug | URL |
|------|-----|
| cafe-latte | https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?w=600&h=480&fit=crop |
| fresh-roasted-coffee | https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?w=600&h=480&fit=crop |
| espresso | https://images.pexels.com/photos/30678777/pexels-photo-30678777.jpeg?w=600&h=480&fit=crop |
| cappuccino | https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?w=600&h=480&fit=crop |
| mocha-latte | https://images.pexels.com/photos/926361/pexels-photo-926361.jpeg?w=600&h=480&fit=crop |
| americano | https://images.pexels.com/photos/1036444/pexels-photo-1036444.jpeg?w=600&h=480&fit=crop |
| macchiato | https://images.pexels.com/photos/685527/pexels-photo-685527.jpeg?w=600&h=480&fit=crop |
| red-eye | https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?w=600&h=480&fit=crop |
| hot-chocolate | https://images.pexels.com/photos/6113390/pexels-photo-6113390.jpeg?w=600&h=480&fit=crop |
| cappawappacino | https://images.pexels.com/photos/312420/pexels-photo-312420.jpeg?w=600&h=480&fit=crop |
| caramel-turtle | https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?w=600&h=480&fit=crop |
| nutty-irishman | https://images.pexels.com/photos/3627560/pexels-photo-3627560.jpeg?w=600&h=480&fit=crop |
| chunky-monkey | https://images.pexels.com/photos/3756622/pexels-photo-3756622.jpeg?w=600&h=480&fit=crop |
| sassy-seth | https://images.pexels.com/photos/7240978/pexels-photo-7240978.jpeg?w=600&h=480&fit=crop |
| vanilla-bean-bomber | https://images.pexels.com/photos/16767017/pexels-photo-16767017.jpeg?w=600&h=480&fit=crop |
| mocha-roca-javachino | https://images.pexels.com/photos/1405750/pexels-photo-1405750.jpeg?w=600&h=480&fit=crop |

### Where to find your own
- [Pexels — coffee](https://www.pexels.com/search/coffee/)
- [Pexels — breakfast sandwich](https://www.pexels.com/search/breakfast%20sandwich/)
- [Pexels — pastry](https://www.pexels.com/search/pastry/)

Paste any direct image URL into the `image` field in MongoDB for that menu item.
