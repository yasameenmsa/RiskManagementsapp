import axios from 'axios';

interface UploadResponse {
  url: string;
  publicId: string;
}

export class ImageStorageService {
  private static instance: ImageStorageService;
  private readonly uploadUrl: string;
  
  private constructor() {
    this.uploadUrl = import.meta.env.VITE_UPLOAD_URL || '/api/upload';
  }

  static getInstance(): ImageStorageService {
    if (!ImageStorageService.instance) {
      ImageStorageService.instance = new ImageStorageService();
    }
    return ImageStorageService.instance;
  }

  async uploadImage(file: File): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<UploadResponse>(this.uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw new Error('Failed to upload image');
    }
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await axios.delete(`${this.uploadUrl}/${publicId}`);
    } catch (error) {
      console.error('Failed to delete image:', error);
      throw new Error('Failed to delete image');
    }
  }
}