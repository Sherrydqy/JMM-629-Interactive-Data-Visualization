  var width = 800;
  var height = 600;
  var legendX = 54.71;
  var legendY = 12.12;
  var names=[];
  var curColor;
  var hoverColor = 	"#800080";
  var allpercentages = [];
  var svgChoro = d3.select("#choropleth")
              .append("svg")
              .attr("width", width)
              .attr("height", height);
  d3.csv("./data/choropleth.csv").then(function(alice){
    d3.json("./data/fl.json").then(function(geo){
      //console.log(alice.length);
      for(var i = 0; i<alice.length; i++){
        for(var j = 0; j<geo.features.length; j++){
          if(geo.features[j].properties.GEOID == alice[i].GEOID){
            geo.features[j].properties.household = alice[i].Household;
            geo.features[j].properties.poverty = alice[i].Poverty;
            geo.features[j].properties.alice = alice[i].Alice;
            geo.features[j].properties.abovealice = alice[i].Abovealice;
            geo.features[j].properties.alicepercentage = alice[i].alicepercentage;
            allpercentages[i] = alice[i].alicepercentage;
            names[i] = alice[i].County;
          }
        }
      }
          var tooltipM = d3.select("#tooltipM");
          var projection = d3.geoAlbers()
                             .translate([-400,-400]) //translate(这里面一定是个[]数组对，不然就会d3.min.js:2 Error: <path> attribute d: Expected number, "MNaN,NaNLNaN,NaNL…")
                             .scale(4000);
          var path = d3.geoPath()
                       .projection(projection);
          var colorScale = d3.scaleLinear()
                        .domain(d3.extent(alice,function(d){
                          //d.alicepercentage = parseFloat(d.alicepercentage);
                          return d.alicepercentage;
                        }))
                        .range([d3.rgb(249,249,249),d3.rgb(215,177,96)]);


          var g = svgChoro.append("g")
                          .attr("id", "mapG");
            g.selectAll("path")
             .data(geo.features)
             .enter()
             .append("path")
             .attr("d",path)
             .attr("id",function(d){
               return d.properties.NAME;
             })
             .style("fill", function(d){
               return colorScale(d.properties.alicepercentage);
             })
             .style("stroke",function(d){
               if(d.properties.NAME == "Glades" || d.properties.NAME == "Nassau"){
                 return "purple";
               }
               else{
                 return "white";
               }
             })
             .style("stoke-weight","0.3px")
             .attr("transform", "rotate(5)");
             //console.log(geo.features);
             d3.select("g")
               .selectAll("path")
               .on("mouseover", function (d) {
                   curColor = d3.select(this).style("fill");
                   d3.select(this).style("fill", hoverColor);
                    d3.select("#tooltipM")
                      .style("left", (d3.event.pageX+10)+"px")
                      .style("top", (d3.event.pageY+10)+"px")
                      .select("#name")
                      .text(d3.select(this).attr("id"));
                      var curCounty = d3.select(this).attr("id");
                      var index = names.indexOf(curCounty);
                    //  console.log("index: "+alice[0]);
                    d3.select("#ttalice")
                      .text((alice[index].alicepercentage*100).toFixed(0)+"%");
                    d3.select("#tthouseholds")
                      .text(alice[index].Household);
                    d3.select("#ttpoverty")
                      .text((alice[index].Poverty/alice[index].Household*100).toFixed(0)+"%");
                      d3.select("#ttabovealice")
                        .text((alice[index].Abovealice/alice[index].Household*100).toFixed(0)+"%");
                    d3.select("#tooltipM")
                      .classed("hidden", false);
                })
                .on("mouseout", function () {
                    d3.select(this)
                      .style("fill", curColor);
                    d3.select("#tooltipM")
                      .classed("hidden", true);
                })

            // if (d3.select(this).classed("active")) return;
   /* no need to change class when county is already selected */



          allpercentages = _.orderBy(_.uniq(allpercentages), function(d){
            return d;
          }, "asc");
          //console.log(allp);
          var legends = svgChoro.append("g");
          legends.selectAll("rect")
                 .data(allpercentages)
                 .enter()
                 .append("rect")
                 .attr("x", function(d,i){
                   return i*3+legendX+20;
                 })
                 .attr("y", 50)
                 .attr("width",4)
                 .attr("height", 10)
                 .attr("fill", function(d){
                   return colorScale(d);
                 });
           legends.append("text")
                  .attr("x", legendX+5)
                  .attr("y", 80)
                  .style("font-size",8)
                  .text(d3.min(allpercentages)*100+"");
           legends.append("text")
                  .attr("x", allpercentages.length*3+5+legendX)
                  .attr("y", 80)
                  .style("font-size",8)
                  .text(d3.max(allpercentages)*100+" (%)");








  });
});
