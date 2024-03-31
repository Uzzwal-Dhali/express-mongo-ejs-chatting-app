import multer from "multer"
import path from "path"
import { dirname } from "path"
import createError from "http-errors"
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  // const UPLOADS_FOLDER = path.join(__dirname, `/../../public/uploads/${ subfolder_path }`)
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${ subfolder_path }/`
  // const UPLOADS_FOLDER = path.dirname('../public/uploads', subfolder_path, '/');


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER)
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname)
      const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("_") + "_" + Date.now()
      cb(null, fileName + fileExt)
    }
  })

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if(allowed_file_types.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(createError(error_msg))
      }
    }
  })

  return upload
}

export default uploader
