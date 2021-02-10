export interface HttpGetClient {
  get(url, headers): Promise;
}
