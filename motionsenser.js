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
                    console.log("line_1");
                    setTimeout(function(){
                                            document.getElementById('canvas1').style.background="rgba(255,255,255,0.5)";
                                            
                                        },500);
                    data=image;
                }
                else if(Math.abs(data2[0]-image2[0])>30||Math.abs(data2[1]-image2[1])>30||Math.abs(data2[2]-image2[2])>30)
                {
                    document.getElementById('canvas2').style.background="rgba(25,12,200,0.5)";
                    console.log("line_2");
                    setTimeout(function(){
                                            document.getElementById('canvas2').style.background="rgba(255,255,255,0.5)";
                                            
                                        },500);
                    data2=image2;
                }

            }
            setTimeout(takepicture,100,v,c,w,h,i);
}