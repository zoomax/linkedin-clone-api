import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Observable, of, switchMap } from 'rxjs';
import { JwtGuard } from 'src/auth/Guards/auth.guard';
import { UpdateResult } from 'typeorm';
// import {
//   isValidFileType,
//   removeFile,
//   saveFileToStorageOptions,
// } from '../helpers/file-upload.helper';
// import { saveFileToStorageOptions } from '../helpers/file-upload.helper';
import { UserService } from '../Providers/user.service';
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Observable<UpdateResult | { error: string }> {
    const fileName: string = file?.filename;
    console.log(file);
    if (!fileName) return of({ error: 'file msut be a png , jpg/jpeg' });
  }
}
