import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { StorageService } from '../services/storageService';

interface ImageUploadProps {
  onImageChange: (url: string | null) => void;
  folder?: string;
  error?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB for Cloudinary free tier
const ACCEPTED_FILE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
};

export default function ImageUpload({ onImageChange, folder = 'images', error }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const storageService = StorageService.getInstance();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('File size must be less than 10MB');
      return;
    }

    setIsLoading(true);
    setUploadError('');

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      const uploadedUrl = await storageService.uploadFile(file, folder);
      onImageChange(uploadedUrl);
    } catch (err) {
      setUploadError('Failed to upload image');
      onImageChange(null);
    } finally {
      setIsLoading(false);
    }
  }, [onImageChange, folder]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  const removeImage = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-colors",
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
          error || uploadError ? "border-red-300" : "",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500"
        )}
        role="button"
        tabIndex={0}
        aria-label="Upload image"
      >
        <input {...getInputProps()} aria-label="Image upload input" />
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            <p className="text-sm text-gray-500">Uploading...</p>
          </div>
        ) : preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded-lg object-contain"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-gray-100 rounded-full">
              <Upload className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Drag and drop your image here, or{' '}
                <span className="text-blue-500">browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG, GIF, WebP (max 10MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {(error || uploadError) && (
        <p className="flex items-center text-sm text-red-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error || uploadError}
        </p>
      )}
    </div>
  );
}