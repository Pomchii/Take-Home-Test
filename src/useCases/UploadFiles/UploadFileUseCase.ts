import { Readable } from "stream";
import readline from "readline";
import { UploadFileRepository } from "../../repositories/implementations/UploadFileRepository";
import { FileExtensionNotAllowedError } from "../../middleware/errorHandler/CustomErrors";

export class UploadFileUseCase {
  constructor(private uploadFileRepository: UploadFileRepository) {}

  public async execute(buffer: Buffer, originalname: string): Promise<void> {
    this.validateCSVFile(originalname);

    const readFile = new Readable();
    readFile.push(buffer);
    readFile.push(null);

    const lines = readline.createInterface({
      input: readFile,
    });

    const csvFileData = [];

    for await (let line of lines) {
      const objects = line.split(",");
      csvFileData.push(objects);
    }

    csvFileData.shift();

    for (let i = 0; i < csvFileData.length; i++) {
      this.uploadFileRepository.saveFile({
        name: csvFileData[i][0],
        city: csvFileData[i][1],
        country: csvFileData[i][2],
        favorite_sport: csvFileData[i][3],
      });
    }
  }

  private validateCSVFile(incomingFile: string) {
    const allowedFile = [".csv"];

    const fileExtension = incomingFile.split(".").pop()?.toLowerCase();
    if (!allowedFile.includes("." + fileExtension)) {
      throw new FileExtensionNotAllowedError();
    }
  }
}
