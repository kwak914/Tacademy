var svgHeight =235
var barElements;
var dataSet = [120, 70, 175, 80, 220];




//그래프 그리기
barElements = d3.select("#myGraph")
              .selectAll("#bar")
              .data(dataSet)
    barElements.enter()
        .append("rect")
        .attr("class","bar")

        .attr("height", function(d){
          return d;
        })
        .attr("width",20)
        .attr("x", function(d,i){
//          return i * 30 + interval + offsetX; //updated offsetX
          return i * 30; //updated offsetX
        })
        .attr("y", function(d){
          return svgHeight - d; //updated offsetY
        })

//        .exit()
textElements = d3.select("#myGraph")
                  .selectAll("#barNum")
                  .data(dataSet)
    textElements.enter()
        .append("text")
        .attr("class","barNum")
        .attr("x", function(d, i){
          return i * 30 + 10;
        })
        .attr("y", svgHeight -5)
        .text(function(d, i){
          return d;
        })
//        .exit()
