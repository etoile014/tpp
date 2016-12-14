var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('requirements.db');

var department; //学類
var record; //成績を格納
var subject[9] = 0;//0:総合1,1:総合2,2:総合3,3:体育,4:第1外国語,5:第２外国語,6:情報,7:国語,8:芸術
var graduation = 1; //卒業判定フラグ
var retire = 0; //除籍判定フラグ

//英語の処理ここから 
db.serialize(function(){
 db.each("SELECT min, max from common_compulsory, department where subject = '第1外国語(英語)' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%' and enter=2014", function(err, row){
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
 db.each("SELECT min, max from  common_compulsory, department where subject = '総合科目1' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%' and enter = 2014", function(err, row){
 var x=0, y=0;
 if(row.min==row.max){
    x=row.min;
    console.log("総合科目1:"+x);
    //履修データから科目番号1119***の単位数の合計をyに格納
    //if(y==0){
    //graduation=0;
    //}
    //履修データから科目番号1319***,12*****の単位数をyにプラス
    //if(x>y){
    //graduation=0;
    //}else{
    //subject[0]=y-x;
    //}
    }
   });
//総合2の処理
 db.each("SELECT min, max from  common_compulsory, department where subject = '総合科目2' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%' and enter = 2014", function(err, row){
   var x=0, y=0, z=0, A=0, B=0, C=0;
   var Amin, Amax, Bmin, Bmax, Cmin, Cmax;
   if(row.min==row.max){
        x=row.min;
	console.log("総合科目2:"+x);
	}
    db.each("SELECT min, max from  common_compulsory, department where subject = '総合科目2-A' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%' and enter = 2014", function(err, rowA){
       Amin = rowA.min;
       Amax = rowA.max;
       console.log("総合科目2-A 上限:"+Amax+"下限"+Amin);
    })
    db.each("SELECT min, max from  common_compulsory, department where subject = '総合科目2-B' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%' and enter = 2014", function(err, rowB){
        Bmin = rowB.min;
	Bmax = rowB.max;
	console.log("総合科目2-B 上限:"+Bmax+"下限"+Bmin);
      })
    db.each("SELECT min, max from  common_compulsory, department where subject = '総合科目2-C' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%' and enter = 2014", function(err, rowC){
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
  db.each("SELECT min, max from  common_compulsory, department where subject = '総合科目3' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%' and enter = 2014", function(err, row){
  var x=0, y=0;
  if(row.min==row.max){
       x=row.min;
       console.log("総合科目2:"+x);
  }
 //履修データから科目番号1D*****,1E*****,1F*****,1G*****の単位数をyにプラス
 //if(x>y){
 //graduation=0;
 //}else{
 //subject[3]=y-x;
 //}
 });

//体育の処理
 db.each("SELECT min, max from common_compulsory, department where subject = '体育' and department.departmentID=common_compulsory.departmentID and department.department_name like '%創成%' and enter = 2014", function(err, row){
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
//必修の処理ここまで
//ここから共通選択
var Xmax=0, Xmin=0, Y=0, Z=0;
  db.each("SELECT min, max, sunjectID from common_choice, department where department.departmentID=common_choice.departID and department.department_name like '%創成%' and enter = 2014", function(err, row){
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
  }
 }
var common_c=Z;
//ここから共通自由
 db.each("SELECT min, max, sunjectID from common_free, department where department.departmentID=common_free.departID and department.department_name like '%創成%' and enter = 2014", function(err, row){
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
   }
  }
var common_f=Z;
});
db.close;
