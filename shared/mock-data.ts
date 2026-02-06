import type { User, Chat, ChatMessage, NFT, UserProfile } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'User A' },
  { id: 'u2', name: 'User B' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'General' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello', ts: Date.now() },
];
// Rich NFT Data
export const MOCK_NFTS: NFT[] = [
  {
    id: "1",
    title: "Cosmic Perspective #42",
    description: "A journey through the digital cosmos, exploring the boundaries of generative art and space exploration.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    artist: "Nebula_Art",
    collection: "Cosmic Voyages",
    owner: "CryptoKing",
    price: 2.5,
    likes: 124,
    endsIn: "12h 30m",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60",
    attributes: [
      { trait_type: "Background", value: "Deep Space", rarity: 5 },
      { trait_type: "Core", value: "Singularity", rarity: 2 },
      { trait_type: "Style", value: "Abstract", rarity: 15 }
    ],
    priceHistory: [
      { date: "Jan", price: 1.2 },
      { date: "Feb", price: 1.8 },
      { date: "Mar", price: 1.5 },
      { date: "Apr", price: 2.5 }
    ]
  },
  {
    id: "2",
    title: "Neon Genesis",
    description: "Cyberpunk aesthetics meeting classical sculpture in a digital realm.",
    image: "https://images.unsplash.com/photo-1633104506283-81b054ce4048?q=80&w=1000&auto=format&fit=crop",
    artist: "CyberPunk_X",
    collection: "Future Relics",
    owner: "0xAlice",
    price: 1.8,
    likes: 89,
    endsIn: "2d 4h",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=60",
    attributes: [
      { trait_type: "Material", value: "Neon Glass", rarity: 8 },
      { trait_type: "Era", value: "2077", rarity: 12 }
    ],
    priceHistory: [
      { date: "Jan", price: 0.8 },
      { date: "Feb", price: 1.1 },
      { date: "Mar", price: 1.8 }
    ]
  },
  {
    id: "3",
    title: "Ethereal Dreams",
    description: "Soft colors and flowing shapes representing the dream state.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb39279c42?q=80&w=1000&auto=format&fit=crop",
    artist: "DreamWeaver",
    collection: "Mindscapes",
    owner: "SleepyHead",
    price: 0.5,
    likes: 256,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
    attributes: [
      { trait_type: "Mood", value: "Calm", rarity: 20 },
      { trait_type: "Palette", value: "Pastel", rarity: 25 }
    ],
    priceHistory: [
      { date: "Jan", price: 0.2 },
      { date: "Feb", price: 0.4 },
      { date: "Mar", price: 0.5 }
    ]
  },
  {
    id: "4",
    title: "Geometric Harmony",
    description: "Perfectly balanced geometric shapes in high contrast.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    artist: "Math_Wiz",
    collection: "Euclidean",
    owner: "ShapeShifter",
    price: 3.2,
    likes: 45,
    endsIn: "5h 15m",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
    attributes: [
      { trait_type: "Shape", value: "Dodecahedron", rarity: 1 },
      { trait_type: "Color", value: "Monochrome", rarity: 10 }
    ],
    priceHistory: [
      { date: "Jan", price: 2.0 },
      { date: "Feb", price: 2.8 },
      { date: "Mar", price: 3.2 }
    ]
  },
  {
    id: "5",
    title: "Digital Flora",
    description: "Procedurally generated plant life from an alien world.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
    artist: "Bio_Hacker",
    collection: "XenoBotany",
    owner: "GreenThumb",
    price: 1.1,
    likes: 167,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60",
    attributes: [
      { trait_type: "Species", value: "Luminescent", rarity: 7 },
      { trait_type: "Habitat", value: "Void", rarity: 15 }
    ],
    priceHistory: [
      { date: "Jan", price: 0.9 },
      { date: "Feb", price: 1.0 },
      { date: "Mar", price: 1.1 }
    ]
  },
  {
    id: "6",
    title: "Urban Glitch",
    description: "Cityscapes distorted by digital noise and signal decay.",
    image: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1000&auto=format&fit=crop",
    artist: "Glitch_Mob",
    collection: "Decay",
    owner: "CitySlicker",
    price: 0.9,
    likes: 78,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
    attributes: [
      { trait_type: "Distortion", value: "Heavy", rarity: 30 },
      { trait_type: "Location", value: "Tokyo", rarity: 5 }
    ],
    priceHistory: [
      { date: "Jan", price: 0.5 },
      { date: "Feb", price: 0.7 },
      { date: "Mar", price: 0.9 }
    ]
  },
  {
    id: "7",
    title: "Abstract Fluidity",
    description: "Liquid simulations frozen in time.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop",
    artist: "Flow_State",
    collection: "Liquids",
    owner: "AquaMan",
    price: 4.5,
    likes: 312,
    endsIn: "1d 12h",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    attributes: [
      { trait_type: "Viscosity", value: "High", rarity: 10 },
      { trait_type: "Color", value: "Gold", rarity: 2 }
    ],
    priceHistory: [
      { date: "Jan", price: 3.5 },
      { date: "Feb", price: 4.0 },
      { date: "Mar", price: 4.5 }
    ]
  },
  {
    id: "8",
    title: "Retro Wave",
    description: "80s inspired synthwave aesthetics.",
    image: "https://images.unsplash.com/photo-1535189043414-47a3c49a0bed?q=80&w=1000&auto=format&fit=crop",
    artist: "Synth_Pop",
    collection: "Nostalgia",
    owner: "RetroGamer",
    price: 0.75,
    likes: 156,
    avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100&auto=format&fit=crop&q=60",
    attributes: [
      { trait_type: "Vibe", value: "Chill", rarity: 50 },
      { trait_type: "Colors", value: "Neon", rarity: 40 }
    ],
    priceHistory: [
      { date: "Jan", price: 0.6 },
      { date: "Feb", price: 0.7 },
      { date: "Mar", price: 0.75 }
    ]
  }
];
export const MOCK_USER_PROFILE: UserProfile = {
  id: "current-user",
  name: "Demo User",
  handle: "@demo_user",
  bio: "Digital collector and enthusiast. Exploring the Prisma marketplace.",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=60",
  cover: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop",
  address: "0x71C...9A21",
  joined: "March 2024",
  stats: {
    collected: 12,
    created: 5,
    favorited: 42
  }
};