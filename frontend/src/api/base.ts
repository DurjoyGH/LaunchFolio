export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    const isFormData = options.body instanceof FormData;
    
    const headers = new Headers(options.headers || {});
    if (!headers.has("Content-Type") && !isFormData) {
        headers.set("Content-Type", "application/json");
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Request failed");
    }

    return data;
};
