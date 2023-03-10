module.exports = class PatientDto {
    id;
    first_name;
    last_name;
    middle_name;
    birthday;
    id_agegroup;
    agegroup;
    id_gender;
    gender;
    id_address;
    city;
    street;
    house;
    flat;
    sector;
    place_of_work;
    login;
    phone;
    email;
    card_number;
    card_status;

    constructor(model) {
        this.id = model.id;
        this.first_name = model.first_name;
        this.last_name = model.last_name;
        this.middle_name = model.middle_name;
        this.birthday = model.birthday;
        this.id_agegroup = model.id_agegroup;
        if(this.id_agegroup)
            this.agegroup = model.Age_group.group_name;
        this.id_gender = model.id_gender;
        if(this.id_gender)
            this.gender = model.Gender.gender;
        this.id_address = model.id_address;
        if(this.id_address){
            this.city = model.Address.city;
            this.street = model.Address.street;
            this.house = model.Address.house;
            this.flat = model.flat;
            this.sector = model.Address.id_sector;
        }
        this.place_of_work = model.place_of_work;
        this.login = model.Authorization_info.login;
        this.phone = model.Authorization_info.phone;
        this.email = model.Authorization_info.email;
        this.card_number = model.Medical_card.card_number;
        this.card_status = model.Medical_card.Card_status.status;
    }
}