import { SearchFileController } from "./SearchFileController";
import { SearchFileUseCase } from "./SearchFileUseCase";
import { UploadFileRepository } from "../../repositories/implementations/UploadFileRepository";

const uploadFileRepository = new UploadFileRepository();

const searchFileUseCase = new SearchFileUseCase(uploadFileRepository);

const searchFileController = new SearchFileController(searchFileUseCase);

export { searchFileController, searchFileUseCase };
