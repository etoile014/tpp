var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('requirements.db');

var department; //学類
var record; //成績を格納
var subject[9] = 0;//0:総合1,1:総合2,2:総合3,3:体育,4:第1外国語,5:第２外国語,6:情報,7:国語,8:芸術
var graduation = 1; //卒業判定フラグ
var retire = 0; //除籍判定フラグ
var common_c=0; //共通選択
var common_f=0; //共通自由


//英語の処理ここから 
db.serialize(function(){
 db.each("SELECT min, max from common_compulsory where subject = '第1外国語(英語)' and depart = 621 and enter=2014", function(err, row){
 var x=0, y=0, z=0;
 if(row.min==row.max){
    x=row.min;
    console.log("英語:"+x);
    //履修データから科目番号31A***2,31B***2,31C***2,31D***2,31E***2,31F***2の単位数の合計をyに格納
    //履修データから科目番号313***2,314***2,315***2,316***2,317***2の単位数の合計をzに格納
    //if(x-4.5-z>0){
    //graduation=0;
    //}else{
    //subject[4]=-(x-4.5-z);
    //}
    //if(y < 4.5){
    //graduation=0;
    //}
   }
  });
//総合科目1の処理ここから
 db.each("SELECT min, max from common_compulsory where subject = '総合科目1' and depart = 621 and enter = 2014", function(err, row){
 var x=0, y=0;
 if(row.min==row.max){
    x=row.min;
    console.log("総合科目1:"+x);
<<<<<<< HEAD
    //履修データから科目番号1119***の単位数の合計をyに格納
    //if(y==0){
    //graduation=0;
    //}
    //履修データから科目番号1319***,12*****の単位数をyにプラス
=======
    //履修データから科目番号11*****の単位数の合計をyに格納
    //if(y==0){
    //graduation=0;
    //}
    //履修データから科目番号12*****,13*****の単位数をyにプラス
>>>>>>> 6ec1aad33d30ada0302fb990739a8a5cb941f88a
    //if(x>y){
    //graduation=0;
    //}else{
    //subject[0]=y-x;
    //}
    }
   });
//総合2の処理
 db.each("SELECT min, max from common_compulsory where subject = '総合科目2' and depart = 621 and enter = 2014", function(err, row){
   var x=0, y=0, z=0, A=0, B=0, C=0;
   var Amin, Amax, Bmin, Bmax, Cmin, Cmax;
   if(row.min==row.max){
        x=row.min;
	console.log("総合科目2:"+x);
	}
    db.each("SELECT min, max from common_compulsory where subject = '総合科目2-A' and depart = 621 and enter = 2014", function(err, rowA){
       Amin = rowA.min;
       Amax = rowA.max;
       console.log("総合科目2-A 上限:"+Amax+"下限"+Amin);
    })
    db.each("SELECT min, max from common_compulsory where subject = '総合科目2-B' and depart = 621 and enter = 2014", function(err, rowB){
        Bmin = rowB.min;
	Bmax = rowB.max;
	console.log("総合科目2-B 上限:"+Bmax+"下限"+Bmin);
      })
    db.each("SELECT min, max from common_compulsory where subject = '総合科目2-C' and depart = 621 and enter = 2014", function(err, rowC){
        Cmin = rowC.min;
	Cmax = rowC.max;
	console.log("総合科目2-C 上限:"+Cmax+"下限"+Cmin);
      })
    //履修データから科目番号1A*****の単位数をAに、1B*****の単位数をBに、1C*****の単位数をCにそれぞれ格納
    //if(A<Amin){
    //graduation=0;
    //}else{
    //y=min(A,Amax);
    //}
    //if(B<Bmin){
    //graduation=0;
    //}else{
    //y+=min(B,Bmax);
    //}
    //if(C<Cmin){
    //graduation=0;
    //}else{
    //y+=min(C,Cmax);
    //}
    //if(y<x){
    //graduation=0;
    //}else{
    //subject[1]=A+B+C-x;
    //}
});
//総合3の処理
  db.each("SELECT min, max from common_compulsory where subject = '総合科目3' and depart = 621 and enter = 2014", function(err, row){
  var x=0, y=0;
  if(row.min==row.max){
       x=row.min;
       console.log("総合科目3:"+x);
  }
 //履修データから科目番号1D*****,1E*****,1F*****,1G*****の単位数をyにプラス
 //if(x>y){
 //graduation=0;
 //}else{
 //subject[3]=y-x;
 //}
 });

//体育の処理
 db.each("SELECT min, max from common_compulsory where subject = '体育' and depart = 621 and enter = 2014", function(err, row){
 var w, x, y, z=0;
 if(row.min==row.max){
         x=row.min;
	 console.log("体育:"+x);
  }
//履修データから科目番号21*****,25*****の単位数をyに格納
//履修データから科目番号22*****の単位数をzに格納
//履修データから科目番号23*****,24*****,26*****,27*****の単位数をwに格納
 //if(x>0){
   //if(y<1){
     //graduate=0;
     //}
   //if(z<1){
     //graduate=0;
     //}
   //if(w<(x-2)){
     //graduate=0;
     //}
  //}
//履修データから科目番号28*****の単位数をsubject[4]に格納
 });
<<<<<<< HEAD
=======
//国語の処理
  db.each("SELECT min, max from common_compulsory where subject = '国語' and depart = 621 and enter = 2014", function(err, row){
    var x=0, y=0;
    if(row.min==row.max){
       x=row.min;
       console.log("国語:"+x);
    }
    if(x==0){
       subject[7] = SUM(/5******/);
    }
   });
//第2外国語の処理
  db.each("SELECT min, max from common_compulsory where subject = '第2外国語' and depart = 621 and enter = 2014", function(err, row){
    var x=0, y=0, z=0, lang[8]=0;
     if(row.min==row.max){
         x=row.min;
	 console.log("第2外国語:"+x);
     }
    lang[0]=SUM(/32A***2/)+SUM(/32B***2/)+SUM(/32C***2/)+SUM(/32E***2/)+SUM(/329***2/)+SUM(/323***2/);
    lang[1]=SUM(/33A***2/)+SUM(/33B***2/)+SUM(/33C***2/)+SUM(/33E***2/)+SUM(/339***2/)+SUM(/333***2/);
    lang[2]=SUM(/34A***2/)+SUM(/34B***2/)+SUM(/34C***2/)+SUM(/34E***2/)+SUM(/349***2/)+SUM(/343***2/);
    lang[3]=SUM(/35A***2/)+SUM(/35B***2/)+SUM(/35C***2/)+SUM(/35E***2/)+SUM(/359***2/)+SUM(/353***2/);
    lang[4]=SUM(/36A***2/)+SUM(/36B***2/)+SUM(/36C***2/)+SUM(/36E***2/)+SUM(/369***2/)+SUM(/363***2/);
    lang[5]=SUM(/37A***2/)+SUM(/37B***2/)+SUM(/37C***2/)+SUM(/37E***2/)+SUM(/379***2/)+SUM(/373***2/);
    lang[6]=SUM(/38A***2/)+SUM(/38B***2/)+SUM(/38C***2/)+SUM(/38E***2/)+SUM(/389***2/)+SUM(/383***2/);
    lang[7]=SUM(/39****2/);
    z=SUM(/324***2/)+SUM(/334***2/)+SUM(/344***2/)+SUM(/354***2/)+SUM(/364***2/)+SUM(/374***2/)+SUM(/384***2/);
    y = max(lang);
    if(y<x){
      graduate=0;
    }else{
      subject[5]=SUM(lang)-x+z;
    }

>>>>>>> 6ec1aad33d30ada0302fb990739a8a5cb941f88a
//必修の処理ここまで
//ここから共通選択
var Xmax=0, Xmin=0, Y=0, Z=0;
  db.each("SELECT min, max, sunjectID from common_choice where depart = 621 and enter = 2014", function(err, row){
  Xmax=row.max;
  Xmin=row.min;
  for(var i = 9; i > 0; i--){
     if((Math.pow(2, i) and row.subjectID)==Math.pow(2, i)){
        Y+=subject[9-i];
     }
  }
  if(Y<Xmin){
    graduate=0;
  }else{
  Z=min(Y,Xmax);
  common_c=Z;
  }
 });
//ここから共通自由
 db.each("SELECT min, max, sunjectID from common_free where depart = 621 and enter = 2014", function(err, row){
   Xmax=row.max;
   Xmin=row.min;
   for(var i = 9; i > 0; i--){
      if((Math.pow(2, i) and row.subjectID)==Math.pow(2, i)){
	  Y+=subject[9-i];
	  }
      }
   if(Y<Xmin){
     graduate=0;
   }else{
   Z=min(Y,Xmax);
   common_f=Z;
   }
  });
});
var senmon_kiso_c //専門基礎選択
var senmon_kiso_f //専門基礎自由
var senmon_r //専門必修
var senmon_c //専門選択
var senmon_f //専門自由
var senmon_kiso_s //専門基礎余剰
var senmon_s //専門
var graduate = 1 //卒業判定フラグ
var retire = 0 //除籍判定フラグ

SUM(授業コード){
//指定された授業コードの単位の合計を履修データから取得して返す。
}

Min(A, B){
 if(A>B){
  return B;
 }else{
   return A;
 }
} 
if(SUM(/GC1****/)>36){graduate=0;}
if((SUM(/GC2****/)+SUM(/GA1****/))<22){
  graduate=0;
}else{
  senmon_kiso_s = SUM(/GC2****/)+SUM(/GA1****/) - 22;
}
if(SUM(/GC4****/)<12){graduate=0;}
if(SUM(/GC5****/)<30){
  graduate=0;
}else{
  senmon_s = SUM(/GC5****/) - 30;
}
senmon_kiso_f = Min(SUM(/GC3****/)+senmon_kiso_s, 9);
senmon_f = Min(SUM(/GC6****/)+senmon_s, 9);
			   
var X=0, Y=0;
Xに専門科目、専門基礎科目の合計を格納
X=SUM(/GA*****/) - SUM(/GC*****/);
db.serialize(function(){
  db.each("SELECT * from relation_free where subject = '特設自由科目' and depart = 621 and enter=2014", function(err, row){
    if(row.type==1){
	X += SUM(/8******/);
    }
  });
  db.each("SELECT * from relation_free where subject = '教職' and depart = 621 and enter=2014", function(err, row){
    if(row.type==1){
	X = X+SUM(/90*****/)+SUM(/91*****/)+SUM(/92*****/)+SUM(/93*****/)+SUM(/94*****/)+SUM(/95*****/)+SUM(/96*****/)+SUM(/97*****/)+SUM(/98*****/);
    }
  });
  db.each("SELECT * from relation_free where subject = '博物館' and depart = 621 and enter=2014", function(err, row){
    if(row.type==1){
	X += SUM(/9901***/);
     }
  });
});
if((X+senmon_kiso_s+senmon_s+common_f+common_c)<9.0){
   graduate=0;
}
db.close();

