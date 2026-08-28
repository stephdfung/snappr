/// <reference types="vite/client" />

interface Navigator {
  webkitGetUserMedia(
    constraints: MediaStreamConstraints,
    successCallback: (stream: MediaStream) => void,
    errorCallback: (error: Error) => void
  ): void;
}

interface VendorURL {
  createObjectURL(object: Blob | MediaSource | MediaStream): string;
}

interface Window {
  url?: VendorURL;
  webkitURL?: VendorURL;
}
