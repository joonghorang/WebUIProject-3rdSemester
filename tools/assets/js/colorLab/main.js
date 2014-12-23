define(["testingTools", "impressive", "commonCanvas"], function(testingTools,impressive, commonCanvas){
    var image = document.getElementById("target-image");
    var imp = impressive(image);
    var tD = document.getElementById("two-dimension");
    
//    var test2DHist = 
//        [
//            [1,2,1],
//            [3,10,7],
//            [5,3,7]
//        ]
//    tD.appendChild(testingTools.draw2dHistogram(test2DHist, SIZE,SIZE));
//    var hists = imp.svHists;
//    var SIZE = 300;
//    for(var i = 0; i<hists.length; ++i){
//        var cvMat = [-1,-1,-1,
//                     -1, 8,-1,
//                     -1,-1,-1];
//        
//        tD.appendChild(testingTools.draw2dHistogram(hists[i], SIZE,SIZE));
////        tD.appendChild(testingTools.draw2dHistogram(
////            impressive.smoothing2DHist(hists[i], 1), SIZE,SIZE));
//        tD.appendChild(testingTools.draw2dHistogram(
//            impressive.smoothing2DHist(hists[i], 2), SIZE,SIZE));
////        tD.appendChild(testingTools.draw2dHistogram(
////            impressive.to2DBinaryHist(
////                impressive.histCV(impressive.smoothing2DHist(hists[i], 2), cvMat), 0.6
////            ), SIZE,SIZE));
//        tD.appendChild(testingTools.draw2dHistogram(
//            impressive.flatten2DHist(
//                impressive.smoothing2DHist(hists[i], 3)
//                , 0.3), SIZE,SIZE));
//        console.log(
//            impressive.pick2DPeaks(impressive.flatten2DHist(impressive.smoothing2DHist(hists[i], 3), 0.3))
//        );
//    }
    
});
