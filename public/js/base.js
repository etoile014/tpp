var formData = new FormData();

$(function(){
    $("a[href^='#']").on("click", function(){
        var top_ = 0;
        var about_usage_ = top_ + $("#TOP").height();
        var qa_ = about_usage_ + $("#ABOUT_USAGE").height();
        var update_info_ = qa_ + $("#QA").height();
        var footer = update_info_ + $("#UPDATE_INFO").height();

        var speed = 500;
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
        } else if (href == "#footer") {
            position = footer;
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

    var obj = $("#upload_area, #filename");

    obj.on('dragenter', function(e){
        e.stopPropagation();
        e.preventDefault();
        // $(this).css('border', '2px solid #0B85A1');
    });
    obj.on('dragover', function (e){
        e.stopPropagation();
        e.preventDefault();
    });
    obj.on('drop', function (e){
        //  $(this).css('border', '2px dotted #0B85A1');
        e.preventDefault();
        var files = e.originalEvent.dataTransfer.files;
        handleFileUpload(files[0]);
    });

    $(document).on('dragenter', function (e){
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('dragover', function (e){
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('drop', function (e){
        e.stopPropagation();
        e.preventDefault();
    });
});

function tapped() {
    $("#upload").click();
}

function fileUpload() {
    if($("#upload").val() !== ''){
        var file = $("#upload").prop("files")[0];
        handleFileUpload(file);
    }
}

function handleFileUpload(file){
    if(file.name.match(/^(gakusei_)(\d{8}).+\.csv/)){
        formData = new FormData();
        formData.append("file", file);
        // alert(file.name);
        $("#filename").text(file.name);
    }
}
