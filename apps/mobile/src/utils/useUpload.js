import * as React from 'react';
import { UploadClient } from '@uploadcare/upload-client';

const client = new UploadClient({
  publicKey: process.env.EXPO_PUBLIC_UPLOADCARE_PUBLIC_KEY || 'demopublickey',
});

function useUpload() {
  const [loading, setLoading] = React.useState(false);

  const upload = React.useCallback(async (input) => {
    try {
      setLoading(true);

      if ('reactNativeAsset' in input && input.reactNativeAsset) {
        const asset = input.reactNativeAsset;
        const FileSystem = require('expo-file-system/legacy');

        const uploadResult = await FileSystem.uploadAsync(
          'https://upload.uploadcare.com/base/',
          asset.uri,
          {
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file',
            parameters: {
              UPLOADCARE_PUB_KEY: process.env.EXPO_PUBLIC_UPLOADCARE_PUBLIC_KEY || 'demopublickey',
              UPLOADCARE_STORE: '1',
            },
          }
        );

        if (uploadResult.status < 200 || uploadResult.status >= 300) {
          throw new Error(`Upload failed (${uploadResult.status})`);
        }

        const data = JSON.parse(uploadResult.body);
        return { url: `https://ucarecdn.com/${data.file}/`, mimeType: null };
      }

      if ('url' in input) {
        const result = await client.uploadUrl(input.url);
        return { url: result.cdnUrl, mimeType: null };
      }

      if ('base64' in input) {
        const bytes = Buffer.from(input.base64, 'base64');
        const file = new File([bytes], 'upload');
        const result = await client.uploadFile(file);
        return { url: result.cdnUrl, mimeType: null };
      }

      if ('buffer' in input) {
        const file = new File([input.buffer], 'upload');
        const result = await client.uploadFile(file);
        return { url: result.cdnUrl, mimeType: null };
      }

      throw new Error('useUpload: provide reactNativeAsset, url, base64, or buffer');
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Upload failed' };
    } finally {
      setLoading(false);
    }
  }, []);

  return [upload, { loading }];
}

export { useUpload };
export default useUpload;
