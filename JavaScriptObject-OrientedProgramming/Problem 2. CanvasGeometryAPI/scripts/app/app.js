(function () {
    require.config({
        paths: {
            "jquery": "scripts/libs/jquery-1.11.1.min",
            "triangle": "Shapes/triangle",
            "rectangle": "Shapes/rectangle",
            "segment":  "Shapes/segment",
            "point": "Shapes/point",
            "circle": "Shapes/circle"
        }
    });
})();

(function() {
    require(["jquery", "triangle", "rectangle", "segment", "point", "circle"],
        function ($, Triangle, Rectangle, Segment, Point, Circle) {
            // Constants
            var SHAPE_INPUT_ID = '#shapeInput';
            var X_INPUT_ID = 'xInput';
            var Y_INPUT_ID = 'yInput';
            var COLOR_INPUT_ID = 'colorInput';
            var SEGMENT_POINT_B_X_INPUT_ID = 'segmentPointBXInput';
            var SEGMENT_POINT_B_Y_INPUT_ID = 'segmentPointBYInput';
            var TRIANGLE_POINT_B_X_INPUT_ID = 'trianglePointBXInput';
            var TRIANGLE_POINT_B_Y_INPUT_ID = 'trianglePointBYInput';
            var TRIANGLE_POINT_C_X_INPUT_ID = 'trianglePointCXInput';
            var TRIANGLE_POINT_C_Y_INPUT_ID = 'trianglePointCYInput';
            var WIDTH_INPUT_ID = 'widthInput';
            var HEIGHT_INPUT_ID = 'heightInput';
            var RADIUS_INPUT_ID = 'radiusInput';
            var TEXT_AREA_ID = 'output';
            var CANVAS_WIDTH = 200;
            var CANVAS_HEIGHT = 200;

            // HTML Elements

            var shapeInput = document.getElementById(SHAPE_INPUT_ID);
            var xInput = document.getElementById(X_INPUT_ID);
            var yInput = document.getElementById(Y_INPUT_ID);
            var colorInput = document.getElementById(COLOR_INPUT_ID);
            var segmentPointBXInput = document.getElementById(SEGMENT_POINT_B_X_INPUT_ID);
            var segmentPointBYInput = document.getElementById(SEGMENT_POINT_B_Y_INPUT_ID);
            var trianglePointBXInput = document.getElementById(TRIANGLE_POINT_B_X_INPUT_ID);
            var trianglePointBYInput = document.getElementById(TRIANGLE_POINT_B_Y_INPUT_ID);
            var trianglePointCXInput = document.getElementById(TRIANGLE_POINT_C_X_INPUT_ID);
            var trianglePointCYInput = document.getElementById(TRIANGLE_POINT_C_Y_INPUT_ID);
            var widthInput = document.getElementById(WIDTH_INPUT_ID);
            var heightInput = document.getElementById(HEIGHT_INPUT_ID);
            var radiusInput = document.getElementById(RADIUS_INPUT_ID);
            var textArea = document.getElementById(TEXT_AREA_ID);

            var shapeToBeAdded = 'point'; // Initial Value
            var shapesNames = ["point", "circle", "rectangle",  "triangle", "segment"];
            var canvasShapes = [];
            var selectedShape;
            var selectedShapeIndex;
            var currentAvailableShapeId = 0;
            var canvas = getCanvas('shapes-canvas');

            // Select Shape to be Added
            $(SHAPE_INPUT_ID).change(function() {
                shapeToBeAdded = this.value;
                var shapeSpecificInformation = "#" + shapeToBeAdded + "AdditionalInformation";
                var shapeInformationToBeHidden = "";
                $(shapeSpecificInformation).css("display", "block");
                shapesNames.forEach(function (shapeName) {
                    if (shapeName != shapeToBeAdded) {
                        shapeInformationToBeHidden = "#" + shapeName + "AdditionalInformation";
                        $(shapeInformationToBeHidden).css("display", "none");
                    }
                })
            });

            // Add New Shape
            $("#add").click(function (){
                if (shapeToBeAdded !== null && shapeToBeAdded != undefined) {
                    var newShape;
                    var shapeTextInformation;
                    var currentMaxZIndex;

                    newShape = createShape(shapeToBeAdded);
                    newShape.setId(currentAvailableShapeId);
                    canvasShapes.push(newShape);
                    currentMaxZIndex = getCurrentMaxZIndex();
                    newShape.setZIndex(currentMaxZIndex + 1);
                    newShape.draw(canvas);
                    shapeTextInformation = newShape.toString() + '\n\n';
                    textArea.value += shapeTextInformation;
                    currentAvailableShapeId += 1;
                    sortCanvasShapes();
                } else {
                    alert('Please select a shape before click the ADD button');
                }
            });

            // Select a Shape
            $('#shapes-canvas').click(function (e) {
                clearCanvas(canvas);
                var lastShapeIndex = canvasShapes.length - 1;

                for (var shapeIndex = lastShapeIndex; shapeIndex >= 0; shapeIndex--) {
                    if (canvasShapes[shapeIndex] !== null && canvasShapes[shapeIndex] !== undefined) {
                        if (canvasShapes[shapeIndex].isClicked(e.pageX, e.pageY, this) &&
                            canvasShapes[shapeIndex].getZIndex()) {
                            selectedShape = canvasShapes[shapeIndex];
                            selectedShapeIndex = canvasShapes.indexOf(selectedShape);
                            selectedShape.setIsSelected(true);
                            break;
                        }
                    }
                }
                canvasShapes.forEach(function (shape) {
                    var currentShapeIndex = canvasShapes.indexOf(shape);
                    if (shape !== null && shape !== undefined) {
                        if (currentShapeIndex !== selectedShapeIndex) {
                            shape.setIsSelected(false);
                        }
                    }
                });

                redrawShapes();
            });

            // Increase Z-Index
            $('#up').click(function () {
                if (selectedShape !== undefined) {
                    var indexOfShapeAfterSelectedShape = selectedShapeIndex + 1;
                    if (canvasShapes[indexOfShapeAfterSelectedShape] !== undefined) {
                        canvasShapes[selectedShapeIndex].increaseZIndex();
                        canvasShapes[indexOfShapeAfterSelectedShape].decreaseZIndex();
                        canvasShapes[selectedShapeIndex].setIsSelected(false);
                        sortCanvasShapes();
                        selectedShape = undefined;
                        selectedShapeIndex = undefined;
                        clearCanvas(canvas);
                        redrawShapes();
                    }
                } else {
                    alert('Please select a shape!')
                }
            });

            // Decrease Z-Index
            $('#down').click(function () {
                if (selectedShape !== undefined) {
                    var indexOfShapeBeforeSelectedShape = selectedShapeIndex - 1;
                    if (canvasShapes[indexOfShapeBeforeSelectedShape] !== undefined) {
                        canvasShapes[selectedShapeIndex].decreaseZIndex();
                        canvasShapes[indexOfShapeBeforeSelectedShape].increaseZIndex();
                        canvasShapes[selectedShapeIndex].setIsSelected(false);
                        sortCanvasShapes();
                        selectedShape = undefined;
                        selectedShapeIndex = undefined;
                        clearCanvas(canvas);
                        redrawShapes();
                    }
                } else {
                    alert('Please select a shape!')
                }
            });

            // Remove Shape
            $('#remove').click(function () {
                if (selectedShape !== undefined) {
                    canvasShapes[selectedShapeIndex] = undefined;
                    selectedShape = undefined;
                    selectedShapeIndex = undefined;
                    sortCanvasShapes();
                    clearCanvas(canvas);
                    redrawShapes();
                } else {
                	alert('Please select a shape');
                }

            });

            // Functions For Inside Usage

            function sortCanvasShapes() {
                canvasShapes.sort(function (firstShape, secondShape){
                    return  firstShape.getZIndex()- secondShape.getZIndex();
                });
            }

            function getCurrentMaxZIndex() {
                var firstNonEmptyShape;
                var currentMaxZIndex;

                firstNonEmptyShape = canvasShapes.first(function (shape) {
                    if (shape !== null && shape !== undefined) {
                        return true;
                    } else {
                        return false;
                    }
                });
                currentMaxZIndex = firstNonEmptyShape.getZIndex();
                canvasShapes.forEach(function (shape) {
                    if (shape !== null && shape !== undefined) {
                        if (shape.getZIndex() > currentMaxZIndex) {
                            currentMaxZIndex = shape.getZIndex();
                        }
                    }
                });

                return currentMaxZIndex;
            }

            function clearCanvas(canvas) {
                canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            }

            function redrawShapes() {
                canvasShapes.forEach(function (shape) {
                    if (shape !== null && shape !== undefined) {
                        shape.draw(canvas);
                    }
                })
            }

            function createShape(shape) {
                var shapeOutput;

                switch(shape){
                    case 'point': shapeOutput = createPoint();
                        break;
                    case  'circle': shapeOutput = createCircle();
                        break;
                    case 'triangle': shapeOutput = createTriangle();
                        break;
                    case 'rectangle': shapeOutput = createRectangle();
                        break;
                    case 'segment': shapeOutput = createSegment();
                        break;
                }

                return shapeOutput;
            }

            function createPoint() {
                return new Point(parseInt(xInput.value), parseInt(yInput.value), colorInput.value);
            }

            function createCircle(){
                return new Circle(parseInt(xInput.value), parseInt(yInput.value), colorInput.value, parseInt(radiusInput.value));
            }

            function createRectangle() {
                return new Rectangle(
                    xInput.value, yInput.value, colorInput.value, widthInput.value, heightInput.value);
            }

            function createTriangle() {
                var pointB = new Point(parseInt(trianglePointBXInput.value), parseInt(trianglePointBYInput.value));
                var pointC = new Point(parseInt(trianglePointCXInput.value), parseInt(trianglePointCYInput.value));
                return new Triangle(
                    parseInt(xInput.value), parseInt(yInput.value), colorInput.value, pointB, pointC);
            }

            function createSegment() {
                var pointB = new Point(parseInt(segmentPointBXInput.value), parseInt(segmentPointBYInput.value));
                return new Segment(
                    parseInt(xInput.value), parseInt(yInput.value), colorInput.value, pointB);
            }
        });
})();
