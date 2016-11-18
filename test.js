var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('requirements.db');

var department; //学類
var record; //成績を格納
var sogo1 = 0; //総合1
var sogo2 = 0; //総合2
var sogo3 = 0; //総合3
var p_e = 0; //体育
var english = 0; //英語
var lang = 0; //第2外国語
var info = 0; //情報
var japanese = 0; //国語
var art = 0; //芸術
var graduation = 1; //卒業判定フラグ
var retire = 0; //除籍判定フラグ

//英語の処理ここから 
db.serialize(function(){
 db.each("SELECT min, max from common_compulsory, department where subject = '第1外国語(英語)' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%'", function(err, row){
 var x=0, y=0, z=0;
 if(row.min==row.max){
    x=row.min;
    console.log("英語:"+x);
    //履修データから科目番号31A***2,31B***2,31C***2,31D***2,31E***2,31F***2の単位数の合計をyに格納
    //履修データから科目番号313***2,314***2,315***2,316***2,317***2の単位数の合計をzに格納
    //if(x-4.5-z>0){
    //graduation=0;
    //}else{
    //english=-(x-4.5-z);
    //}
    //if(y < 4.5){
    //graduation=0;
    //}
   }
  });
//総合科目1の処理ここから
 db.each("SELECT min, max from  common_compulsory, department where subject = '総合1' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%'", function(err, row){
 var x=0, y=0;
 if(row.min==row.max){
    x=row.min;
    console.log("総合1:"+x);
    //履修データから科目番号1119***の単位数の合計をyに格納
    //if(y==0){
    //graduation=0;
    //}
    //履修データから科目番号1319***,12*****の単位数をyにプラス
    //if(x>y){
    //graduation=0;
    //}else{
    //sogo1=y-x;
    //}
    }
   });
//総合2の処理
 db.each("SELECT min, max from  common_compulsory, department where subject = '総合2' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%'", function(err, row){
   var x=0, y=0, z=0, A=0, B=0, C=0;
   var Amin, Amax, Bmin, Bmax, Cmin, Cmax;
   if(row.min==row.max){
        x=row.min;
	console.log("総合2:"+x);
	}
    db.each("SELECT min, max from  common_compulsory, department where subject = '総合2-A' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%'", function(err, rowA){
       Amin = rowA.min;
       Amax = rowA.max;
       console.log("総合2-A 上限:"+Amax+"下限"+Amin);
    })
    db.each("SELECT min, max from  common_compulsory, department where subject = '総合2-B' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%'", function(err, rowB){
        Bmin = rowB.min;
	Bmax = rowB.max;
	console.log("総合2-B 上限:"+Bmax+"下限"+Bmin);
      })
    db.each("SELECT min, max from  common_compulsory, department where subject = '総合2-C' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%'", function(err, rowC){
        Cmin = rowC.min;
	Cmax = rowC.max;
	console.log("総合2-C 上限:"+Cmax+"下限"+Cmin);
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
    //y=min(A,Amax);
    //}

});
});
db.close;
