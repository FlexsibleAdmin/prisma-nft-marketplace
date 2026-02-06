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
}
export const MOCK_NFTS: NFT[] = [
  {
    id: '1',
    title: 'Cosmic Perspective #42',
    artist: 'NebulaArt',
    price: 1.25,
    image: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=800&auto=format&fit=crop',
    category: 'Digital Art',
    likes: 245,
    endsIn: '12h 45m',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60'
  },
  {
    id: '2',
    title: 'Neon Genesis',
    artist: 'CyberPunk',
    price: 0.85,
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop',
    category: 'Virtual Worlds',
    likes: 189,
    endsIn: '04h 20m',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=60'
  },
  {
    id: '3',
    title: 'Abstract Thoughts',
    artist: 'MindFlow',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
    category: 'Art',
    likes: 562,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60'
  },
  {
    id: '4',
    title: 'Future City 2099',
    artist: 'ArchiTech',
    price: 3.15,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    category: 'Photography',
    likes: 321,
    endsIn: '1d 02h',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60'
  },
  {
    id: '5',
    title: 'Ethereal Dreams',
    artist: 'DreamWeaver',
    price: 0.55,
    image: 'https://images.unsplash.com/photo-1614730341194-75c607400070?q=80&w=800&auto=format&fit=crop',
    category: 'Digital Art',
    likes: 124,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60'
  },
  {
    id: '6',
    title: 'Geometric Harmony',
    artist: 'ShapeShifter',
    price: 1.80,
    image: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=800&auto=format&fit=crop',
    category: 'Art',
    likes: 412,
    endsIn: '08h 15m',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60'
  },
  {
    id: '7',
    title: 'Cyber Samurai',
    artist: 'Ronin',
    price: 4.20,
    image: 'https://images.unsplash.com/photo-1614728853970-32a227f7d373?q=80&w=800&auto=format&fit=crop',
    category: 'Collectibles',
    likes: 890,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60'
  },
  {
    id: '8',
    title: 'Liquid Metal',
    artist: 'Alchemist',
    price: 0.95,
    image: 'https://images.unsplash.com/photo-1618557119971-609f08850f55?q=80&w=800&auto=format&fit=crop',
    category: '3D Art',
    likes: 276,
    endsIn: '2d 10h',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60'
  }
];