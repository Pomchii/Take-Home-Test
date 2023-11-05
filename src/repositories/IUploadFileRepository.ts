import { UploadFileDTO } from "../useCases/UploadFiles/UploadFileDTO";

export interface IUploadFileRepository {
  saveFile(data: UploadFileDTO): Promise<void>;
  getDataFromQueryString(query: string): any;
}
