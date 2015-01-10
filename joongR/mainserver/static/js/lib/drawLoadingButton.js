var drawLoadingButton = {
   "init" : function(element, lCanvas_W, lCanvas_H, circle, shadow, colorChangeFlag){
       // 로딩버튼 초기 설정
        this.loadingImage = element;
        this.lCanvas_W = lCanvas_W;
        this.lCanvas_H = lCanvas_H;
        this.loadingImage.width = this.lCanvas_W;
        this.loadingImage.height = this.lCanvas_H; 
        this.lCtx = this.loadingImage.getContext("2d");
        
        // 로딩버튼이 2번 실행되는데 그때 컬러값 변경
        this.colorChangeFlag = colorChangeFlag;
        
        // 컨텍스트 합성환경설정
        this.lCtx.globalCompositeOperation = "copy";

        // 원설정 
        this.circle = {
            r : circle.r,
            maximumR : circle.maximumR,
            color : circle.color,
            sizeFlag : circle.sizeFlag
        };


        // 그림자 설정
        this.shadow = {
            x : shadow.x,
            y : shadow.y,
            degree : shadow.degree,
            offset : shadow.offset,
            blur : shadow.blur,
            color : shadow.color
        };
        
        // 색상값이 바뀔때 필요한 변수들
        if(colorChangeFlag === true){
            // 전역색상값과 연동하면서 계산할 RGB변수
            this.loadingRGB = {
                r : 255,
                g : 255,
                b : 255
            };
            this.loadingShadowRGB = {
                r : 20,
                g : 20,
                b : 20
            };

            // 전연색상으로부터 가져온 색상값
            this.gradationColor = commonCanvas.hex2Rgb((GlobalVar.GradationColorGetter()).color1);
            this.shadowColor = GlobalVar.ShadowColorGetter(); 
            // 계산할 때 증감할 offset Num 
            this.colorOffset = 1;             
        }
    },
    "drawOnCanvas" : function(context, circle, shadow, lCanvas_W, lCanvas_H){
        context.fillStyle = circle.color;
        context.globalCompositeOperation = "copy";
        shadow.x = Math.cos(shadow.degree) * shadow.offset;
        shadow.y = -(Math.sin(shadow.degree) * shadow.offset);
        context.shadowOffsetX = shadow.x;
        context.shadowOffsetY = shadow.y;
        context.shadowColor = shadow.color;
        context.shadowBlur = shadow.blur;
        context.arc(lCanvas_W/2, lCanvas_H/2, circle.r, (Math.PI/180)*0, (Math.PI/180)*360, false); 
        context.fill();
        

    },
    "changeButtonAndShadowColor" : function(circle, shadow, loadingRGB, loadingShadowRGB){
        this.loadingRGB = loadingRGB;
        this.loadingShadowRGB = loadingShadowRGB;
        
        // 설정
        this.shadowDegreeOffset = 0.3;
        this.circleR_Offset = 1;
        console.log(this.circle.r);
        // 일단은 20까지는 원이 커지도록 둔다. 
        if(circle.r < circle.maximumR && this.circle.sizeFlag === true){ 
            circle.r = circle.r + this.circleR_Offset;
            shadow.blur++;
            shadow.degree = shadow.degree + this.shadowDegreeOffset;   
        // 1. 색상값이 변하면서 그림자가 도는 경우.   
        } else if(circle.r === circle.maximumR && this.colorChangeFlag === true){ 

            //받아온 칼라값을 적용
            //원이 커지고 난 후부터 애니메이션이 시작되도록 설정함.
            this.loadingShadowRGB.r = adjustColor(this.loadingShadowRGB.r, this.shadowColor.shadowR, this.colorOffset);
            this.loadingShadowRGB.g = adjustColor(this.loadingShadowRGB.g, this.shadowColor.shadowG, this.colorOffset);
            this.loadingShadowRGB.b = adjustColor(this.loadingShadowRGB.b, this.shadowColor.shadowB, this.colorOffset);
            this.loadingRGB.r = adjustColor(this.loadingRGB.r, this.gradationColor.r, this.colorOffset);
            this.loadingRGB.g = adjustColor(this.loadingRGB.g, this.gradationColor.g, this.colorOffset);
            this.loadingRGB.b = adjustColor(this.loadingRGB.b, this.gradationColor.b, this.colorOffset);

            circle.color = commonCanvas.rgb2Hex(this.loadingRGB.r, this.loadingRGB.g, this.loadingRGB.b);
            shadow.color = commonCanvas.rgb2Hex(this.loadingShadowRGB.r, this.loadingShadowRGB.g, this.loadingShadowRGB.b);
            shadow.blur--;
            shadow.degree = shadow.degree + this.shadowDegreeOffset;
            circle.sizeFlag = false;
            
            // RGB비교후 offset만큼 맞춰주는 함수
            function adjustColor(colorNum, sourceColor, offset){
                if(colorNum > sourceColor){
                    colorNum = colorNum - offset;
                } else if(colorNum == sourceColor){
                    colorNum = colorNum;
                } else if(colorNum < sourceColor){
                    colorNum = colorNum + offset;
                } else {
                    console.log("error in adjestColor function");
                }
                return colorNum;
            }
        // 2. 색상값이 하얀색을 유지하면서 그림자만 도는 경우.
        } else if(circle.r === circle.maximumR && this.colorChangeFlag === false){
            shadow.blur--;
            shadow.degree = shadow.degree + this.shadowDegreeOffset;
        }
    },
    "run" : function(){
        this.bindFunction();
        this.drawOnCanvas(this.lCtx, this.circle, this.shadow, this.lCanvas_W, this.lCanvas_H);
        this.changeButtonAndShadowColor(this.circle, this.shadow, this.loadingRGB, this.loadingShadowRGB);
    },
    "bindFunction" : function(){ 
        //console.log(this.run);
        this.run.bind(this);
    }
}

