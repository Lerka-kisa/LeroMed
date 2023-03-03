const {Model, DataTypes} = require('sequelize')
const {sequelize} = require('../db')

//Medical models
class Card_status extends Model{}
class Types_of_analysis extends Model{}
class Analysis_norms extends Model{}
class Norms_scores extends Model{}
class Medical_cards extends Model{}
class Analysis_results extends Model{}
class Medcards_records extends Model{}

//Users models
class Authorization_info extends Model{}
class Tokens extends Model{}
class Specializations extends Model{}
class Doctors extends Model{}
class Sectors extends Model{}
class Addresses extends Model{}
class Age_group extends Model{}
class Gender extends Model{}
class Patients extends Model{}

//Registry_info models
class Types_of_appointments extends Model{}
class Types_of_shifts extends Model{}
class House_calls extends Model{}
class Timetable extends Model{}
class Appointments extends Model{}

Card_status.init(
    {
        id:     {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        status: {type: DataTypes.STRING, allowNull:false}
    },
    {sequelize, modelName:'Card_status', tableName:'Card_status', timestamps:false}
);

Medical_cards.init(
    {
        id:             {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        card_number:    {type: DataTypes.STRING, allowNull:false}
        // card_status
    },
    {sequelize, modelName:'Medical_cards', tableName:'Medical_cards', timestamps:false}
);

Card_status.hasMany(Medical_cards, {foreignKey: 'card_status'});
Medical_cards.belongsTo(Card_status, {foreignKey: 'card_status'});

Types_of_analysis.init(
    {
        id:             {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        name_analysis:  {type: DataTypes.STRING, allowNull:false}
    },
    {sequelize, modelName:'Types_of_analysis', tableName:'Types_of_analysis', timestamps:false}
);

Age_group.init(
    {
        id:         {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        group_name: {type: DataTypes.STRING, allowNull:false},
        min:        {type: DataTypes.INTEGER, allowNull:false},
        max:        {type: DataTypes.INTEGER, allowNull:false}
    },
    {sequelize, modelName:'Age_group', tableName:'Age_group', timestamps:false}
);

Gender.init(
    {
        id:     {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        gender: {type: DataTypes.STRING, allowNull:false}
    },
    {sequelize, modelName:'Gender', tableName:'Gender', timestamps:false}
);

Norms_scores.init(
    {
        id:         {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        norm_score: {type: DataTypes.STRING, allowNull:false}
    },
    {sequelize, modelName:'Norms_scores', tableName:'Norms_scores', timestamps:false}
);

Analysis_norms.init(
    {
        id:     {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        min:    {type: DataTypes.REAL, allowNull:false},
        max:    {type: DataTypes.REAL, allowNull:false},
        SI_unit:{type: DataTypes.STRING, allowNull:false}
        // id_analysis_type
        // id_agegroup
        // id_gender
    },
    {sequelize, modelName:'Analysis_norms', tableName:'Analysis_norms', timestamps:false}
);

Types_of_analysis.hasMany(Analysis_norms, {foreignKey: 'id_analysis_type'});
Analysis_norms.belongsTo(Types_of_analysis, {foreignKey: 'id_analysis_type'})

Age_group.hasMany(Analysis_norms, {foreignKey: 'id_agegroup'});
Analysis_norms.belongsTo(Age_group, {foreignKey: 'id_agegroup'})

Gender.hasMany(Analysis_norms, {foreignKey: 'id_gender'});
Analysis_norms.belongsTo(Gender, {foreignKey: 'id_gender'})

Analysis_results.init(
    {
        id:             {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        date:           {type: DataTypes.DATEONLY, allowNull:true},
        result:         {type: DataTypes.STRING, allowNull:false},
        recommendation: {type: DataTypes.STRING, allowNull:true}
        // id_medcard
        // id_test_type
        // id_norm
        // id_norm_score
    },
    {sequelize, modelName:'Analysis_results', tableName:'Analysis_results', timestamps:false}
);

Analysis_norms.hasMany(Analysis_results, {foreignKey: 'id_norm'});
Analysis_results.belongsTo(Analysis_norms, {foreignKey: 'id_norm'})

Medical_cards.hasMany(Analysis_results, {foreignKey: 'id_medcard'});
Analysis_results.belongsTo(Medical_cards, {foreignKey: 'id_medcard'});

Types_of_analysis.hasMany(Analysis_results, {foreignKey: 'id_analysis_type'});
Analysis_results.belongsTo(Types_of_analysis, {foreignKey: 'id_analysis_type'})

Norms_scores.hasMany(Analysis_results, {foreignKey: 'id_norm_score'});
Analysis_results.belongsTo(Norms_scores, {foreignKey: 'id_norm_score'})

Authorization_info.init(
    {
        id:                 {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        login:              {type: DataTypes.STRING, allowNull:false},
        hash_password:      {type: DataTypes.STRING, allowNull:false},
        email:               {type: DataTypes.STRING, allowNull:false},
        phone:              {type: DataTypes.STRING, allowNull:false},
        is_activated:       {type: DataTypes.BOOLEAN, allowNull: false, default: false},
        activation_link:    {type: DataTypes.STRING, allowNull: false},
        role:               {type: DataTypes.STRING, allowNull:false}
    },
    {sequelize, modelName:'Authorization_info', tableName:'Authorization_info', timestamps:false}
);

Tokens.init({
        refresh_token: {type: DataTypes.TEXT('long'),  allowNull:false},
        // id_auth
    },
    {sequelize, modelName: "Tokens", tableName: "Tokens", timestamps: false}
);

Authorization_info.hasMany(Tokens, {foreignKey: 'id_auth'});
Tokens.belongsTo(Authorization_info, {foreignKey: 'id_auth'});

Specializations.init(
    {
        id:                 {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        specialization:     {type: DataTypes.STRING,  allowNull:true},
        one_session_time:   {type: DataTypes.INTEGER,  allowNull:true},

    },
    {sequelize, modelName:'Specializations', tableName:'Specializations', timestamps:false}
);

Doctors.init(
    {

        id:             {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        first_name:     {type: DataTypes.STRING,  allowNull:true},
        last_name:      {type: DataTypes.STRING,  allowNull:true},
        middle_name:    {type: DataTypes.STRING,  allowNull:true},
        photo:          {type: DataTypes.BLOB,    allowNull:true},
        // id_specialization
        // id_auth
    },
    {sequelize, modelName:'Doctors', tableName:'Doctors', timestamps:false}
);

Authorization_info.hasOne(Doctors, {foreignKey: 'id_auth'});
Doctors.belongsTo(Authorization_info, {foreignKey: 'id_auth'});

Specializations.hasOne(Doctors, {foreignKey: 'id_specialization'});
Doctors.belongsTo(Specializations, {foreignKey: 'id_specialization'});

Medcards_records.init(
    {
        id:             {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        date:           {type: DataTypes.DATEONLY, allowNull:true},
        record:         {type: DataTypes.STRING, allowNull:true},
        recommendation: {type: DataTypes.STRING, allowNull: true}
        // id_medcard
        // id_doctor
    },
    {sequelize, modelName:'Medcards_records', tableName:'Medcards_records', timestamps:false}
)

Medical_cards.hasMany(Medcards_records, {foreignKey: 'id_medcard'});
Medcards_records.belongsTo(Medical_cards, {foreignKey: 'id_medcard'});

Doctors.hasMany(Medcards_records, {foreignKey: 'id_doctor'});
Medcards_records.belongsTo(Doctors, {foreignKey: 'id_doctor'});

Sectors.init(
    {
        id: {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        // id_doctor
    },
    {sequelize, modelName:'Sectors', tableName:'Sectors', timestamps:false}
);

Doctors.hasMany(Sectors,{foreignKey: 'id_doctor'});
Sectors.belongsTo(Doctors,{foreignKey: 'id_doctor'});

Addresses.init(
    {
        id:    {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        city: {type: DataTypes.STRING, allowNull:false},
        street: {type: DataTypes.STRING, allowNull:false},
        house: {type: DataTypes.STRING, allowNull:false}
        // id_sector
    },
    {sequelize, modelName:'Addresses', tableName:'Addresses', timestamps:false}
);
Sectors.hasMany(Addresses, {foreignKey: 'id_sector'});
Addresses.belongsTo(Sectors, {foreignKey: 'id_sector'});

Types_of_shifts.init(
    {
        id:                     {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        period_name:            {type: DataTypes.STRING, allowNull:false},
        beginning_of_period:    {type: DataTypes.TIME, allowNull:false},
        end_of_period:          {type: DataTypes.TIME, allowNull:false}
    },
    {sequelize, modelName:'Types_of_shifts', tableName:'Types_of_shifts', timestamps:false}
);

Timetable.init(
    {
        id:     {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        date:   {type: DataTypes.DATEONLY, allowNull:false}
        // id_type_of_shifts
        // id_doctor
    },
    {sequelize, modelName:'Timetable', tableName:'Timetable', timestamps:false}
);

Doctors.hasMany(Timetable, {foreignKey: 'id_doctor'});
Timetable.belongsTo(Doctors, {foreignKey: 'id_doctor'});

Types_of_shifts.hasMany(Timetable, {foreignKey: 'id_type_of_shift'});
Timetable.belongsTo(Types_of_shifts, {foreignKey: 'id_type_of_shift'});

Patients.init(
    {
        //TODO think about id_parent
        id:             {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        first_name:     {type: DataTypes.STRING,  allowNull:true},
        last_name:      {type: DataTypes.STRING,  allowNull:true},
        middle_name:    {type: DataTypes.STRING,  allowNull:true},
        birthday:       {type: DataTypes.DATEONLY, allowNull:true},
        place_of_work:  {type: DataTypes.STRING, allowNull:true},
        flat:           {type: DataTypes.STRING, allowNull:true}
        //// id_parent
        // id_address
        // id_auth
        // id_medcard
        // id_agegroup
        // id_sector
    },
    {sequelize, modelName:'Patients', tableName:'Patients', timestamps:false}
);

// Patients.hasMany(Patients, {foreignKey: 'id_parent'});
// Patients.belongsTo(Patients, {foreignKey: 'id_parent'});

Authorization_info.hasOne(Patients, {foreignKey: 'id_auth'});
Patients.belongsTo(Authorization_info, {foreignKey: 'id_auth'});

Medical_cards.hasOne(Patients, {foreignKey: 'id_medcard'});
Patients.belongsTo(Medical_cards, {foreignKey: 'id_medcard'});

Age_group.hasMany(Patients, {foreignKey: 'id_agegroup'});
Patients.belongsTo(Age_group, {foreignKey: 'id_agegroup'});

Gender.hasMany(Patients, {foreignKey: 'id_gender'});
Patients.belongsTo(Gender, {foreignKey: 'id_gender'})

Addresses.hasMany(Patients, {foreignKey: 'id_address'});
Patients.belongsTo(Addresses, {foreignKey: 'id_address'});

// Sectors.hasMany(Patients, {foreignKey: 'id_sector'});
// Patients.belongsTo(Sectors, {foreignKey: 'id_sector'});

House_calls.init(
    {
        id:         {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        remark:     {type: DataTypes.STRING, allowNull:false},
        date:       {type: DataTypes.DATEONLY, allowNull:false}
        // id_patient
    },
    {sequelize, modelName:'House_calls', tableName:'House_calls', timestamps:false}
);

Patients.hasMany(House_calls, {foreignKey: 'id_patient'});
House_calls.belongsTo(Patients, {foreignKey: 'id_patient'});

Types_of_appointments.init(
    {
        id:     {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        name:   {type: DataTypes.STRING, allowNull:false}
    },
    {sequelize, modelName:'Types_of_appointments', tableName:'Types_of_appointments', timestamps:false}
);

Appointments.init(
    {
        id:             {type: DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
        talon_number:   {type: DataTypes.INTEGER, allowNull:false},
        time:           {type: DataTypes.TIME, allowNull:false}
        // id_type_of_appointment
        // id_shift
        // id_patient
    },
    {sequelize, modelName:'Appointments', tableName:'Appointments', timestamps:false}
)

Types_of_appointments.hasMany(Appointments, {foreignKey: 'id_type_of_appointment'});
Appointments.belongsTo(Types_of_appointments, {foreignKey: 'id_type_of_appointment'});

Timetable.hasMany(Appointments, {foreignKey: 'id_shift'});
Appointments.belongsTo(Timetable, {foreignKey: 'id_shift'});

Patients.hasMany(Appointments, {foreignKey: 'id_patient'});
Appointments.belongsTo(Patients, {foreignKey: 'id_patient'});

module.exports = {
    Types_of_analysis, Card_status, Medical_cards, Analysis_results, Medcards_records, Analysis_norms,
    Norms_scores, Authorization_info, Tokens, Doctors, Sectors, Age_group, Gender, Patients,
    Appointments, Types_of_appointments, Timetable, House_calls, Types_of_shifts, Addresses
};
// module.exports = {
//     Authorization_info, Tokens
// };