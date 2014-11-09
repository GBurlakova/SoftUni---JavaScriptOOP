function getCanvas(canvasId) {
    var canvasElement = document.getElementById(canvasId);
    var canvas = canvasElement.getContext('2d');
    return canvas;
}