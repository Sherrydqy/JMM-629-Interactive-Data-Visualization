var width = 900;
var height = 300;
var florida = [];
var glades = [];
var nassau = [];
var dates = [];
var unemps = [];
var margin = {
  left:40,
  top: 10,
  right: 40,
  bottom: 10
}
var svgAlice = d3.select("#unemployment")
            .append("svg")
            .attr("width",width)
            .attr("height",height);
var timeParser = d3.timeParse("%y-%b");
var myTimeFormat = d3.timeFormat("%b, %Y");
d3.csv("./data/unemploymentrate.csv").then(function(unemp){

//  console.log(poverty);
  for(var i = 0; i < unemp.length; i++){
    //console.log(poverty[i].year);
        florida[i] = new Object();
        florida[i].date = timeParser(unemp[i].date);
        florida[i].unemp = unemp[i].florida;
        glades[i] = new Object();
        glades[i].date = timeParser(unemp[i].date);
        glades[i].unemp = unemp[i].glades;
        nassau[i] = new Object();
        nassau[i].date = timeParser(unemp[i].date);
        nassau[i].unemp = unemp[i].nassau;
        dates[i] = timeParser(unemp[i].date);
    }
//  console.log(florida);
/*  console.log("nassau: "+nassau);
  console.log("glades: "+glades);*/

  var xScale = d3.scaleTime()
                  .domain(d3.extent(dates))
                  .range([margin.left*2,width-margin.right*2]);//scaleordinal的时候。这里的range就变成了数组，只会映射到数组里面对应的值，而不是映射到数组这个区间
  var yScale = d3.scaleLinear()
                 .domain([0,10])
                 .range([height-margin.bottom,margin.top]);
  var line = d3.line()
               .x(function(d){
                 return xScale(d.date);
               })
               .y(function(d){
                 return yScale(d.unemp);
               })
    var xAxis = d3.axisBottom()
                  .scale(xScale)
                  .ticks(6);
    var textAxis = d3.select(".x-Axis");

    textAxis.selectAll("text")
           .data(dates)
           .enter()
           .text(dates.forEach(function(d,i){
                if(i%6==0){
                  console.log(myTimeFormat(d));
                  return myTimeFormat(d);
                };
              }));

    var yAxis = d3.axisLeft()
                  .scale(yScale);
                  //.ticks(3);

    svgAlice.append("path")
              .datum(florida)
              .attr("class","linefl")
              .attr("d",line);
        console.log(nassau);
    svgAlice.append("path")
              .datum(glades)
              .attr("class","lineglades")
              .attr("d",line);
    svgAlice.append("path")
              .datum(nassau)
              .attr("class","linenassau")
              .attr("d",line);
    svgAlice.append("g")
              .attr("class","x-Axis")
              .attr("transform","translate(0,"+yScale(0)+")")
              .call(xAxis);
              console.log(yScale(0));
    svgAlice.append("g")
              .attr("class","y-Axis")
              .attr("transform","translate("+xScale(d3.min(dates))+",0)")
              .call(yAxis);

})
