import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity, NFTEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { NFT } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'CF Workers Demo' }}));
  // USERS
  app.get('/api/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await UserEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.post('/api/users', async (c) => {
    const { name } = (await c.req.json()) as { name?: string };
    if (!name?.trim()) return bad(c, 'name required');
    return ok(c, await UserEntity.create(c.env, { id: crypto.randomUUID(), name: name.trim() }));
  });
  // CHATS
  app.get('/api/chats', async (c) => {
    await ChatBoardEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await ChatBoardEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.post('/api/chats', async (c) => {
    const { title } = (await c.req.json()) as { title?: string };
    if (!title?.trim()) return bad(c, 'title required');
    const created = await ChatBoardEntity.create(c.env, { id: crypto.randomUUID(), title: title.trim(), messages: [] });
    return ok(c, { id: created.id, title: created.title });
  });
  // MESSAGES
  app.get('/api/chats/:chatId/messages', async (c) => {
    const chat = new ChatBoardEntity(c.env, c.req.param('chatId'));
    if (!await chat.exists()) return notFound(c, 'chat not found');
    return ok(c, await chat.listMessages());
  });
  app.post('/api/chats/:chatId/messages', async (c) => {
    const chatId = c.req.param('chatId');
    const { userId, text } = (await c.req.json()) as { userId?: string; text?: string };
    if (!isStr(userId) || !text?.trim()) return bad(c, 'userId and text required');
    const chat = new ChatBoardEntity(c.env, chatId);
    if (!await chat.exists()) return notFound(c, 'chat not found');
    return ok(c, await chat.sendMessage(userId, text.trim()));
  });
  // NFTS
  app.get('/api/nfts', async (c) => {
    await NFTEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await NFTEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.post('/api/nfts', async (c) => {
    try {
      const body = await c.req.json() as Partial<NFT>;
      // Basic validation
      if (!body.title?.trim() || !body.image?.trim() || !body.collection?.trim() || body.price === undefined) {
        return bad(c, 'Missing required fields: title, image, collection, price');
      }
      const newId = crypto.randomUUID();
      const newNFT: NFT = {
        id: newId,
        title: body.title.trim(),
        description: body.description?.trim() || '',
        image: body.image.trim(),
        price: Number(body.price),
        collection: body.collection.trim(),
        artist: body.artist || 'Anonymous', // Should be set by client based on auth
        owner: body.owner || body.artist || 'Anonymous',
        likes: 0,
        avatar: body.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60",
        attributes: body.attributes || [
          { trait_type: "Origin", value: "Minted on Prisma" },
          { trait_type: "Edition", value: "1 of 1" }
        ],
        priceHistory: [
          { date: new Date().toLocaleString('default', { month: 'short' }), price: Number(body.price) }
        ]
      };
      const created = await NFTEntity.create(c.env, newNFT);
      return ok(c, created);
    } catch (e) {
      console.error('Failed to create NFT:', e);
      return bad(c, 'Invalid request body');
    }
  });
  app.get('/api/nfts/:id', async (c) => {
    const nft = new NFTEntity(c.env, c.req.param('id'));
    if (!await nft.exists()) return notFound(c, 'NFT not found');
    return ok(c, await nft.getState());
  });
  app.post('/api/nfts/:id/buy', async (c) => {
    const { userId } = (await c.req.json()) as { userId?: string };
    if (!isStr(userId)) return bad(c, 'userId required');
    const nft = new NFTEntity(c.env, c.req.param('id'));
    if (!await nft.exists()) return notFound(c, 'NFT not found');
    const updated = await nft.buy(userId);
    return ok(c, updated);
  });
  // DELETE: Users
  app.delete('/api/users/:id', async (c) => ok(c, { id: c.req.param('id'), deleted: await UserEntity.delete(c.env, c.req.param('id')) }));
  app.post('/api/users/deleteMany', async (c) => {
    const { ids } = (await c.req.json()) as { ids?: string[] };
    const list = ids?.filter(isStr) ?? [];
    if (list.length === 0) return bad(c, 'ids required');
    return ok(c, { deletedCount: await UserEntity.deleteMany(c.env, list), ids: list });
  });
  // DELETE: Chats
  app.delete('/api/chats/:id', async (c) => ok(c, { id: c.req.param('id'), deleted: await ChatBoardEntity.delete(c.env, c.req.param('id')) }));
  app.post('/api/chats/deleteMany', async (c) => {
    const { ids } = (await c.req.json()) as { ids?: string[] };
    const list = ids?.filter(isStr) ?? [];
    if (list.length === 0) return bad(c, 'ids required');
    return ok(c, { deletedCount: await ChatBoardEntity.deleteMany(c.env, list), ids: list });
  });
}