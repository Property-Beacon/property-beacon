# CDN - Filestack

https://www.filestack.com/

## API key

Ensure you have api key in your local `.env`

```
REDWOOD_ENV_FILESTACK_API_KEY={askMeTheKey}
```

## Image uploader

`Filestack` provides powerful API for uploading assets integration, a wrapper of image uploader component, `ImageUploaderOverlay`, under `web/src/components` can be consumed.

```jsx
<ImageUploaderOverlay
  onError={handleUploadError}
  onSuccess={handleUploadSuccess}
  onClose={() => setShowUploader(false)}
/>
```
