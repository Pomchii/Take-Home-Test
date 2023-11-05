import { UploadFileRepository } from "../../repositories/implementations/UploadFileRepository";
import { UploadFileController } from "./UploadFileController";
import { UploadFileUseCase } from "./UploadFileUseCase";

const uploadFileRepository = new UploadFileRepository();

const uploadFileUseCase = new UploadFileUseCase(uploadFileRepository);

const uploadFileController = new UploadFileController(uploadFileUseCase);

export { uploadFileUseCase, uploadFileController };
