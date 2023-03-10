const  {sequelize} = require('../db')
const FunctionStart = require("./functionStart")

sequelize.authenticate()
    .then(() => {console.log('Hurray!!! You are connected)))');})
    .then(() => {
        //0.
        FunctionStart.createSpecialization('Терапевт', 15)
        FunctionStart.createSpecialization('Хирург', 20)
        FunctionStart.createSpecialization('Стоматолог', 30)

        //1. Card_status
        FunctionStart.createCardStatus("в регистратуре");
        FunctionStart.createCardStatus("у врача");
        FunctionStart.createCardStatus("у пациента");

        //3. Type_of_analyzes
        FunctionStart.createTypeOfAnalysis("Сахар в крови");
        FunctionStart.createTypeOfAnalysis("Железо в крови");
        FunctionStart.createTypeOfAnalysis("Халестерин");
        FunctionStart.createTypeOfAnalysis("Пульс");

        //4. Age_group
        FunctionStart.createAgeGroup("от 0 до 1 года", 0, 1);
        FunctionStart.createAgeGroup("от 1 до 3 лет",1, 3);
        FunctionStart.createAgeGroup("от 3 до 6 лет",3, 6);
        FunctionStart.createAgeGroup("от 6 до 14 лет",6,14);
        FunctionStart.createAgeGroup("от 14 до 18 лет",14, 18);
        FunctionStart.createAgeGroup("от 18 до 100 лет",18, 100);

        //5. Gender
        FunctionStart.createGender("мужской");
        FunctionStart.createGender("женский");
        FunctionStart.createGender("не решил(а)");

        //6.Norms_scores
        FunctionStart.createNormScore("Ниже нормы");
        FunctionStart.createNormScore("Норма");
        FunctionStart.createNormScore("Выше нормы");

        //10. Autorization_info
        FunctionStart.createAutorizationInfo("Admin", "12345", "mail1", "phone1", "ADMIN")
        FunctionStart.createAutorizationInfo("Doctor1", "12345", "mail2", "phone2", "DOCTOR")
        FunctionStart.createAutorizationInfo("Doctor2", "12345", "mail3", "phone3", "DOCTOR")
        FunctionStart.createAutorizationInfo("User1", "12345", "mail4", "phone4", "PATIENT")
        FunctionStart.createAutorizationInfo("User2", "12345", "mail5", "phone5", "PATIENT")
        FunctionStart.createAutorizationInfo("User3", "12345", "mail6", "phone6", "PATIENT")

        //14.Types_of_shifts
        FunctionStart.createTypeOfShifts("1 смена (8-12)","05:00", "9:00" );
        FunctionStart.createTypeOfShifts("2 смена (12-16)","09:00", "13:00" );
        FunctionStart.createTypeOfShifts("3 смена (16-20)","13:00", "17:00" );

        //18.Types_of_appointments
        FunctionStart.createTypeOfAppointment("первичный");
        FunctionStart.createTypeOfAppointment("вторичный");
        FunctionStart.createTypeOfAppointment("медосмотр");
        FunctionStart.createTypeOfAppointment("день здорового ребёнка");
    })
    .then(()=>{
        //2. Medical_cards
        FunctionStart.createMedicalCard("U-1", "1")
        FunctionStart.createMedicalCard("U-2", "1")
        FunctionStart.createMedicalCard("U-3", "1")

        //7.Analysis_norms
        //Сахар у мальчиков
        FunctionStart.createAnalysisNorm("1","1","1", 2.8, 5.6, "ммоль/л")
        FunctionStart.createAnalysisNorm("1","1","2", 2.8, 5.6, "ммоль/л")
        FunctionStart.createAnalysisNorm("1","1","3", 2.8, 5.6, "ммоль/л")
        FunctionStart.createAnalysisNorm("1","1","4", 2.8, 5.6, "ммоль/л")
        FunctionStart.createAnalysisNorm("1","1","5", 4.1, 5.9, "ммоль/л")
        //Сахар у девочек
        FunctionStart.createAnalysisNorm("1","2","1", 2.8, 5.6, "ммоль/л")
        FunctionStart.createAnalysisNorm("1","2","2", 2.8, 5.6, "ммоль/л")
        FunctionStart.createAnalysisNorm("1","2","3", 2.8, 5.6, "ммоль/л")
        FunctionStart.createAnalysisNorm("1","2","4", 2.8, 5.6, "ммоль/л")
        FunctionStart.createAnalysisNorm("1","2","5", 4.1, 5.9, "ммоль/л")
        //Железо у мальчиков
        FunctionStart.createAnalysisNorm("2","1","1", 107, 141, "г/л")
        FunctionStart.createAnalysisNorm("2","1","2", 100, 140, "г/л")
        FunctionStart.createAnalysisNorm("2","1","3", 100, 140, "г/л")
        FunctionStart.createAnalysisNorm("2","1","4", 115, 150, "г/л")
        FunctionStart.createAnalysisNorm("2","1","5", 120, 166, "г/л")
        //Железо у девочек
        FunctionStart.createAnalysisNorm("2","2","1", 107, 141, "г/л")
        FunctionStart.createAnalysisNorm("2","2","2", 100, 140, "г/л")
        FunctionStart.createAnalysisNorm("2","2","3", 100, 140, "г/л")
        FunctionStart.createAnalysisNorm("2","2","4", 115, 150, "г/л")
        FunctionStart.createAnalysisNorm("2","2","5", 115, 153, "г/л")
        //Халестерин у мальчиков
        FunctionStart.createAnalysisNorm("3","1","1", 2.95, 5.25, "ммоль/л")
        FunctionStart.createAnalysisNorm("3","1","2", 2.95, 5.25, "ммоль/л")
        FunctionStart.createAnalysisNorm("3","1","3", 2.95, 5.25, "ммоль/л")
        FunctionStart.createAnalysisNorm("3","1","4", 3.13, 5.23, "ммоль/л")
        FunctionStart.createAnalysisNorm("3","1","5", 3.08, 5.10, "ммоль/л")
        //Халестерин у девочек
        FunctionStart.createAnalysisNorm("3","2","1", 2.90, 5.18, "ммоль/л")
        FunctionStart.createAnalysisNorm("3","2","2", 2.90, 5.18, "ммоль/л")
        FunctionStart.createAnalysisNorm("3","2","3", 2.90, 5.30, "ммоль/л")
        FunctionStart.createAnalysisNorm("3","2","4", 2.26, 5.20, "ммоль/л")
        FunctionStart.createAnalysisNorm("3","2","5", 3.21, 5.18, "ммоль/л")
        //Пульс у мальчиков
        FunctionStart.createAnalysisNorm("4","1","1", 120, 135, "ударов")
        FunctionStart.createAnalysisNorm("4","1","2", 120, 125, "ударов")
        FunctionStart.createAnalysisNorm("4","1","3", 105, 110, "ударов")
        FunctionStart.createAnalysisNorm("4","1","4", 90, 95, "ударов")
        FunctionStart.createAnalysisNorm("4","1","5", 72, 80, "ударов")
        //Пульс у девочек
        FunctionStart.createAnalysisNorm("4","2","1", 120, 135, "ударов")
        FunctionStart.createAnalysisNorm("4","2","2", 120, 125, "ударов")
        FunctionStart.createAnalysisNorm("4","2","3", 105, 110, "ударов")
        FunctionStart.createAnalysisNorm("4","2","4", 90, 95, "ударов")
        FunctionStart.createAnalysisNorm("4","2","5", 72, 80, "ударов")

        //11. Doctors
        FunctionStart.createDoctors("2", "Раиса", "Игрунова", "Эмуальдовна", 1, "Гы, фотка")
        FunctionStart.createDoctors("3", "Наталья", "Царь", "Викторовна", 3, "Га, фотка")
    })
    .then(()=> {
        //8. Analysis_result
        FunctionStart.createAnalysisResult("1", "1", "4", 4.2, "2", "HELP ME",  "2022-01-02" )
        FunctionStart.createAnalysisResult("1", "1", "3", 107, "2", "Hello",  "2022-01-02")
        FunctionStart.createAnalysisResult("2", "2", "17", 168, "3", "HELP ME",  "2022-01-02")

        //9. Medical_records
        FunctionStart.createMedicalRecord("1", "2022-01-02", "Болит горло и температура вонючая", "Попей таблетосы")
        FunctionStart.createMedicalRecord("1", "2022-04-08", "Голова болит сильно сильно", "Таблетки для лохов, пей пиво!")
        FunctionStart.createMedicalRecord("2", "2018-10-12", "Месячные", "Либо вырезаем матку, либо меняй пол, либо беременность")
        FunctionStart.createMedicalRecord("2", "2022-01-02", "Болит нога", "Иди ко мне, отрежу")
        FunctionStart.createMedicalRecord("1", "2022-01-02", "Болят глазки", "Меньше сиди в компике")
        FunctionStart.createMedicalRecord("1", "2022-12-10", "Слишком часто кровь идёт из носа", "Не ковыряй в носу)")

        //12. Sectors
        FunctionStart.createSectors(1);
        FunctionStart.createSectors(2);
        FunctionStart.createSectors(1);
        FunctionStart.createSectors(1);
    })
    .then(() => {
        //13. Addresses
        FunctionStart.createAddress(1, "Брест","Советская", "33")
        FunctionStart.createAddress(2, "Витебск","Студенецкая", "123")
        FunctionStart.createAddress(3, "Гомель","50 лет СССР", "123")

        //15. Timetable
        FunctionStart.createTimetable("2", "2", "2023-12-29")
        FunctionStart.createTimetable("3", "1", "2023-04-19")
        FunctionStart.createTimetable("2", "1", "2023-12-09")
    })
    .then(() => {
        //16. Patients
        FunctionStart.createPatient("4", "1", "3", "Анна", "Трошко", "Николаевна", "2004-07-07", "2", "2", "г.Заславль, ул.Советская, д.94, кв.34", "ОАО Белгорхимпром", "2")
        FunctionStart.createPatient("5", "2", "1", "Владимир", "Трошко", "Николаевич", "2011-07-14", "1", "3", "г.Заславль, ул.Студенецкая, д.8А, кв.100", "ОАО БелгорхимпромГаз", "3")
        FunctionStart.createPatient("6", "3", "4", "Валерия", "Трошко", "Николаевна", "2002-01-20", "2", "2", "г.Заславль, ул.Путейко, д.60", "ОАО БелгорхимпромПлюс", "1")
    })
    .then(() => {
        //17. House_calls
        FunctionStart.createHouseCalls("2022-12-13", "1", "Высокая температура")
        FunctionStart.createHouseCalls("2022-12-14", "2", "Тошнит")
        FunctionStart.createHouseCalls("2022-12-14", "2", "Не может встать")
        FunctionStart.createHouseCalls("2022-12-11", "1", "Ничего не видит")

        //19.Appointments
        FunctionStart.createAppointments("1","1"/*,"2","2"*/,"1", "12:15")
        FunctionStart.createAppointments("2","1"/*,"3","6"*/,"3", "16:15")
    })
    .catch(err => {console.log('Error!!!!DB is not connect(((:',err.message);});