export class GoodsNotFoundError extends Error {
  constructor(id: number) {
    super(`Goods (${id}) is not found.`);
  }
}
