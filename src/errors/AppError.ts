export class AppError {
   public readonly message: string;
   public readonly statusCode: number;
   public readonly item: string;

   constructor(message: string, statusCode = 400, item = "") {
      this.message = message;
      this.statusCode = statusCode;
      this.item = item;
   }
}
