$(function(){
    $("a[href^='#']").on("click", function(){
        var interval_ = $(".INTERVAL").height();
        var first_ = 0;
        var second_ = first_ + $("#REQUIRMENT").height() + interval_;
        var third_ = second_ + $("#CREDIT").height() + interval_;
        var fourth_ = third_ + $("#GRADE_GPA").height() + interval_;

        var speed = 500;
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
        $("#page-main").animate({scrollTop : position}, speed, "swing");
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
