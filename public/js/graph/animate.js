var animated1 = false;
var animated2 = false;
var animated3 = false;
var animated4 = false;
var animated5 = false;

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
});
