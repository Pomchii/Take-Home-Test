import { UploadFileDTO } from "../../useCases/UploadFiles/UploadFileDTO";
import { IUploadFileRepository } from "../IUploadFileRepository";

const csvFile: UploadFileDTO[] = [];

export class UploadFileRepository implements IUploadFileRepository {
  async saveFile(file: UploadFileDTO) {
    csvFile.push(file);
  }

  async getDataFromQueryString(query: string) {
    const querySearch = query.toLocaleLowerCase();

    const data = csvFile.filter((item) =>
      Object.values(item).some((value) => {
        if (typeof value === "string") {
          value = value.toLocaleLowerCase();
        }

        return value === querySearch;
      })
    );

    return data;
  }
}
