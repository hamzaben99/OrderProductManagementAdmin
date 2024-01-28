import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private port = 8080;
  private basePath = `http://localhost:${this.port}/`;

  constructor(private http: HttpClient) {}

  getData<T>(url: string, options?: RequestConfig) {
    return this.http.get<T>(this.basePath + url, options);
  }

  postData<T>(url: string, body: T, options?: RequestConfig) {
    return this.http.post(this.basePath + url, body, options);
  }

  putData<T>(url: string, body: T, options?: RequestConfig) {
    return this.http.put(this.basePath + url, body, options);
  }

  deleteData(url: string, options?: RequestConfig) {
    return this.http.delete(this.basePath + url, options);
  }
}

type RequestConfig = { params?: HttpParams; headers?: HttpHeaders };
