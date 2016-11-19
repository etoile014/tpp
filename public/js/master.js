var mode = 0; //0:top, 1:main
var csvFileFlag = 0;
var animated1 = false;
var animated2 = false;
var animated3 = false;

$(window).load(function() {
    $("#HEADER_MENU_INSIDE1, #PAGE_MAIN1").css({
        opacity: 1,
        display: "block"
    });
    $("#HEADER_MENU_INSIDE2, #PAGE_MAIN2").css({
        opacity: 0,
        display: "none"
    });
});

function jumpMain() {
    if (csvFileFlag == 1) {
        mode = 1;
        $("#HEADER_MENU_INSIDE1, #PAGE_MAIN1").animate({
            opacity: 0,
        }, 700, function(){
            $("#HEADER_MENU_INSIDE1, #PAGE_MAIN1").css({
                display: "none"
            });
            $("#HEADER_MENU_INSIDE2, #PAGE_MAIN2").css({
                display: "block"
            }).animate({
                opacity: 1
            }, 700);
        });
    }
    return false;
}

function fileNameResize() {
    var w = $(window).width();
    if (w > 850) {
        var h = $("#TOP_UPLOAD_AREA").height();
        var size = (h / 2) + "px";
        var calcs = "calc(62.5% - " + size + ")";
        $("#TOP_FILE_NAME").css({"fontSize":size, "top":calcs});
    } else {
        $("#TOP_FILE_NAME").css({"fontSize":"12px", "top":"calc(62.5% - 12px)"});
    }
}

$(function() {
    //ファイルネームのリサイズ
    $(window).on("load", function() {
        fileNameResize();
    });
    $(window).resize(function() {
        fileNameResize();
    });

    //ページスクロール遷移
    $("a[href^='#']").on("click", function() {
        var speed = 500;
        if (mode == 0) {
            var top_ = 0;
            var about_usage_ = top_ + $("#TOP").height();
            var qa_ = about_usage_ + $("#ABOUT_USAGE").height();
            var update_info_ = qa_ + $("#QA").height();
            var href = $(this).attr("href");
            var position = 0;
            if (href == "#TOP") {
                position = top_;
            } else if (href == "#ABOUT_USAGE") {
                position = about_usage_;
            } else if (href == "#QA") {
                position = qa_;
            } else if (href == "#UPDATE_INFO") {
                position = update_info_;
            }
            $("#PAGE_MAIN1").animate({scrollTop : position}, speed, "swing");
        } else if (mode == 1) {
            var interval_ = $(".INTERVAL").height();
            var first_ = 0;
            var second_ = first_ + $("#REQUIRMENT").height() + interval_;
            var third_ = second_ + $("#CREDIT").height() + interval_;
            var fourth_ = third_ + $("#GRADE_GPA").height() + interval_;
            var href = $(this).attr("href");
            var position = 0;
            if (href == "#REQUIRMENT") {
                position = first_;
            } else if (href == "#CREDIT") {
                position = second_;
            } else if (href == "#GRADE_GPA") {
                position = third_;
            } else if (href == "#SCHEDULE") {
                position = fourth_;
            }
            $("#PAGE_MAIN2").animate({scrollTop : position}, speed, "swing");
        }
        return false;
    });

    //ヘッダーメニューの白い横棒
    $(".menu-item").children("a")
    .on('mouseover', function() {
        var w = $(this).css('width');
        $(this).parents('.menu-item').children('.underbar').stop().animate({ 'width' : w}, 500, 'swing');
    })
    .on('mouseout', function() {
        $(this).parents('.menu-item').children('.underbar').stop().animate({ 'width' : '0px'}, 500, 'swing');
    });

    //ドラッグ&ドロップの設定
    var obj = $("#TOP_UPLOAD_AREA, #TOP_FILE_NAME");
    obj.on('dragenter', function(e) {
        e.stopPropagation();
        e.preventDefault();
    }).on('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
    }).on('drop', function(e) {
        e.preventDefault();
        var files = e.originalEvent.dataTransfer.files;
        handleFileUpload(files[0]);
    });
    $(document).on('dragenter', function(e) {
        e.stopPropagation();
        e.preventDefault();
    }).on('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
    }).on('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
});

function tapped() {
    $("#UPLOAD").click();
}

function fileUpload() {
    if ($("#UPLOAD").val() !== '') {
        var file = $("#UPLOAD").prop("files")[0];
        handleFileUpload(file);
    }
}

function handleFileUpload(file) {
    if (file.name.match(/^(gakusei_)(\d{9}).*\.csv/)) {
        csvFileFlag = 1;
        $("#TOP_FILE_NAME").text(file.name);
        var reader = new FileReader();
        reader.onload = function(e) {
            var txtData = e.target.result;
            TwinsPlanningParser(txtData);
        }
        reader.readAsText(file);
    }
}

function TwinsPlanningParser(textData) {
    textData = textData.trim();
    var data = textData.split("\r\n");
    var Line = data[1].split("\r");
    var linage = Line.length;
    var dataArray = new Array();

    var count = 0;
    for (var i = 0; i < linage; i++) {
        var row = Line[i].split("\",\"");
        for (var j = 0; j < row.length; j++) {
            row[j].replace("\"", "");
        }
        if (row[3] != "") {
            dataArray[count] = new Array();
            dataArray[count][0] = row[1];
            dataArray[count][1] = row[3];
            dataArray[count][2] = (row[6] != "") ? row[6] : "X";
            count += 1;
        }
    }
    convertJsonText(dataArray);
}

function convertJsonText(dataArray) {
    var length = dataArray.length;
    var txt = "{\n";
    for (var i = 0; i < length; i++) {
        txt += '\t\"line' + i + '\": {\n';
        txt += '\t\t\"year\": \"' + dataArray[i][0] + '\",\n';
        txt += '\t\t\"subject\": \"' + dataArray[i][1] + '\",\n';
        txt += '\t\t\"grade\": \"' + dataArray[i][2] + '\"\n';
        txt += '\t}' + ((i < length - 1) ? ',' : '' ) + '\n';
    }
    txt += '}';
    postData(txt);
    alert(txt);
}

function postData(jsontext) {
    $.ajax({
        type: "POST",
        url: "https://tpp.d-io.com/api/csv",
        data: jsontext,
        contentType: "application/json",
        success: function(data) {
            console.log(data);
        },
        error: function() {
            console.log("Error");
        }
    });
    getData();
}

function getData() {
    $.getJSON("js/tmp.json" , function(data) {
        var needGRCourse = data.REQUIRMENT.needGRCourse;
        var getGRCourse = data.REQUIRMENT.getGRCourse;
        var nowGRCourse = data.REQUIRMENT.nowGRCourse;
        var preGRCourse = data.REQUIRMENT.preGRCourse;
        var restGRCourse = needGRCourse-(getGRCourse+nowGRCourse+preGRCourse);
        restGRCourse = restGRCourse > 0 ? restGRCourse : 0.0;
        rabbit_data = [needGRCourse, getGRCourse, nowGRCourse, preGRCourse, restGRCourse];

        course = data.CREDIT.course;
        var needCourse = data.CREDIT.needCourse;
        var getCourse = data.CREDIT.getCourse;
        var nowCourse = data.CREDIT.nowCourse;
        var preCourse = data.CREDIT.preCourse;
        var courseA = data.CREDIT.courseA;
        var courseSum = data.CREDIT.courseSum;
        var otherCourse = (needCourse-(getCourse+nowCourse+preCourse));
        get_credit_data = [needCourse, getCourse, nowCourse, preCourse, otherCourse];
        grade_A_data = [courseA, courseSum];

        var countAplus = data.GRADE_GPA.countAplus;
        var countA = data.GRADE_GPA.countA;
        var countB = data.GRADE_GPA.countB;
        var countC = data.GRADE_GPA.countC;
        var countD = data.GRADE_GPA.countD;
        var countOther = data.GRADE_GPA.countOther;
        grade_rate_data = [countAplus, countA, countB, countC, countD, countOther];
        start = data.GRADE_GPA.start;
        credit_transition_data = data.GRADE_GPA.creditTransition;
        qpa_transition_data = data.GRADE_GPA.gpaTransition;
    });
}

function reloadTop() {
    window.location.href = "./index.html";
}

//Graphアニメーション
//Rabbit & Bar
var rabbit_data = [0.0, 0.0, 0.0, 0.0, 0.0];
// getCredit用
var course = "";
var get_credit_data = [0.0, 0.0, 0.0, 0.0, 0.0];
//GradeA&A+
var grade_A_data = [0.0, 0.0];
//GradeRate
var grade_rate_data = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
//折れ線グラフ
var start = 0;
//CreditTransition
var credit_transition_data = [0, 0, 0, 0, 0, 0];
//GPATransition
var qpa_transition_data = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

$(function() {
    //第一ブロック
    $("#REQUIRMENT_BOX").on("inview", function() {
        if (animated1 == false) {
            animated1 = true;
            drawGRBar("#BAR_GRAPH", rabbit_data);
            drawGRRabbit("#RABBIT_GRAPH",rabbit_data);

            $("#NEED_COURSE").text(rabbit_data[0].toFixed(1));
            $("#GET_COURSE").text(rabbit_data[1].toFixed(1));
            $("#NOW_COURSE").text(rabbit_data[2].toFixed(1));
            $("#PRE_COURSE").text(rabbit_data[3].toFixed(1));
            $("#REST_COURSE").text(rabbit_data[4].toFixed(1));
        }
    });

    //第二ブロック
    $("#CREDIT_BOX").on("inview", function() {
        if (animated2 == false) {
            animated2 = true;
            $("#CREDIT_PULLDOWN").text(course);
            drawGetCredit("#GET_CREDIT_GRAPH", get_credit_data);
            drawGradeA("#GRADE_A_GRAPH", grade_A_data);
        }
    });

    //第三ブロック
    $("#GRADE_GPA_BOX").on("inview", function() {
        if (animated3 == false) {
            animated3 = true;
            drawGradeRate("#GRADE_RATE", grade_rate_data);
            drawCreditTransition("#CREDIT_TRANSITION", start, credit_transition_data);
            drawGPATransition("#GPA_TRANSITION", start, qpa_transition_data);

            $("#CREDIT_APLUS").text(grade_rate_data[0].toFixed(1));
            $("#CREDIT_A").text(grade_rate_data[1].toFixed(1));
            $("#CREDIT_B").text(grade_rate_data[2].toFixed(1));
            $("#CREDIT_C").text(grade_rate_data[3].toFixed(1));
            $("#CREDIT_D").text(grade_rate_data[4].toFixed(1));
            $("#CREDIT_OTHERS").text(grade_rate_data[5].toFixed(1));
        }
    });
});
