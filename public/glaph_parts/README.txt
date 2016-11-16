【ファビコン】
・32x32と64x64の2種類

【フォント】
・Noto Sans Japaneseを使用(https://fonts.google.com/earlyaccess#Noto+Sans+Japanese、Googleフォント)
・重い場合はサブセット化するといいらしい（https://monochrome-design.jp/294など）


【グラフ】
Block1
・drawGRbar　　　：左の棒グラフ(#barGraph)
・drawGRbarRabbit：中央のウサギマスク積み上げ棒グラフ(#rabbitGraph)
（maskプロパティでやっているけど思ったよりも、まだまだ対応していなかったり。どうしよう・・・。http://caniuse.com/#search=mask
あとマスク部分のCSSを外部に書くとうまくいかないのは何故だろう？）

Block2
・drawGetCredit　：取得単位アーチグラフ(#GetCreditGraph)
・drawGradeA　　 ：A/A+割合アーチグラフ(#GradeAGraph)

Block3
・drawGradeRate　：取得単位成績区分アーチグラフ


Block4
・drawCreditTransition：履修単位数遷移グラフ(#CreditTransitionGraph)
・drawGPATransition　 ：GPA遷移グラフ(#GPATransitionGraph)

【レスポンシブル】
・viewBoxとpreserveAspectRatio
・SVGのレスポンシブ化には外部CSSのFluidity.cssを使用
（参考 http://coliss.com/articles/build-websites/operation/css/css-small-framework-for-responsive-fluidity.html）
