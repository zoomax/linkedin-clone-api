// import { diskStorage } from 'multer';
// import { v4 as uuid } from 'uuid';
// import * as fs from 'fs';
// import * as path from 'path';
// import * as FileType from 'file-type';
// import { from, Observable, of, switchMap } from 'rxjs';
// import { request } from 'express';

// type ValidFileExtentions = 'jpeg' | 'png' | 'jpg';
// type ValidMimeType = 'image/jpeg' | 'image/png' | 'image/jpg';

// const validFileExtentions: ValidFileExtentions[] = ['jpeg', 'png', 'jpg'];
// const validMimeType: ValidMimeType[] = ['image/jpeg', 'image/png', 'image/jpg'];
// console.log(__dirname);
// export const saveFileToStorageOptions = {
//   storage: diskStorage({
//     destination: __dirname + '../../../../images',
//     filename: (req, file, cb) => {
//       const fileExtention: string = path.extname(file.originalname);
//       const fileName: string = `${uuid()}${fileExtention}`;
//       cb(null, fileName);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     const allowedMimeType: ValidMimeType[] = validMimeType;
//     allowedMimeType.includes(file.mimeType) ? cb(null, true) : cb(null, false);
//   },
// };
// export const isValidFileType = (fileFullName: string): Observable<boolean> => {
//   return from(FileType.fileTypeFromFile(fileFullName)).pipe(
//     switchMap((fileMimeTypeAndExtention: { ext: string; mime: string }) => {
//       if (!fileMimeTypeAndExtention) return of(false);
//       const isFileTypeLegit = validFileExtentions.includes(
//         <ValidFileExtentions>fileMimeTypeAndExtention.ext,
//       );
//       const isMimeTypeLegit = validMimeType.includes(
//         <ValidMimeType>fileMimeTypeAndExtention.ext,
//       );

//       const isValidFile = isFileTypeLegit && isMimeTypeLegit;
//       return of(isValidFile);
//     }),
//   );
// };

// export const removeFile = (filePath: string) => {
//   try {
//     fs.unlinkSync(filePath);
//   } catch (error) {
//     console.error(error);
//   }
// };
