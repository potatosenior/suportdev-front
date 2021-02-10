export default class Client {
  constructor({
    id = null,
    name,
    cpf,
    email,
    password = null,
    phone,
    address,
    birthday,
    createdAt = null,
  }) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.birthday = birthday;
    this.password = password;
    this.phone = phone;
    this.address = address;
    this.createdAt = createdAt;
  }
}
