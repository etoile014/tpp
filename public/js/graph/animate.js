var animated1 = false;
var animated2 = false;
var animated3 = false;
var animated4 = false;
var animated5 = false;
var animated6 = false;
var animated7 = false;

//Rabbit & Bar
var needGRCourse = 124.5;//卒業必要単位(データベース)
var getGRCourse = 98.0;//取得済み単位(CSV)
var nowGRCourse = 20.5;//履修中単位(CSV)
var preGRCourse = 2.5;//履修予定単位(シミュレーション)h
var rabbit_data = [needGRCourse, getGRCourse, nowGRCourse, preGRCourse];

// getCredit用
var getCourse = 3.0;//履修済み単位
var nowCourse = 2.0;//履修中単位
var preCourse = 1.0;//履修予定単位
var otherCourse = 6.0;//（指定科目群の必要単位数-getCourse-nowCourse,otherCourse）
var get_credit_data = [getCourse,nowCourse,preCourse,otherCourse];

//GradeA&A+
var CountA = 3.0;//該当科目区分のA,A+単位数
var CountSub = 15.0;//該当科目区分のA,A+以外単位数
var grade_A_data = [CountA,CountSub];

//GradeRatevar CountAplus = 50.0;
var CountA = 90.5;
var CountB = 100.5;
var CountC = 50.5;
var CountD = 300.5;
var CountOther = 2.5;
var grade_rate_data = [CountAplus,CountA,CountB,CountC,CountD,CountOther];

//CreditTransition
var credit_transition_data = [38, 30, 11, 50, 18, 13];

//GPATransition
var qpa_transition_data = [3.5, 2.3, 1.5, 0.8, 3.0, 4.3];

$(function(){
    //第一ブロック
    $("#barGraph").on("inview", function() {
        if (animated1 == false) {
            animated1 = true;
            drawGRbar("#barGraph", rabbit_data);
        }
    });
    $("#rabbitGraph").on("inview", function() {
        if (animated2 == false) {
            animated2 = true;
            drawGRrabbit("#rabbitGraph",rabbit_data);
        }
    });
    //第二ブロック
    $("#GetCreditGraph").on("inview", function() {
        if (animated3 == false) {
            animated3 = true;
            drawGetCredit("#GetCreditGraph", get_credit_data);
        }
    });
    $("#GradeAGraph").on("inview", function() {
        if (animated4 == false) {
            animated4 = true;
            drawGradeA("#GradeAGraph", grade_A_data);
        }
    });
    //第三ブロック
    $("#GradeRate").on("inview", function() {
        if (animated5 == false) {
            animated5 = true;
            drawGradeRate("#GradeRate", grade_rate_data);
        }
    });
    $("#CreditTransition").on("inview", function() {
        if (animated6 == false) {
            animated6 = true;
            drawCreditTransition("#CreditTransition", credit_transition_data);
        }
    });
    $("#GPATransition").on("inview", function() {
        if (animated7 == false) {
            animated7 = true;
            drawGPATransition("#GPATransition", qpa_transition_data);
        }
    });
});
