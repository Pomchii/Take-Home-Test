import { Request, Response } from "express";
import { SearchFileUseCase } from "./SearchFileUseCase";
import { NotFoundError } from "../../middleware/errorHandler/CustomErrors";
import { NextFunction } from "express-serve-static-core";

export class SearchFileController {
  constructor(private searchFileUseCase: SearchFileUseCase) {}

  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const data = await this.searchFileUseCase.execute(
        request.query.q as string
      );

      return response.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}
