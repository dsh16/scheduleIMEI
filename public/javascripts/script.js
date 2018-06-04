$(document).ready(function () {
    $(function () {
        $("#btn_closeWindow").click(function () {
            $(".par").hide();
        });
    });
    $(function () {
        $("#btn_openWindow").click(function () {
            $(".par").toggle();
        });
    });
    $(function () {
        $(".teacher_li").click(function () {
            $(this).parent().find("#delTeacher").toggle();
            $(this).parent().find("#changeTeacher").toggle();
        });
    });
    $(function () {
        $('td').on('dblclick', function () {
            var $td = $(this),
                $tr = $td.parent(),
                trIndex = $tr.index(),
                tdIndex = $td.index(),
                table = document.getElementById("scheduleTable"),
                tableRows = table.rows;

            $(".clickedDateDay").val(tableRows[0].cells[tdIndex].textContent);
            $(".clickedDateTime").val(tableRows[trIndex + 1].cells[0].textContent);



        });
    });
    /*$(function () {
        $('.td2').on('dblclick', function () {
            var $td = $(this),
                $tr = $td.parent(),
                trIndex = $tr.index(),
                tdIndex = $td.index(),

                table2 = document.getElementById("scheduleTable2"),
                tableRows2 = table2.rows;


            $(".clickedDateDay").val(tableRows2[0].cells[tdIndex].textContent);
            $(".clickedDateTime").val(tableRows2[trIndex + 1].cells[0].textContent);

        });
    });*/
    $(function () {
        $('#saveChangesScheduleBtn').on('click', function () {
            var subject = $("#inputGroupSelect01 option:selected").text();

            // $(".clickedDateDay").text(tableRows[0].cells[tdIndex].textContent);
            // $(".clickedDateTime").text(tableRows[trIndex+1].cells[0].textContent+" ");
        });
    });
    $(function () {
        $("#inputGroupSelect04").change(function () {
            var select_ = $("#inputGroupSelect04 option:selected").text();
            $(".clickedGroupName").val(select_);
            let table = document.getElementById("scheduleTable");
            let table2 = document.getElementById("scheduleTable2");
            for (var i = 0, row,row2; row = table.rows[i], row2=table2.rows[i]; i++) {
                for (var j = 1, col,col2; col = row.cells[j],col2 = row2.cells[j]; j++) {
                    let cell=table.rows[i].cells[j];
                    $(cell).find(".nameSubject").text("");
                    $(cell).find(".teacher").text("");
                    $(cell).find(".classroom").text("");
                    let cell2=table2.rows[i].cells[j];
                    $(cell2).find(".nameSubject").text("");
                    $(cell2).find(".teacher").text("");
                    $(cell2).find(".classroom").text("");
                };};
            $.ajax({
                type: "POST",
                url: "/fillSchedule",
                data: jQuery.param({group: select_}),
                dataType: "json"
            }).done(function (data) {
                let table = document.getElementById("scheduleTable");
                let table2 = document.getElementById("scheduleTable2");
                for (var i = 0, row,row2; row = table.rows[i], row2=table2.rows[i]; i++) {
                    for (var j = 1, col,col2; col = row.cells[j],col2 = row2.cells[j]; j++) {
                        if(typeof data[i]!=="undefined"){
                            if(typeof data[i][j]!=="undefined"){
                                if(typeof data[i][j].timeId!=="undefined") {
                                    if(data[i][j].week==='четная'){
                                        console.log(data[i][j].week);
                                        let cell=table.rows[i].cells[j];
                                        $(cell).find(".nameSubject").text(data[i][j].subjectName);
                                        $(cell).find(".teacher").text(data[i][j].teacherName);
                                        $(cell).find(".classroom").text(data[i][j].className);
                                    }
                                    else if(data[i][j].week==='нечетная') {
                                        console.log(data[i][j].week);
                                        let cell2=table2.rows[i].cells[j];
                                        $(cell2).find(".nameSubject").text(data[i][j].subjectName);
                                        $(cell2).find(".teacher").text(data[i][j].teacherName);
                                        $(cell2).find(".classroom").text(data[i][j].className);
                                    }
                                    else{
                                        let cell = table.rows[i].cells[j];
                                        $(cell).find(".nameSubject").text(data[i][j].subjectName);
                                        $(cell).find(".teacher").text(data[i][j].teacherName);
                                        $(cell).find(".classroom").text(data[i][j].className);
                                        let cell2 = table2.rows[i].cells[j];
                                        $(cell2).find(".nameSubject").text(data[i][j].subjectName);
                                        $(cell2).find(".teacher").text(data[i][j].teacherName);
                                        $(cell2).find(".classroom").text(data[i][j].className);
                                    }
                                    //$(cell).find(".teacher").text(data[i][j].lastname+" "+(data[i][j].firstname)[0]+". "+(data[i][j].lastname)[0]+". ");
                                };};};
                    };
                };
            });
        });
    });
    $(function () {
        $("#saveChangesScheduleBtn").click(function() {
            var clickedGroupName = $("input#clickedGroupName").val();
            var clickedDateTime = $("input#clickedDateTime").val();
            var clickedDateDay = $("input#clickedDateDay").val()
            var subjectSelect=$("#inputGroupSelect01 option:selected").text();
            var teacherSelect=$("#inputGroupSelect02 option:selected").text();
            var classroomSelect=$("#inputGroupSelect03 option:selected").text();
            var week="";
            if(document.getElementById('radio1').checked) {
                week='четная';//четная
            }
            else if(document.getElementById('radio2').checked) {
                week='нечетная';
            }
            else if(document.getElementById('radio3').checked){
                week='';
            }
            var result={clickedGroupName:clickedGroupName,clickedDateDay:clickedDateDay,clickedDateTime:clickedDateTime,subjectSelect:subjectSelect,
                teacherSelect:teacherSelect,classroomSelect:classroomSelect,week:week};
            $.ajax({
                type: "POST",
                url: "/saveChanges",
                data: result,
                success:function () {
                    fillSchedule();
                }
            });
            return false;
        });
    });

    function fillSchedule() {
        var select_ = $("#inputGroupSelect04 option:selected").text();
        $(".clickedGroupName").val(select_);
        let table = document.getElementById("scheduleTable");
        let table2 = document.getElementById("scheduleTable2");
        for (var i = 0, row,row2; row = table.rows[i], row2=table2.rows[i]; i++) {
            for (var j = 1, col,col2; col = row.cells[j],col2 = row2.cells[j]; j++) {
                let cell=table.rows[i].cells[j];
                $(cell).find(".nameSubject").text("");
                $(cell).find(".teacher").text("");
                $(cell).find(".classroom").text("");
                let cell2=table2.rows[i].cells[j];
                $(cell2).find(".nameSubject").text("");
                $(cell2).find(".teacher").text("");
                $(cell2).find(".classroom").text("");
            };};
        $.ajax({
            type: "POST",
            url: "/fillSchedule",
            data: jQuery.param({group: select_}),
            dataType: "json"
        }).done(function (data) {
            let table = document.getElementById("scheduleTable");
            let table2 = document.getElementById("scheduleTable2");
            for (var i = 0, row,row2; row = table.rows[i], row2=table2.rows[i]; i++) {
                for (var j = 1, col,col2; col = row.cells[j],col2 = row2.cells[j]; j++) {
                    if(typeof data[i]!=="undefined"){
                        if(typeof data[i][j]!=="undefined"){
                            if(typeof data[i][j].timeId!=="undefined") {
                                if(data[i][j].week==='четная'){
                                    let cell=table.rows[i].cells[j];
                                    $(cell).find(".nameSubject").text(data[i][j].subjectName);
                                    $(cell).find(".teacher").text(data[i][j].teacherName);
                                    $(cell).find(".classroom").text(data[i][j].className);
                                }
                                else if(data[i][j].week==='нечетная') {
                                    let cell2=table2.rows[i].cells[j];
                                    $(cell2).find(".nameSubject").text(data[i][j].subjectName);
                                    $(cell2).find(".teacher").text(data[i][j].teacherName);
                                    $(cell2).find(".classroom").text(data[i][j].className);
                                }
                                else {
                                    let cell = table.rows[i].cells[j];
                                    $(cell).find(".nameSubject").text(data[i][j].subjectName);
                                    $(cell).find(".teacher").text(data[i][j].teacherName);
                                    $(cell).find(".classroom").text(data[i][j].className);
                                    let cell2 = table2.rows[i].cells[j];
                                    $(cell2).find(".nameSubject").text(data[i][j].subjectName);
                                    $(cell2).find(".teacher").text(data[i][j].teacherName);
                                    $(cell2).find(".classroom").text(data[i][j].className);
                                }
                                //$(cell).find(".teacher").text(data[i][j].lastname+" "+(data[i][j].firstname)[0]+". "+(data[i][j].lastname)[0]+". ");
                            };};};
                };
            };
        });
    };

    fillSchedule();//подгрузка расписания при автоматической подстановке группы

    $("#inputGroupSelect02").select2({
        placeholder: "Выберите преподавателя",
        allowClear: true
    });
    $("#inputGroupSelect03").select2({
        placeholder: "Выберите аудиторию",
        allowClear: true
    });

    $("#inputGroupSelect04").select2({
        placeholder: "Выберите группу"
    });

    $("#inputGroupSelect01").select2({
        placeholder: "Выберите предмет",
        allowClear: true
    });

    //для изменения url без обновления страницы при просмотре расписания
    $(function () {
        $(".newUrl").change(function () {
            var id = $(".newUrl option:selected").val();
            var redirect = '/schedule/'+id;
            history.pushState('', '', redirect);
            //history.replaceState('', '', redirect);
        });
    });
});

function typeUserRegister(a) {
    var label = a.value;
    var sel = document.getElementById("Select1");
    var val = sel.options[sel.selectedIndex].text;
    if (val=="Староста") {
        document.getElementById("Label1").style.display='block';
    }
    else {
        document.getElementById("Label1").style.display='none';
    }
};

function userGroup(a) {

    var group1 = document.getElementById("userGroup");
    var val = group1.textContent;
    var group2 = document.getElementById("inputGroupSelect04");
    var val1 = group2.options[group2.selectedIndex].text;
    var type_user = document.getElementById("type_user");
    var val2 = type_user.textContent;

    if(val2=='Администратор'){
        document.getElementById("editSchedule").style.display='block';
        document.getElementById("Label1").style.display='none';
    };
    if (val2=='Староста' && val==val1) {
        document.getElementById("editSchedule").style.display='block';
        document.getElementById("Label1").style.display='none';
    };
    if (val2=='Староста' && val!=val1) {
        document.getElementById("editSchedule").style.display='none';
        document.getElementById("Label1").style.display='block';
    };
};