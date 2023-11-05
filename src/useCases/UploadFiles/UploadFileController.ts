import { NextFunction, Request, Response } from "express";
import { UploadFileUseCase } from "./UploadFileUseCase";
import { FileNotSentError } from "../../middleware/errorHandler/CustomErrors";

export class UploadFileController {
  constructor(private uploadFileUseCase: UploadFileUseCase) {}

  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { file } = request;

      if (!file) {
        throw new FileNotSentError();
      }

      await this.uploadFileUseCase.execute(file.buffer, file.originalname);

      return response.status(200).json({
        message: "The file was uploaded successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}
