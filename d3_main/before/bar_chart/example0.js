var svgHeight =235
var barElements;
var dataSet = [120, 70, 175, 80, 220];


//그래프 그리기
barElements = d3.select("#myGraph")
              .selectAll("rect")
              .data(dataSet)

    barElements.enter()

//        .exit()
textElements = d3.select("#myGraph")
              .selectAll("#barNum")
              .data(dataSet)






//        .exit()
