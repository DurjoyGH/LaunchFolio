import { apiClient } from "./base";

export const uploadApi = {
  uploadFile: async (file: File, endpoint: "profile" | "resume" | "project", fieldName: string) => {
    const formData = new FormData();
    formData.append(fieldName, file);

    return apiClient(`/upload/${endpoint}`, {
      method: "POST",
      body: formData,
    });
  },
};
