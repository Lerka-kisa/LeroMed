module.exports = class AuthDto {
    id;
    login;
    email;
    phone;
    role;
    is_activated;
    id_acc;

    constructor(model, id_acc) {
        this.id = model.id;
        this.login = model.login;
        this.email = model.email;
        this.phone = model.phone;
        this.role = model.role;
        this.is_activated = model.is_activated;
        this.id_acc = id_acc
    }
}