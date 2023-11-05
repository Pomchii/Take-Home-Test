import { FileExtensionNotAllowedError } from "../../../middleware/errorHandler/CustomErrors";
import { UploadFileRepository } from "../../../repositories/implementations/UploadFileRepository";
import { UploadFileUseCase } from "../UploadFileUseCase";

describe("UploadFile testing", () => {
  let uploadFileRepository: UploadFileRepository;
  let uploadFileUseCase: UploadFileUseCase;

  const csvFileMock = {
    file: "name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball",
    fileData: [],
  };

  const requestMock = {
    buffer: Buffer.from(csvFileMock.file),
    fileOriginalName: "test.csv",
  };

  beforeEach(() => {
    uploadFileRepository = new UploadFileRepository();
    uploadFileUseCase = new UploadFileUseCase(uploadFileRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should verify if incoming file has .csv extension", async () => {
    requestMock.fileOriginalName = "test.txt";

    await expect(
      uploadFileUseCase.execute(
        requestMock.buffer,
        requestMock.fileOriginalName
      )
    ).rejects.toThrow(new FileExtensionNotAllowedError());
  });

  it("should check for data update for array to store", async () => {
    requestMock.fileOriginalName = "test.csv";
    const savedFile = jest.spyOn(uploadFileRepository, "saveFile");

    await uploadFileUseCase.execute(
      requestMock.buffer,
      requestMock.fileOriginalName
    );

    expect(savedFile).toHaveBeenCalled();
  });
});
