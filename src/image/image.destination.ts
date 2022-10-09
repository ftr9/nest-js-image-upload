import * as Multer from 'multer';
import * as Path from 'path';

import { v4 as uuid } from 'uuid';

export const setImageDestination = (destination: string) => {
  return Multer.diskStorage({
    destination: imageDestination(destination),
    filename: imageName,
  });
};

const imageDestination = (destination: string) => {
  return function (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (err: Multer.MulterError, destination: string) => void,
  ) {
    cb(null, destination);
  };
};

const imageName = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (err: Multer.MulterError, destination: string) => void,
) => {
  cb(null, uuid() + Path.extname(file.originalname));
};
