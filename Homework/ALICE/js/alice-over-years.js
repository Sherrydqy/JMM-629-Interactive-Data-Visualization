var width = 900;
var height = 300;
var florida = [];
var glades = [];
var nassau = [];
var years = [];
var alices = [];
var margin = {
  left:40,
  top: 10,
  right: 40,
  bottom: 10
}
var svgalice = d3.select("#alice")
            .append("svg")
            .attr("width",width)
            .attr("height",height);

d3.csv("./data/line-poverty-alice.csv").then(function(alice){

//  console.log(poverty);
  for(var i = 0; i < alice.length; i++){
    //console.log(poverty[i].year);
    switch(alice[i].state){
      case "florida":
        florida[i] = new Object();
        florida[i].year = alice[i].year;
        florida[i].alice = alice[i].alice;
        years[i] = alice[i].year;
        //porverties[i] = alice[i].alice;
      break;
      case "nassau":
        nassau[i-3] = new Object();
        nassau[i-3].year = alice[i].year;
        nassau[i-3].alice = alice[i].alice;
        //porverties[i] = alice[i].alice;
      break;
      case "glades":
        glades[i-6] = new Object();
        glades[i-6].year = alice[i].year;
        glades[i-6].alice = alice[i].alice;
        //porverties[i] = alice[i].alice;
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
                 return yScale(d.alice);
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

    svgalice.append("path")
              .datum(florida)
              .attr("class","linefl")
              .attr("d",line);
        console.log(nassau);
    svgalice.append("path")
              .datum(glades)
              .attr("class","lineglades")
              .attr("d",line);
    svgalice.append("path")
              .datum(nassau)
              .attr("class","linenassau")
              .attr("d",line);
    svgalice.append("g")
              .attr("class","x-Axis")
              .attr("transform","translate(0,"+yScale(0)+")")
              .call(xAxis);
              console.log(yScale(0));
    svgalice.append("g")
              .attr("class","y-Axis")
              .attr("transform","translate("+xScale("2012")+",0)")
              .call(yAxis);

})
