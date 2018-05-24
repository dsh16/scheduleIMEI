/**
 * Получение полных сведений об одной паре из файла с расширением xlsx. Данная функция считывает: время проведения пары, название предмета, ФИО преподавателя,
 * номер аудитории
 * @public
 * @function
 * @name Schedules
 * @param {int} i - Счётчик для считывания пары у одной группы на текущий день
 * @param {int} day - Номер дня недели
 *
 */
function Schedules(i, day){   //Функция для получения полных сведений об одной паре из таблицы excel (передаем счетчик, номер дня)
    p[i]={};
    p[i].day = day;         //устанавливаем номер дня
    console.log(p[i].day);
    
    p[i].time = listOne[XLSX.utils.encode_cell(cellTime)].v;    //считываем время проведения пары
    console.log(p[i].time);
    
    cellSubject = {c: cellTime.c + 1, r: cellTime.r};           //считываем название предмета
    p[i].subject = listOne[XLSX.utils.encode_cell(cellSubject)].v;
    console.log(p[i].subject);

    cellTeacher = {c: cellTime.c + 2, r: cellTime.r};           //считываем имя преподавателя
    p[i].teacher = listOne[XLSX.utils.encode_cell(cellTeacher)].v;
    console.log(p[i].teacher);

    cellClass = {c: cellTime.c + 3, r: cellTime.r};             //считываем номер аудитории
    p[i].class = listOne[XLSX.utils.encode_cell(cellClass)].v;
    console.log(p[i].class);

    i++;
}

var sqlite3 = require ('sqlite3').verbose();                    //связь с базой данных
var db = new sqlite3.Database('./db/sample.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err)=>{
    if (err){
        console.error(err.message);
    }
    console.log('Connected to the chinook database');
});

let XLSX = require("xlsx");                                     //библиотека xlsx для работы с excel
let workbook = XLSX.readFile("./files/example1.xlsx");
let sheet_name_list = workbook.SheetNames;
//console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])); //1 лист вывести

const offsetY = 5;                                              //отступы до названия 1 группы
const offsetX = 2;
let listOne = workbook.Sheets[sheet_name_list[0]];              //1 лист
let begin = {c: 0, r: 0};

let cell = {c: begin.c + offsetX, r: begin.r + offsetY};        //адрес 2 5
let cellName = XLSX.utils.encode_cell(cell);                    //значение
let kurs1 = [];
kurs1.push(listOne[cellName].v);
const offsetGroup = 3;                                          // отступ от группы до группы
//console.log(listOne[XLSX.utils.encode_cell({c:cellp.c + offsetGroup, r:cell.r})].v);
cell.c += offsetGroup;
cellName = XLSX.utils.encode_cell(cell);                        //1 группа в списке
while (listOne[cellName]!=undefined){                           //считываем названия групп в массив
    kurs1.push(listOne[cellName].v);
    cell.c += offsetGroup;
    cellName = XLSX.utils.encode_cell(cell);
}
console.log(kurs1);

let p = [];
const offsetY1 = 6;                                             //отступы до названия времени
const offsetX1 = 1;
const offsetTime = 4;                                           //отступ от времени до времени
let day = 1;
let cellTime = {c: begin.c + offsetX1, r: begin.r + offsetY1};  //значение 1 6
for(let i = 0; listOne[XLSX.utils.encode_cell(cellTime)]!=undefined; day++){    //цикл для считывания пар одной группы

    if (listOne[XLSX.utils.encode_cell(cellTime)].v.indexOf("08.30") >= 0){     //проверяем наличие пары в 8.30
        if (listOne[XLSX.utils.encode_cell({c: cellTime.c + 1, r: cellTime.r})].v!="")
            Schedules(i, day); 
        cellTime.r += offsetTime;
    }

    if(listOne[XLSX.utils.encode_cell(cellTime)]!=undefined)    //проверяем наличие пары в 10.10
        if (listOne[XLSX.utils.encode_cell(cellTime)].v.indexOf("10.10") >= 0){
            if (listOne[XLSX.utils.encode_cell({c: cellTime.c + 1, r: cellTime.r})].v!="")
                Schedules(i, day);
            cellTime.r += offsetTime;
        }

    if(listOne[XLSX.utils.encode_cell(cellTime)]!=undefined)    //проверяем наличие пары в 11.50
        if (listOne[XLSX.utils.encode_cell(cellTime)].v.indexOf("11.50") >= 0){
            if (listOne[XLSX.utils.encode_cell({c: cellTime.c + 1, r: cellTime.r})].v!="")
                Schedules(i, day);
            cellTime.r += offsetTime;
        }

    if(listOne[XLSX.utils.encode_cell(cellTime)]!=undefined)    //проверяем наличие пары в 13.50
        if (listOne[XLSX.utils.encode_cell(cellTime)].v.indexOf("13.50") >= 0){
            if (listOne[XLSX.utils.encode_cell({c: cellTime.c + 1, r: cellTime.r})].v!="")
                Schedules(i, day);
            cellTime.r += offsetTime;        
        }
   
    if(listOne[XLSX.utils.encode_cell(cellTime)]!=undefined)    //проверяем наличие пары в 15.30
        if (listOne[XLSX.utils.encode_cell(cellTime)].v.indexOf("15.30") >= 0){
            if (listOne[XLSX.utils.encode_cell({c: cellTime.c + 1, r: cellTime.r})].v!="")
                Schedules(i, day);
            cellTime.r += offsetTime;
        }
    
    if(listOne[XLSX.utils.encode_cell(cellTime)]!=undefined)    //проверяем наличие пары в 17.10
        if (listOne[XLSX.utils.encode_cell(cellTime)].v.indexOf("17.10") >= 0){
            if (listOne[XLSX.utils.encode_cell({c: cellTime.c + 1, r: cellTime.r})].v!="")
                Schedules(i, day);
            cellTime.r += offsetTime;
        }
}