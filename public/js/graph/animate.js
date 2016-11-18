var animated1 = false;
var animated2 = false;
var animated3 = false;

//Rabbit & Bar
var needGRCourse = 124.5;//卒業必要単位(データベース)
var getGRCourse = 68.0;//取得済み単位(CSV)
var nowGRCourse = 20.5;//履修中単位(CSV)
var preGRCourse = 8.5;//履修予定単位(シミュレーション)h
var rabbit_data = [needGRCourse, getGRCourse, nowGRCourse, preGRCourse];

// getCredit用
var needCourse = 12.0;//該当科目区分の必要単位
var getCourse = 3.0;//該当科目区分履修済み単位
var nowCourse = 2.0;//該当科目区分履修中単位
var preCourse = 1.0;//該当科目区分履修予定単位
var otherCourse = needCourse-(getCourse+nowCourse+preCourse);//未履修単位
var get_credit_data = [getCourse,nowCourse,preCourse,otherCourse];

//GradeA&A+
var CountA = 5.0;//該当科目区分のA,A+単位数
var CountSub = 15.0;//該当科目区分の総単位数
var grade_A_data = [CountA,CountSub];

//GradeRate
var CountAplus = 50.0;//全体のA+の数
var CountA = 90.5;//全体のAの数
var CountB = 100.5;//全体のBの数
var CountC = 50.5;//全体のCの数
var CountD = 300.5;//全体のDの数
var CountOther = 2.5;//全体のその他の数
var grade_rate_data = [CountAplus,CountA,CountB,CountC,CountD,CountOther];

var start = 2014;
//CreditTransition
var credit_transition_data = [38, 30, 11, 50, 18, 13];
//GPATransition
var qpa_transition_data = [3.5, 2.3, 1.5, 0.8, 3.0, 4.3];

$(function(){
    //第一ブロック
    $("#REQUIRMENT_BOX").on("inview", function() {
        if (animated1 == false) {
            animated1 = true;
            drawGRbar("#barGraph", rabbit_data);
            drawGRrabbit("#rabbitGraph",rabbit_data);
        }
    });

    //第二ブロック
    $("#CREDIT_BOX").on("inview", function() {
        if (animated2 == false) {
            animated2 = true;
            drawGetCredit("#GetCreditGraph", get_credit_data);
            drawGradeA("#GradeAGraph", grade_A_data);
        }
    });

    //第三ブロック
    $("#GRADE_GPA_BOX").on("inview", function() {
        if (animated3 == false) {
            animated3 = true;
            drawGradeRate("#GradeRate", grade_rate_data);
            drawCreditTransition("#CreditTransition", start, credit_transition_data);
            drawGPATransition("#GPATransition", start, qpa_transition_data);
        }
    });
});
