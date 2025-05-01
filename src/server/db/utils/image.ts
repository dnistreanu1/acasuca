export const toBase64ImageSrc = (bufferBase64: string, contentType: string) => `data:${contentType};base64,${bufferBase64}`;
