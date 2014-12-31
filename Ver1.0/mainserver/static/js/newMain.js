var wrapper = document.getElementById('wrapper');
var t1 = document.getElementById('t1');
var t2 = document.getElementById('t2');
var t3 = document.getElementById('t3');
var t4 = document.getElementById('t4');
var t5 = document.getElementById('t5');
var t6 = document.getElementById('t6');
var t7 = document.getElementById('t7');
var t8 = document.getElementById('t8');
var t9 = document.getElementById('t9');
var t10 = document.getElementById('t10');
var t11 = document.getElementById('t11');
var t12 = document.getElementById('t12');
var t13 = document.getElementById('t13');
var t14 = document.getElementById('t14');
var t15 = document.getElementById('t15');
var t16 = document.getElementById('t16');

spanHover(t1, '#26AFA8');
spanHover(t2, '#FA887E');
spanHover(t3, '#80E7E4');
spanHover(t4, '#EECE83');
spanHover(t5, '#4804EF');
spanHover(t6, '#C7F464');
spanHover(t7, '#FF4E50');
spanHover(t8, '#5D4157');
spanHover(t9, '#F6C6C2');
spanHover(t10, '#838689');
spanHover(t11, '#26AFA8');
spanHover(t12, '#E1F5C4');
spanHover(t13, '#4F61F4');
spanHover(t14, '#26AFA8');
spanHover(t15, '#5B527F');
spanHover(t16, '#26AFA8');
spanHover(t17, '#2b2410');
spanHover(t18, '#dbd8d2');
spanHover(t19, '#6d420d');
spanHover(t20, '#876744');
spanHover(t21, '#736c96');
spanHover(t22, '#4f414c');
spanHover(t23, '#5f756d');
spanHover(t24, '#857f80');
spanHover(t25, '#212426');
spanHover(t26, '#26AFA8');
spanHover(t26, '#26AFA8');

//기본 구조
t2.addEventListener('mouseover', function(){
    wrapper.style.backgroundColor = '#b1a686';
    
    var otherSpans = document.querySelectorAll('span:not(#'+this.id+')');
    for(var i=0 ; i<otherSpans.length ; i++){
        otherSpans[i].style.opacity = '0.5';
    }
});
t2.addEventListener('mouseout', function(){
    wrapper.style.backgroundColor = 'transparent';
    
    var otherSpans = document.querySelectorAll('span:not(#'+this.id+')');
    for(var i=0 ; i<otherSpans.length ; i++){
        otherSpans[i].style.opacity = '1';
    }
});

//아마도 이렇게 함수로 만들어서, span추가될때마다 색상값만 데이터로 넣어서 이벤트도 같이 추가하면 될 듯?
function spanHover(targetSpan, bgColor){
    targetSpan.addEventListener('mouseover', function(){
        wrapper.style.backgroundColor = bgColor;
        
        var otherSpans = document.querySelectorAll('span:not(#'+this.id+')');
        for(var i=0 ; i<otherSpans.length ; i++){
            otherSpans[i].style.opacity = '0.5';
        }
    });
    targetSpan.addEventListener('mouseout', function(){
        wrapper.style.backgroundColor = 'transparent';
        
        var otherSpans = document.querySelectorAll('span:not(#'+this.id+')');
        for(var i=0 ; i<otherSpans.length ; i++){
            otherSpans[i].style.opacity = '1';
        }
    });
};


// d3관련 테스트 다른 쪽 코드 손보기로 결정. 중단. 
// var dataset = {
//     nodes:[
//         {name : "1"},
//         {name : "2"},
//         {name : "3"},
//         {name : "4"}
//     ],
//     edges: [
//         {source : 0, target : 1},
//         {source : 0, target : 2},
//         {source : 1, target : 3},
//         {source : 2, target : 3},
//         {source : 3, target : 0}
//     ]
// }
// var w = 100;
// var h = 100;
// var force = d3
//             .layout.force()
//             .nodes(dataset.nodes)
//             .links(dataset.edges)
//             .size([w,h])
//             .linkDistance([50])
//             .charge([-100])
//             .start();

// var edges = svg.selectAll("line")
//             .data(dataset.edges)
//             .enter()
//             .append("line")
//             .style("stroke", "#ccc")
//             .style("stroke-width", 1);

// var nodes = svg.selectAll("circle")
//             .data(dataset.nodes)
//             .enter()
//             .append("circle")
//             .attr("r", 10)
//             .style("fill", function(d, i) {
//                 return colors(i);
//             })
//             .call(force.drag);

// force.on("tick", function(){
//     edges.attr("x1", function(d) {return d.source.x;})
//          .attr("y1", function(d) {return d.source.y;})
//          .attr("x2", function(d) {return d.source.x;})
//          .attr("y2", function(d) {return d.source.y;});

//     nodes.attr("cx", function(d) {return d.x;})
//          .attr("cy", function(d) {return d.y;});
// });
