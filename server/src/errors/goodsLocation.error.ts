export class GoodsLocationNotFoundError extends Error {
  constructor(id: number) {
    super(`Location (${id}) is not found.`);
  }
}
