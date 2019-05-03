var width;
var heightig = 900;
var glades = [];
var g;
var barWidthig = 15;
var flagig = 0;
var dataig2012=[];
var dataig2016=[];
var moneyig = [];
var pig2 = [];
var pig6 = [];
var intervalig=20;
var svgIG, xScaleig,yScaleig,yMaxig,yValueScaleig,barsig, lablesig,xAxisig,yAxisig;
var margin = {
  left:50,
  top: 50,
  right: 50,
  bottom: 50
}
width = window.innerWidth- margin.left - margin.right;
var svgIG = d3.select("#income-glades")
            .append("svgIG")
            .attr("width",width)
            .attr("height",heightig);

//height = parseInt(window.innerHeight) - margin.top - margin.bottom;
d3.csv("./data/2012-income-glades.csv").then(function(dataig2){
  d3.csv("./data/2016-income-glades.csv").then(function(dataig6){
    for(var i = 0; i<dataig2.length;i++){
      moneyig[i] = dataig2[i].money
      pig2[i] = dataig2[i].percentage;
      pig6[i] = dataig6[i].percentage
    }

              //myDataC = _.orderBy(_.groupBy(data, 'league').C,'pct', 'desc');
              //myDataG = _.orderBy(_.groupBy(data, 'league').G, 'pct', 'desc');
              //d3.select("#txt_league")
              //  .style('fill', '#228B22');
              //console.log(myDataC);
              /*myDataC.forEach(function(d,i){
                console.log(d.abbr);
                myTeamC[i]=d.abbr;
              })
              myDataG.forEach(function(d,i){
                myTeamG[i]=d.abbr;
              })*/
              //console.log(myDataG);
              interval = width/16.3;
              /*myData = myDataC;
              myTeam = myTeamC;*/
              console.log(dataig2);
              var xMax1 = d3.max(pig2);
              var xMax2 = d3.max(pig6);
              xMaxig = (xMax1>xMax2)?xMax1:xMax2;
              console.log("max: "+ xMaxig);
              xScaleig = d3.scaleLinear()
              .domain([0,xMaxig])
              .range([margin.left*2,width-margin.right]);
              console.log("bar开始："+xScaleig(0));
              yScaleig = d3.scaleOrdinal()
              .domain(moneyig)
              .range([0,heightig-margin.top*2]);

              barsig = svgIG.selectAll("rect")
              .data(dataig6)
              .enter()
              .append("rect")
              .attr("x", 100)
              /*.attr("x", function(d,i){
                return  xScale(0);
              })*/
              .attr("y", function(d,i){
                return barWidthig+intervalig*i;

              })
              /*.attr("height", barWidthig)
              .attr("width", function(d){
                //  console.log(height-yScale(d.pct*100))
                return xScaleig(d.percentage);
              })*/
              .attr("height", 30)
              .attr("width",200)
              .attr("fill", "#2E8B57")
              .attr("opacity", "0.6");

              labelig = svgIG.selectAll("text")
              .data(dataig2)
              .enter()
              .append("text")
              .attr("class", "labels")
              .text(function(d,i){
                //console.log(i);

                return parseInt(d.percentage*100)+"%";

              })
              .attr("font-size","11px")
              .attr("text-anchor","middle")
              .attr("x", function(d,i) {
                return xScaleig(d.percentage)+30;
              })
              .attr("y", function(d,i) {

                return barWidthig+intervalig*i;
              });
              /*xAxis = d3.axisBottom()
              .scale(xScale)

              .ticks(myData.length)
              .tickSize(5)
              .tickPadding(interval+barWidth)
              .tickFormat(function(d,i){

                return myTeam[i];
              });*/




            /*  yAxis = d3.axisLeft()
              .scale(yScale);
              svgIG.append("g")
              .attr("class", "x-axis")
              .attr("transform","translate("+margin.left+","+(height-margin.bottom)+")")
              .call(xAxis)
              .selectAll("text")
              .attr("x", interval)
              .attr("y",10);*/

            /*  svgIG.append("g")
              .attr("x", margin.left*3)
              .attr("transform","translate("+margin.left+","+margin.top/2+")")
              .call(yAxis);

            });
            /* ------------------ Grapefruit is clicked-----------------
            删d3.select("#btn_g")
            .on("click",function() {//selection.on()方法是添加事件监听器的简便方法，接受两个参数：事件类型和监听器（匿名函数）
              //p标签被单击时执行的任务
              //新数据集


              //更新所有散点，注意到这里没有enter()和append()
              svgIG.selectAll("rect")
              .data(myDataG) //重新绑定新数据
              .transition() //过渡动画
              .duration(1000) //过渡动画持续时间 1s
              .ease(d3.easeLinear)
              /*.each("start",function(){//过渡开始
              d3.select(this)
              .attr("fill","magenta")//改变颜色

            })*/

          /*删  .attr("y", function(d,i){
              return height-yValueScale(d.pct*100)-margin.bottom;

            })
            .attr("height", function(d){
              //  console.log(height-yScale(d.pct*100))
              return yValueScale(d.pct*100);
            })
            /*.each("end",function() {
            d3.select(this)
            .attr("fill", "green")
            .attr("opacity", "0.6");
            });*/
            /*删d3.select("#txt_league")
            .style('fill', '#FF7F50')
            .text("Grapefruit");
            d3.select("#txt_description")
              .text(" Grapefruit");
              svgIG.selectAll("rect")
                 .attr("fill", "#FF6344");
            svgIG.selectAll(".labels")
              .data(myDataG)
              .style("fill-opacity", 1)
              .transition() //过渡动画
              .duration(1000)
              .text(function(d,i){
                //console.log(i);

                return parseInt(d.pct*1000)/10+"%";

              })
              .attr("font-size","11px")
              .attr("text-anchor","middle")
              .attr("x", function(d,i) {
                return (i+1)*interval+margin.left;
              })
              .attr("y", function(d) {

                return height-margin.bottom-10-yValueScale(d.pct*100);
              });
              var xGAxis = d3.axisBottom()
              .scale(xScale)

            .ticks(myData.length)
            .tickSize(5)
            .tickPadding(interval+barWidth)
            .tickFormat(function(d,i){

            return myTeamG[i];
            });

            svgIG.select('.x-axis')//选择数轴
            .transition()//初始化一个过渡
            .duration(1000)//设定过渡的持续时间
            .call(xGAxis)
            .selectAll("text")
            .attr("x", interval)
            .attr("y",10);
            //调用适当的数轴生成器
            //更新y轴


            });


            /* ------------------ Cactus is clicked-----------------*/

            /*d3.select("#btn_c")
            .on("click",function() {

            //更新所有散点，注意到这里没有enter()和append()
            svgIG.selectAll("rect")
            .data(myDataC) //重新绑定新数据
            .transition() //过渡动画
            .duration(1000) //过渡动画持续时间 1s
            .attr("y", function(d,i){
              return height-yValueScale(d.pct*100)-margin.bottom;

            })
            .attr("height", function(d){
            //  console.log(height-yScale(d.pct*100))
              return yValueScale(d.pct*100);
            });
            d3.select("#txt_league")
              .style('fill', 'darkGreen')
              .text("Cactus");
            d3.select("#txt_description")
              .text(" Cactus");
              svgIG.selectAll("rect")
                 .attr("fill", "	#2E8B57");
            svgIG.selectAll(".labels")

            .data(myDataC)

            .style("fill-opacity", 1)
            .transition() //过渡动画
            .duration(1000)
            .text(function(d,i){
            //console.log(i);

            return parseInt(d.pct*1000)/10+"%";

            })
            .attr("font-size","11px")
            .attr("text-anchor","middle")
            .attr("x", function(d,i) {
            return (i+1)*interval+margin.left;
            })
            .attr("y", function(d) {

            return height-margin.bottom-10-yValueScale(d.pct*100);
            });
            var xCAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(myDataC.length)
            .tickSize(5)
            .tickPadding(interval+barWidth)
            .tickFormat(function(d,i){

            return myTeamC[i];
            });

            svgIG.select('.x-axis')//选择数轴
            .transition()//初始化一个过渡
            .duration(1000)//设定过渡的持续时间
            .call(xCAxis)
            .selectAll("text")
            .attr("x", interval)
            .attr("y",10);*/
            //调用适当的数轴生成器
            //更新y轴


      });
  });
