var senmon_kiso_r //専門基礎必修
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

if(SUM(/GC1****/)>36){
   graduate=0;
}
if((SUM(/GC2****/)+SUM(/GA1****/))<22){
   graduate=0;
}else{
   senmon_kiso_s = SUM(/GC2****/)+SUM(/GA1****/) - 22;
}
if(SUM(/GC4****/)<12){
   graduate=0;
}
if(SUM(/GC5****/)<30){
   graduate=0;
}else{
   senmon_s = SUM(/GC5****/) - 30;
}

senmon_kiso_f = Min(SUM(/GC3****/)+senmon_kiso_s, 9);
senmon_f = Min(SUM(/GC6****/)+senmon_s, 9);
