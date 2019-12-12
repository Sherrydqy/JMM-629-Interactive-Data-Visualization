var svgMan = document.getElementById("man");
var svgDesert = document.getElementById("desert");
var svgOasis = document.getElementById("oasis");
var svgLeavesBg = document.getElementById("leaveBg");
var svgAging = document.getElementById('aging');
var svgIncome = document.getElementById("risingIncome");
var svgMarket = document.getElementById("market");
var svgEnergy = document.getElementById("energy");
var svgInfrastructure = document.getElementById('infrastructure');
var svgConstruction = document.getElementById('construction');
var svgTech = document.getElementById('tech');
var secBgLeaves = document.getElementById('secBgLeaves');
var introBgLeaves = document.getElementById('introBgLeaves');
var originalColor;
svgMan.style.marginLeft="47.5%";
svgMan.style.marginTop="1%";
var myJob = "I haven't selected my job.";
var myJobId = 0;
var myCat="Production";
var myCatId=0;
var categorieGroups, totalCategories, catHistoryGroups;
var categories = [];
var catHistory = [];
var svg, svgStack;
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var avgAPByCat = [];
var sum = 0;
var flag = 0;
var prevH;
var count = 0;
var manJobXPos, manJobYPos;
var xScaleJob, xAxisJob, yScaleJobCat, yScaleJobLine, yScaleJobAvg, xScaleStack, yScaleStack;






/*---------- Reading AP Data Starts-------*/
d3.csv("../data/AP.csv").then(function(data){
  console.log(data);
  data.forEach(function(d){
    d3.select("#jobDropDown")
      .append("option")
      .attr("value",d.id)
      .text(d.Categories+": "+d.Job);
  })
  categorieGroups = _.groupBy(data, "Categories");
  console.log(categorieGroups);
  totalCategories = categories.length;

  svg = d3.select("#viz");
  var i = 0;
  var j=0;
  // get all the job categories
  for (var key in categorieGroups){
    categories.push(key);
  }
  // get the mean of each category
  for (var key in categorieGroups){
  //  console.log("avg: "+key);
      sum = 0;
    for (var k = 0; k< categorieGroups[key].length; k++){
      sum += parseFloat(categorieGroups[key][k].AP);
    }
    avgAPByCat[avgAPByCat.length] = {"cat": key, "avgAp":sum/categorieGroups[key].length};
//    console.log("avg: "+sum);
  }


  //console.log(document.getElementById("viz").clientWidth);
  xScaleJob = d3.scaleLinear()
                .domain([0,100])
                .range([document.getElementById("viz").clientWidth*0.18,document.getElementById("viz").clientWidth*0.93]);
  xAxisJob = d3.axisTop()
               .scale(xScaleJob)
               .ticks(10);
  yScaleJobCat = d3.scaleBand()
                   .domain(categories)
                   .range([40, 607]);
  yScaleJobLine = d3.scaleBand()
                    .domain(categories)
                    .range([100, 700.5]);
  yScaleJobAvg = d3.scaleBand()
                   .domain(categories)
                   .range([90, 690.5]);
  svg.append("g")
      .attr("id","JobxAxis")
      .attr("class","xAxis")
      .call(xAxisJob);

  svg.append("g")
     .attr("id","apAvgs")
     .selectAll("rect")
     .data(avgAPByCat)
     .enter()
     .append("rect")
     .attr("id",function(d){
       return ("apAvg-"+d.cat);
     })
     .attr("class","apAvgs")
     .attr("x", function(d){
       //console.log(d.avgAp);
       return xScaleJob((d.avgAp*100).toFixed(2));
     })
     .attr("y", function(d){
       return yScaleJobAvg(d.cat);
     })
     .attr("width", 5)
     .attr("height",10)
     .attr("fill", "red");

  svg.append("g")
      .attr("class","apDots")
     .selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function(d){
         return xScaleJob(parseFloat(d.AP)*100);
     })
     .attr("cy", function(d){
         return yScaleJobAvg(d.Categories)+10;
     })
     .attr("r",function(d){
        return 4;
     })
     .attr("fill", function(d){
        return "#EFC183";
     })
     .attr("opacity", function(d){
        return 0.4;
     });


//  console.log(categorieGroups);
  categories.forEach(function(d){
  //  console.log(d);
    svg.append("g")
        .attr("id","Job-data-"+i)
        .attr("class","JobLine")
        .selectAll("text")
        .data("d") //如果只想append一个字符串的话，data函数会把不论什么形式的参数都视为数组，所以会认为这数据集的长度为这个字符串的长度，会按照zhege
                  //字符串的长度来重复写text(d)
        .enter()
        .append("text")
        .attr("x",5+"%")
        .attr("y",(i+1)*27+80)
        .style("font-size",12+"px")
        .style("font-family","Arial")
        .style("fill", "white")
        .text(d);
  svg.selectAll(".JobLine")
      .selectAll("line")
      .attr("class","JobLine")
      .data("d")
      .enter()
      .append("line")
      .attr("id","Job-line-"+i)
      .attr("stroke","white")
      .attr("stroke-width", "0.5px")
      .attr("x1", "18%")
      .attr("y1",yScaleJobLine(d))
      .attr("x2", "93%")
      .attr("y2",yScaleJobLine(d));
  i++;
    });
});
/*---------- Reading AP Data Ends-------*/

/*---------- Reading History Data Starts-------*/
d3.csv("../data/UMHistory.csv").then(function(data){
  console.log(data);
  xScaleStack = d3.scaleLinear()
                  .domain([1950, 2010])
                  .range([document.getElementById("viz").clientWidth*0.18,document.getElementById("viz").clientWidth*0.93]);


  yScaleStack = d3.scaleLinear()
                  .domain([160000,0])
                  .range([100,windowHeight-170]);

  svgStack = d3.select("#vizSta");

  xAxisHistory = d3.axisBottom()
                   .scale(xScaleStack)
                   .tickFormat(function(d){
                     return d.toString();
                   });;

  yAxisHistory = d3.axisLeft()
                   .scale(yScaleStack);

   svgStack.append("g")
           .attr("id","historyXAxis")
           .attr("class","xAxis")
           .attr("transform","translate(3,"+(windowHeight-150)+")")
           .call(xAxisHistory);
    svgStack.append("g")
            .attr("id","historyYAxis")
            .attr("class","yAxis")
            //.attr("transform","translate(140,"+(yScaleStack(160000))+")")
            .attr("transform","translate(140,0)")
            .call(yAxisHistory);
    svgStack.append("g")
            .attr("id","allRects");
  for(var k = 0; k<data.length; k++){

    prevH = 0;

    for(var key in data[k]){

      if(key != "Year"){

        svgStack.select("#allRects")
                .append("rect")
                .attr("width",7)
                .attr("height", function(d){
                  //console.log("last: "+yScaleStack(prevH+data[k].key));
                  //console.log("now: "+yScaleStack(prevH));
                  //console.log(data[k][key]);
                  prevH+=data[k][key]/160000*(windowHeight-320);
                  return data[k][key]/160000*(windowHeight-320);
                })
                .attr("id",data[k].Year+"-"+key+"-"+data[k][key])
                .attr("class",function(d){
                  if (key == "Agriculture" || key=="Manufacturing"||key=="Mining"){
                    console.log("reduced: "+key);
                    return "historyReduced";
                  }
                  else{
                    console.log("rised: "+key);
                    return "historyRised";
                  }
                })
                .attr("x", function(d){
                  return xScaleStack(parseInt(data[k].Year));
                })
                .attr("y", function(d){
                //  prevH+=yScaleStack(parseFloat(data[k][key]));
                //  return prevH-yScaleStack(parseFloat(data[k][key]));
                return yScaleStack(0)-prevH;
                })
                .attr("fill","rgb(0,0,0,0)")
                .attr("stroke","gray")
                .on("mouseover", function(d){
                  var thisId = d3.select(this)
                                 .attr("id");
                 originalColor = d3.select(this).style("fill");
                  console.log("color: "+originalColor)
                  d3.select(this).style("fill","white");
                  d3.select("#tooltipHistory")
                    .style("left", (d3.event.pageX+10)+"px")
                    .style("top", (d3.event.pageY+10)+"px")
                    .select("#historyCat")
                    .text(thisId.split("-")[1]);
                  //  console.log("tooltip: "+d3.event.pageX+10+" Top: "+d3.event.pageY+10)
                  d3.select("#historyYear")
                    .text(thisId.split("-")[0]);
                  d3.select("#historyEmploy")
                    .text(thisId.split("-")[2]);
                  d3.select("#tooltipHistory")
                    .classed("hidden", false);
                })
                .on("mouseout",function(d){
                  d3.select(this).style("fill",originalColor);
                  d3.select("#tooltipHistory")
                    .classed("hidden", true);
                });


        }

      }
    }



});
/*---------- Reading History Data Ends-------*/
/*---------- Reading Leaves Data Ends-------*/
d3.csv("../data/JobIncrease.csv").then(function(data){

})
/*---------- Reading Leaves Data Ends-------*/


function changeMyJob(){
  myJobId = document.getElementById("jobDropDown").selectedIndex-1;
  if(myJobId){
    myJob = document.getElementById("jobDropDown").options[myJobId].text;
  }
  //console.log(myJobId+": "+myJob);
  d3.csv("../data/AP.csv").then(function(data){
    document.getElementById("data-ap").innerHTML = (data[myJobId].AP*100).toFixed(2)+"%"
    if(myJobId!=0){

      console.log("jobid: "+avgAPByCat[0].cat);
    //  console.log("job title: "+data[myJobId].Job);
      manJobXPos = ((xScaleJob(data[myJobId].AP*100))+document.getElementById("container").clientWidth)/windowWidth*100;
      manJobYPos = (yScaleJobAvg(data[myJobId].Categories)/windowHeight)*100;
    console.log(avgAPByCat[0].avgAp);

    for(var p=0; p<avgAPByCat.length; p++){
      if (avgAPByCat[p].cat == data[myJobId].Categories){
        document.getElementById("myCat").innerHTML = avgAPByCat[p].cat;
        myCat = avgAPByCat[p].cat;
        console.log('我的工种：'+myCat);
        myCatId = p;
        flag = 1;
        document.getElementById("myCatAvg").innerHTML = (avgAPByCat[p].avgAp*100).toFixed(2)+"%";
        console.log(avgAPByCat[p].key+": "+(parseFloat(avgAPByCat[p].avgAp)*100).toFixed(2));
      }
    }

      document.getElementById("rect-Auto").style.width = data[myJobId].AP*100+"%";
      document.getElementById("rect-NonAuto").style.width = (1-data[myJobId].AP)*100+"%";
      document.getElementById("data-Auto").style.width = data[myJobId].AP*100+"%";
      document.getElementById("data-NonAuto").style.width = (1-data[myJobId].AP)*100+"%";
      document.getElementById("data-Auto").innerHTML = (data[myJobId].AP*100).toFixed(2)+"% Automation&nbsp&nbsp&nbsp";
      document.getElementById("data-NonAuto").innerHTML = "&nbsp&nbsp&nbsp"+((1-data[myJobId].AP)*100).toFixed(2)+"% Non-Automation";    }

      svg.append("g")
         .append("svg:image")
         .attr("xlink:href","../assets/man.svg")
         .attr("x", function(d){
           console.log("thithithi: "+data[myJobId].Job);
               return xScaleJob(parseFloat(data[myJobId].AP)*100);
         })
         .attr("y", function(d){
               return yScaleJobAvg(data[myJobId].Categories)-15;
         })
         .attr("width",12)
         .attr("height",30)
         .attr("fill","white")
         .attr("visibility", "visible")
         .attr("opacity", 1);

         /*svg.append("g")
            .append("circle")
            .attr("cx", function(d){
              console.log("thithithi: "+data[myJobId].Job);
                  return xScaleJob(parseFloat(data[myJobId].AP)*100);
            })
            .attr("cy", function(d){
                  return yScaleJobAvg(data[myJobId].Categories);
            })
            .attr("r",6)
            .attr("fill","white")
            .attr("opacity", 1);*/
  });
}

let intro = () =>{
    svgMan.style.marginTop="1%";
    svgMan.style.marginLeft="47.5%";
    svgMan.style.height = "10.5%";
    svgMan.style.width = "4%";
    document.getElementById("tc1").style.visibility="visible";
    document.getElementById("tc1").style.opacity = 1;
    document.getElementById("tc2").style.visibility="hidden";
    document.getElementById("tc2").style.opacity=0;
    secBgLeaves.style.visibility="hidden";
    secBgLeaves.style.opacity=0;
    if(flag == 1){
      document.getElementById("Job-line-"+myCatId).style.visibility="hidden";
      document.getElementById("Job-line-"+myCatId).style.opacity=0;
      document.getElementById("Job-data-"+myCatId).style.visibility="hidden";
      document.getElementById("Job-data-"+myCatId).style.opacity=0;
      document.getElementById("apAvg-"+myCat).style.visibility="hidden";
      document.getElementById("apAvg-"+myCat).style.opacity=0;
    }

    }

let secYourJob = () =>{
  svgMan.style.marginTop="75%";
  svgMan.style.marginLeft="47.5%";
  svgMan.style.height = "10.5%";
  svgMan.style.width = "4%";
  svgMan.style.visibility = "visible";
  svgMan.style.opacity ="1";
  secBgLeaves.style.visibility="visible";
  secBgLeaves.style.opacity=1;
  introBgLeaves.style.visibility="hidden";
  introBgLeaves.style.opacity=0;
  document.getElementById("tc1").style.visibility="hidden";
  document.getElementById("tc1").style.opacity="0";
  document.getElementById("tc2").style.visibility="visible";
  document.getElementById("tc2").style.opacity="1.0";
  document.getElementById("fixed").style.visibility="hidden"
  document.getElementById("fixed").style.opacity=0;
  document.getElementById("container").style.visibility="hidden";
  document.getElementById("container").style.opacity=0;
  document.getElementById("fixedStack").style.visibility="hidden";
  document.getElementById("fixedStack").style.opacity=0;
  document.getElementById("containerStack").style.visibility="hidden";
  document.getElementById("containerStack").style.opacity=0;
  if (flag ==1 ){
    document.getElementById("Job-line-"+myCatId).style.visibility="hidden";
    document.getElementById("Job-line-"+myCatId).style.opacity=0;
    document.getElementById("Job-data-"+myCatId).style.visibility="hidden";
    document.getElementById("Job-data-"+myCatId).style.opacity=0;
    document.getElementById("apAvg-"+myCat).style.visibility="hidden";
    document.getElementById("apAvg-"+myCat).style.opacity=0;
  }



}
let fjob =() =>{
  //var manTempYPos = svgMan.style.marginTop.substr(0,svgMan.style.marginTop.length-1);
  //svgMan.style.position = "fixed"
  //svgMan.style.marginLeft = manJobXPos+"%";
  //svgMan.style.marginTop = "110%";
  secBgLeaves.style.visibility="hidden";
  secBgLeaves.style.opacity=0;
  svgMan.style.visibility = "hidden";
  svgMan.style.opacity = 0;
  document.getElementById("container").style.visibility="visible";
  document.getElementById("container").style.opacity=1;
  document.getElementById("fixed").style.visibility="visible";
  document.getElementById("fixed").style.opacity = 1;
  document.getElementById("fixedStack").style.visibility="visible";
  document.getElementById("fixedStack").style.opacity=fixed;
  document.getElementById("containerStack").style.visibility="visible";
  document.getElementById("containerStack").style.opacity=1;

  if (flag == 1)
{
  console.log("flag: "+flag);
  $('.JobLine').css("visibility","hidden");
  $('.JobLine').css("opacity","0");
  $('.apAvgs').css("visibility","hidden");
  $('.apAvgs').css("opacity","0");
  d3.select("#Job-data-"+myCatId).select("#Job-line-"+myCatId)
    .style("visibility","visible")
    .style("opacity","1");

    document.getElementById("Job-data-"+myCatId).style.visibility="visible";
    document.getElementById("Job-data-"+myCatId).style.opacity=1;
    document.getElementById("apAvg-"+myCat).style.visibility="visible";
    document.getElementById("apAvg-"+myCat).style.opacity=1;

}
}

let fdiv2 =() =>{

  $('.JobLine').css("visibility","visible");
  $('.JobLine').css("opacity","1");
  $('.apAvgs').css("visibility","visible");
  $('.apAvgs').css("opacity","1");
  $('.apDots').css("visibility","hidden");
  $('.apDots').css("opacity","0");
}
let fdiv3 =() =>{
  $('.apDots').css("visibility","visible");
  $('.apDots').css("opacity","1");
}

let tc3 =() =>{
  svgMan.style.marginTop = "320%";
  svgMan.style.visibility = "visible";
  svgMan.style.opacity = 1;
  document.getElementById("tc3").style.visibility = "visible";
  document.getElementById("tc3").style.opacity=1;
  document.getElementById("fixed").style.visibility="hidden"
  document.getElementById("fixed").style.opacity=0;
  document.getElementById("fixedStack").style.visibility="hidden";
  document.getElementById("fixedStack").style.opacity=0;
  document.getElementById("container").style.visibility="visible";
  document.getElementById("container").style.opacity=1;
}

let fdiv1Sta =() =>{
  svgMan.style.visibility = "hidden";
  svgMan.style.opacity = 0;
  document.getElementById("tc3").style.visibility = "hidden";
  document.getElementById("tc3").style.opacity = 0;
  document.getElementById("fixedStack").style.visibility="visible";
  document.getElementById("fixedStack").style.opacity = 1;
  document.getElementById("containerStack").style.visibility="visible";
  document.getElementById("containerStack").style.opacity = 1;
  $('.historyRised').css("fill","rgb(11,110,198,0)");
  $('.historyReduced').css("fill","rgb(218,142,76,0)");
}
let fdiv2Sta =() =>{
  $('.historyRised').css("fill","rgb(11,110,198,0)");
  $('.historyReduced').css("fill","rgb(218,142,76,0.8)");
}
let fdiv3Sta =() =>{
  $('.historyRised').css("fill","rgb(11,110,198,0.8)");
  $('.historyReduced').css("fill","rgb(218,142,76,0)");
  svgMan.style.visibility = "hidden";
  svgMan.style.opacity=0;
  svgMan.style.marginTop = "320%";
  svgMan.style.position = "absolute";
  svgDesert.style.visibility = "hidden";
  svgDesert.style.opacity=0;
  document.getElementById("fixedStack").style.visibility="visible";
  document.getElementById("fixedStack").style.opacity=1;
}

let tc4 =() =>{
  svgMan.style.marginTop = "20%";
  svgMan.style.position = "fixed";
  svgMan.style.visibility= "visible";
  svgMan.style.opacity=1;
  svgDesert.style.visibility = "visible";
  svgDesert.style.opacity=1;
  svgOasis.style.visibility = "hidden";
  svgOasis.style.opacity=0;
  svgOasis.style.width = "0%";
  document.getElementById("tc4").style.visibility = "visible";
  document.getElementById("tc4").style.opacity=1;
  document.getElementById("fixed").style.visibility="hidden";
  document.getElementById("fixed").style.opacity=0;
  document.getElementById("fixedStack").style.visibility="hidden";
  document.getElementById("fixedStack").style.opacity=0;
  document.getElementById("containerStack").style.visibility="hidden";
  document.getElementById("containerStack").style.opacity=0;
  document.getElementById("fixedLeaves").style.visibility="hidden";
  document.getElementById("fixedLeaves").style.opacity=0;
  document.getElementById("containerLeaves").style.visibility="hidden";
  document.getElementById("containerLeaves").style.opacity=0;
}

let tc5 =() =>{
  svgOasis.style.visibility = "visible";
  svgOasis.style.opacity=1;
  svgDesert.style.visibility = "visible";
  svgDesert.style.opacity=1;
  //svgOasis.style.width = "100%";
  document.getElementById("tc5").style.visibility = "visible";
  document.getElementById("tc5").style.opacity = "1";
  document.getElementById("fixedLeaves").style.visibility="hidden";
  document.getElementById("fixedLeaves").style.opacity=0;
  document.getElementById("containerLeaves").style.visibility="hidden";
  document.getElementById("containerLeaves").style.opacity=0;
  document.getElementById("risingIncome").style.visibility="hidden";
  document.getElementById("risingIncome").style.opacity=0;
  document.getElementById("tech").style.visibility="hidden";
  document.getElementById("tech").style.opacity=0;
  document.getElementById("aging").style.visibility="hidden";
  document.getElementById("aging").style.opacity=0;
  document.getElementById("market").style.visibility="hidden";
  document.getElementById("market").style.opacity=0;
  document.getElementById("construction").style.visibility="hidden";
  document.getElementById("construction").style.opacity=0;
  document.getElementById("infrastructure").style.visibility="hidden";
  document.getElementById("infrastructure").style.opacity=0;
  document.getElementById("energy").style.visibility="hidden";
  document.getElementById("energy").style.opacity=0;
  leaveBg.style.visibility="hidden";
  leaveBg.style.opacity=0;
}

let fdiv1Leaves =() =>{
  svgOasis.style.visibility = "hidden";
  svgOasis.style.opacity=0;
  svgDesert.style.visibility = "hidden";
  svgDesert.style.opacity=0;
  svgMan.style.visibility = "hidden";
  svgMan.style.opacity=0;
  leaveBg.style.visibility="visible";
  leaveBg.style.opacity=1;
  document.getElementById("tc5").style.visibility = "hidden";
  document.getElementById("tc5").style.opacity=0;
  document.getElementById("fixedLeaves").style.visibility="visible";
  document.getElementById("fixedLeaves").style.opacity=1;
  document.getElementById("containerLeaves").style.visibility="visible";
  document.getElementById("containerLeaves").style.opacity=1;
  document.getElementById("risingIncome").style.visibility="visible";
  document.getElementById("risingIncome").style.opacity=0.2;
  document.getElementById("construction").style.visibility="visible";
  document.getElementById("construction").style.opacity=0.2;
  document.getElementById("infrastructure").style.visibility="visible";
  document.getElementById("infrastructure").style.opacity=0.2;
  document.getElementById("aging").style.visibility="visible";
  document.getElementById("aging").style.opacity=0.2;
  document.getElementById("market").style.visibility="visible";
  document.getElementById("market").style.opacity=0.2;
  document.getElementById("tech").style.visibility="visible";
  document.getElementById("tech").style.opacity=0.2;
  document.getElementById("energy").style.visibility="visible";
  document.getElementById("energy").style.opacity=0.2;
}

let fdiv2Leaves =() =>{
  svgOasis.style.visibility = "hidden";
  svgOasis.style.opacity=0;
  svgDesert.style.visibility = "hidden";
  svgDesert.style.opacity=0;
  svgMan.style.visibility = "hidden";
  svgMan.style.opacity=0;
  document.getElementById("risingIncome").style.opacity=0.2;
  document.getElementById("tc5").style.visibility = "hidden";
  document.getElementById("tc5").style.opacity=0;
  document.getElementById("fixedLeaves").style.visibility="visible";
  document.getElementById("fixedLeaves").style.opacity=1;
  document.getElementById("containerLeaves").style.visibility="visible";
  document.getElementById("containerLeaves").style.opacity=1;
  document.getElementById("risingIncome").style.opacity=1.0;
  document.getElementById("construction").style.opacity=0.2;
  document.getElementById("infrastructure").style.opacity=0.2;
  document.getElementById("aging").style.opacity=0.2;
  document.getElementById("market").style.opacity=0.2;
  document.getElementById("tech").style.opacity=0.2;
  document.getElementById("energy").style.opacity=0.2;
}
let fdiv3Leaves =() =>{
  svgOasis.style.visibility = "hidden";
  svgOasis.style.opacity=0;
  svgDesert.style.visibility = "hidden";
  svgDesert.style.opacity=0;
  svgMan.style.visibility = "hidden";
  svgMan.style.opacity=0;
  document.getElementById("tech").style.opacity=0.2;
  document.getElementById("aging").style.opacity=0.2;
  document.getElementById("aging").style.opacity=0.2;
  document.getElementById("tc5").style.visibility = "hidden";
  document.getElementById("tc5").style.opacity=0;
  document.getElementById("fixedLeaves").style.visibility="visible";
  document.getElementById("fixedLeaves").style.opacity=1;
  document.getElementById("containerLeaves").style.visibility="visible";
  document.getElementById("containerLeaves").style.opacity=1;
  document.getElementById("risingIncome").style.opacity=0.2;
  document.getElementById("construction").style.opacity=0.2;
  document.getElementById("infrastructure").style.opacity=0.2;
  document.getElementById("aging").style.opacity=1;
  document.getElementById("market").style.opacity=1;
  document.getElementById("tech").style.opacity=1;
  document.getElementById("energy").style.opacity=0.2;
}

let fdiv4Leaves =() =>{
  svgOasis.style.visibility = "hidden";
  svgOasis.style.opacity=0;
  svgDesert.style.visibility = "hidden";
  svgDesert.style.opacity=0;
  svgMan.style.visibility = "hidden";
  svgMan.style.opacity=0;
  document.getElementById("tech").style.opacity=0.2;
  document.getElementById("aging").style.opacity=0.2;
  document.getElementById("aging").style.opacity=0.2;
  document.getElementById("tc5").style.visibility = "hidden";
  document.getElementById("tc5").style.opacity=0;
  document.getElementById("fixedLeaves").style.visibility="visible";
  document.getElementById("fixedLeaves").style.opacity=1;
  document.getElementById("containerLeaves").style.visibility="visible";
  document.getElementById("containerLeaves").style.opacity=1;
  document.getElementById("risingIncome").style.opacity=0.2;
  document.getElementById("construction").style.opacity=1;
  document.getElementById("infrastructure").style.opacity=1;
  document.getElementById("aging").style.opacity=0.2;
  document.getElementById("market").style.opacity=0.2;
  document.getElementById("tech").style.opacity=0.2;
  document.getElementById("energy").style.opacity=1;
}

//waypoints scroll constructor
function scroll(n, offset, func1, func2){
  //if(myJob!=null){
    return new Waypoint({
      element: document.getElementById(n),
        handler: function(direction) {
          direction == 'down' ? func1() : func2();
        },
        //start 75% from the top of the div
        offset: offset
      });
  //}

  };



//triger these functions on page scroll
new scroll('tc2', '70%', secYourJob, intro);
new scroll('div1', '60%', fjob, secYourJob);
new scroll('div2', '75%',fdiv2, fjob);
new scroll('div3', '75%',fdiv3, fdiv2);
new scroll('tc3', '75%',tc3, fdiv3);
new scroll('div1Sta', '75%',fdiv1Sta, tc3);
new scroll('div2Sta', '75%',fdiv2Sta, fdiv1Sta);
new scroll('div3Sta', '75%',fdiv3Sta, fdiv2Sta);
new scroll('tc4', '75%',tc4, fdiv3Sta);
new scroll('tc5', '25%',tc5, tc4);
new scroll('div1Leaves', '75%',fdiv1Leaves, tc5);
new scroll('div2Leaves', '75%',fdiv2Leaves, fdiv1Leaves);
new scroll('div3Leaves', '75%',fdiv3Leaves, fdiv2Leaves);
new scroll('div4Leaves', '75%',fdiv4Leaves, fdiv3Leaves);



//start grid on page load
intro();
