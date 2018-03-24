var svgHeight =235
var barElements;
var dataSet = [120, 70, 175, 80, 220];


// var offset 만들기
var offsetX = 40;
var offsetY = 10;


// range limit 정의
var y_range_limit = 300;

var interval = 5;

//그래프에 눈금 표시
var y = d3.scaleLinear() // 눈금의 종류를 지정
              .range([y_range_limit,0]) // 세로형 막대그래프는 range() 반대
              .domain([0,300])

var yScale = d3.axisLeft(y)
              .tickValues(d3.range(0,301,50))
              .tickFormat(function(d){ return " $" + d})

d3.select("#myGraph").append("g") // 눈금은 g 요소를 사용하여 그룹
          .attr("class", "axis")  // axis 라는 class 이름 지정
          // 중요 !! transform 변경
          //.attr("transform", "translate(40, 0)")  // 눈금 표시위치 transform 으로 조정
          .attr("transform", "translate("+offsetX + ", "+((svgHeight-y_range_limit)-offsetY)+")")  // 눈금 표시위치 transform 으로 조정
          // == ("transform"), "translate(40,-70)"
          .call(yScale)





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

//          return i * 30 + interval + offsetX; //updated offsetX
          return i * 30 + interval+offsetX; //updated offsetX
        })
        .attr("y", function(d){
          return svgHeight - d - offsetY; //updated offsetY
        })
//        .exit()
    barElements.enter()
        .append("text")
        .attr("class","barNum")
        .attr("x", function(d, i){
          return i * 30 + 10 + interval + offsetX;    // 막대그래프 표시간격 맞춤 // updated offsetX
        })
        .attr("y", svgHeight -5 - offsetY) //updated offsetY
        .text(function(d, i){
          return d;
        })
//        .exit()

//가로방향 선을 표시
d3.select("#myGraph").append("rect")
          .attr("class","axis_x")
          .attr("width", 320)
          .attr("height", 1)
          .attr("transform", "translate("+offsetX + ", "+((svgHeight)-offsetY)+")")
barElements.enter()
          .append("text")
          .attr("class","barName")
          .attr("x", function(d, i){
            return i * 30 + 10 + interval + offsetX
          })
          .attr("y", svgHeight+15 -offsetY)
          .text(function(d,i){
            return ["A","B","C","D","E"][i];
          })

        //  .attr("y", svgHeight+ 15-offsetY)
