export default class Client {
  constructor({
    id = null,
    clientId = null,
    createdAt = null,
    name,
    description,
    status,
  }) {
    this.id = id;
    this.clientId = clientId;
    this.name = name;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
  }
}
