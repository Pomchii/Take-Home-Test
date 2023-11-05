import { Router } from "express";
import multer from "multer";
import { uploadFileController } from "./useCases/UploadFiles";
import { searchFileController } from "./useCases/SearchFiles";

export const router = Router();

const multerConfig = multer();

router.post(
  "/api/files",
  multerConfig.single("file"),
  (request, response, next) => {
    return uploadFileController.execute(request, response, next);
  }
);

router.get("/api/users", (request, response, next) => {
  return searchFileController.execute(request, response, next);
});
