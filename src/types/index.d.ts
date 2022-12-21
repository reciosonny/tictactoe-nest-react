export {};

declare global {
  namespace Express {
    interface Request {
      selected: string;
    }
  }
}