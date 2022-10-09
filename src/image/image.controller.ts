import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { setImageDestination } from './image.destination';
import * as Path from 'path';

const fileFilter = (req, file, cb) => {
  //10mb
  const SIZE_IN_MB = 1024 * 1024 * 10;
  if (file.size > SIZE_IN_MB) {
    cb(new HttpException('file size too large', 400), false);
    return;
  }

  //check the correct extension
  const fileExtension = Path.extname(file.originalname);
  if (!fileExtension.match(/jpg|jpeg|png/i)) {
    cb(new HttpException('invalid file type', 400), false);
    return;
  }

  cb(null, true);
};

@Controller('upload/image')
export class ImageController {
  @Post('single')
  @UseInterceptors(
    FileInterceptor('profile', {
      storage: setImageDestination('profile'),
      fileFilter,
    }),
  )
  postSingle(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return {
      message: `${file.originalname} uploaded successfully`,
    };
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('miscImages', 5, {
      storage: setImageDestination('miscImages'),
      fileFilter,
    }),
  )
  postMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return {
      message: `${files.length} files uploaded`,
    };
  }
}
