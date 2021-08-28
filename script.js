var car = $("#car");
var container = $(".container");
var container_left = parseInt(container.css("left")),
container_width=parseInt(container.css("width")),
container_height=parseInt(container.css("height")),
car_width=parseInt(car.css("width")),
car_height=parseInt(car.css("height"));
$(function(){
    "use strict";
    var anim_id,
    line = $("#line"),
    line_1 = $("#line-1"),
    line_2 = $("#line-2"),
    line_3 = $("#line-3"),
    car_1=$("#car-1"),
    car_2=$("#car-2"),
    car_3=$("#car-3"),
    restart_div=$("#restart-div"),
    restart_btn=$("restart"),
    pause_div=$("#pause-div"),
    score=$("#score");

    var game_over=false,
    game_pause=false,
    score_counter = 1,
    car_speed = 2,
    line_speed=5;
    $(window).on("keydown",function(e){
        var key =e.which;
        if(key == 37){
            if(parseInt(car.css('right'))<(container_width-car_width - 10)){
                car.animate({
                    left:"-=20px"
                },30)
            }
        }else if(key==39){
            if(parseInt(car.css('left'))<(container_width-car_width - 10)){
                car.animate({
                    left:"+=20px"
                },30)
            }
        }else if(key==38){
            if(parseInt(car.css('bottom'))<(container_height-car_width - 20)){
                car.animate({
                    bottom:"+=20px"
                },30)
            }
        }else if(key==40){
            if(parseInt(car.css('top'))<(container_height-car_width - 20)){
                car.animate({
                    bottom:"-=20px"
                },30)
            }
        }else if(key==32){
            if(game_pause==true){
                anim_id = requestAnimationFrame(repeat);
                pause_div.css({display:"none"})
                game_pause=false;
            }else{
                game_pause=true
                pause_div.slideDown();
            }
        }else {
            if(key==13){
                $(window).location.reload(true);
            }
        }
    });
        
        anim_id = requestAnimationFrame(repeat);
        function repeat(){
            if(game_over== false && game_pause==false){
                score_counter ++;
                if(score_counter % 20 == 0 ){
                    score.text(parseInt(score.text())+1)
                }
                if(score_counter % 300 == 0){
                    car_speed++;
                    line_speed++;
                }
                if(collapsion(car,car_1)||collapsion(car,car_3)||collapsion(car,car_3)){
                    stop_game();

                }
                car_down(car_1);
                car_down(car_2);
                car_down(car_3);

                line_down(line_1);
                line_down(line_2);
                line_down(line_3);
                anim_id =requestAnimationFrame(repeat);
            }
        }
        function car_down(car){
            var current_top = parseInt(car.css("top"));
            if(current_top>(container_height+50)){
                current_top= -60;
                var car_left = (Math.floor(Math.random()*(container_width-car_width)));
                car.css("left",car_left);
            }
            car.css("top",current_top+car_speed);
        }


        function line_down(line){
            var l_current_top = parseInt(line.css("top"));
            if(l_current_top >(container_height +10)){
                // line.css({visiblity:"hidden"});
                l_current_top = -300;
                // line.css({visiblity:"hidden"});

            }
            line.css("top",l_current_top+line_speed);
        }

        function stop_game(){
            game_over=true;
            cancelAnimationFrame(anim_id);
            restart_div.slideDown();
            restart_btn.focus();
        }
        restart_div.click(function(){
            window.location.reload(true);
        })

        function collapsion(elem1,elem2) {
            var x1 = elem1.offset().left,
                y1 =elem1.offset().top,
                x2 = elem2.offset().left,
                y2 =elem2.offset().top,
                h1=elem1.height(),
                w1=elem1.width(),
                h2=elem2.height(),
                w2=elem2.width(),
                b1= y1+h1,
                r1= x1+w1,
                b2= y2+h2,
                r2=x2+w2;
                if(b1<y2||y1>b2||r1<x2||x1>r2){
                    return false;
                }
                return true;
        }
    })


// motion controls
const video = document.getElementById("video");
const w = 1450;
const h= 960;
function startvideo(){
    navigator.getUserMedia({video:true,audio: false},getStream,noStream)
}
function noStream(err){
    console.error(err);
}


function getStream(stream){   
        video.srcObject=stream;
            video.play();
        
}
startvideo();
context=canvas.getContext('2d');
canvas.setAttribute('height',h);
canvas.setAttribute('width',w);
context.width=w;
context.height=h;
console.log(canvas)

video.addEventListener('canplay', function (ev) {
    var i=0;
    takepicture(video,context,w,h,i);    
}, false);

function takepicture(v,c,w,h,i) {
            c.drawImage(v,0,0,w,h);
            image=context.getImageData(100,70,100,100).data;
            image2=context.getImageData(400,70,100,100).data;
            
            if(i==0)
            {
                data=image;
                data2=image2;
                i=1;
            }
            else
            {
                if(Math.abs(data[0]-image[0])>30||Math.abs(data[1]-image[1])>30||Math.abs(data[2]-image[2])>30)
                {
                    document.getElementById('canvas1').style.background="rgba(25,12,200,0.5)";
                    if(parseInt(car.css('right'))<(container_width-car_width - 10)){
                        car.animate({
                            left:"-=20px"
                        },30)
                    }
                    setTimeout(function(){
                                            document.getElementById('canvas1').style.background="rgba(255,255,255,0.5)";
                                            
                                        },500);
                    data=image;
                }
                else if(Math.abs(data2[0]-image2[0])>30||Math.abs(data2[1]-image2[1])>30||Math.abs(data2[2]-image2[2])>30)
                {
                    document.getElementById('canvas2').style.background="rgba(25,12,200,0.5)";
                    if(parseInt(car.css('left'))<(container_width-car_width - 10)){
                        car.animate({
                            left:"+=20px"
                        },30)
                    }
                    setTimeout(function(){
                                            document.getElementById('canvas2').style.background="rgba(255,255,255,0.5)";
                                            
                                        },500);
                    data2=image2;
                }

            }
            setTimeout(takepicture,100,v,c,w,h,i);
}