var formData = new FormData();

$(function(){
    $(window).resize(function(){
        var w = $(window).width();
        if (w > 850) {
            $("#fileName").css("fontSize", "1.4vw");
        } else {
            $("#fileName").css("fontSize", "12.25px");
        }
    });
    $("a[href^='#']").on("click", function(){
        var top_ = 0;
        var about_usage_ = top_ + $("#TOP").height();
        var qa_ = about_usage_ + $("#ABOUT_USAGE").height();
        var update_info_ = qa_ + $("#QA").height();

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

    var obj = $("#uploadArea, #fileName");

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
    if ($("#upload").val() !== '') {
        var file = $("#upload").prop("files")[0];
        handleFileUpload(file);
    }
}

function handleFileUpload(file) {
    if (file.name.match(/^(gakusei_)(\d{9}).*\.csv/)) {
        $("#fileName").text(file.name);
        // formData = new FormData();
        // formData.append("file", file);
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
    // postData(dataArray);
}

function postData(jsontext) {
    $.ajax({
        type: "POST",
        url: "http://104.198.209.156:80/api/csv",
        data: jsontext,
        contentType: "application/json",
        success: function(data) {
            console.log(data);
        },
        error: function() {
            console.log("Error");
        }
    });
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

function jumpTOP() {
    window.location.href = "./index.html";
}
