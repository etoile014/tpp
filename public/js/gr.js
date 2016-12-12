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

var creditList = [];
for (var i=0; i<=40; i++) {
  creditList.push(i.toFixed(1), (i+0.5).toFixed(1));
}
var creditListLarge = [];
for (var i=0; i<=100; i++) {
  creditListLarge.push(i.toFixed(1), (i+0.5).toFixed(1));
}

var kisoKyoutsuuList = [
  { "value" : "SOUGOU", "name" : "総合", "id" : "100000000" },
  { "value" : "SOUGOU1", "name" : "総合I", "id" : "111000000" },
  { "value" : "SOUGOU2", "name" : "総合II", "id" : "010000000" },
  { "value" : "SOUGOU2A", "name" : "総合II-A", "id" : "010000000" },
  { "value" : "SOUGOU2B", "name" : "総合II-B", "id" : "010000000" },
  { "value" : "SOUGOU2C", "name" : "総合II-C", "id" : "010000000" },
  { "value" : "SOUGOU3", "name" : "総合III", "id" : "001000000" },
  { "value" : "SPORTS", "name" : "体育", "id" : "000100000" },
  { "value" : "FOREIGN", "name" : "外国語", "id" : "000011000" },
  { "value" : "FOREIGN1", "name" : "第一外国語", "id" : "000010000" },
  { "value" : "FOREIGN2", "name" : "第二外国語", "id" : "000001000" },
  { "value" : "JAPANESE", "name" : "国語", "id" : "000000010" },
  { "value" : "ARTS", "name" : "芸術", "id" : "000000001" },
  { "value" : "INFO", "name" : "情報", "id" : "000000100" },
  { "value" : "ALL", "name" : "全共通", "id" : "111111111" },
  { "value" : "ALL_KLIS", "name" : "全共通(知識)", "id" : "111111011" }
];

function loadFirst() {
  loadFaculty();
}

$(function() {
  for (var k=1; k<5; k++) {
    for (var j=1; j<4; j++) {
      var name = "#KAMOKU_CELL_" + k + j;
      var $creditSelector1 = makeCreditSelector(0);
      var $creditSelector2 = makeCreditSelector(0);
      var $creditSelector3 = makeCreditSelector(1);
      var $creditSelector4 = makeCreditSelector(1);
      $(name).append(
        $("<table border='1' class='list-area'>").append(
          $("<tr></tr>")
          .append($("<td class='action-area'></td>"))
          .append($("<td class='number-area'></td>").text("科目番号"))
          .append($("<td class='credit-area'></td>").text("単位数"))
        ).append(
          $("<tr></tr>")
          .append($("<td class='action-area'></td>").append($("<button class='add-button'>＋</button>")))
          .append($("<td class='number-area'></td>").append(function(){
            if (k==3) {
              return makeKisoKyoutsuuSelector();
            } else {
              return $("<input type='text'>");
            }
          }).append(function(){
            if (k==3) {
              return $("<img class='mini-selector-arrow3' src='./img/gr/Pulldown_Arrow.svg'>");
            } else {
              return;
            }
          }))
          .append(
            $("<td class='credit-area'></td>")
            .append("<span>min / max</span>")
            .append($creditSelector1)
            .append($("<img class='mini-selector-arrow1' src='./img/gr/Pulldown_Arrow.svg'>"))
            .append($creditSelector2)
            .append($("<img class='mini-selector-arrow2' src='./img/gr/Pulldown_Arrow.svg'>"))
          )
        ).append(
          $("<tr></tr>")
          .append($("<td class='action-area'></td>").append($("<button class='sum-button'>計</button>")))
          .append($("<td class='number-area'></td>").text("0.0"))
          .append(
            $("<td class='credit-area'></td>")
            .append("<span>min / max</span>")
            .append($creditSelector3)
            .append($("<img class='mini-selector-arrow1' src='./img/gr/Pulldown_Arrow.svg'>"))
            .append($creditSelector4)
            .append($("<img class='mini-selector-arrow2' src='./img/gr/Pulldown_Arrow.svg'>"))
          )
        )
      );
    }
  }
  for (var i=1; i<4; i++) {
    var name = "#KAMOKU_CELL_5" + i;
    var $creditSelector1 = makeCreditSelector(2);
    var $creditSelector2 = makeCreditSelector(2);
    $(name).append(
      $("<table border='1' class='list-area'>").append(
        $("<tr></tr>")
        .append($("<td class='action-area'></td>").append($("<button class='all-sum-button'>計</button>")))
        .append($("<td class='number-area'></td>").text("0.0"))
        .append(
          $("<td class='credit-area'></td>")
          .append("<span>min / max</span>")
          .append($creditSelector1)
          .append($("<img class='mini-selector-arrow1' src='./img/gr/Pulldown_Arrow.svg'>"))
          .append($creditSelector2)
          .append($("<img class='mini-selector-arrow2' src='./img/gr/Pulldown_Arrow.svg'>"))
        )
      )
    );
  }
  $(document).on("change", "#MAJOR_SELECT", function() {
    loadList();
  });
  $(document).on("click", ".add-button", function() {
    var id = $(this).parent().parent().parent().parent().parent().attr("id");
    id = Math.floor(parseInt(id.replace("KAMOKU_CELL_", ""))/10);
    var number = $(this).parent().parent().find((id==3?".kiso-selector":"input")).val();
    number = id==3 ? kisoNameConverter(number) : halfString(number);
    var credit1 = $(this).parent().parent().find("select:nth-child(2)").val();
    var credit2 = $(this).parent().parent().find("select:nth-child(4)").val();
    var credit = credit1==credit2?credit1:(credit1+"〜"+credit2);
    if (id==3 || number.match(/^([0-9A-Z_]{7},)*[0-9A-Z_]{7}$/)) {
      var obj = $(this).parent().parent();
      var data = number.split(",");
      var tdn = $("<td class='number-area'></td>");
      if (id==3) {
        tdn.append($("<span class='subject-number'></span>").html(data));
      } else {
        for (var i=0; i<data.length; i++) {
          tdn.append($("<span class='subject-number'></span>").html(data[i]));
          if (i<data.length-1) tdn.append($("<br>"));
        }
      }
      obj.before(
        $("<tr></tr>")
        .append($("<td class='action-area'></td>").append($("<button class='remove-button'>ー</button>")))
        .append(tdn)
        .append($("<td class='credit-area'></td>").append(credit))
      );
    }
  });
  $(document).on("click", ".remove-button", function() {
    var obj = $(this).parent().parent();
    obj.remove();
  });
  $(document).on("click", ".subject-number", function() {
    var number = $(this).text();
    var year = $("#ENTER_SELECT").val();
    searchNameFromNumber(number, year, $(this));
  });
  $(document).on("change", ".normal-select", function() {
    var obj = $(this).parent().parent();
    var credit1 = obj.find("select:nth-child(2)").val();
    var credit2 = obj.find("select:nth-child(4)").val();
    if (parseFloat(credit1) > parseFloat(credit2)) {
      var tmp = credit1;
      credit1 = credit2;
      credit2 = tmp;
      obj.find("select:nth-child(2)").val(credit1);
      obj.find("select:nth-child(4)").val(credit2);
    }
    var credit = credit1==credit2?credit1:(credit1+"〜"+credit2);
  });
  $(document).on("click", ".sum-button", function() {
    var obj = $(this).parent().parent().parent();
    var count = obj.find("tr").length;
    var credit1 = 0;
    var credit2 = 0;
    for (var i=2; i<count-1; i++) {
      var str = obj.find(("tr:nth-child("+i+")")).find(".credit-area").text();
      if (str.match(/〜/)) {
        var c = str.split("〜");
        credit1 += parseFloat(c[0]);
        credit2 += parseFloat(c[1]);
      } else {
        credit1 += parseFloat(str);
        credit2 += parseFloat(str);
      }
    }
    var credit = credit1==credit2?credit1.toFixed(1):(credit1.toFixed(1)+"〜"+credit2.toFixed(1));
    obj.find("tr:last").find(".number-area").text(credit);
    obj.find("tr:last").find("select:nth-child(2)").val(credit1.toFixed(1));
    obj.find("tr:last").find("select:nth-child(4)").val(credit2.toFixed(1));
  });
  $(document).on("change", ".sum-select", function() {
    var obj = $(this).parent().parent();
    var credit1 = obj.find("select:nth-child(2)").val();
    var credit2 = obj.find("select:nth-child(4)").val();
    if (parseFloat(credit1) > parseFloat(credit2)) {
      var tmp = credit1;
      credit1 = credit2;
      credit2 = tmp;
      obj.find("select:nth-child(2)").val(credit1);
      obj.find("select:nth-child(4)").val(credit2);
    }
    var credit = credit1==credit2?credit1:(credit1+"〜"+credit2);
    obj.find(".number-area").text(credit);
  });
  $(document).on("click", ".all-sum-button", function() {
    var obj = $(this).parent().parent();
    var id = obj.parent().parent().parent().attr("id");
    id = parseInt(id.replace("KAMOKU_CELL_", ""))%10;
    var credit1 = 0;
    var credit2 = 0;
    for (var i=1; i<5; i++) {
      var obj_ = $(("#KAMOKU_CELL_" + i + id)).find("tr:last").find(".credit-area");
      credit1 += parseFloat(obj_.find("select:nth-child(2)").val());
      credit2 += parseFloat(obj_.find("select:nth-child(4)").val());
    }
    var credit = credit1==credit2?credit1.toFixed(1):(credit1.toFixed(1)+"〜"+credit2.toFixed(1));
    obj.find(".number-area").text(credit);
    obj.find(".credit-area").find("select:nth-child(2)").val(credit1.toFixed(1));
    obj.find(".credit-area").find("select:nth-child(4)").val(credit2.toFixed(1));
  });
});

function kisoNameConverter(str) {
  for (key in kisoKyoutsuuList) {
    if (kisoKyoutsuuList[key].value == str) {
      return kisoKyoutsuuList[key].name;
    }
  }
}

function kisoIdConverter(str) {
  if (str == "ALL_SUM") {
    return "000000000";
  } else {
    for (key in kisoKyoutsuuList) {
      if (kisoKyoutsuuList[key].value == str) {
        return '"'+kisoKyoutsuuList[key].id+'"';
      }
    }
  }
}

function kisoValueConverter(str) {
  for (key in kisoKyoutsuuList) {
    if (kisoKyoutsuuList[key].name == str) {
      return kisoKyoutsuuList[key].value;
    }
  }
}

function makeCreditSelector(key) {
  var tag = "";
  var cList = [];
  if (key==0) {
    tag = "<select class='normal-select'></select>";
    cList = creditList.concat();
  } else {
    tag = "<select class='sum-select'></select>";
    cList = creditListLarge.concat();
  }
  var $creditSelector = $(tag);
  for (var i=0; i<cList.length; i++) {
    var $str = '<option value="' + cList[i] + '"></option>';
    $creditSelector.append($($str).text(cList[i]));
  }
  return $creditSelector;
}

function makeKisoKyoutsuuSelector() {
  var $kisoKyoutsuuSelector = $("<select class='kiso-selector'></select>");
  for (var i=0; i<kisoKyoutsuuList.length; i++) {
    var $str = '<option value="' + kisoKyoutsuuList[i].value + '"></option>';
    $kisoKyoutsuuSelector.append($($str).text(kisoKyoutsuuList[i].name));
  }
  return $kisoKyoutsuuSelector;
}

function halfString(val) {
  var halfstr = "";
  val.toUpperCase().replace("、", ",").replace(/\s+/g, "").split("").forEach(function(str) {
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
  loadList();
}

function loadList() {
  var id = parseInt($("#MAJOR_SELECT").val());
  var year = parseInt($("#ENTER_SELECT").val());
  if (id==6201 || id==6101) {
    requireData(id, year);
  }
}

function uploadData() {
  var id = $("#MAJOR_SELECT").val();
  var year = $("#ENTER_SELECT").val();
  //開始
  var txt = "{\n";
  txt += '\t"year" : ' + year + ",\n";
  txt += '\t"id" : ' + id + ",\n";
  //専門
  txt += '\t"Senmon" : {\n';
  txt += '\t\t"need" : [\n';
  txt += makeList(11);
  txt += '\t\t],\n';
  txt += '\t\t"select" : [\n';
  txt += makeList(12);
  txt += '\t\t],\n';
  txt += '\t\t"free" : [\n';
  txt += makeList(13);
  txt += '\t\t]\n';
  txt += '\t},\n';
  //専門基礎
  txt += '\t"SenmonKiso" : {\n';
  txt += '\t\t"need" : [\n';
  txt += makeList(21);
  txt += '\t\t],\n';
  txt += '\t\t"select" : [\n';
  txt += makeList(22);
  txt += '\t\t],\n';
  txt += '\t\t"free" : [\n';
  txt += makeList(23);
  txt += '\t\t]\n';
  txt += '\t},\n';
  //基礎共通
  txt += '\t"KisoKyoutsuu" : {\n';
  txt += '\t\t"need" : [\n';
  txt += makeList(31);
  txt += '\t\t],\n';
  txt += '\t\t"select" : [\n';
  txt += makeList(32);
  txt += '\t\t],\n';
  txt += '\t\t"free" : [\n';
  txt += makeList(33);
  txt += '\t\t]\n';
  txt += '\t},\n';
  //基礎関連
  txt += '\t"KisoKanren" : {\n';
  txt += '\t\t"need" : [\n';
  txt += makeList(41);
  txt += '\t\t],\n';
  txt += '\t\t"select" : [\n';
  txt += makeList(42);
  txt += '\t\t],\n';
  txt += '\t\t"free" : [\n';
  txt += makeList(43);
  txt += '\t\t]\n';
  txt += '\t},\n';
  //合計
  txt += '\t"Sum" : {\n';
  txt += '\t\t"need" : { '+makeSumList(1)+' },\n';
  txt += '\t\t"select" : { '+makeSumList(2)+' },\n';
  txt += '\t\t"free" : { '+makeSumList(3)+' }\n';
  txt += '\t}\n';
  //終了
  txt += '}';
  postData(txt);
  // alert(txt);
}

//アップロード用の行を生成する
function makeList(id) {
  var id_ = Math.floor(id/10);
  var txt = "";
  var length = $("#KAMOKU_CELL_"+id).find("tr").length;
  for (var i=2; i<length-1; i++) {
    var number = $("#KAMOKU_CELL_"+id).find("tr:nth-child("+i+")").children("td:nth-child(2)").html();
    number = (id_==3 ? kisoValueConverter(number) : number.split("<br>").join('","'));
    txt += '\t\t\t{ "row" : ["'+number+'"], ';
    var credit = $("#KAMOKU_CELL_"+id).find("tr:nth-child("+i+")").children("td:nth-child(3)").text();
    if (credit.match(/〜/)) {
      var credits = credit.split("〜");
      txt += '"min" : '+credits[0]+', "max" : '+credits[1]+', ';
    } else {
      txt += '"min" : '+credit+', "max" : '+credit+', ';
    }
    txt += '"id" : '+(id_==3 ? kisoIdConverter(number) : '"000000000"');
    txt += ' },\n';
  }
  txt += '\t\t\t{ "row" : ["ALL_SUM"], ';
  var credit = $("#KAMOKU_CELL_"+id).find("tr:last").children("td:nth-child(2)").text();
  if (credit.match(/〜/)) {
    var credits = credit.split("〜");
    txt += '"min" : '+credits[0]+', "max" : '+credits[1]+', "id" : "000000000" }\n';
  } else {
    txt += '"min" : '+credit+', "max" : '+credit+', "id" : "000000000" }\n';
  }
  return txt;
}

function makeSumList(id) {
  var min = $("#KAMOKU_CELL_5"+id).find("tr:last").find("select:nth-child(2)").val();
  var max = $("#KAMOKU_CELL_5"+id).find("tr:last").find("select:nth-child(4)").val();
  var txt = '"min" : '+min+', "max" : '+max;
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

//小山氏必見2
function requireData(id, year) {
  var JsonText = '{\n\t"id" : '+id+',\n\t"year" : '+year+'\n}';
  $.ajax({
    type: "POST",
    data: JsonText,
    url: "https://tpp.d-io.com/api/gr",
    contentType: "application/json",
    success: function(data) {
      console.log(data);
      getData(data);
    },
    error: function() {
      console.log("Error");
      missGetData();
    }
  });
  return false;
}

function searchNameFromNumber(number, year, obj) {
  var JsonText = '{\n\t"id" : "'+number+'",\n\t"year" : "'+year+'"\n}';
  $.ajax({
      type: "POST",
      data: JsonText,
      url: "https://tpp.d-io.com/api/search/",
      contentType: "application/json",
      success: function(data) {
          data = $.parseJSON(data);
          console.log(data.name);
          obj.attr("title", data.name);
      },
      error: function() {
          console.log("Error");
          obj.attr("title", "該当なし");
      }
  });
}

//ローカルのJSONデータからデフォルト値を貰ってくる
function getData(data) {
  setDefaultSelector(11, data.Senmon.need);
  setDefaultSelector(12, data.Senmon.select);
  setDefaultSelector(13, data.Senmon.free);
  setDefaultSelector(21, data.SenmonKiso.need);
  setDefaultSelector(22, data.SenmonKiso.select);
  setDefaultSelector(23, data.SenmonKiso.free);
  setDefaultSelector(31, data.KisoKyoutsuu.need);
  setDefaultSelector(32, data.KisoKyoutsuu.select);
  setDefaultSelector(33, data.KisoKyoutsuu.free);
  setDefaultSelector(41, data.KisoKanren.need);
  setDefaultSelector(42, data.KisoKanren.select);
  setDefaultSelector(43, data.KisoKanren.free);
  setDefaultSumSelector(51, data.Sum.need);
  setDefaultSumSelector(52, data.Sum.select);
  setDefaultSumSelector(53, data.Sum.free);
}

function missGetData() {
  for (var i=0; i<12; i++) {
    resetDefaultSelector((Math.floor(i/3)+1)*10+(i%3+1));
  }
  for (var i=1; i<4; i++) {
    resetDefaultSumSelector(50+i);
  }
}

function resetDefaultSelector(id) {
  var len = $("#KAMOKU_CELL_"+id).find("tr").length;
  for (var i=0; i<len-3; i++) {
    $("#KAMOKU_CELL_"+id).find("tr:nth-child(2)").remove();
  }
  var obj = $("#KAMOKU_CELL_"+id).find("tr:last");
  obj.children(".number-area").text("0.0");
  obj.children(".credit-area").children("select:nth-child(2)").val("0.0");
  obj.children(".credit-area").children("select:nth-child(4)").val("0.0");
}

//それぞれの科目区分のリストを作る
function setDefaultSelector(id, data) {
  resetDefaultSelector(id);
  var obj = $("#KAMOKU_CELL_"+id).find("tr:last");
  for (var i=0; i<data.length-1; i++) {
    var tdn = $("<td class='number-area'></td>");
    if (Math.floor(id/10)==3) {
      tdn.append($("<span class='subject-number'></span>").html(kisoNameConverter(data[i].row)));
    } else {
      for (var j=0; j<data[i].row.length; j++) {
        tdn.append($("<span class='subject-number'></span>").html(data[i].row[j]));
        if (j<data[i].row.length-1) tdn.append($("<br>"));
      }
    }
    var credit1 = data[i].min;
    var credit2 = data[i].max;
    var credit = credit1==credit2?credit1.toFixed(1):(credit1.toFixed(1)+"〜"+credit2.toFixed(1));
    obj.prev("tr").before(
      $("<tr></tr>")
      .append($("<td class='action-area'></td>").append($("<button class='remove-button'>ー</button>")))
      .append(tdn)
      .append($("<td class='credit-area'></td>").append(credit))
    );
  }
  var credit1 = data[data.length-1].min;
  var credit2 = data[data.length-1].max;
  var credit = credit1==credit2?credit1.toFixed(1):(credit1.toFixed(1)+"〜"+credit2.toFixed(1));
  obj.children(".number-area").text(credit);
  obj.children(".credit-area").children("select:nth-child(2)").val(credit1.toFixed(1));
  obj.children(".credit-area").children("select:nth-child(4)").val(credit2.toFixed(1));
}

function resetDefaultSumSelector(id) {
  var obj = $("#KAMOKU_CELL_"+id).find("tr");
  obj.children(".number-area").text("0.0");
  obj.children(".credit-area").children("select:nth-child(2)").val("0.0");
  obj.children(".credit-area").children("select:nth-child(4)").val("0.0");
}

function setDefaultSumSelector(id, data) {
  var obj = $("#KAMOKU_CELL_"+id).find("tr");
  var credit1 = data.min;
  var credit2 = data.max;
  var credit = credit1==credit2?credit1.toFixed(1):(credit1.toFixed(1)+"〜"+credit2.toFixed(1));
  obj.children(".number-area").text(credit);
  obj.children(".credit-area").children("select:nth-child(2)").val(credit1.toFixed(1));
  obj.children(".credit-area").children("select:nth-child(4)").val(credit2.toFixed(1));
}

function checkObj(obj) {
  console.log(Object.prototype.toString.call(obj));
}
