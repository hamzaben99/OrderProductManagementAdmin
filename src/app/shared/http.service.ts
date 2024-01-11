import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private port = 8080;
  private basePath = `http://localhost:${this.port}/`;

  constructor(private http: HttpClient) {}

  getData<T>(url: string, queryParams?: queryParams) {
    const params = this.createParams(queryParams);
    return this.http.get<T>(this.basePath + url, { params: params });
  }

  postData<T>(url: string, body: T, queryParams?: queryParams) {
    const params = this.createParams(queryParams);
    return this.http.post(this.basePath + url, body, { params: params });
  }

  putData<T>(url: string, body: T, queryParams?: queryParams) {
    const params = this.createParams(queryParams);
    return this.http.put(this.basePath + url, body, { params: params });
  }

  deleteData(url: string, queryParams?: queryParams) {
    const params = this.createParams(queryParams);
    return this.http.delete(this.basePath + url, { params: params });
  }

  private createParams(queryParams: queryParams) {
    let params = null;
    if (queryParams)
      params = new HttpParams().appendAll(queryParams);
    return params;
  }
}

type queryParams = { [param: string]: string | boolean | number | number[] };
