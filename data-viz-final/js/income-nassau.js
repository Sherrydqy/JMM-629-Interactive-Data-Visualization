var widthig=900;
var heightig = 600;
var colN = "#449e91";
var colN1 = "#1b7568";
var colN16 = "#449e91";
var colN116 = "#1b7568";
var nassau = [];
var g;
var barWidthig = 15;
var flagig = 0;
var dataig2012=[];
var dataig2016=[];
var moneyig = [];
var pig2 = [];
var pig6 = [];
var budgetCause = [];
var big2 = [];
var big6 = [];
var intervalig;
var svgNa, xScaleig,yScaleig,xxMaxig,yValueScaleig,barsig,lablesig,xAxisig,yAxisig;
var margin = {
  left:40,
  top: 40,
  right: 40,
  bottom: 40
}
//widthig = 1000+ margin.left +margin.right;
var svgNa = d3.select("#income-nassau")
            .append("svg")

            .attr("width",widthig)
            .attr("height",heightig);

//height = parseInt(window.innerHeight) - margin.top - margin.bottom;
d3.csv("./data/2012-income-nassau.csv").then(function(dataig2){
  d3.csv("./data/2016-income-nassau.csv").then(function(dataig6){
        d3.csv("./data/2012-budget-nassau.csv").then(function(databig2){
          d3.csv("./data/2016-budget-nassau.csv").then(function(databig6){

  //  console.log(dataig2);
    for(var i = 0; i<dataig2.length;i++){
      moneyig[i] = dataig2[i].money
      dataig2[i].percentage = dataig2[i].percentage*1000;
      dataig6[i].percentage = dataig6[i].percentage*1000;
      pig2[i] = dataig2[i].percentage;
      pig6[i] = dataig6[i].percentage;
    }

    for(var i = 0; i<databig2.length; i++){
      budgetCause[i] = databig2[i].cause;
      big2[i] = databig2[i].budget;
    //  console.log("budgetsssss");
      console.log(big2[i]);
      big6[i] = databig6[i].budget;
    }
console.log("budget");
console.log(big2);

              intervalig = widthig/90;

              var xMax1 = d3.max(pig2);
              var xMax2 = d3.max(pig6);
              //console.log(xMax2);

              xMaxig = (xMax1>xMax2)?xMax1:xMax2;
            //  console.log("max: "+ xMaxig);
              xScaleig = d3.scaleLinear()
              .domain([0,xMaxig])
              .range([margin.left+150,widthig-margin.right*2]);

              var barH = height-margin.top*2.5;
              yScaleig = d3.scaleOrdinal()
              .domain(moneyig)
              //.range([barH,barH*8/9,barH*7/9,barH*6/9,barH*5/9,barH*4/9,barH*3/9,barH*2/9,barH*1/9,0]);
              .range([0,barH*1/9,barH*2/9,barH*3/9,barH*4/9,barH*5/9,barH*6/9,barH*7/9,barH*8/9,barH]);
              //console.log(yScaleig("$15,000 to $24,999"));
              //console.log(moneyig);
              svgNa.append("g")
                   .attr("id","incomenaSvg");
              barsig = svgNa.select("#incomenaSvg")
              .selectAll("rect")
              .data(dataig2)
              .enter()
              .append("rect")
              .attr("x", function(d,i){
                return  xScaleig(0);
              })
              .attr("y", function(d,i){
                return yScaleig(d.money);

              })
              .attr("height", barWidthig)
              .attr("width", function(d){
                  //console.log(xScaleig(d.percentage));
                return xScaleig(d.percentage)-xScaleig(0);
              })
              .attr("fill", colN);
              //.attr("opacity", "0.6");

              labelig = svgNa.select("#incomenaSvg")
              .selectAll("text")
              .data(dataig2)
              .enter()
              .append("text")
              .attr("class", "labels")
              .text(function(d,i){
                //console.log(i);

                return (d.percentage/10).toFixed(2)+"%";

              })
              .attr("font-size","11ßpx")
              .attr("text-anchor","left")
              .attr("x", function(d,i) {
                return xScaleig(d.percentage)+35;
              })
              .attr("y", function(d,i) {

                return yScaleig(d.money)+14;
              });

              var labeligLeft = svgNa.selectAll("circle")
              .data(dataig2)
              .enter()
              .append("text")
              .attr("class", "labels")
              .text(function(d,i){
                //console.log(i);

                return (d.money);

              })
              .attr("font-size","11ßpx")
              .attr("text-anchor","end")
              .attr("x",xScaleig(0)-20 )
              .attr("y", function(d,i) {

                return yScaleig(d.money)+14;
              });
              /*-----------income ends--------*/
              /*-----------income median starts--------*/
              svgNa.append("g")
                   .attr("id","incomenaMedian");
              var secnaMedian = svgNa.select("#incomenaMedian");
              secnaMedian.append("text")
                       .attr("x",0)
                       .attr("y",barH+60)
                       .attr("class", "ll")
                       .text("Median Income: $43,149");
              var medianScale = d3.scaleLinear()
                                  .domain([0,80275])
                                  .range([0,width]);

              secnaMedian.append("rect")
                       .attr("x",0)
                       .attr("y",barH+73)
                       .attr("height",barWidthig/2)
                       .attr("width",medianScale(43149))
                       .attr("fill",colN);

              /*-----------income median ends--------*/
              /*-----------budget total starts--------*/

              svgNa.append("g")
                   .attr("id","budgetnaTotal");
              var secnaMedian = svgNa.select("#budgetnaTotal");
              secnaMedian.append("text")
                       .attr("x",0)
                       .attr("y",barH+130)
                       .attr("class", "ll")
                       .text("Annual Total Survival Budget: $49,756");


              secnaMedian.append("rect")
                       .attr("x",0)
                       .attr("y",barH+143)
                       .attr("height",barWidthig/2)
                       .attr("width",medianScale(49756))
                       .attr("fill",colN1);
              /*-----------budget total ends--------*/
              /*-----------budget starts--------*/
              svgNa.append("text")
              .attr("class","chartTitle")
              .attr("y",barH+190)
              .text("Nassau Annual Survival Budget Distribution (Families of 4)2016");
              barH = barH+20;
              var xxMax1 = d3.max(big2);
              var xxMax2 = d3.max(big6);
              var barsWidth = 30;
              //console.log(xMax2);

              var xxMaxig = (xxMax1>xxMax2)?xxMax1:xxMax2;
              console.log("mYax: "+ xxMaxig);
              var xScaleBig = d3.scaleLinear()
              .domain([0,xxMaxig])
              .range([margin.left+150, widthig-margin.right*6]);

              var widt=(height-barH+80);
              var yScaleBig = d3.scaleOrdinal()
              .domain(budgetCause)

              //.range([barH,barH*8/9,barH*7/9,barH*6/9,barH*5/9,barH*4/9,barH*3/9,barH*2/9,barH*1/9,0]);
              .range([barH+200,widt*1/8+barH+200,widt*2/8+barH+200,widt*3/8+barH+200,widt*4/8+barH+200,widt*5/8+barH+200,widt*6/8+barH+200,widt*7/8+barH+200,widt+barH+200]);

              svgNa.append("g")
                   .attr("id","budgetnaSvg");
              barsig = svgNa.select("#budgetnaSvg")
              .selectAll("rect")
              .data(databig2)
              .enter()
              .append("rect")
              .attr("x", xScaleBig(0))
              .attr("y",function(d){
                return yScaleBig(d.cause);
              })
              .attr("width", function(d){
                return xScaleBig(d.budget)-xScaleBig(0);
              })
              .attr("height", barWidthig)
              .attr("fill", colN1);
              //.attr("opacity", "0.6");

              labelig = svgNa.select("#budgetnaSvg")
              .selectAll("text")
              .data(databig2)
              .enter()
              .append("text")
              .attr("class", "labels")
              .text(function(d,i){
                //console.log(i);

                return ("$"+d.budget);

              })
              .attr("font-size","11ßpx")
              .attr("text-anchor","middle")
              .attr("x", function(d,i) {
                return xScaleBig(d.budget)+30;
              })
              .attr("y", function(d,i) {

                return yScaleBig(d.cause)+14;
              });

              var labeligLeft = svgNa.select("#budgetnaSvg")
              .selectAll("circle")
              .data(databig2)
              .enter()
              .append("text")
              .attr("class", "labels")
              .text(function(d,i){
                  return (d.cause);

              })
              .attr("font-size","11ßpx")
              .attr("text-anchor","end")
              .attr("x",function(d,i){
                return xScaleBig(0)-20;
              })
              .attr("y", function(d,i) {

                return yScaleBig(d.cause)+14;
              });

              /*----------------budget ends----------------*/
              /* ------------------ 2016 is clicked-----------------*/
                d3.select("#yna2016")
                .on("click",function() {//selection.on()方法是添加事件监听器的简便方法，接受两个参数：事件类型和监听器（匿名函数）
                  //p标签被单击时执行的任务
                  //新数据集


                  //更新所有散点，注意到这里没有enter()和append()
             svgNa.select("#incomenaSvg")
                  .selectAll("rect")
                  .data(dataig6) //重新绑定新数据
                  .transition() //过渡动画
                  .duration(1000) //过渡动画持续时间 1s
                  .ease(d3.easeLinear)

                  .attr("width", function(d){
                      console.log(xScaleig(d.percentage));
                    return xScaleig(d.percentage)-xScaleig(0);
                  })
               /*.each("end",function() {
                d3.select(this)
                .attr("fill", "green")
                .attr("opacity", "0.6");
              });*/
              /*d3.select("#txt_league")
                .style('fill', '#FF7F50')
                .text("Grapefruit");
                d3.select("#txt_description")
                  .text(" Grapefruit");*/


              svgNa.select("#incomenaSvg")
              .selectAll("text")
                  .data(dataig6)
                  .style("fill-opacity", 1)
                  .transition() //过渡动画
                  .duration(1000)
                  .text(function(d,i){
                    return (d.percentage/10).toFixed(2)+"%";
                  })
                  .attr("font-size","11px")
                  .attr("text-anchor","middle")
                  .attr("font-size","11ßpx")
                  .attr("text-anchor","left")
                  .attr("x", function(d,i) {
                    console.log(d.percentage);
                    return xScaleig(d.percentage)+35;
                  });

                  /*-----------income median starts--------*/

                  var secnaMedian = svgNa.select("#incomenaMedian");
                  secnaMedian.select("text")
                            .transition() //过渡动画
                            .duration(1000) //过渡动画持续时间 1s

                           .text("Median Income: $43,605");

                  secnaMedian.select("rect")
                          .transition() //过渡动画
                          .duration(1000) //过渡动画持续时间 1s
                          .ease(d3.easeLinear)
                           .attr("width",medianScale(43605))


                  /*-----------income median ends--------*/
                  /*-----------budget total starts--------*/

                  var secnaMedian = svgNa.select("#budgetnaTotal");
                  secnaMedian.select("text")
                          .transition() //过渡动画
                          .duration(1000) //过渡动画持续时间 1s

                           .text("Annual Total Survival Budget: $52,805");


                  secnaMedian.select("rect")
                  .transition() //过渡动画
                  .duration(1000) //过渡动画持续时间 1s
                  .ease(d3.easeLinear)
                           .attr("width",medianScale(52860))
                  /*-----------budget total ends--------*/
                  /*-----------budget starts--------*/

                  barsig = svgNa.select("#budgetnaSvg")
                  .selectAll("rect")
                  .data(databig6)
                  .transition() //过渡动画
                  .duration(1000) //过渡动画持续时间 1s
                  .ease(d3.easeLinear)

                  .attr("width", function(d){
                    return xScaleBig(d.budget)-xScaleBig(0);
                  });


                  labelig = svgNa.select("#budgetnaSvg")
                  .selectAll("text")
                  .data(databig6)
                  .transition() //过渡动画
                  .duration(1000) //过渡动画持续时间 1s
                  .text(function(d,i){
                    //console.log(i);

                    return ("$"+d.budget);

                  })
                  .attr("x", function(d,i) {
                    return xScaleBig(d.budget)+30;
                  })

                  /*----------------budget ends----------------*/

              });
              /* ------------------ 2012 is clicked-----------------*/
                d3.select("#yna2012")
                .on("click",function() {//selection.on()方法是添加事件监听器的简便方法，接受两个参数：事件类型和监听器（匿名函数）
                  //p标签被单击时执行的任务
                  //新数据集


                  //更新所有散点，注意到这里没有enter()和append()
             svgNa.select("#incomenaSvg")
                  .selectAll("rect")
                  .data(dataig2) //重新绑定新数据
                  .transition() //过渡动画
                  .duration(1000) //过渡动画持续时间 1s
                  .ease(d3.easeLinear)

                  .attr("width", function(d){
                      console.log(xScaleig(d.percentage));
                    return xScaleig(d.percentage)-xScaleig(0);
                  })
               /*.each("end",function() {
                d3.select(this)
                .attr("fill", "green")
                .attr("opacity", "0.6");
              });*/
              /*d3.select("#txt_league")
                .style('fill', '#FF7F50')
                .text("Grapefruit");
                d3.select("#txt_description")
                  .text(" Grapefruit");*/


              svgNa.select("#incomenaSvg")
              .selectAll("text")
                  .data(dataig2)
                  .style("fill-opacity", 1)
                  .transition() //过渡动画
                  .duration(1000)
                  .text(function(d,i){
                    return (d.percentage/10).toFixed(2)+"%";
                  })
                  .attr("font-size","11px")
                  .attr("text-anchor","middle")
                  .attr("font-size","11ßpx")
                  .attr("text-anchor","left")
                  .attr("x", function(d,i) {
                    console.log(d.percentage);
                    return xScaleig(d.percentage)+35;
                  });
                  /*-----------income median starts--------*/

                  var secnaMedian = svgNa.select("#incomenaMedian");
                  secnaMedian.select("text")
                            .transition() //过渡动画
                            .duration(1000) //过渡动画持续时间 1s

                           .text("Median Income: $43,149");

                  secnaMedian.select("rect")
                          .transition() //过渡动画
                          .duration(1000) //过渡动画持续时间 1s
                          .ease(d3.easeLinear)
                           .attr("width",medianScale(43149))


                  /*-----------income median ends--------*/
                  /*-----------budget total starts--------*/

                  var secnaTotal = svgNa.select("#budgetnaTotal");
                  secnaTotal.select("text")
                          .transition() //过渡动画
                          .duration(1000) //过渡动画持续时间 1s

                           .text("Annual Total Survival Budget: $49,756");


                  secnaTotal.select("rect")
                  .transition() //过渡动画
                  .duration(1000) //过渡动画持续时间 1s
                  .ease(d3.easeLinear)
                           .attr("width",medianScale(49756))
                  /*-----------budget total ends--------*/
                  /*-----------budget starts--------*/

                  barsig = svgNa.select("#budgetnaSvg")
                  .selectAll("rect")
                  .data(databig2)
                  .transition() //过渡动画
                  .duration(1000) //过渡动画持续时间 1s
                  .ease(d3.easeLinear)

                  .attr("width", function(d){
                    return xScaleBig(d.budget)-xScaleBig(0);
                  });


                  labelig = svgNa.select("#budgetnaSvg")
                  .selectAll("text")
                  .data(databig2)
                  .transition() //过渡动画
                  .duration(1000) //过渡动画持续时间 1s
                  .text(function(d,i){
                    //console.log(i);

                    return ("$"+d.budget);

                  })
                  .attr("x", function(d,i) {
                    return xScaleBig(d.budget)+30;
                  })

                  /*----------------budget ends----------------*/

              });




                    });
                });


      });
  });
