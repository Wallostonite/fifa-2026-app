/**
 * Upload a file to Uploadcare.
 * Set UPLOADCARE_PUBLIC_KEY in your .env to enable.
 * Falls back to a no-op stub so the app boots without crashing.
 */
async function upload({ url, buffer, base64 }) {
  const publicKey = process.env.UPLOADCARE_PUBLIC_KEY;
  if (!publicKey) {
    console.warn('upload: UPLOADCARE_PUBLIC_KEY not set — upload skipped');
    return { url: null, mimeType: null };
  }

  let body;
  if (buffer) {
    body = buffer;
  } else if (base64) {
    const bytes = Buffer.from(base64, 'base64');
    body = bytes;
  } else if (url) {
    const res = await fetch(url);
    body = Buffer.from(await res.arrayBuffer());
  } else {
    throw new Error('upload: provide buffer, base64, or url');
  }

  const form = new FormData();
  form.append('UPLOADCARE_PUB_KEY', publicKey);
  form.append('UPLOADCARE_STORE', '1');
  form.append('file', new Blob([body]));

  const response = await fetch('https://upload.uploadcare.com/base/', {
    method: 'POST',
    body: form,
  });

  if (!response.ok) throw new Error(`Uploadcare error: ${response.status}`);
  const data = await response.json();
  const fileUrl = `https://ucarecdn.com/${data.file}/`;
  return { url: fileUrl, mimeType: null };
}

export { upload };
export default upload;