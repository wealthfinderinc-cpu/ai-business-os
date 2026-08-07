const BASE_URL = "/api";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body:
      options.body !== undefined
        ? JSON.stringify(options.body)
        : undefined,
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Something went wrong"
    );
  }

  return data;
}

export const api = {
  get<T>(url: string) {
    return request<T>(url);
  },

  post<T>(url: string, body: unknown) {
    return request<T>(url, {
      method: "POST",
      body,
    });
  },

  put<T>(url: string, body: unknown) {
    return request<T>(url, {
      method: "PUT",
      body,
    });
  },

  patch<T>(url: string, body: unknown) {
    return request<T>(url, {
      method: "PATCH",
      body,
    });
  },

  delete<T>(url: string) {
    return request<T>(url, {
      method: "DELETE",
    });
  },
};