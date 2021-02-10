export interface HttpPostClient {
  post(url, body, headers): Promise;
}
