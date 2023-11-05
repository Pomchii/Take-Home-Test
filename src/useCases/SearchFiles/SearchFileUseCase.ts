import { NotFoundError } from "../../middleware/errorHandler/CustomErrors";
import { UploadFileRepository } from "../../repositories/implementations/UploadFileRepository";
import { UploadFileDTO } from "../UploadFiles/UploadFileDTO";

export class SearchFileUseCase {
  constructor(private uploadFileRepository: UploadFileRepository) {}

  public async execute(queryParam: string) {
    const data = await this.uploadFileRepository.getDataFromQueryString(
      queryParam
    );

    this.validateData(data);

    return data;
  }

  private validateData(data: UploadFileDTO[]) {
    if (data.length <= 0) {
      throw new NotFoundError();
    }
  }
}
