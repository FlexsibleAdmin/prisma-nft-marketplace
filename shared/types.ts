export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}
// NFT Marketplace Types
export interface Attribute {
  trait_type: string;
  value: string;
  rarity?: number;
}
export interface PricePoint {
  date: string;
  price: number;
}
export interface NFT {
  id: string;
  title: string;
  description: string;
  image: string;
  artist: string;
  collection: string;
  owner: string;
  price: number;
  likes: number;
  endsIn?: string;
  avatar: string;
  attributes: Attribute[];
  priceHistory: PricePoint[];
}
export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  bio: string;
  avatar: string;
  cover?: string;
  address?: string;
  joined: string;
  stats: {
    collected: number;
    created: number;
    favorited: number;
  };
}