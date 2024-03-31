import uploader from "../../utilities/singleUploader.js"

function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Unsupported image format!"
  )

  upload.any()(req, res, (err) => {
    if(err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message
          }
        }
      })
    } else {
      next()
    }
  })
}

export default avatarUpload
