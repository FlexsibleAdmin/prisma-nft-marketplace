export interface PricePoint {
  date: string;
  price: number;
}
export interface Attribute {
  trait_type: string;
  value: string;
  rarity?: number; // percentage
}
export interface NFT {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  category: string;
  likes: number;
  endsIn?: string;
  avatar: string;
  description: string;
  attributes: Attribute[];
  priceHistory: PricePoint[];
  owner: string;
  collection: string;
}
export const MOCK_NFTS: NFT[] = [
  {
    id: '1',
    title: 'Cosmic Perspective #42',
    artist: 'NebulaArt',
    owner: 'CryptoKing',
    collection: 'Cosmic Perspectives',
    price: 1.25,
    image: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=800&auto=format&fit=crop',
    category: 'Digital Art',
    likes: 245,
    endsIn: '12h 45m',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60',
    description: 'A journey through the vastness of space, capturing the ethereal beauty of nebulae and distant galaxies. This piece explores the relationship between human consciousness and the infinite universe.',
    attributes: [
      { trait_type: 'Background', value: 'Deep Space', rarity: 12 },
      { trait_type: 'Galaxy Type', value: 'Spiral', rarity: 24 },
      { trait_type: 'Color Palette', value: 'Neon Blue', rarity: 8 },
      { trait_type: 'Stars', value: 'Dense', rarity: 45 }
    ],
    priceHistory: [
      { date: '2024-01-01', price: 0.5 },
      { date: '2024-01-15', price: 0.8 },
      { date: '2024-02-01', price: 0.75 },
      { date: '2024-02-15', price: 1.1 },
      { date: '2024-03-01', price: 1.25 }
    ]
  },
  {
    id: '2',
    title: 'Neon Genesis',
    artist: 'CyberPunk',
    owner: 'FutureWhale',
    collection: 'Neon City',
    price: 0.85,
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop',
    category: 'Virtual Worlds',
    likes: 189,
    endsIn: '04h 20m',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=60',
    description: 'The dawn of a new digital era. Neon Genesis represents the fusion of organic life with cybernetic enhancements in a dystopian future.',
    attributes: [
      { trait_type: 'Environment', value: 'Cyber City', rarity: 15 },
      { trait_type: 'Lighting', value: 'Neon', rarity: 30 },
      { trait_type: 'Mood', value: 'Dystopian', rarity: 20 }
    ],
    priceHistory: [
      { date: '2024-01-01', price: 0.4 },
      { date: '2024-01-20', price: 0.6 },
      { date: '2024-02-10', price: 0.55 },
      { date: '2024-03-01', price: 0.85 }
    ]
  },
  {
    id: '3',
    title: 'Abstract Thoughts',
    artist: 'MindFlow',
    owner: 'ArtCollector99',
    collection: 'Mindscapes',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
    category: 'Art',
    likes: 562,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60',
    description: 'Visualizing the complexity of human thought patterns through abstract geometry and fluid color transitions.',
    attributes: [
      { trait_type: 'Style', value: 'Abstract', rarity: 10 },
      { trait_type: 'Complexity', value: 'High', rarity: 5 },
      { trait_type: 'Emotion', value: 'Calm', rarity: 25 }
    ],
    priceHistory: [
      { date: '2024-01-01', price: 1.5 },
      { date: '2024-01-15', price: 1.8 },
      { date: '2024-02-01', price: 2.2 },
      { date: '2024-03-01', price: 2.5 }
    ]
  },
  {
    id: '4',
    title: 'Future City 2099',
    artist: 'ArchiTech',
    owner: 'BuilderBob',
    collection: 'Future Cities',
    price: 3.15,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    category: 'Photography',
    likes: 321,
    endsIn: '1d 02h',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60',
    description: 'A glimpse into the architectural marvels of the late 21st century. Sustainable, towering, and breathtaking.',
    attributes: [
      { trait_type: 'Era', value: '2099', rarity: 50 },
      { trait_type: 'Location', value: 'Neo Tokyo', rarity: 10 },
      { trait_type: 'Weather', value: 'Clear', rarity: 40 }
    ],
    priceHistory: [
      { date: '2024-01-01', price: 2.0 },
      { date: '2024-02-01', price: 2.8 },
      { date: '2024-03-01', price: 3.15 }
    ]
  },
  {
    id: '5',
    title: 'Ethereal Dreams',
    artist: 'DreamWeaver',
    owner: 'SleepWalker',
    collection: 'Dreamscapes',
    price: 0.55,
    image: 'https://images.unsplash.com/photo-1614730341194-75c607400070?q=80&w=800&auto=format&fit=crop',
    category: 'Digital Art',
    likes: 124,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60',
    description: 'Soft, floating, and surreal. A visual representation of the state between wakefulness and sleep.',
    attributes: [
      { trait_type: 'Theme', value: 'Dream', rarity: 20 },
      { trait_type: 'Colors', value: 'Pastel', rarity: 35 }
    ],
    priceHistory: [
      { date: '2024-01-01', price: 0.2 },
      { date: '2024-02-01', price: 0.4 },
      { date: '2024-03-01', price: 0.55 }
    ]
  },
  {
    id: '6',
    title: 'Geometric Harmony',
    artist: 'ShapeShifter',
    owner: 'MathWiz',
    collection: 'Geometry',
    price: 1.80,
    image: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=800&auto=format&fit=crop',
    category: 'Art',
    likes: 412,
    endsIn: '08h 15m',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60',
    description: 'Perfect balance and symmetry. A study in geometric forms and their interaction with light.',
    attributes: [
      { trait_type: 'Shape', value: 'Polyhedron', rarity: 15 },
      { trait_type: 'Material', value: 'Gold', rarity: 5 }
    ],
    priceHistory: [
      { date: '2024-01-01', price: 1.0 },
      { date: '2024-02-01', price: 1.5 },
      { date: '2024-03-01', price: 1.8 }
    ]
  },
  {
    id: '7',
    title: 'Cyber Samurai',
    artist: 'Ronin',
    owner: 'WarriorOne',
    collection: 'Warriors of Future',
    price: 4.20,
    image: 'https://images.unsplash.com/photo-1614728853970-32a227f7d373?q=80&w=800&auto=format&fit=crop',
    category: 'Collectibles',
    likes: 890,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60',
    description: 'Honor in the digital age. The Cyber Samurai protects the metaverse from corruption.',
    attributes: [
      { trait_type: 'Class', value: 'Samurai', rarity: 5 },
      { trait_type: 'Weapon', value: 'Laser Katana', rarity: 8 },
      { trait_type: 'Armor', value: 'Nano-Fiber', rarity: 12 }
    ],
    priceHistory: [
      { date: '2024-01-01', price: 3.0 },
      { date: '2024-02-01', price: 3.8 },
      { date: '2024-03-01', price: 4.2 }
    ]
  },
  {
    id: '8',
    title: 'Liquid Metal',
    artist: 'Alchemist',
    owner: 'T-1000',
    collection: 'Materials',
    price: 0.95,
    image: 'https://images.unsplash.com/photo-1618557119971-609f08850f55?q=80&w=800&auto=format&fit=crop',
    category: '3D Art',
    likes: 276,
    endsIn: '2d 10h',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60',
    description: 'Fluid, reflective, and constantly changing. A simulation of liquid metal physics.',
    attributes: [
      { trait_type: 'State', value: 'Liquid', rarity: 25 },
      { trait_type: 'Reflectivity', value: '100%', rarity: 10 }
    ],
    priceHistory: [
      { date: '2024-01-01', price: 0.5 },
      { date: '2024-02-01', price: 0.7 },
      { date: '2024-03-01', price: 0.95 }
    ]
  }
];