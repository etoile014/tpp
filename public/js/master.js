var mode = 0; //0:top, 1:main
var csvFileFlag = 0;
var affiliationFlag = 0;
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


var gakugun2gakurui = [{
    gakugun: '1',
    gakurui: '人文学類'
}, {
    gakugun: '1',
    gakurui: '比較文化学類'
}, {
    gakugun: '1',
    gakurui: '日本語・日本文化学類'
}, {
    gakugun: '2',
    gakurui: '社会学類'
}, {
    gakugun: '2',
    gakurui: '国際総合学類'
}, {
    gakugun: '3',
    gakurui: '教育学類'
}, {
    gakugun: '3',
    gakurui: '心理学類'
}, {
    gakugun: '3',
    gakurui: '障害科学類'
}, {
    gakugun: '4',
    gakurui: '生物学類'
}, {
    gakugun: '4',
    gakurui: '生物資源学類'
}, {
    gakugun: '4',
    gakurui: '地球学類'
}, {
    gakugun: '5',
    gakurui: '数学学類'
}, {
    gakugun: '5',
    gakurui: '物理学類'
}, {
    gakugun: '5',
    gakurui: '化学学類'
}, {
    gakugun: '5',
    gakurui: '応用理工学類'
}, {
    gakugun: '5',
    gakurui: '工学システム学類'
}, {
    gakugun: '5',
    gakurui: '社会工学学類'
}, {
    gakugun: '6',
    gakurui: '情報科学類'
}, {
    gakugun: '6',
    gakurui: '情報メディア創成学類'
}, {
    gakugun: '6',
    gakurui: '知識情報・図書館学類'
}, {
    gakugun: '7',
    gakurui: '医学類'
}, {
    gakugun: '7',
    gakurui: '看護学類'
}, {
    gakugun: '7',
    gakurui: '医療科学類'
}, {
    gakugun: '8',
    gakurui: '学類なし'
}, {
    gakugun: '9',
    gakurui: '学類なし'
}];

var gakurui2senkou = [
    //11:人文学類
    {
        gakurui: '11',
        senkou: '哲学'
    }, {
        gakurui: '11',
        senkou: '倫理学'
    }, {
        gakurui: '11',
        senkou: '宗教学'
    }, {
        gakurui: '11',
        senkou: '日本史'
    }, {
        gakurui: '11',
        senkou: '西洋史'
    }, {
        gakurui: '11',
        senkou: '歴史地理学'
    }, {
        gakurui: '11',
        senkou: '先史学・考古学'
    }, {
        gakurui: '11',
        senkou: '民俗学・文化人類学'
    }, {
        gakurui: '11',
        senkou: '一般言語学'
    }, {
        gakurui: '11',
        senkou: '応用言語学'
    }, {
        gakurui: '11',
        senkou: '日本語学'
    }, {
        gakurui: '11',
        senkou: '英語学'
    }, {
        gakurui: '11',
        senkou: '仏語学'
    }, {
        gakurui: '11',
        senkou: '独語学'
    }, {
        gakurui: '11',
        senkou: '露語学'
    },
    //12:比較文化
    {
        gakurui: '12',
        senkou: '日本文学'
    }, {
        gakurui: '12',
        senkou: '中国文学'
    }, {
        gakurui: '12',
        senkou: '日本研究'
    }, {
        gakurui: '12',
        senkou: 'アジア研究'
    }, {
        gakurui: '12',
        senkou: '英語圏文学・文化'
    }, {
        gakurui: '12',
        senkou: 'フランス語圏文学・文化'
    }, {
        gakurui: '12',
        senkou: 'ドイツ語圏文学・文化'
    }, {
        gakurui: '12',
        senkou: '欧米研究'
    }, {
        gakurui: '12',
        senkou: '文化人類学'
    }, {
        gakurui: '12',
        senkou: '文化地理学'
    }, {
        gakurui: '12',
        senkou: 'テキスト文化学'
    }, {
        gakurui: '12',
        senkou: '文化創造論'
    }, {
        gakurui: '12',
        senkou: '先端文化学'
    }, {
        gakurui: '12',
        senkou: '情報文化学'
    }, {
        gakurui: '12',
        senkou: '現代思想'
    }, {
        gakurui: '12',
        senkou: '比較宗教'
    },
    //13:日本語・日本文化
    {
        gakurui: '13',
        senkou: '専攻なし'
    },
    //21:社会学
    {
        gakurui: '21',
        senkou: '社会学'
    }, {
        gakurui: '21',
        senkou: '法学'
    }, {
        gakurui: '21',
        senkou: '政治学'
    }, {
        gakurui: '21',
        senkou: '経済学'
    },
    //22:国際総合
    {
        gakurui: '22',
        senkou: '国際関係学'
    }, {
        gakurui: '22',
        senkou: '国際開発学'
    },
    //31:教育
    {
        gakurui: '31',
        senkou: '人間形成系列'
    }, {
        gakurui: '31',
        senkou: '教育計画・設計系列'
    }, {
        gakurui: '31',
        senkou: '地域・国際教育系列'
    }, {
        gakurui: '31',
        senkou: '学校教育開発系列'
    },
    //32:心理
    {
        gakurui: '32',
        senkou: '実験心理学'
    }, {
        gakurui: '32',
        senkou: '教育心理学'
    }, {
        gakurui: '32',
        senkou: '発達心理学'
    }, {
        gakurui: '32',
        senkou: '社会心理学'
    }, {
        gakurui: '32',
        senkou: '臨床心理学'
    },
    //33:障害科
    {
        gakurui: '33',
        senkou: '障害科学'
    }, {
        gakurui: '33',
        senkou: '特別支援教育学'
    }, {
        gakurui: '33',
        senkou: '社会福祉学'
    },
    //41:生物
    {
        gakurui: '41',
        senkou: '多様性'
    }, {
        gakurui: '41',
        senkou: '情報'
    }, {
        gakurui: '41',
        senkou: '分子細胞'
    }, {
        gakurui: '41',
        senkou: '応用生物'
    }, {
        gakurui: '41',
        senkou: '人間生物'
    },
    //42:生物資源
    {
        gakurui: '42',
        senkou: '農林生物学'
    }, {
        gakurui: '42',
        senkou: '応用生命化学'
    }, {
        gakurui: '42',
        senkou: '環境工学'
    }, {
        gakurui: '42',
        senkou: '社会経済学'
    },
    //地球
    {
        gakurui: '43',
        senkou: '地球環境学'
    }, {
        gakurui: '43',
        senkou: '地球進化学'
    },
    //51:数学
    {
        gakurui: '51',
        senkou: '専攻なし'
    },
    //52:物理
    {
        gakurui: '52',
        senkou: '専攻なし'
    },
    //53:化学
    {
        gakurui: '53',
        senkou: '専攻なし'
    },
    //54:応用理工
    {
        gakurui: '54',
        senkou: '応用物理'
    }, {
        gakurui: '54',
        senkou: '電子・量子工学'
    }, {
        gakurui: '54',
        senkou: '物性工学'
    }, {
        gakurui: '54',
        senkou: '物質・分子工学'
    },
    //55:システム工学
    {
        gakurui: '55',
        senkou: '知的工学システム'
    }, {
        gakurui: '55',
        senkou: '機能工学システム'
    }, {
        gakurui: '55',
        senkou: '環境開発工学'
    }, {
        gakurui: '55',
        senkou: 'エネルギー工学'
    },
    //社会工学
    {
        gakurui: '56',
        senkou: '社会経済システム'
    }, {
        gakurui: '56',
        senkou: '経営工学'
    }, {
        gakurui: '56',
        senkou: '都市計画'
    },
    //61:情報科学
    {
        gakurui: '61',
        senkou: 'ソフトウェアサイエンス'
    }, {
        gakurui: '61',
        senkou: '情報システム'
    }, {
        gakurui: '61',
        senkou: '知能情報メディア'
    },
    //62:情報メディア創成
    {
        gakurui: '62',
        senkou: '専攻なし'
    },
    //63:知識情報・図書館
    {
        gakurui: '63',
        senkou: '知識科学'
    }, {
        gakurui: '63',
        senkou: '知能情報システム'
    }, {
        gakurui: '63',
        senkou: '情報資源経営'
    },
    //71:医学
    {
        gakurui: '71',
        senkou: '?'
    },
    //72:看護
    {
        gakurui: '72',
        senkou: '看護師'
    }, {
        gakurui: '72',
        senkou: '保健師'
    }, {
        gakurui: '72',
        senkou: '養護教諭'
    },
    //73:医療科
    {
        gakurui: '73',
        senkou: '医療科学'
    }, {
        gakurui: '73',
        senkou: '国際医療科学'
    },
    //81:体育専門学群
    {
        gakurui: '81',
        senkou: '健康・スポーツ教育'
    }, {
        gakurui: '81',
        senkou: '健康・スポーツマネジメント'
    }, {
        gakurui: '81',
        senkou: 'スポーツコーチング'
    },
    //91:芸術専門学群
    {
        gakurui: '91',
        senkou: '美術史'
    }, {
        gakurui: '91',
        senkou: '芸術支援'
    }, {
        gakurui: '91',
        senkou: '洋画'
    }, {
        gakurui: '91',
        senkou: '日本画'
    }, {
        gakurui: '91',
        senkou: '彫塑'
    }, {
        gakurui: '91',
        senkou: '書'
    }, {
        gakurui: '91',
        senkou: '総合造形'
    }, {
        gakurui: '91',
        senkou: 'クラフト'
    }, {
        gakurui: '91',
        senkou: '構造'
    }, {
        gakurui: '91',
        senkou: 'ビジュアルデザイン'
    }, {
        gakurui: '91',
        senkou: '情報デザイン'
    }, {
        gakurui: '91',
        senkou: 'プロダクトデザイン'
    }, {
        gakurui: '91',
        senkou: '環境デザイン'
    }, {
        gakurui: '91',
        senkou: '建築デザイン'
    }
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
    if (csvFileFlag == 1 && affiliationFlag == 1) {
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

$(function() {
    $("img").on('contextmenu', function(e) {
        return false;
    });
});

function fileNameResize() {
    var w = $(window).width();
    if (w > 850) {
        var h = $("#TOP_UPLOAD_AREA").height();
        var size = (h / 2) + "px";
        var calcs = "calc(62.5% - " + size + ")";
        $("#TOP_FILE_NAME").css({
            "fontSize": size,
            "top": calcs
        });
    } else {
        $("#TOP_FILE_NAME").css({
            "fontSize": "12px",
            "top": "calc(62.5% - 12px)"
        });
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
            $("#PAGE_MAIN1").animate({
                scrollTop: position
            }, speed, "swing");
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
            $("#PAGE_MAIN2").animate({
                scrollTop: position
            }, speed, "swing");
        }
        return false;
    });

    //ヘッダーメニューの白い横棒
    $(".menu-item").children("a")
        .on('mouseover', function() {
            var w = $(this).css('width');
            $(this).parents('.menu-item').children('.underbar').stop().animate({
                'width': w
            }, 500, 'swing');
        })
        .on('mouseout', function() {
            $(this).parents('.menu-item').children('.underbar').stop().animate({
                'width': '0px'
            }, 500, 'swing');
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
            dataArray[count][0] = (row[0].split(":"))[0]; //科目区分
            dataArray[count][1] = row[1]; //年度
            dataArray[count][2] = row[3]; //科目番号
            dataArray[count][3] = row[4]; //科目名
            dataArray[count][4] = (row[6] != "") ? row[6] : "X"; //成績
            dataArray[count][5] = row[7]; //単位数
            dataArray[count][6] = (row[6] != "") ? "履修済み" : "履修中"; //状態
            count += 1;
        }
    }
}

function convertJsonText(dataArray, Aff) {
    var length = dataArray.length;
    var txt = "{\n";
    txt += '\t\"affiliation\": ' + Aff + ',\n';
    for (var i = 0; i < length; i++) {
        txt += '\t\"line' + i + '\": {\n';
        txt += '\t\t\"classification\": ' + dataArray[i][0] + '\",\n';
        txt += '\t\t\"year\": \"' + dataArray[i][1] + '\",\n';
        txt += '\t\t\"subject\": \"' + dataArray[i][2] + '\",\n';
        txt += '\t\t\"name\": \"' + dataArray[i][3] + '\",\n';
        txt += '\t\t\"grade\": \"' + dataArray[i][4] + '\",\n';
        txt += '\t\t\"credit\": \"' + dataArray[i][5] + ',\n';
        txt += '\t\t\"state\": \"' + dataArray[i][6] + '\"\n';
        txt += '\t}' + ((i < length - 1) ? ',' : '') + '\n';
    }
    txt += '}';
    JsonText = txt;
    alert(txt);
}

function postData() {
    if (csvFileFlag == 1 && affiliationFlag == 1) {
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
    var restGRCourse = needGRCourse - (getGRCourse + nowGRCourse + preGRCourse);
    restGRCourse = restGRCourse > 0 ? restGRCourse : 0.0;
    rabbit_data = [needGRCourse, getGRCourse, nowGRCourse, preGRCourse, restGRCourse];

    var needCourse = data.CREDIT[0].needCourse;
    var getCourse = data.CREDIT[0].getCourse;
    var nowCourse = data.CREDIT[0].nowCourse;
    var preCourse = data.CREDIT[0].preCourse;
    var courseA = data.CREDIT[0].courseA;
    var courseSum = data.CREDIT[0].courseSum;
    var otherCourse = (needCourse - (getCourse + nowCourse + preCourse));
    get_credit_data = [needCourse, getCourse, nowCourse, preCourse, otherCourse];
    grade_A_data = [courseA, courseSum];

    var countAplus = data.GRADE_GPA.countAplus;
    var countA = data.GRADE_GPA.countA;
    var countB = data.GRADE_GPA.countB;
    var countC = data.GRADE_GPA.countC;
    var countD = data.GRADE_GPA.countD;
    var countOther = data.GRADE_GPA.countP+data.GRADE_GPA.countF;
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
            drawGRRabbit("#RABBIT_GRAPH", rabbit_data);

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
    if (!($('#MODAL_BACKGROUND').length)) {
        $('<div id="MODAL_BACKGROUND"></div>').insertAfter('#FOOTER');
    }
    $("#MODAL_BACKGROUND").fadeIn("1200");
    $("#INPUT_AFFILIATION_MODAL_CONTENTS").center().fadeIn("1500");

    $("#MODAL_BACKGROUND,#INPUT_AFFILIATION_MODAL_CONTENTS").click(function() {
        if (!$(this).closest('#INPUT_AFFILIATION_MODAL_CONTENTS').length) {
            $("#INPUT_AFFILIATION_MODAL_CONTENTS").center().fadeOut("1000", function() {
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
    $("#INPUT_AFFILIATION_MODAL_CONTENTS").center().fadeOut("1000", function() {
        $('#MODAL_BACKGROUND').remove();
    });
}

function submitAffiliationData() {
    var AffiliationValue = $("#MAJOR_SELECT").val();
    console.log("所属ID:" + AffiliationValue);
    closeInputModal();
    // ここでサーバーに情報を送る
    convertJsonText(dataArray, AffiliationValue);
    affiliationFlag = 1;
}

$(document).ready(function() {
    $('#FACULTY_SELECT').change(function() {
        setDepartSelect($(this).val());
    });

    $('#DEPART_SELECT').change(function() {
        setMajorSelect($(this).val());
    });

    function setDepartSelect(str) {
        var num = 0;
        $('#DEPART_SELECT').find('option').remove();
        $(gakugun2gakurui).each(function(i) {
            if (gakugun2gakurui[i].gakugun == str) {
                num = num + 1;
                $('#DEPART_SELECT').append($('<option></option>')
                    .val(String(str) + String(num))
                    .text(gakugun2gakurui[i].gakurui));
                setMajorSelect(String(str) + String(num));
            }
        });
    }

    function setMajorSelect(str) {
        var num = 0;
        $('#MAJOR_SELECT').find('option').remove();
        $(gakurui2senkou).each(function(i) {
            if (gakurui2senkou[i].gakurui == str) {
                num = num + 1;
                $('#MAJOR_SELECT').append($('<option></option>')
					  .val(String(str) + ("0" + String(num)).slice(-2))
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

        if (!($('#MODAL_BACKGROUND').length)) {
            $('<div id="MODAL_BACKGROUND"></div>').insertAfter('#PAGE_MAIN2');
        }

        //$("body").append('<div id="MODAL_BACKGROUND"></div>');

        $("#MODAL_BACKGROUND").fadeIn("1200");
        $("#SHOW_SUB_DETAIL_MODAL_CONTENTS").center().fadeIn("1500");

        $("#MODAL_BACKGROUND,#SHOW_SUB_DETAIL_MODAL_CONTENTS").click(function() {
            if (!$(this).closest('#SHOW_SUB_DETAIL_MODAL_CONTENTS').length) {
                $("#SHOW_SUB_DETAIL_MODAL_CONTENTS").center().fadeOut("1000", function() {
                    $('#MODAL_BACKGROUND').remove();
                });
            }
        });
    });
});



function openShowSubModal(data) {
    initShowSubModalData();
    setShowSubModalData(data);

    if (!($('#MODAL_BACKGROUND').length)) {
        $('<div id="MODAL_BACKGROUND"></div>').insertAfter('#PAGE_MAIN2');
    }

    $("#MODAL_BACKGROUND").fadeIn("1200");
    $("#SHOW_SUB_DETAIL_MODAL_CONTENTS").center().fadeIn("1500");

    $("#MODAL_BACKGROUND,#SHOW_SUB_DETAIL_MODAL_CONTENTS").click(function() {
        if (!$(this).closest('#SHOW_SUB_DETAIL_MODAL_CONTENTS').length) {
            $("#SHOW_SUB_DETAIL_MODAL_CONTENTS").center().fadeOut("1000", function() {
                $('#MODAL_BACKGROUND').remove();
            });
        }
    });
}

function closeShowSubModal() {
    $("#SHOW_SUB_DETAIL_MODAL_CONTENTS").center().fadeOut("1000", function() {
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
    $('#GRADE_LABEL').remove();
    $('#DEGITAL_SYRABAS_BAR').remove();
    $('#DEGITAL_SYRABAS_BOX').remove();
}


function setShowSubModalData(data) {
    var sub_id = data.id; //テーブルから取得&サーバー側に送信,履修年度がある
    var sub_name = data.name; //サーバーから受信(KdB)
    var credit = data.credit; //サーバーから受信(KdB)
    var school_grade = data.grade; //サーバーから受信(KdB)
    var school_period = data.semester; //サーバーから受信(KdB)
    var lesson_period = data.type; //サーバーから受信(KdB)
    var class_room = data.place; //サーバーから受信(KdB)
    var teature = data.teacher; //サーバーから受信(KdB)

    var state = data.state; //サーバから受信（おうむ返し）
    var grade = data.score; //サーバから受信（おうむ返し）

    var subClassHash = {
        'A': '専門科目',
        'B': '専門基礎科目',
        'C': '基礎科目',
        'C_0': '基礎科目(GPA対象外)',
        'D': '履修予定科目'
    };
    var sub_class = subClassHash[$('#CREDIT_PULLDOWN').val()]; //サーバーから受信(sub_idから計算)

    /*
    [履修済み,履修中,履修予定,未履修]=[0,1,2,3]
    履修済み：CSVファイルで成績が "X" でない
    履修中  ：CSVファイルで成績が "X"
    履修予定：シミュレーションしている科目に該当
    未履修　：シュミレーションしている科目に該当しない
    */



    var description = data.summery;
    if (data.etc != "") {
        var remarks = '<i class="fa fa-info-circle" aria-hidden="true"></i>' + ' ' + data.etc;
    } else {
        var remarks = '<i class="fa fa-info-circle" aria-hidden="true"></i>' + ' ' + '特になし';
    }

    var url = "https://www.mast.tsukuba.ac.jp/lecture/syllabus/pdf/" + data.id + ".pdf"; /*サーバー側でこのURLがあるかどうか訊く*/
    var degital_syrabas_frag = 1; /*存在:1,存在しない:0*/
    var syrabasHash = {
        0: "電子シラバスなし",
        1: "電子シラバスあり"
    };

    document.getElementById("ID_NAME_LABEL").innerHTML = sub_id + " " + sub_name;
    document.getElementById("CREDIT_VALUE_LABEL").innerHTML = "単位：" + credit + "単位";
    document.getElementById("SCHOOL_GRADE_LABEL").innerHTML = "年次：" + school_grade + "年";
    document.getElementById("SUB_CLASS_LABEL").innerHTML = "区分：" + sub_class;
    document.getElementById("LESSON_TIME_LABEL").innerHTML = "時限：" + school_period + " " + lesson_period;
    document.getElementById("CLASS_ROOM_LABEL").innerHTML = "教室：" + class_room;
    document.getElementById("TEATURE_LABEL").innerHTML = "担当：" + teature;
    document.getElementById("STATE_LABEL").innerHTML = "状態：" + state;
    if (state == "履修済み") {
        if (!($('#GRADE_LABEL').length)) {
            $('<div id="GRADE_LABEL">' + "成績：" + grade + '</div>').insertAfter('#STATE_LABEL');
        }
    } else if (state == "履修予定") {
        if (!($('#BUTTON_LABEL').length)) {
            $('<hr class="show-sub-detail-modal"/><img id="BUTTON_LABEL" src="./img/main_show_sub_modal/DELETE_COURSE_BUTTON.svg" onclick="deletePreCourse()" />').insertAfter('#STATE_LABEL');
        }
    } else if (state == "未履修") {
        if (!($('#BUTTON_LABEL').length)) {
            $('<hr class="show-sub-detail-modal"/><img id="BUTTON_LABEL" src="./img/main_show_sub_modal/TAKE_COURSE_BUTTON.svg" onclick="hoge" />').insertAfter('#STATE_LABEL');
        }
    }
    document.getElementById("DESCRIPTION_LABEL").innerHTML = description;
    document.getElementById("REMARKS_LABEL").innerHTML = remarks;

    if (!($('#DEGITAL_SYRABAS_LABEL').length)) {
        $('<hr id="DEGITAL_SYRABAS_BAR" class="show-sub-detail-modal"/><div class="text-center" id="DEGITAL_SYRABAS_BOX"><a id="DEGITAL_SYRABAS_LABEL" target="_blank" href="' + url + '">' + syrabasHash[degital_syrabas_frag] + "</a></div>").insertAfter('#REMARKS_LABEL');
    }

}

function deletePreCourse() {
    var CurrentJsonText = JsonText;
    //console.log(CurrentJsonText);

    var deleteSubject = $('#ID_NAME_LABEL').text();
    var deleteSubID = deleteSubject.split(' ')[0];

    var CurrentJsonObject = JSON.parse(CurrentJsonText);
    var JsonTextLine = Object.keys(CurrentJsonObject).length;
    var deleteObject = "";
    var deleteLine = "";
    var deleteLineValue = "";
    var updateLineObject = "";
    var deleteSubCredit = "";

    for (var i = 1; i < JsonTextLine; i++) {
        var keyline = "line" + String(i - 1);
        if (CurrentJsonObject[keyline].subject == deleteSubID) {
            deleteLine = keyline;
            deleteLineValue = i-1;
            deleteSubCredit = CurrentJsonObject[keyline].credit;
        }
    }
    //console.log("deleteLine:" + deleteLine);
    delete CurrentJsonObject[deleteLine];
    //console.log(CurrentJsonObject);

    //JsonText自分で生成 & line名更新(JSON.stringifyは使わない)
    var newJsonText = "{\n";
    newJsonText += '\t\"affiliation\": ' + CurrentJsonObject.affiliation + ',\n';
    //Line番号変更がない部分
    for (var i = 0; i < deleteLineValue; i++) {
        var keyline = "line" + String(i);
        newJsonText += '\t\"line' + i + '\": {\n';
        newJsonText += '\t\t\"classification\": \"' + CurrentJsonObject[keyline].classification + '\",\n';
        newJsonText += '\t\t\"year\": \"' + CurrentJsonObject[keyline].year + '\",\n';
        newJsonText += '\t\t\"subject\": \"' + CurrentJsonObject[keyline].subject + '\",\n';
        newJsonText += '\t\t\"name\": \"' + CurrentJsonObject[keyline].name + '\",\n';
        newJsonText += '\t\t\"grade\": \"' + CurrentJsonObject[keyline].grade + '\",\n';
        newJsonText += '\t\t\"credit\": \"' + CurrentJsonObject[keyline].credit + '\",\n';
        newJsonText += '\t\t\"state\": \"' + CurrentJsonObject[keyline].state + '\"\n';
        newJsonText += '\t},\n';
    }
    //Line番号変更がある場合
    for (var i = deleteLineValue; i < JsonTextLine - 1; i++) { //Affの分を1引く
        var keyline = "line" + String(i);
        var nextkeyline = "line" + String(i + 1);
        if (i + 1 < JsonTextLine - 1) {
            newJsonText += '\t\"line' + i + '\": {\n';
            newJsonText += '\t\t\"classification\": \"' + CurrentJsonObject[nextkeyline].classification + '\",\n';
            newJsonText += '\t\t\"year\": \"' + CurrentJsonObject[nextkeyline].year + '\",\n';
            newJsonText += '\t\t\"subject\": \"' + CurrentJsonObject[nextkeyline].subject + '\",\n';
            newJsonText += '\t\t\"name\": \"' + CurrentJsonObject[nextkeyline].name + '\",\n';
            newJsonText += '\t\t\"grade\": \"' + CurrentJsonObject[nextkeyline].grade + '\",\n';
            newJsonText += '\t\t\"credit\": \"' + CurrentJsonObject[nextkeyline].credit + '\",\n';
            newJsonText += '\t\t\"state\": \"' + CurrentJsonObject[nextkeyline].state + '\"\n';
            newJsonText += '\t},\n';
        }
    }
    var tmp = newJsonText.substr(0, newJsonText.length - 2); //末尾削除
    newJsonText = tmp;
    newJsonText += '\n}';

    //alert("JsonText\n"+JsonText);
    //alert("newJsonText\n"+newJsonText);

    JsonText = newJsonText;
    updateSelectOption();
    updateRabbitDataDelete(deleteSubCredit);
    updateGetCreditDataDelete(deleteSubCredit);
    closeShowSubModal();
    updateRequirementGraph();
    updateCreditGraph();
}

function updateSelectOption(){
  var nowOption = $('[name=credit_pulldown]').val();
  var nextOption = {"A":"B","B":"C","C":"C_0","C_0":"A","D":"A"};
  $('[name=credit_pulldown]').val(nextOption[nowOption]).change();
  $('[name=credit_pulldown]').val(nowOption).change();
}

/*トップエラーモーダル*/
function showTopErrorModal() {
    if (!($('#MODAL_BACKGROUND').length)) {
        $('<div id="MODAL_BACKGROUND"></div>').insertAfter('#PAGE_MAIN1');
    }
    $("#MODAL_BACKGROUND").fadeIn("1200");
    $("#TOP_ERROR_MODAL_CONTENTS").center().fadeIn("1500");

    $("#MODAL_BACKGROUND,#TOP_ERROR_MODAL_CONTENTS").click(function() {
        if (!$(this).closest('#TOP_ERROR_MODAL_CONTENTS').length) {
            $("#TOP_ERROR_MODAL_CONTENTS").center().fadeOut("1000", function() {
                $('#MODAL_BACKGROUND').remove();
                initErrorModalText();
            });
        }
    });
}

function closeTopErrorModal() {
    $("#TOP_ERROR_MODAL_CONTENTS").center().fadeOut("1000", function() {
        $('#MODAL_BACKGROUND').remove();
    });
    initErrorModalText();
    if (csvFileFlag == 1 && affiliationFlag == 0) {
        reloadTop();
    }
}

function initErrorModalText() {
    document.getElementById("ERROR_TITLE").innerHTML = "";
    document.getElementById("ERROR_MESSAGE").innerHTML = "";
}

$(function() {
    $("#TOP_ERROR_MODAL_OK_BUTTON").hover(function() {
        $(this).attr("src", $(this).attr("src").replace("_OFF", "_ON"));
    }, function() {
        $(this).attr('src', $(this).attr('src').replace('_ON', '_OFF'));
    });
});

/*初回&エラー処理*/
$(function() {
    $("#SUBMIT").on('click', function() {
        if (csvFileFlag == 1 && affiliationFlag == 1) {
            initDataTable();
            var JsonObject = JSON.parse(JsonText);
            var nest_subject_value = Object.keys(JsonObject).length - 1; //所属ID分を引く。line0から始まる

            console.log(JsonObject);
            for (var i = 0; i < nest_subject_value; i++) {
                var keyline = "line" + String(i);
                //var tmp = JsonObject[keyline].name;
                if (JsonObject[keyline].classification == "A") {
                    //append方式
                    appendTableData(JsonObject, keyline);
                }
            }
            drawDataTable();
        } else if (csvFileFlag == 1 && affiliationFlag == 0) {
            $("#ERROR_TITLE").append("所属が入力されていません");
            $("#ERROR_MESSAGE").append("もう一度CSVファイルを入力し、その後ご自身の所属を入力してください。");
            showTopErrorModal();
        } else if (csvFileFlag == 0 && affiliationFlag == 1) {
            $("#ERROR_TITLE").append("csvファイルが入力されていません");
            $("#ERROR_MESSAGE").append("このボタン上部にあるグレーのボタンを押してTWINSからダウンロードしたCSVファイルアップロードしてください。");
            showTopErrorModal();
        } else if (csvFileFlag == 0 && affiliationFlag == 0) {
            $("#ERROR_TITLE").append("csvファイル・所属が入力されていません");
            $("#ERROR_MESSAGE").append("このボタン上部にあるグレーのボタンを押してTWINSからダウンロードしたCSVファイルアップロードし、その後の所属入力画面でご自分の所属を入力してください。");
            showTopErrorModal();
            //alert("csvファイルがアップロードされていません。\n所属が入力されていません。");
        }
    });
});

function changeShowSubModalImage(classValue) {
    var url = "./img/main_show_sub_modal/CLASSIFICATION_" + classValue + ".svg";
    $('#SHOW_SUB_DETAIL_MODAL_CONTENTS').css('background-image', 'url(' + url + ')');
}

/*select変更時*/
$(function() {
    $("[name=credit_pulldown]").change(function() {
        initDataTable();

        var credit_pulldown_val = $('[name=credit_pulldown]').val();
        changeShowSubModalImage(credit_pulldown_val);//モーダルの背面の透かしを変更

        var table = "";
        var JsonObject = JSON.parse(JsonText);
        var nest_subject_value = Object.keys(JsonObject).length - 1; //所属ID分を引く。line0から始まる

        for (var i = 0; i < nest_subject_value; i++) {
            var keyline = "line" + String(i);
            if (JsonObject[keyline].classification == credit_pulldown_val) {
                appendTableData(JsonObject, keyline);
            }
        }
        drawDataTable();
    });
});

function appendTableData(JsonObject, keyline) {
    $("#CREDIT_TABLE tbody").append('<tr>' +
        '<td value="' + JsonObject[keyline].subject + '_' + JsonObject[keyline].year + '_' + JsonObject[keyline].grade + '_' + JsonObject[keyline].state + '" class="sorting-1" onclick="submitShowsubData()">' + JsonObject[keyline].subject + '</td>' +
        '<td>' + JsonObject[keyline].name + '</td>' +
        '<td>' + JsonObject[keyline].credit + '</td>' +
        '<td>' + JsonObject[keyline].grade + '</td>' +
        '<td>' + JsonObject[keyline].state + '</td>' +
        "</tr>");
}

$.extend($.fn.dataTableExt.oSort, {
    "grade-pre": function(a) {
        return $.inArray(a, ["A+", "A", "B", "C", "P", "D", "X"]);
    },
    "grade-asc": function(a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "grade-desc": function(a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});

function drawDataTable() {
    $("#CREDIT_TABLE").dataTable({
        lengthChange: false,
        displayLength: 1,
        info: false,
        "aoColumnDefs": [{
            "aTargets": [3],
            "sType": "grade"
        }]
    });
}

function initDataTable() {
    $("#CREDIT_TABLE").dataTable().fnDeleteRow();
    $("#CREDIT_TABLE").dataTable().fnDestroy();
}

function submitShowsubData() {
    var val = $("#CREDIT_TABLE_TBODY td").attr("value");
    var data = val.split("_");
    var nowSchoolYear = getSchoolYear();
    if (Number(data[1]) > nowSchoolYear) {
        data[1] = nowSchoolYear; //未来のKdBデータは存在しないので最新のものが未来もあると仮定
    }

    var subjectJson = '{\t' + '\"id\":' + '\"' + data[0] + '\"' + ',\t\"year\":' + '\"' + data[1] + '\"' + ',\t\"score\":' + '\"' + data[2] + '\"' + ',\t\"state\":' + '\"' + data[3] + '\"' + '\t}';

    $.ajax({
        type: "POST",
        data: subjectJson,
        url: "https://tpp.d-io.com/api/search/",
        contentType: "application/json",
        success: function(data) {
            data = $.parseJSON(data);
            console.log(data);
            openShowSubModal(data);
        },
        error: function() {
            console.log("Error");
        }
    });
    //alert(val);
}



/*科目追加モーダル(シミュレーション)*/
$(function() {
    $("#SUB_ADD_MODAL_OPEN").click(function() {
        //$("body").append('<div id="MODAL_BACKGROUND"></div>');
        if (!($('#MODAL_BACKGROUND').length)) {
            $('<div id="MODAL_BACKGROUND"></div>').insertAfter('#PAGE_MAIN2');
        }

        $("#MODAL_BACKGROUND").fadeIn("1200");
        $("#SUB_ADD_MODAL_CONTENTS").center().fadeIn("1500");

        $("#MODAL_BACKGROUND,#SUB_ADD_MODAL_CONTENTS").click(function() {
            if (!$(this).closest('#SUB_ADD_MODAL_CONTENTS').length) {

                $("#SUB_ADD_MODAL_CONTENTS").center().fadeOut("1000", function() {
                    initAddSubModalText();
                    $('#MODAL_BACKGROUND').remove();
                })
            }
        });

    });
});

function closeAddSubModal(frag) {
    $("#SUB_ADD_MODAL_CONTENTS").center().fadeOut("1000", function() {
        initAddSubModalText();
        if (frag == null) {
            $('#MODAL_BACKGROUND').remove();
        }
    });
}

$(function() {
    $("#ADD_SUB_MODAL_CANCEL_BUTTON,#ADD_SUB_MODAL_ADD_BUTTON").hover(function() {
        $(this).attr("src", $(this).attr("src").replace("_OFF", "_ON"));
    }, function() {
        $(this).attr('src', $(this).attr('src').replace('_ON', '_OFF'));
    });
});


function initAddSubModalText() {
    document.getElementById("INPUT_COURSE_ID_TEXT").value = "";
    document.getElementById("INPUT_COURSE_YEAR").value = "";
}



function submitAddSubjectData() {
    var errorMessage = "";
    var inputCourseID = $("#INPUT_COURSE_ID_TEXT").val();
    if (inputCourseID.match(/^[A-Z0-9]{4}\d{3}$/)) {
        //console.log("科目ID:" + inputCourseID);
    } else {
        errorMessage += "<p>入力された科目IDは適切ではありません。</p>";
    }
    var inputCourseYear = $("#INPUT_COURSE_YEAR").val();
    var sYear = getSchoolYear();
    //console.log("年度:"+sYear);
    if (inputCourseYear.match(/^20\d{2}$/) && sYear <= inputCourseYear) {
        //console.log("履修予定年度:" + inputCourseYear);
    } else {
        errorMessage += "<p>入力された履修年度は適切ではありません。</p>";
    }
    var removeFlag = 1;
    closeAddSubModal(removeFlag);

    //エラーがなければサーバーに送信
    var successMessage = "";
    var creditErrorMessage = ""; //正確には科目が存在しない、単位キャップに引っかかる、単位の重複の場合のエラー
    if (errorMessage != "") {
        showAddSubResultModal(errorMessage, successMessage);
    } else {
        //未来のKdBデータはないので最新教科データが適用されるものと考えて、今年度の年を送信(inputCourseYearは後で使う)
        var subjectJson = '{\t' + '\"id\":' + '\"' + inputCourseID + '\"' + ',\t\"year\":' + '\"' + sYear + '\"\t}';
        $.ajax({
            type: "POST",
            data: subjectJson,
            url: "https://tpp.d-io.com/api/search/",
            contentType: "application/json",
            success: function(data) {
                if (data != "") {
                    //科目が存在する
                    data = $.parseJSON(data);
                    console.log(data);
                    //既にに履修済み、履修中か判定
                    if (!(JsonText.match(inputCourseID))) {
                        //履修していない
                        //その年の単位キャップを越えていないか確認(現段階では単位キャップは45.0単位固定)
                        if (countMatch(JsonText, inputCourseYear) <= 45) {
                            //キャップ内
                            //登録処理
                            var next_line = countMatch(JsonText, 'line'); //line0から始まるので注意
                            var tmp = JsonText.substr(0, JsonText.length - 2); //末尾削除
                            tmp += ',\n';
                            tmp += '\t"line' + next_line + '": {\n';
                            tmp += '\t\t"classification": "D",\n';//科目区分判定アルゴリズムより
                            tmp += '\t\t"year": "' + inputCourseYear + '",\n';
                            tmp += '\t\t"subject": "' + inputCourseID + '",\n';
                            tmp += '\t\t"name": "' + data.name + '",\n';
                            tmp += '\t\t"grade": "X",\n';
                            tmp += '\t\t"credit": "' + data.credit.toFixed(1) + '",\n';
                            tmp += '\t\t"state": "履修予定"\n';
                            tmp += '\t}\n'
                            tmp += '}';
                            JsonText = tmp;
                            updateSelectOption();
                            //console.log(JsonText);

                            //履修予定科目追加によるデータセット更新&最描画
                            console.log("rabbit_data:" + rabbit_data);
                            console.log("get_credit_data:" + get_credit_data);
                            console.log("grade_A_data:" + grade_A_data);
                            updateRabbitDataAdd(data.credit);
                            updateGetCreditDataAdd(data.credit);
                            console.log("rabbit_data[needGRCourse,getGRCourse,nowGRCourse,preGRCourse,restGRCourse]:" + rabbit_data);
                            console.log("get_credit_data[needCourse,GetCourse,nowCourse,preCourse,otherCourse]:" + get_credit_data);
                            console.log("grade_A_data[courseA(取得単位中のA/A+の数),CourseSum(取得単位の総数)]:" + grade_A_data);
                            updateRequirementGraph();
                            updateCreditGraph();



                            successMessage += "<p>" + inputCourseYear + "年度に科目番号 " + inputCourseID + " の" + data.name + "を履修予定です</p>";
                        } else {
                            //キャップ外
                            creditErrorMessage += "<p>" + inputCourseYear + "年度の履修単位数は既に単位キャップ上限の４５単位に達しています</p>";
                        }
                    } else {
                        //履修している(履修済み||履修中)
                        creditErrorMessage += "<p>科目番号 " + inputCourseID + " の " + data.name + " は既に履修しています。</p>";
                    }
                    errorMessage += creditErrorMessage;
                    showAddSubResultModal(errorMessage, successMessage);
                } else {
                    //科目が存在しない
                    creditErrorMessage += "<p>科目番号 " + inputCourseID + " の科目は存在しませんでした。</p><p>再度、入力された科目番号が正しいかご確認ください。</p>";
                    errorMessage += creditErrorMessage;
                    showAddSubResultModal(errorMessage, successMessage);
                }
            },
            error: function() {
                console.log("Error");
            }
        });
    }
}

function getSchoolYear() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;

    if (4 <= month && month <= 12) {
        return year;
    } else {
        return year - 1;
    }
}

function countMatch(text, word) {
    return (text.match(new RegExp(word, "g")) || []).length;
}

function updateRabbitDataAdd(newPreCourseData) {
    var needGRCourse = rabbit_data[0];
    var getGRCourse = rabbit_data[1];
    var nowGRCourse = rabbit_data[2];
    var preGRCourse = rabbit_data[3] + newPreCourseData;
    var restGRCourse = needGRCourse - (getGRCourse + nowGRCourse + preGRCourse);
    restGRCourse = restGRCourse > 0 ? restGRCourse : 0.0;
    rabbit_data = [needGRCourse, getGRCourse, nowGRCourse, preGRCourse, restGRCourse];
}

function updateGetCreditDataAdd(newPreCourseData) {
    var needCourse = get_credit_data[0];
    var getCourse = get_credit_data[1];
    var nowCourse = get_credit_data[2];
    var preCourse = get_credit_data[3] + newPreCourseData;
    var otherCourse = (needCourse - (getCourse + nowCourse + preCourse));
    otherCourse = otherCourse > 0 ? otherCourse : 0.0;
    get_credit_data = [needCourse, getCourse, nowCourse, preCourse, otherCourse];
}

function updateRabbitDataDelete(newPreCourseData) {
    var needGRCourse = rabbit_data[0];
    var getGRCourse = rabbit_data[1];
    var nowGRCourse = rabbit_data[2];
    var preGRCourse = rabbit_data[3] - newPreCourseData;
    var restGRCourse = needGRCourse - (getGRCourse + nowGRCourse + preGRCourse);
    restGRCourse = restGRCourse > 0 ? restGRCourse : 0.0;
    rabbit_data = [needGRCourse, getGRCourse, nowGRCourse, preGRCourse, restGRCourse];
}

function updateGetCreditDataDelete(newPreCourseData) {
    var needCourse = get_credit_data[0];
    var getCourse = get_credit_data[1];
    var nowCourse = get_credit_data[2];
    var preCourse = get_credit_data[3] - newPreCourseData;
    var otherCourse = (needCourse - (getCourse + nowCourse + preCourse));
    otherCourse = otherCourse > 0 ? otherCourse : 0.0;
    get_credit_data = [needCourse, getCourse, nowCourse, preCourse, otherCourse];
}

function updateRequirementGraph() {
    animated1 = false;
    $('#BAR_GRAPH').remove();
    $('#RABBIT_GRAPH').remove();
    $('#REQUIREMENT_GRAPH').prepend('<svg id="RABBIT_GRAPH"></svg>');
    $('#REQUIREMENT_GRAPH').prepend('<svg id="BAR_GRAPH"></svg>');

    $("#REQUIREMENT_GRAPH").on("inview", function() {
        if (mode == 1 && animated1 == false) {
            animated1 = true;

            drawGRBar("#BAR_GRAPH", rabbit_data);
            drawGRRabbit("#RABBIT_GRAPH", rabbit_data);

            $("#PRE_COURSE").text(rabbit_data[3].toFixed(1));
            $("#REST_COURSE").text(rabbit_data[4].toFixed(1));
        }
    });
}

function updateCreditGraph() {
    animated2 = false;
    //$("#CREDIT_GRAPH").on("inview", function() {
    if (mode == 1 && animated2 == false) {
        animated2 = true;
        drawGetCredit("#GET_CREDIT_GRAPH", get_credit_data);
        drawGradeA("#GRADE_A_GRAPH", grade_A_data);
    }
    //  });
}


/*科目追加結果モーダル(シミュレーション)*/
function showAddSubResultModal(errorMessage, successMessage) {
    $("#MODAL_BACKGROUND").fadeIn("1200");
    $("#SUB_ADD_RESULT_MODAL_CONTENTS").center().fadeIn("1500");
    //メッセージ埋め込み
    if (errorMessage != "") {
        $("#ADD_SUB_RESULT_ICON").attr("src", "./img/top_error_modal/ATTENTION.svg");
        $("#ADD_RESULT_TITLE").text("正しく履修予定科目を追加できませんでした");
        $("#ADD_RESULT_MESSAGE").append(errorMessage);
    } else {
        $("#ADD_SUB_RESULT_ICON").attr("src", "./img/main_add_sub_modal/SUCCESS.svg");
        $("#ADD_RESULT_TITLE").text("正しく履修予定科目を追加できました");
        $("#ADD_RESULT_MESSAGE").append(successMessage);
    }
    $("#MODAL_BACKGROUND,#SUB_ADD_RESULT_MODAL_CONTENTS").click(function() {
        if (!$(this).closest('#SUB_ADD_RESULT_MODAL_CONTENTS').length) {

            $("#SUB_ADD_RESULT_MODAL_CONTENTS").center().fadeOut("1000", function() {
                initAddSubResultMessage();
                $('#MODAL_BACKGROUND').remove();
            })
        }
    });
}

function closeAddSubResultModal() {
    $("#SUB_ADD_RESULT_MODAL_CONTENTS").center().fadeOut("1000", function() {
        initAddSubResultMessage()
        $('#MODAL_BACKGROUND').remove();
    });
}

function initAddSubResultMessage() {
    document.getElementById("ADD_RESULT_MESSAGE").innerHTML = "";
}

$(function() {
    $("#ADD_SUB_RESULT_MODAL_OK_BUTTON").hover(function() {
        $(this).attr("src", $(this).attr("src").replace("_OFF", "_ON"));
    }, function() {
        $(this).attr('src', $(this).attr('src').replace('_ON', '_OFF'));
    });
});

/*科目追加結果モーダル(シミュレーション)*/
function showDeleteSubResultModal(errorMessage, successMessage) {
    $("#MODAL_BACKGROUND").fadeIn("1200");
    $("#SUB_DELETE_RESULT_MODAL_CONTENTS").center().fadeIn("1500");
    //メッセージ埋め込み
    if (errorMessage != "") {
        $("#DELETE_SUB_RESULT_ICON").attr("src", "./img/top_error_modal/ATTENTION.svg");
        $("#DELETE_RESULT_TITLE").text("正しく履修予定科目を削除できませんでした");
        $("#DELETE_RESULT_MESSAGE").append(errorMessage);
    } else {
        $("#DELETE_SUB_RESULT_ICON").attr("src", "./img/main_add_sub_modal/SUCCESS.svg");
        $("#DELETE_RESULT_TITLE").text("正しく履修予定科目を削除できました");
        $("#DELETE_RESULT_MESSAGE").append(successMessage);
    }
    $("#MODAL_BACKGROUND,#SUB_DELETE_RESULT_MODAL_CONTENTS").click(function() {
        if (!$(this).closest('#SUB_DELETE_RESULT_MODAL_CONTENTS').length) {

            $("#SUB_DELETE_RESULT_MODAL_CONTENTS").center().fadeOut("1000", function() {
                initDeleteSubResultMessage();
                $('#MODAL_BACKGROUND').remove();
            })
        }
    });
}

function closeDeleteSubResultModal() {
    $("#SUB_DELETE_RESULT_MODAL_CONTENTS").center().fadeOut("1000", function() {
        initDeleteSubResultMessage()
        $('#MODAL_BACKGROUND').remove();
    });
}

function initDeleteSubResultMessage() {
    document.getElementById("Delete_RESULT_MESSAGE").innerHTML = "";
}

$(function() {
    $("#Delete_SUB_RESULT_MODAL_OK_BUTTON").hover(function() {
        $(this).attr("src", $(this).attr("src").replace("_OFF", "_ON"));
    }, function() {
        $(this).attr('src', $(this).attr('src').replace('_ON', '_OFF'));
    });
});
