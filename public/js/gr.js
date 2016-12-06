var mastList = { 0:"情報メディア創成" };
var coinsList = { 0:"ソフトウェアサイエンス", 1:"情報システム", 2:"知能情報メディア" };
var klisList = { 0:"知識科学", 1:"知識情報システム", 2:"情報資源経営" };

$(function(){

});

function changeMajor() {
    console.log("hey");
    var depart = $("#DEPART_SELECT").val();
    $("#MAJOR_SELECT").empty();
    var list;
    switch (depart) {
        case "0": list = mastList; break;
        case "1": list = coinsList; break;
        case "2": list = klisList; break;
        default: break;
    }
    var $option = $.map(list, function(value, key){
        return $("<option>", {
            value : key,
            text : value
        });
    });
    $("#MAJOR_SELECT").append($option);
}
