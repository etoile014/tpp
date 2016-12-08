var facultyList = {
  1 : "人文・文化学群",
  2 : "社会・国際学群",
  3 : "人間学群",
  4 : "生命環境学群",
  5 : "理工学群",
  6 : "情報学群",
  7 : "医学群",
  8 : "体育専門学群",
  9 : "芸術専門学群"
};

var departList = {
  //人文・文化学群
  11 : "人文学類",
  12 : "比較文化学類",
  13 : "日本語・日本文化学類",
  //社会・国際学群
  21 : "社会学類",
  22 : "国際総合学類",
  //人間学群
  31 : "教育学類",
  32 : "心理学類",
  33 : "障害科学類",
  //生命環境学群
  41 : "生物学類",
  42 : "生物資源学類",
  43 : "地球学類",
  //理工学群
  51 : "数学学類",
  52 : "物理学類",
  53 : "化学学類",
  54 : "応用理工学類",
  55 : "工学システム学類",
  56 : "社会工学学類",
  //情報学群
  61 : "情報科学類",
  62 : "情報メディア創成学類",
  63 : "知識情報・図書館学類",
  //医学群
  71 : "医学類",
  72 : "看護学類",
  73 : "医療科学類",
  //体育専門学群
  81 : "学類なし",
  //芸術専門学群
  91 : "学類なし"
};

var majorList = {
  //人文学類
  1101 : "哲学",
  1102 : "倫理学",
  1103 : "宗教学",
  1104 : "日本史",
  1105 : "西洋史",
  1106 : "歴史地理学",
  1107 : "先史学・考古学",
  1108 : "民俗学・文化人類学",
  1109 : "一般言語学",
  1110 : "応用言語学",
  1111 : "日本語学",
  1112 : "英語学",
  1113 : "仏語学",
  1114 : "独語学",
  1115 : "露語学",
  //比較文化学類
  1201 : "日本文学",
  1202 : "中国文学",
  1203 : "日本研究",
  1204 : "アジア研究",
  1205 : "英語圏文学・文化",
  1206 : "フランス語圏文学・文化",
  1207 : "ドイツ語圏文学・文化",
  1208 : "欧米研究",
  1209 : "文化人類学",
  1210 : "文化地理学",
  1211 : "テキスト文化学",
  1212 : "文化創造論",
  1213 : "先端文化学",
  1214 : "情報文化学",
  1215 : "現代思想",
  1216 : "比較宗教",
  //日本語・日本文化学類
  1301 : "専攻なし",
  //社会学類
  2101 : "社会学",
  2102 : "法学",
  2103 : "政治学",
  2104 : "経済学",
  //国際総合学類
  2201 : "国際関係学",
  2202 : "国際開発学",
  //教育学類
  3101 : "人間形成系列",
  3102 : "教育計画・設計系列",
  3103 : "地域・国際教育系列",
  3104 : "学校教育開発系列",
  //心理学類
  3201 : "実験心理学",
  3202 : "教育心理学",
  3203 : "発達心理学",
  3204 : "社会心理学",
  3205 : "臨床心理学",
  //障害科学類
  3301 : "障害科学",
  3302 : "特別支援教育学",
  3303 : "社会福祉学",
  //生物学類
  4101 : "多様性",
  4102 : "情報",
  4103 : "分子細胞",
  4104 : "応用生物",
  4105 : "人間生物",
  //生物資源学類
  4201 : "農林生物学",
  4202 : "応用生命化学",
  4203 : "環境工学",
  4204 : "社会経済学",
  //地球学類
  4301 : "地球環境学",
  4302 : "地球進化学",
  //数学学類
  5101 : "専攻なし",
  //物理学類
  5201 : "専攻なし",
  //化学学類
  5301 : "専攻なし",
  //応用理工学類
  5401 : "応用物理",
  5402 : "電子・量子工学",
  5403 : "物性工学",
  5404 : "物質・分子工学",
  //工学システム学類
  5501 : "知的工学システム",
  5502 : "機能工学システム",
  5503 : "環境開発工学",
  5504 : "エネルギー工学",
  //社会工学学類
  5601 : "社会経済システム",
  5602 : "経営工学",
  5603 : "都市計画",
  //情報科学類
  6101 : "ソフトウェアサイエンス",
  6102 : "情報システム",
  6103 : "知能情報メディア",
  //情報メディア創成学類
  6201 : "専攻なし",
  //知識情報・図書館学類
  6301 : "知識科学",
  6302 : "知能情報システム",
  6303 : "情報資源経営",
  //医学類
  7101 : "?",
  //看護学類
  7201 : "看護師",
  7202 : "保健師",
  7203 : "養護教諭",
  //医療科学類
  7301 : "医療科学",
  7302 : "国際医療科学",
  //学類なし:体育専門学群
  8101 : "健康・スポーツ教育",
  8102 : "健康・スポーツマネジメント",
  8103 : "スポーツコーチング",
  //学類なし芸術専門学群
  9101 : "美術史",
  9102 : "芸術支援",
  9103 : "洋画",
  9104 : "日本画",
  9105 : "彫塑",
  9106 : "書",
  9107 : "総合造形",
  9108 : "クラフト",
  9109 : "構造",
  9110 : "ビジュアルデザイン",
  9111 : "情報デザイン",
  9112 : "プロダクトデザイン",
  9113 : "環境デザイン",
  9114 : "建築デザイン"
};

var creditList = ["0.0","0.5","1.0","1.5","2.0","2.5","3.0","4.0","4.5","5.0","6.0","7.0","7.5","8.0","9.0","10.0","11.0","15.0","26.0","27.0","31.0","37.0"];

function loadFirst() {
  getData();
}

$(function() {
  for (var k=1; k<5; k++) {
    for (var j=1; j<4; j++) {
      var name = "#KAMOKU_CELL_" + k + j;
      var $creditSelector1 = makeCreditSelector();
      var $creditSelector2 = makeCreditSelector();
      $(name).append(
        $("<table border='1' class='list-area'>").append(
          $("<tr></tr>")
          .append($("<td class='action-area'></td>"))
          .append($("<td class='number-area'></td>").text("科目番号"))
          .append($("<td class='credit-area'></td>").text("単位数"))
        ).append(
          $("<tr></tr>")
          .append($("<td class='action-area'></td>").append($("<button class='add-button'>＋</button>")))
          .append($("<td class='number-area'></td>").append($("<input type='text'>")))
          .append(
            $("<td class='credit-area'></td>")
            .append("<span>min / max</span>")
            .append($creditSelector1)
            .append($creditSelector2)
          )
        )
      );
    }
  }
  $(document).on("click", ".add-button", function() {
    var number = $(this).parent().parent().find("input").val();
    number = halfString(number);
    var credit1 = $(this).parent().parent().find("select:nth-child(2)").val();
    var credit2 = $(this).parent().parent().find("select:nth-child(3)").val();
    var credit = credit1==credit2?credit1:(credit1+"〜"+credit2);
    if (number.match(/^([0-9A-Z_]{7},)*[0-9A-Z_]{7}$/)) {
      var obj = $(this).parent().parent();
      var kamokuNumber = number.split(",").join("<br>");
      obj.before(
        $("<tr></tr>")
        .append($("<td class='action-area'></td>").append($("<button class='remove-button'>ー</button>")))
        .append($("<td class='number-area'></td>").html(kamokuNumber))
        .append($("<td class='credit-area'></td>").append(credit))
      );
    }
  });
  $(document).on("click", ".remove-button", function() {
    var obj = $(this).parent().parent();
    obj.remove();
  });
});

function makeCreditSelector() {
  var $creditSelector = $("<select></select>");
  for (var i=0; i<creditList.length; i++) {
    var $str = "<option value='" + creditList[i] + "'></option>";
    $creditSelector.append($($str).text(creditList[i]));
  }
  return $creditSelector;
}

function halfString(val) {
  var halfstr = "";
  val.toUpperCase().replace("、", ",").split("").forEach(function(str) {
    halfstr += str.replace(/[Ａ-Ｚ０-９]/, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
  });
  var halfstrs = halfstr.split(",");
  halfstrs.forEach(function(str, index, ar) {
    if (7-str.length > 0) {
      ar[index] += Array(8-str.length).join("X");
    }
  });
  halfstr = halfstrs.join(",");
  return halfstr;
}

function loadFaculty() {
  $("#FACULTY_SELECT").append($option);
  var $option = $.map(facultyList, function(faculty, id){
    return $("<option>", {
      value : id,
      text : faculty
    });
  });
  $("#FACULTY_SELECT").append($option);
  loadDepart();
}

function loadDepart() {
  var facultyID = parseInt($("#FACULTY_SELECT").val());
  $("#DEPART_SELECT").empty();
  var $option = $.map(departList, function(depart, id){
    var facultyID_ = Math.floor(parseInt(id) / 10);
    var departID = parseInt(id) % 10;
    if (facultyID_ == facultyID) {
      return $("<option>", {
        value : id,
        text : depart
      });
    }
  });
  $("#DEPART_SELECT").append($option);
  loadMajor();
}

function loadMajor() {
  var departID = parseInt($("#DEPART_SELECT").val());
  $("#MAJOR_SELECT").empty();
  var $option = $.map(majorList, function(major, id){
    var departID_ = Math.floor(parseInt(id) / 100);
    var majorID = parseInt(id) % 100;
    if (departID_ == departID) {
      return $("<option>", {
        value : id,
        text : major
      });
    }
  });
  $("#MAJOR_SELECT").append($option);
}

function uploadData() {
  var id = $("#MAJOR_SELECT").val();
  //開始
  var txt = "{\n";
  txt += '\t"id" : ' + id + ",\n";
  //専門
  txt += '\t"Senmon" : {\n';
  txt += '\t\t"need" : [\n';
  txt += makeList("#KAMOKU_CELL_11");
  txt += '\t\t],\n';
  txt += '\t\t"select" : [\n';
  txt += makeList("#KAMOKU_CELL_12");
  txt += '\t\t],\n';
  txt += '\t\t"free" : [\n';
  txt += makeList("#KAMOKU_CELL_13");
  txt += '\t\t]\n';
  txt += '\t},\n';
  //専門基礎
  txt += '\t"SenmonKiso" : {\n';
  txt += '\t\t"need" : [\n';
  txt += makeList("#KAMOKU_CELL_21");
  txt += '\t\t],\n';
  txt += '\t\t"select" : [\n';
  txt += makeList("#KAMOKU_CELL_22");
  txt += '\t\t],\n';
  txt += '\t\t"free" : [\n';
  txt += makeList("#KAMOKU_CELL_23");
  txt += '\t\t]\n';
  txt += '\t},\n';
  //基礎共通
  txt += '\t"KisoKyoutsuu" : {\n';
  txt += '\t\t"need" : [\n';
  txt += makeList("#KAMOKU_CELL_31");
  txt += '\t\t],\n';
  txt += '\t\t"select" : [\n';
  txt += makeList("#KAMOKU_CELL_32");
  txt += '\t\t],\n';
  txt += '\t\t"free" : [\n';
  txt += makeList("#KAMOKU_CELL_33");
  txt += '\t\t]\n';
  txt += '\t},\n';
  //基礎関連
  txt += '\t"KisoKanren" : {\n';
  txt += '\t\t"need" : [\n';
  txt += makeList("#KAMOKU_CELL_41");
  txt += '\t\t],\n';
  txt += '\t\t"select" : [\n';
  txt += makeList("#KAMOKU_CELL_42");
  txt += '\t\t],\n';
  txt += '\t\t"free" : [\n';
  txt += makeList("#KAMOKU_CELL_43");
  txt += '\t\t]\n';
  txt += '\t}\n';
  //終了
  txt += '}';
  postData(txt);
  alert(txt);
}

//アップロード用の行を生成する
function makeList(name) {
  var txt = "";
  var length = $(name).find("tr").length;
  for (var i=2; i<length; i++) {
    var number = $(name).find("tr:nth-child("+i+")").children("td:nth-child(2)").html();
    number = number.split("<br>").join('","');
    txt += '\t\t\t{ "row" : ["'+number+'"], ';
    var credit = $(name).find("tr:nth-child("+i+")").children("td:nth-child(3)").text();
    if (credit.match(/〜/)) {
      var credits = credit.split("〜");
      txt += '"min" : '+credits[0]+', "max" : '+credits[1]+' }'+(i<length-1?',\n':'\n');
    } else {
      txt += '"min" : '+credit+', "max" : '+credit+' }'+(i<length-1?',\n':'\n');
    }
  }
  return txt;
}

//小山氏必見
function postData(JsonText) {
  $.ajax({
    type: "POST",
    data: JsonText,
    url: "https://tpp.d-io.com/api/gr",
    contentType: "application/json",
    success: function(data) {
      console.log(data);
    },
    error: function() {
      console.log("Error");
    }
  });
  return false;
}

//ローカルのJSONデータからデフォルト値を貰ってくる
function getData() {
  $.getJSON("js/gr.json" , function(data) {
    $.when(
      loadFaculty(),
      $("#FACULTY_SELECT").val(Math.floor(data.id/1000)),
      loadDepart(),
      $("#DEPART_SELECT").val(Math.floor(data.id/100)),
      loadMajor()
    ).done(function(){
      setDefaultSelector("#KAMOKU_CELL_11", data.Senmon.need);
      setDefaultSelector("#KAMOKU_CELL_12", data.Senmon.select);
      setDefaultSelector("#KAMOKU_CELL_13", data.Senmon.free);
      setDefaultSelector("#KAMOKU_CELL_21", data.SenmonKiso.need);
      setDefaultSelector("#KAMOKU_CELL_22", data.SenmonKiso.select);
      setDefaultSelector("#KAMOKU_CELL_23", data.SenmonKiso.free);
      setDefaultSelector("#KAMOKU_CELL_31", data.KisoKyoutsuu.need);
      setDefaultSelector("#KAMOKU_CELL_32", data.KisoKyoutsuu.select);
      setDefaultSelector("#KAMOKU_CELL_33", data.KisoKyoutsuu.free);
      setDefaultSelector("#KAMOKU_CELL_41", data.KisoKanren.need);
      setDefaultSelector("#KAMOKU_CELL_42", data.KisoKanren.select);
      setDefaultSelector("#KAMOKU_CELL_43", data.KisoKanren.free);
    });
  });
}

//それぞれの科目区分のリストを作る
function setDefaultSelector(name, data) {
  var obj = $(name).find("tr:last");
  //間に入っているやつを消す作業をしてから (未実装)
  for (var i=0; i<data.length; i++) {
    var kamokuNumber = data[i].row.join("<br>");
    var credit1 = data[i].min;
    var credit2 = data[i].max;
    var credit = credit1==credit2?credit1.toFixed(1):(credit1.toFixed(1)+"〜"+credit2.toFixed(1));
    obj.before(
      $("<tr></tr>")
      .append($("<td class='action-area'></td>").append($("<button class='remove-button'>ー</button>")))
      .append($("<td class='number-area'></td>").html(kamokuNumber))
      .append($("<td class='credit-area'></td>").append(credit))
    );
  }
}

function checkObj(obj) {
  console.log(Object.prototype.toString.call(obj));
}
