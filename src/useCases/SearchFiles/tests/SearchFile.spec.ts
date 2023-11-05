import { NotFoundError } from "../../../middleware/errorHandler/CustomErrors";
import { UploadFileRepository } from "../../../repositories/implementations/UploadFileRepository";
import { UploadFileDTO } from "../../UploadFiles/UploadFileDTO";
import { SearchFileUseCase } from "../SearchFileUseCase";

describe("UploadFile testing", () => {
  let uploadFileRepository: UploadFileRepository;
  let searchFileUseCase: SearchFileUseCase;

  const storedDataMock = [
    {
      name: "John Doe",
      city: "New York",
      country: "USA",
      favorite_sport: "Basketball",
    },
  ];

  const requestMock = {
    queryParam: "John Doe",
  };

  beforeEach(() => {
    uploadFileRepository = new UploadFileRepository();
    searchFileUseCase = new SearchFileUseCase(uploadFileRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return stored data filtering by query param", async () => {
    jest
      .spyOn(uploadFileRepository, "getDataFromQueryString")
      .mockResolvedValue(storedDataMock);

    await expect(
      searchFileUseCase.execute(requestMock.queryParam)
    ).resolves.toBe(storedDataMock);
  });

  it("should throw a NotFoundError for not found data", async () => {
    jest
      .spyOn(uploadFileRepository, "getDataFromQueryString")
      .mockResolvedValue([]);

    await expect(
      searchFileUseCase.execute(requestMock.queryParam)
    ).rejects.toThrow(new NotFoundError());
  });
});
