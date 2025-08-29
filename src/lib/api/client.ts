import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// API Client yapılandırması
//  "https://jsonplaceholder.typicode.com"
class ApiClient {
  private client: AxiosInstance;

  constructor(
    baseURL: string = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com"
  ) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor - Token ekleme
    this.client.interceptors.request.use(
      (config) => {
        // localStorage'dan token alma (client-side)
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("auth_token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Hata yönetimi
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // 401 durumunda token'ı temizle ve login'e yönlendir
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
            window.location.href = "/auth/login";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // GET isteği
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  // POST isteği
  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  // PUT isteği
  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  // DELETE isteği
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  // PATCH isteği
  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }
}

// Singleton instance
export const apiClient = new ApiClient();
