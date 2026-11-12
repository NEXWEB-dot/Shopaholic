/**
 * Shopaholic Product Catalog
 * Authentic inventory from @shopaholicsden1
 */

const SHOPAHOLIC_PRODUCTS = [
    {
        id: 'pink-butterfly-necklace',
        name: 'Pink Butterfly Necklace',
        brand: 'Shopaholic',
        category: 'butterfly',
        categoryName: 'Butterfly Collection',
        price: 499,
        oldPrice: 650,
        images: [
            { url: 'assets/images/pink-butterfly-necklace.webp', color: 'Pink' }
        ],
        colors: ['Pink', 'Gold'],
        isNew: true,
        featured: true,
        rating: 5.0,
        reviewsCount: 18,
        description: 'Embrace whimsical elegance with our signature Pink Butterfly Necklace. Featuring a beautifully contoured pastel pink marbled acrylic butterfly suspended on a shimmering gold-tone link chain, this necklace is the perfect blend of playful charm and modern feminine style.',
        features: [
            'Dainty gold-plated link chain with secure lobster clasp',
            'Pastel pink marbled acrylic butterfly pendant',
            'Lightweight, skin-friendly, and hypoallergenic',
            'Adjustable chain length: 45 cm + 5 cm extender',
            'Exclusive piece from @shopaholicsden1 collection'
        ]
    },
    {
        id: 'yellow-butterfly-necklace',
        name: 'Yellow Butterfly Necklace',
        brand: 'Shopaholic',
        category: 'butterfly',
        categoryName: 'Butterfly Collection',
        price: 499,
        oldPrice: 650,
        images: [
            { url: 'assets/images/yellow-butterfly-necklace.webp', color: 'Yellow' }
        ],
        colors: ['Yellow', 'Gold'],
        isNew: true,
        featured: true,
        rating: 4.9,
        reviewsCount: 14,
        description: 'Radiate joyful sunshine and playful warmth with our Yellow Butterfly Necklace. Designed with a smooth glowing yellow acrylic butterfly pendant on an exquisite gold chain, it brings an instant pop of color to both casual and festive looks.',
        features: [
            'Warm radiant yellow acrylic butterfly pendant',
            'High-shine gold finish link chain',
            'Adjustable fit: 45 cm + 5 cm extension',
            'Tarnish-resistant with proper care',
            'Perfect for layering with choker chains'
        ]
    },
    {
        id: 'black-heart-necklace',
        name: 'Black Heart Necklace',
        brand: 'Shopaholic',
        category: 'heart',
        categoryName: 'Heart Pendants',
        price: 480,
        oldPrice: 600,
        images: [
            { url: 'assets/images/black-heart-necklace.webp', color: 'Black' }
        ],
        colors: ['Black', 'Gold'],
        isNew: false,
        featured: true,
        rating: 4.8,
        reviewsCount: 29,
        description: 'Timeless, chic, and endlessly versatile. The Black Heart Necklace features a glossy black onyx-style heart framed by delicate beaded gold metal detailing on a dainty chain. A must-have staple for everyday luxury.',
        features: [
            'Glossy black enamel/onyx style heart pendant',
            'Fine beaded vintage-style gold rim',
            'Dainty chain with 40 cm + 5 cm extension',
            'Effortless pairing for everyday elegance',
            'Original design by @shopaholicsden1'
        ]
    },
    {
        id: 'white-heart-necklace',
        name: 'White Heart Necklace',
        brand: 'Shopaholic',
        category: 'heart',
        categoryName: 'Heart Pendants',
        price: 480,
        oldPrice: 600,
        images: [
            { url: 'assets/images/white-heart-necklace.webp', color: 'White' }
        ],
        colors: ['White', 'Gold'],
        isNew: false,
        featured: true,
        rating: 4.9,
        reviewsCount: 22,
        description: 'Purity meets modern glamour. The White Heart Necklace showcases a pearlescent white heart enclosed in an exquisite textured gold-plated rim. Pair it effortlessly with daytime casuals or evening glam.',
        features: [
            'Lustrous pearlescent white heart stone',
            'Textured gold-tone bezel border',
            'Versatile 40 cm + 5 cm chain',
            'Lightweight and comfortable for all-day wear',
            'Gift-ready piece from Shopaholic'
        ]
    },
    {
        id: 'crystal-heart-necklace',
        name: 'Crystal Heart Necklace',
        brand: 'Shopaholic',
        category: 'heart',
        categoryName: 'Heart Pendants',
        price: 480,
        oldPrice: 650,
        images: [
            { url: 'assets/images/crystal-heart-necklace.webp', color: 'Crystal' }
        ],
        colors: ['Crystal', 'Gold'],
        isNew: true,
        featured: true,
        rating: 5.0,
        reviewsCount: 35,
        description: 'Sparkle with every turn of your head. This breathtaking necklace features a faceted, brilliant-cut heart crystal that catches the light mesmerizingly. Crafted on a fine shimmering gold chain.',
        features: [
            'High-grade multifaceted brilliant zircon crystal',
            'Minimalist 3-prong gold setting for maximum light refraction',
            'Shimmering gold cable chain (42 cm + 5 cm)',
            'Adds subtle sparkle to any neckline',
            'Beloved bestselling piece'
        ]
    },
    {
        id: 'dream-catcher-necklace',
        name: 'Dream Catcher Necklace',
        brand: 'Shopaholic',
        category: 'statement',
        categoryName: 'Statement & Charms',
        price: 480,
        oldPrice: 650,
        images: [
            { url: 'assets/images/dream-catcher-necklace.webp', color: 'Turquoise' }
        ],
        colors: ['Turquoise', 'Gold'],
        isNew: false,
        featured: false,
        rating: 4.9,
        reviewsCount: 19,
        description: 'Embrace bohemian elegance and positive energy. Designed with an intricate webbed circular medallion, turquoise accent beads, and three delicately engraved cascading feather charms that sway gracefully with your movement.',
        features: [
            'Intricate filigree dream-catcher circular motif',
            'Three articulated engraved feather charms',
            'Vibrant turquoise gemstone bead accents',
            'Bohemian vintage gold aesthetic',
            'Chain length: 45 cm + 5 cm extension'
        ]
    },
    {
        id: 'chunky-chain-coin-necklace',
        name: 'Chunky Chain Coin Layered Necklace',
        brand: 'Shopaholic',
        category: 'layered',
        categoryName: 'Layered & Chains',
        price: 1450,
        oldPrice: 1850,
        images: [
            { url: 'assets/images/chunky-chain-coin-necklace.webp', color: 'Gold' }
        ],
        colors: ['Gold'],
        isNew: true,
        featured: true,
        rating: 5.0,
        reviewsCount: 41,
        description: 'Make a bold statement with this curated multi-tier layered necklace. Combining a bold chunky curb chain, an intermediate cable chain, and an antique-inspired royal coin medallion on an elongated drop chain—giving you a flawless runway look with a single clasp.',
        features: [
            'Triple-tier layered necklace connected to one easy clasp',
            'Heavy-duty polished chunky curb chain top layer',
            'Antique embossed portrait coin medallion drop',
            'Rich, durable high-polish gold plating',
            'Runway-inspired statement piece'
        ]
    },
    {
        id: 'arabic-calligraphy-necklace',
        name: 'Arabic Calligraphy Necklace',
        brand: 'Shopaholic',
        category: 'statement',
        categoryName: 'Statement & Charms',
        price: 1450,
        oldPrice: 1950,
        images: [
            { url: 'assets/images/arabic-calligraphy-necklace.webp', color: 'Pearl' }
        ],
        colors: ['Pearl', 'Gold'],
        isNew: true,
        featured: true,
        rating: 5.0,
        reviewsCount: 47,
        description: 'An extraordinary royal masterpiece celebrating artistic heritage and modern luxury. Features a multi-layered pearl bead strand holding an ornate openwork geometric pendant with dual-tone Arabic calligraphy, crowned and bordered with lustrous faux pearls.',
        features: [
            'Multi-strand lustrous white pearl bead choker necklace',
            'Intricate cutout Arabic calligraphy geometric pendant',
            'Dual-tone gold and silver openwork lattice design',
            'Surrounded by cultured-style pearl bead borders',
            'Exquisite heirloom statement jewelry piece'
        ]
    }
];

// Quick lookup map
const SHOPAHOLIC_PRODUCTS_MAP = SHOPAHOLIC_PRODUCTS.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
}, {});

// Export to window for global access across scripts
if (typeof window !== 'undefined') {
    window.SHOPAHOLIC_PRODUCTS = SHOPAHOLIC_PRODUCTS;
    window.SHOPAHOLIC_PRODUCTS_MAP = SHOPAHOLIC_PRODUCTS_MAP;
}
