import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = diskStorage({
    destination: (req, file, cb) => {
      cb(null, `src/uploads/`); // Specify the directory where files will be stored
    },
    filename: (req, file, cb) => {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null,file.originalname);
    },
  });

