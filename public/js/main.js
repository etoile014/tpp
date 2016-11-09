var formData = new FormData();

$(function(){
    $(window).resize(function(){
        var w = $(window).width();
        if (w > 850) {
            $("#REQUIRMENT_TITLE").css("fontSize", "4vw");
            $("#REQUIRMENT_SUBTITLE").css("fontSize", "1.5vw");
            $("#CREDIT_TITLE").css("fontSize", "4vw");
            $("#CREDIT_SUBTITLE").css("fontSize", "1vw");
            $("#GRADE_GPA_TITLE").css("fontSize", "4vw");
            $("#GRADE_GPA_SUBTITLE").css("fontSize", "1.5vw");
            $("#SCHEDULE_TITLE").css("fontSize", "4vw");
            $("#SCHEDULE_SUBTITLE").css("fontSize", "1.5vw");
        } else {
            $("#REQUIRMENT_TITLE").css("fontSize", "34px");
            $("#REQUIRMENT_SUBTITLE").css("fontSize", "12.75px");
            $("#CREDIT_TITLE").css("fontSize", "34px");
            $("#CREDIT_SUBTITLE").css("fontSize", "8.5px");
            $("#GRADE_GPA_TITLE").css("fontSize", "34px");
            $("#GRADE_GPA_SUBTITLE").css("fontSize", "12.75px");
            $("#SCHEDULE_TITLE").css("fontSize", "34px");
            $("#SCHEDULE_SUBTITLE").css("fontSize", "12.75px");
        }
    });
    $("a[href^='#']").on("click", function(){
        var top_ = 0;
        var interval_ = $("#INTERVAL").height();
        var requirment_ = top_ + $("#TOP").height();
        var credit_ = requirment_ + $("#REQUIRMENT").height() + interval_;
        var grade_gpa_ = credit_ + $("#CREDIT").height() + interval_;
        var schedule_ = grade_gpa_ + $("#GRADE_GPA").height() + interval_;

        var speed = 500;
        var href = $(this).attr("href");
        var position = 0;
        if (href == "#TOP") {
            position = top_;
        } else if (href == "#REQUIRMENT") {
            position = requirment_;
        } else if (href == "#CREDIT") {
            position = credit_;
        } else if (href == "#GRADE_GPA") {
            position = grade_gpa_;
        } else if (href == "#SCHEDULE") {
            position = schedule_;
        }
        $("#page-main-inside").animate({scrollTop : position}, speed, "swing");
        return false;
    });

    $(".menu-item").children("a")
    .on('mouseover', function(){
        var w = $(this).css('width');
        $(this).parents('.menu-item').children('.underbar').stop().animate({ 'width' : w}, 500, 'swing');
    })
    .on('mouseout', function(){
        $(this).parents('.menu-item').children('.underbar').stop().animate({ 'width' : '0px'}, 500, 'swing');
    });
});

function jumpTOP() {
    window.location.href = "./index.html";
}
