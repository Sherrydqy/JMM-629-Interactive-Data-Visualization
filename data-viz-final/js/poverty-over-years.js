var width = 900;
var height = 300;
var florida = [];
var glades = [];
var nassau = [];
var years = [];
var poverties = [];
var margin = {
  left:40,
  top: 80,
  right: 40,
  bottom: 80
}

var svgPoverty = d3.select("#poverty")
            .append("svg")
            .attr("width",width)
            .attr("height",height);
          
d3.csv("./data/line-poverty-alice.csv").then(function(poverty){

//  console.log(poverty);
  for(var i = 0; i < poverty.length; i++){
    //console.log(poverty[i].year);
    switch(poverty[i].state){
      case "florida":
        florida[i] = new Object();
        florida[i].year = poverty[i].year;
        florida[i].poverty = poverty[i].poverty;
        years[i] = poverty[i].year;
        //porverties[i] = poverty[i].poverty;
      break;
      case "nassau":
        nassau[i-3] = new Object();
        nassau[i-3].year = poverty[i].year;
        nassau[i-3].poverty = poverty[i].poverty;
        //porverties[i] = poverty[i].poverty;
      break;
      case "glades":
        glades[i-6] = new Object();
        glades[i-6].year = poverty[i].year;
        glades[i-6].poverty = poverty[i].poverty;
        //porverties[i] = poverty[i].poverty;
      break;
    }
  }
  console.log(florida);
/*  console.log("nassau: "+nassau);
  console.log("glades: "+glades);*/

  var xScale = d3.scaleOrdinal()
                  .domain(years)
                  .range([margin.left, margin.left+(width-margin.left)/2,width-margin.right]);//scaleordinal的时候。这里的range就变成了数组，只会映射到数组里面对应的值，而不是映射到数组这个区间
  var yScale = d3.scaleLinear()
                 .domain([0,50])
                 .range([height-margin.bottom,margin.top]);
  var line = d3.line()
               .x(function(d){
                 return xScale(d.year);
               })
               .y(function(d){
                 return yScale(d.poverty);
               })
    var xAxis = d3.axisBottom()
                  .scale(xScale)
                  .ticks(3)
                  .tickFormat(years.forEach(function(d,i){
                    return d;
                  }));
    var yAxis = d3.axisLeft()
                  .scale(yScale);
                  //.ticks(3);

    svgPoverty.append("path")
              .datum(florida)
              .attr("class","linefl")
              .attr("d",line);
        console.log(nassau);
    svgPoverty.append("path")
              .datum(glades)
              .attr("class","lineglades")
              .attr("d",line);
    svgPoverty.append("path")
              .datum(nassau)
              .attr("class","linenassau")
              .attr("d",line);
    svgPoverty.append("g")
              .attr("class","x-Axis")
              .attr("transform","translate(0,"+yScale(0)+")")
              .call(xAxis);
              console.log(yScale(0));
    svgPoverty.append("g")
              .attr("class","y-Axis")
              .attr("transform","translate("+xScale("2012")+",0)")
              .call(yAxis);

})
