var svgHeight =235
var barElements;
var dataSet = [120, 70, 175, 80, 220];


//그래프 그리기
barElements = d3.select("#myGraph")
              .selectAll("rect")
              .data(dataSet)

    barElements.enter()
        .append("rect")
        .attr("class","bar")
        .attr("height", function(d){
          return d;
        })
        .attr("width",20)
        .attr("x", function(d,i){

          return i * 30;
        })
        .attr("y", function(d){
          return svgHeight - d ;
        })
//        .exit()
    barElements.enter()
        .append("text")
        .attr("class","barNum")
        .attr("x", function(d, i){
          return i * 30 + 10;    // 막대그래프 표시간격 맞춤 // updated offsetX
        })
        .attr("y", svgHeight -5) //updated offsetY
        .text(function(d, i){
          return d;
        })
//        .exit()
