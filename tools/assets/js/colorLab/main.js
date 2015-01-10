define(["testingTools", "impressive", "commonCanvas"], function(testingTools,impressive, commonCanvas){
    var image = document.getElementById("target-image");
    var imp = impressive(image);
    var tD = document.getElementById("two-dimension");
    var hueHist = document.getElementById("hue-hist");
    var SIZE = 300;
    var HIST_HEIGHT = 360;
    var HIST_WIDTH = 720;
    
    var chroma = imp.chroma;
    var achroma = imp.achroma;
    

    
    hueHist.appendChild(testingTools.drawHistogram(chroma, 720, 360));
    hueHist.appendChild(testingTools.drawHistogram(chroma.smoothing(1), 720, 360));
    hueHist.appendChild(testingTools.drawHistogram(chroma.smoothing(2), 720, 360));
    hueHist.appendChild(testingTools.drawHistogram(chroma.smoothing(3), 720, 360));
    hueHist.appendChild(testingTools.drawHistogram(chroma.smoothing(4).flatten(0.01), 720, 360));
//    var test2DHist = 
//        [
//            [1,2,1],
//            [3,10,7],
//            [5,3,7]
//        ]
//    tD.appendChild(testingTools.draw2dHistogram(test2DHist, SIZE,SIZE));
    
    
    var hists = imp.svHists;
    
//    hueHist.appendChild(testingTools.drawHistogram(imp.hueHist, 900, 300));
//    hueHist.appendChild(testingTools.drawHistogram(imp.hueHist.smoothing(4).flatten(0.01), 900, 300));
    for(var i = 0; i<hists.length; ++i){
        var cvMat = [-1,-1,-1,
                     -1, 8,-1,
                     -1,-1,-1];
        tD.appendChild(testingTools.draw2dHistogram(hists[i], SIZE,SIZE));
//        tD.appendChild(testingTools.draw2dHistogram(
//            impressive.smoothing2DHist(hists[i], 1), SIZE,SIZE));
        tD.appendChild(testingTools.draw2dHistogram(
            hists[i].smoothing(1), SIZE,SIZE));
        tD.appendChild(testingTools.draw2dHistogram(
            hists[i].smoothing(3), SIZE,SIZE));
        tD.appendChild(testingTools.draw2dHistogram(hists[i].smoothing(3).flatten(0.3), SIZE,SIZE));
        tD.appendChild(testingTools.draw2dHistogram(hists[i].smoothing(3).cv(cvMat), SIZE,SIZE));
        tD.appendChild(testingTools.draw2dHistogram(
            hists[i].smoothing(3).cv(cvMat).binary(0.6), SIZE,SIZE));
    }
    
    var achroma = imp.achroma;
    tD.appendChild(testingTools.draw2dHistogram(achroma, SIZE,SIZE));
    tD.appendChild(testingTools.draw2dHistogram(achroma.smoothing(2), SIZE,SIZE));
    tD.appendChild(testingTools.draw2dHistogram(achroma.smoothing(4), SIZE,SIZE));
    tD.appendChild(testingTools.draw2dHistogram(achroma.smoothing(4).flatten(0.01), SIZE,SIZE));
});
