var mode = 0; //0:top, 1:main
var csvFileFlag = 0;
var animated1 = false;
var animated2 = false;
var animated3 = false;

var dataArray = new Array();
var JsonText = "";

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

//var genre = { "Senmon":"専門科目", "SenmonKiso":"専門基礎科目", "Kiso":"基礎科目" };

var gakugun2gakurui = [
    {gakugun: '1', gakurui:'人文学類'},
    {gakugun: '1', gakurui:'比較文化学類'},
    {gakugun: '1', gakurui:'日本語・日本文化学類'},
    {gakugun: '2', gakurui:'社会学類'},
    {gakugun: '2', gakurui:'国際総合学類'},
    {gakugun: '3', gakurui:'教育学類'},
    {gakugun: '3', gakurui:'心理学類'},
    {gakugun: '3', gakurui:'障害科学類'},
    {gakugun: '4', gakurui:'生物学類'},
    {gakugun: '4', gakurui:'生物資源学類'},
    {gakugun: '4', gakurui:'地球学類'},
    {gakugun: '5', gakurui:'数学学類'},
    {gakugun: '5', gakurui:'物理学類'},
    {gakugun: '5', gakurui:'化学学類'},
    {gakugun: '5', gakurui:'応用理工学類'},
    {gakugun: '5', gakurui:'工学システム学類'},
    {gakugun: '5', gakurui:'社会工学学類'},
    {gakugun: '6', gakurui:'情報科学類'},
    {gakugun: '6', gakurui:'情報メディア創成学類'},
    {gakugun: '6', gakurui:'知識情報・図書館学類'},
    {gakugun: '7', gakurui:'医学類'},
    {gakugun: '7', gakurui:'看護学類'},
    {gakugun: '7', gakurui:'医療科学類'},
    {gakugun: '8', gakurui:'学類なし'},
    {gakugun: '9', gakurui:'学類なし'}
];

var gakurui2senkou = [
    //11:人文学類
    {gakurui: '11', senkou:'哲学'},
    {gakurui: '11', senkou:'倫理学'},
    {gakurui: '11', senkou:'宗教学'},
    {gakurui: '11', senkou:'日本史'},
    {gakurui: '11', senkou:'西洋史'},
    {gakurui: '11', senkou:'歴史地理学'},
    {gakurui: '11', senkou:'先史学・考古学'},
    {gakurui: '11', senkou:'民俗学・文化人類学'},
    {gakurui: '11', senkou:'一般言語学'},
    {gakurui: '11', senkou:'応用言語学'},
    {gakurui: '11', senkou:'日本語学'},
    {gakurui: '11', senkou:'英語学'},
    {gakurui: '11', senkou:'仏語学'},
    {gakurui: '11', senkou:'独語学'},
    {gakurui: '11', senkou:'露語学'},
    //12:比較文化
    {gakurui: '12', senkou:'日本文学'},
    {gakurui: '12', senkou:'中国文学'},
    {gakurui: '12', senkou:'日本研究'},
    {gakurui: '12', senkou:'アジア研究'},
    {gakurui: '12', senkou:'英語圏文学・文化'},
    {gakurui: '12', senkou:'フランス語圏文学・文化'},
    {gakurui: '12', senkou:'ドイツ語圏文学・文化'},
    {gakurui: '12', senkou:'欧米研究'},
    {gakurui: '12', senkou:'文化人類学'},
    {gakurui: '12', senkou:'文化地理学'},
    {gakurui: '12', senkou:'テキスト文化学'},
    {gakurui: '12', senkou:'文化創造論'},
    {gakurui: '12', senkou:'先端文化学'},
    {gakurui: '12', senkou:'情報文化学'},
    {gakurui: '12', senkou:'現代思想'},
    {gakurui: '12', senkou:'比較宗教'},
    //13:日本語・日本文化
    {gakurui: '13', senkou:'専攻なし'},
    //21:社会学
    {gakurui: '21', senkou:'社会学'},
    {gakurui: '21', senkou:'法学'},
    {gakurui: '21', senkou:'政治学'},
    {gakurui: '21', senkou:'経済学'},
    //22:国際総合
    {gakurui: '22', senkou:'国際関係学'},
    {gakurui: '22', senkou:'国際開発学'},
    //31:教育
    {gakurui: '31', senkou:'人間形成系列'},
    {gakurui: '31', senkou:'教育計画・設計系列'},
    {gakurui: '31', senkou:'地域・国際教育系列'},
    {gakurui: '31', senkou:'学校教育開発系列'},
    //32:心理
    {gakurui: '32', senkou:'実験心理学'},
    {gakurui: '32', senkou:'教育心理学'},
    {gakurui: '32', senkou:'発達心理学'},
    {gakurui: '32', senkou:'社会心理学'},
    {gakurui: '32', senkou:'臨床心理学'},
    //33:障害科
    {gakurui: '33', senkou:'障害科学'},
    {gakurui: '33', senkou:'特別支援教育学'},
    {gakurui: '33', senkou:'社会福祉学'},
    //41:生物
    {gakurui: '41', senkou:'多様性'},
    {gakurui: '41', senkou:'情報'},
    {gakurui: '41', senkou:'分子細胞'},
    {gakurui: '41', senkou:'応用生物'},
    {gakurui: '41', senkou:'人間生物'},
    //42:生物資源
    {gakurui: '42', senkou:'農林生物学'},
    {gakurui: '42', senkou:'応用生命化学'},
    {gakurui: '42', senkou:'環境工学'},
    {gakurui: '42', senkou:'社会経済学'},
    //地球
    {gakurui: '43', senkou:'地球環境学'},
    {gakurui: '43', senkou:'地球進化学'},
    //51:数学
    {gakurui: '51', senkou:'専攻なし'},
    //52:物理
    {gakurui: '52', senkou:'専攻なし'},
    //53:化学
    {gakurui: '53', senkou:'専攻なし'},
    //54:応用理工
    {gakurui: '54', senkou:'応用物理'},
    {gakurui: '54', senkou:'電子・量子工学'},
    {gakurui: '54', senkou:'物性工学'},
    {gakurui: '54', senkou:'物質・分子工学'},
    //55:システム工学
    {gakurui: '55', senkou:'知的工学システム'},
    {gakurui: '55', senkou:'機能工学システム'},
    {gakurui: '55', senkou:'環境開発工学'},
    {gakurui: '55', senkou:'エネルギー工学'},
    //社会工学
    {gakurui: '56', senkou:'社会経済システム'},
    {gakurui: '56', senkou:'経営工学'},
    {gakurui: '56', senkou:'都市計画'},
    //61:情報科学
    {gakurui: '61', senkou:'ソフトウェアサイエンス'},
    {gakurui: '61', senkou:'情報システム'},
    {gakurui: '61', senkou:'知能情報メディア'},
    //62:情報メディア創成
    {gakurui: '62', senkou:'専攻なし'},
    //63:知識情報・図書館
    {gakurui: '63', senkou:'知識科学'},
    {gakurui: '63', senkou:'知能情報システム'},
    {gakurui: '63', senkou:'情報資源経営'},
    //71:医学
    {gakurui: '71', senkou:'?'},
    //72:看護
    {gakurui: '72', senkou:'看護師'},
    {gakurui: '72', senkou:'保健師'},
    {gakurui: '72', senkou:'養護教諭'},
    //73:医療科
    {gakurui: '73', senkou:'医療科学'},
    {gakurui: '73', senkou:'国際医療科学'},
    //81:体育専門学群
    {gakurui: '81', senkou:'健康・スポーツ教育'},
    {gakurui: '81', senkou:'健康・スポーツマネジメント'},
    {gakurui: '81', senkou:'スポーツコーチング'},
    //91:芸術専門学群
    {gakurui: '91', senkou:'美術史'},
    {gakurui: '91', senkou:'芸術支援'},
    {gakurui: '91', senkou:'洋画'},
    {gakurui: '91', senkou:'日本画'},
    {gakurui: '91', senkou:'彫塑'},
    {gakurui: '91', senkou:'書'},
    {gakurui: '91', senkou:'総合造形'},
    {gakurui: '91', senkou:'クラフト'},
    {gakurui: '91', senkou:'構造'},
    {gakurui: '91', senkou:'ビジュアルデザイン'},
    {gakurui: '91', senkou:'情報デザイン'},
    {gakurui: '91', senkou:'プロダクトデザイン'},
    {gakurui: '91', senkou:'環境デザイン'},
    {gakurui: '91', senkou:'建築デザイン'}
];

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
        }, 700, function() {
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
            var second_ = first_ + $("#REQUIREMENT").height() + interval_;
            var third_ = second_ + $("#CREDIT").height() + interval_;
            var fourth_ = third_ + $("#GRADE_GPA").height() + interval_;
            var href = $(this).attr("href");
            var position = 0;
            if (href == "#REQUIREMENT") {
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
        showInputModal();
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
    dataArray = new Array();
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
}

function convertJsonText(dataArray) {
    var length = dataArray.length;
    var txt = "{\n";
    txt += '\t\"student\": {\n';
    txt += '\t\t\"year\": '+2014+',\n';
    txt += '\t\t\"major\": \"'+"Sousei"+'\",\n';
    txt += '\t\t\"part3\": '+false+'\n';
    txt += '\t},\n';
    for (var i = 0; i < length; i++) {
        txt += '\t\"line' + i + '\": {\n';
        txt += '\t\t\"year\": \"' + dataArray[i][0] + '\",\n';
        txt += '\t\t\"subject\": \"' + dataArray[i][1] + '\",\n';
        txt += '\t\t\"grade\": \"' + dataArray[i][2] + '\"\n';
        txt += '\t}' + ((i < length - 1) ? ',' : '' ) + '\n';
    }
    txt += '}';
    JsonText = txt;
}

function postData() {
    if (csvFileFlag == 1) {
        $.ajax({
            type: "POST",
            data: JsonText,
            url: "https://tpp.d-io.com/api/csv",
            contentType: "application/json",
            success: function(data) {
                console.log(data);
                getData(data);
            },
            error: function() {
                console.log("Error");
            }
        });
    }
    return false;
}

function getData(data) {
    //$.getJSON("js/tmp.json" , function(data) {} );
    var needGRCourse = data.REQUIREMENT.needGRCourse;
    var getGRCourse = data.REQUIREMENT.getGRCourse;
    var nowGRCourse = data.REQUIREMENT.nowGRCourse;
    var preGRCourse = data.REQUIREMENT.preGRCourse;
    var restGRCourse = needGRCourse-(getGRCourse+nowGRCourse+preGRCourse);
    restGRCourse = restGRCourse > 0 ? restGRCourse : 0.0;
    rabbit_data = [needGRCourse, getGRCourse, nowGRCourse, preGRCourse, restGRCourse];

    var needCourse = data.CREDIT[0].needCourse;
    var getCourse = data.CREDIT[0].getCourse;
    var nowCourse = data.CREDIT[0].nowCourse;
    var preCourse = data.CREDIT[0].preCourse;
    var courseA = data.CREDIT[0].courseA;
    var courseSum = data.CREDIT[0].courseSum;
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

    jumpMain();
}

function reloadTop() {
    window.location.href = "./index.html";
}

$(function() {
    //第一ブロック
    $("#REQUIREMENT_GRAPH").on("inview", function() {
        if (mode == 1 && animated1 == false) {
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
    $("#CREDIT_GRAPH").on("inview", function() {
        if (mode == 1 && animated2 == false) {
            animated2 = true;
            drawGetCredit("#GET_CREDIT_GRAPH", get_credit_data);
            drawGradeA("#GRADE_A_GRAPH", grade_A_data);
        }
    });

    //第三ブロック
    $("#GRADE_GPA_GRAPH").on("inview", function() {
        if (mode == 1 && animated3 == false) {
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

/*所属入力モーダル*/
function showInputModal() {
    if(!($('#MODAL_BACKGROUND').length)){
        $('<div id="MODAL_BACKGROUND"></div>').insertAfter('#FOOTER');
    }
    $("#MODAL_BACKGROUND").fadeIn("1200");
    $("#INPUT_AFFILIATION_MODAL_CONTENTS").center().fadeIn("1500");

    $("#MODAL_BACKGROUND,#INPUT_AFFILIATION_MODAL_CONTENTS").click(function() {
        if (!$(this).closest('#INPUT_AFFILIATION_MODAL_CONTENTS').length) {
            $("#INPUT_AFFILIATION_MODAL_CONTENTS").center().fadeOut("1000",function() {
                $('#MODAL_BACKGROUND').remove();
            });
        }
    });
}

$(function() {
    $("#INPUT_MODAL_CANCEL_BUTTON,#INPUT_MODAL_OK_BUTTON").hover(function() {
        $(this).attr("src", $(this).attr("src").replace("_OFF", "_ON"));
    }, function() {
        $(this).attr('src', $(this).attr('src').replace('_ON', '_OFF'));
    });
});

function closeInputModal() {
    $("#INPUT_AFFILIATION_MODAL_CONTENTS").center().fadeOut("1000",function() {
        $('#MODAL_BACKGROUND').remove();
    });
}

function submitAffiliationData() {
    var AffiliationValue = $("#MAJOR_SELECT").val();
    console.log("所属ID:"+AffiliationValue);
    closeInputModal();
    // ここでサーバーに情報を送る
    convertJsonText(dataArray);
}

$(document).ready( function() {
    $('#FACULTY_SELECT').change(function() {
        setDepartSelect($(this).val());
    });

    $('#DEPART_SELECT').change(function() {
        setMajorSelect($(this).val());
    });

    function setDepartSelect(str){
        var num = 0;
        $('#DEPART_SELECT').find('option').remove();
        $(gakugun2gakurui).each(function(i){
            if(gakugun2gakurui[i].gakugun == str){
                num = num + 1;
                $('#DEPART_SELECT').append($('<option></option>')
                .val(String(str)+String(num))
                .text(gakugun2gakurui[i].gakurui));
                setMajorSelect(String(str)+String(num));
            }
        });
    }
    function setMajorSelect(str){
        var num = 0;
        $('#MAJOR_SELECT').find('option').remove();
        $(gakurui2senkou).each(function(i){
            if(gakurui2senkou[i].gakurui == str){
                num = num + 1;
                $('#MAJOR_SELECT').append($('<option></option>')
                .val(String(str)+String(num))
                .text(gakurui2senkou[i].senkou));
            }
        });
    }
    setDepartSelect('1');
    setMajorSelect('11');
});

/*科目詳細モーダル*/
$(function() {
    $("#SHOW_SUB_DETAIL_MODAL_OPEN").click(function() {
        initShowSubModalData();
        setShowSubModalData();
        if(!($('#MODAL_BACKGROUND').length)){
            $('<div id="MODAL_BACKGROUND"></div>').insertAfter('#FOOTER');
        }
        //$("body").append('<div id="MODAL_BACKGROUND"></div>');

        $("#MODAL_BACKGROUND").fadeIn("1200");
        $("#SHOW_SUB_DETAIL_MODAL_CONTENTS").center().fadeIn("1500");

        $("#MODAL_BACKGROUND,#SHOW_SUB_DETAIL_MODAL_CONTENTS").click(function() {
            if (!$(this).closest('#SHOW_SUB_DETAIL_MODAL_CONTENTS').length) {
                $("#SHOW_SUB_DETAIL_MODAL_CONTENTS").center().fadeOut("1000",function() {
                    $('#MODAL_BACKGROUND').remove();
                });
            }
        });
    });
});
/*
$(function() {
$("#INPUT_MODAL_CANCEL_BUTTOM,#INPUT_MODAL_OK_BUTTOM").hover(function() {
$(this).attr("src", $(this).attr("src").replace("_OFF", "_ON"));
}, function() {
$(this).attr('src', $(this).attr('src').replace('_ON', '_OFF'));
});
});
*/
function closeShowSubModal() {
    $("#SHOW_SUB_DETAIL_MODAL_CONTENTS").center().fadeOut("1000",function() {
        $('#MODAL_BACKGROUND').remove();
    });
}

function initShowSubModalData() {
    document.getElementById("ID_NAME_LABEL").innerHTML = "";
    document.getElementById("CREDIT_VALUE_LABEL").innerHTML = "";
    document.getElementById("SCHOOL_GRADE_LABEL").innerHTML = "";
    document.getElementById("SUB_CLASS_LABEL").innerHTML = "";
    document.getElementById("LESSON_TIME_LABEL").innerHTML = "";
    document.getElementById("CLASS_ROOM_LABEL").innerHTML = "";
    document.getElementById("TEATURE_LABEL").innerHTML = "";
    document.getElementById("STATE_LABEL").innerHTML = "";
    document.getElementById("DESCRIPTION_LABEL").innerHTML = "";
    document.getElementById("REMARKS_LABEL").innerHTML = "";
}


function setShowSubModalData() {
    var sub_id = "GC54401";//テーブルから取得&サーバー側に送信,履修年度がある
    var sub_name = "映像メディア論";//サーバーから受信(KdB)
    var credit = "1.0";//サーバーから受信(KdB)
    var school_grade = "3・4"//サーバーから受信(KdB)
    var sub_class = "専門・選択";//サーバーから受信(sub_idから計算)
    var school_period = "秋AB";//サーバーから受信(KdB)
    var lesson_period = "水1,2";//サーバーから受信(KdB)
    var class_room = "7A104";//サーバーから受信(KdB)
    var teature = "辻 泰明";//サーバーから受信(KdB)
    /*
    [履修済み,履修中,履修予定,未履修]=[0,1,2,3]
    履修済み：CSVファイルで成績が "X" でない
    履修中  ：CSVファイルで成績が "X"
    履修予定：シミュレーションしている科目に該当
    未履修　：シュミレーションしている科目に該当しない
    */
    var state_frag = 0;//サーバーから受信(CSVとシミュレーションの結果から値を計算)
    var stateHash = {0:"履修済み", 1:"履修中", 2:"履修予定", 3:"未履修"};
    var state = stateHash[state_frag];
    if(state_frag == 0) var grade = "A";//サーバーから受信(CSV)
    var description = 'デジタル化の進展とインターネットの普及によって映像メディアの重要性は、ますます高まっている。今後、盛んになると予想される映像コンテンツの利活用に備え、映像メディアのさまざまな特性を考察する。また、映画からテレビへ、そして、インターネット配信へという映像メディアの発展を通観し、映像メディアおよび映像コンテンツ利活用の現状と課題について講義する。';
    var remarks = '<i class="fa fa-info-circle" aria-hidden="true"></i>GE82501と同一。情報メディア創成学類生はGC54401を,それ以外の学生はGE82501を履修すること';
    var url = "https://www.mast.tsukuba.ac.jp/lecture/syllabus/pdf/GC54401.pdf";/*サーバー側でこのURLがあるかどうか訊く*/
    var degital_syrabas_frag = 0;/*存在:1,存在しない:0*/
    var syrabasHash = {0:"電子シラバスなし",1:"電子シラバスあり"};

    document.getElementById("ID_NAME_LABEL").innerHTML = sub_id+" "+sub_name;
    document.getElementById("CREDIT_VALUE_LABEL").innerHTML = "単位："+credit+"単位";
    document.getElementById("SCHOOL_GRADE_LABEL").innerHTML = "年次："+school_grade+"年";
    document.getElementById("SUB_CLASS_LABEL").innerHTML = "区分："+sub_class;
    document.getElementById("LESSON_TIME_LABEL").innerHTML = "時限："+school_period+" "+lesson_period;
    document.getElementById("CLASS_ROOM_LABEL").innerHTML = "教室："+class_room;
    document.getElementById("TEATURE_LABEL").innerHTML = "担当："+teature;
    document.getElementById("STATE_LABEL").innerHTML = "状態："+state;
    if(state_frag==0){
        if(!($('#GRADE_LABEL').length)){
            $('<div id="GRADE_LABEL">'+"成績："+grade+'</div>').insertAfter('#STATE_LABEL');
        }
    }else if(state_frag==2){
        if(!($('#BUTTON_LABEL').length)){
            $('<hr class="show-sub-detail-modal"/><img id="BUTTON_LABEL" src="./img/main_show_sub_modal/DELETE_COURSE_BUTTON.svg" onclick="hoge" />').insertAfter('#STATE_LABEL');
        }
    }else if(state_frag==3){
        if(!($('#BUTTON_LABEL').length)){
            $('<hr class="show-sub-detail-modal"/><img id="BUTTON_LABEL" src="./img/main_show_sub_modal/TAKE_COURSE_BUTTON.svg" onclick="hoge" />').insertAfter('#STATE_LABEL');
        }
    }
    document.getElementById("DESCRIPTION_LABEL").innerHTML = description;
    document.getElementById("REMARKS_LABEL").innerHTML = remarks;
    if(!($('#DEGITAL_SYRABAS_LABEL').length)){
        $('<hr class="show-sub-detail-modal"/><div class="text-center" id="DEGITAL_SYRABAS_BOX"><a id="DEGITAL_SYRABAS_LABEL" target="_blank" href="'+url+'">'+syrabasHash[degital_syrabas_frag]+"</a></div>").insertAfter('#REMARKS_LABEL');
    }
}

/*
$(function() {
$('#CREDIT_TABLE').tablesorter();
});
*/

$(function() {
    $("#CREDIT_TABLE").dataTable({
        lengthChange: false,
        displayLength: 5,
        info: false,
    });
});


/*科目追加モーダル(シミュレーション)*/
