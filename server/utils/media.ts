import { v2 as _cloudinary } from 'cloudinary'

const { cloudinary: { apiKey, apiSecret, cloudName } } = useRuntimeConfig()

_cloudinary.config({
  api_key: apiKey,
  api_secret: apiSecret,
  cloud_name: cloudName,
})

/**
 * Uploads media file to cloudinary.
 * @param filepath path to file.
 * @returns uploaded file data from cloudinary api.
 */
export async function uploadMediaFile(filepath: string) {
  return _cloudinary.uploader.upload(filepath)
}
