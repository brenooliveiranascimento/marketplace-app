import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Configuração base da API
const API_BASE_URL = "https://api.exemplo.com"; // Substitua pela sua URL da API

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Interceptor para requisições
    this.instance.interceptors.request.use(
      (config) => {
        // Adicionar logs para debug
        console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error("📤 Request Error:", error);
        return Promise.reject(error);
      }
    );

    // Interceptor para respostas
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`📥 ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error("📥 Response Error:", error);

        // Tratamento de erros específicos
        if (error.response?.status === 401) {
          // Token expirado - fazer logout
          this.handleUnauthorized();
        }

        return Promise.reject(error);
      }
    );
  }

  private handleUnauthorized() {
    // Remover token e redirecionar para login
    delete this.instance.defaults.headers.common["Authorization"];
    // Aqui você pode adicionar lógica para redirecionar para login
    console.warn("Token expirado. Usuário deve fazer login novamente.");
  }

  // Métodos HTTP
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }

  // Método para definir token de autenticação
  setAuthToken(token: string) {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // Método para remover token de autenticação
  removeAuthToken() {
    delete this.instance.defaults.headers.common["Authorization"];
  }

  // Getter para acessar a instância diretamente se necessário
  get defaults() {
    return this.instance.defaults;
  }
}

export const apiClient = new ApiClient();
