async function convertFileToString(file: File | null) {
  if (file) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }
}

function getFullUrl(path: string): string {
  if(!path) return ""
  return `${import.meta.env.VITE_BACKEND_URL}/${path}`;
}

function getFormDataFromJSON(obj: { [key: string]: any }): FormData {
  const formData = new FormData();
  for (const key in obj) {
    if (!obj[key] && typeof obj[key] != "boolean") {
      formData.append(key, "");
    } else if (obj[key] instanceof File) {
      formData.append(key, obj[key]);
    } else if (typeof obj[key] === "string") {
      formData.append(key, obj[key]);
    } else if (Array.isArray(obj[key])) {
      obj[key].forEach((item: string | Blob) =>
        formData.append(
          `${key}[]`,
          typeof item === "string" ? item : JSON.stringify(item)
        )
      );
    } else {
      formData.append(key, JSON.stringify(obj[key]));
    }
  }
  return formData;
}

function formatMusicTime(time: number): string {
  const minute = Math.floor(time / 60);
  const second = Math.ceil(time % 60);
  return `${minute < 10 ? `0${minute}` : minute}:${
    second < 10 ? `0${second}` : second
  }`;
}
export {
  convertFileToString,
  getFormDataFromJSON,
  getFullUrl,
  formatMusicTime,
};
