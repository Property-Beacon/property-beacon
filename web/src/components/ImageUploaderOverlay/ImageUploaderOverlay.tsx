import { PickerOverlay } from 'filestack-react'

const ACCEPT_MIME = [
  '.pdf',
  'text/*',
  'image/*',
  'video/*',
  'audio/*',
  'image/jpeg',
  'application/*'
] as const

const SOURCE = [
  'url',
  'box',
  'tint',
  'video',
  'audio',
  'gmail',
  'webcam',
  'github',
  'picasa',
  'dropbox',
  'facebook',
  'unsplash',
  'onedrive',
  'instagram',
  'clouddrive',
  'imagesearch',
  'googledrive',
  'googlephotos',
  'customsource',
  'local_file_system',
  'onedriveforbusiness'
] as const

type Source = typeof SOURCE[number]
type Accept = typeof ACCEPT_MIME[number]

type OriginalFile = {
  name: string
  type: string
  size: number
}

export type FailedFile = Error & {
  type: string
  details: unknown
}

type UploadedFile = {
  url: string
  size: number
  handle: string
  source: Source
  status: string
  filename: string
  mimetype: string
  uploadId: string
  originalPath: string
  originalFile: OriginalFile
}

type FileStackResponse = {
  filesFailed: FailedFile[]
  filesUploaded: UploadedFile[]
}

interface Props {
  // Default 5 * 1024 * 1024 = 5MB
  maxSize?: number
  // Default image/*
  accept?: Accept
  // Default 1
  maxFiles?: number
  onClose: () => void
  onOpen?: () => void
  onSuccess: (url: string[]) => void
  onError: (error: FailedFile[]) => void
}

const ImageUploaderOverlay = ({
  onOpen,
  onError,
  onClose,
  onSuccess,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024,
  maxFiles = 1
}: Props) => {
  const handleSuccess = ({ filesUploaded, filesFailed }: FileStackResponse) => {
    if (filesUploaded.length) {
      onSuccess(filesUploaded.map(({ url }) => url))
    }
    if (filesFailed.length) {
      onError(filesFailed)
    }
  }

  return (
    <PickerOverlay
      onError={onError}
      onSuccess={handleSuccess}
      apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
      // https://filestack.github.io/filestack-js/interfaces/pickeroptions.html
      pickerOptions={{
        accept,
        maxSize,
        maxFiles,
        onOpen,
        onClose
      }}
    />
  )
}

export default ImageUploaderOverlay
