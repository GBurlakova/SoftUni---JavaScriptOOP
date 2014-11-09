function getCanvas(canvasId) {
    var canvasElement = document.getElementById(canvasId);
    var canvas = canvasElement.getContext('2d');
    return canvas;
}


var Shape = (function() {
    function Shape(x, y, color) {
        validateProperty('X', x);
        this._x = x;
        validateProperty('Y', y);
        this._y = y;
        this._color = color;
    }

    Shape.prototype.getX = function getX(){
        return this._x;
    };

    Shape.prototype.getY = function getY() {
        return this._y;
    };

    Shape.prototype.getColor = function getColor(){
        return this._color;
    };

    Shape.prototype.draw = function draw() {
        throw 'Not implemented function';
    };

    Shape.prototype.toString = function toString(){
        var output = 'X: ' + this._x + '; Y: ' + this._y + '; Color(hex): ' + this._color + ';';
        return output;
    };

    return Shape;
})();

var Point = (function () {
    function Point(x, y, color) {
        Shape.call(this, x, y, color);
    }

    Point.extends(Shape);

    Point.prototype.draw = function draw(canvas) {
        canvas.beginPath();
        canvas.arc(this._x, this._y, 2, 0, 2 * Math.PI);
        canvas.fillStyle = this._color;
        canvas.fill();
    };

    return Point;
})();

var Circle = (function Circle() { 
   function Circle(x, y, color, radius) {
       Shape.call(this, x, y, color);
       validateProperty('Radius', radius);
       this._radius = radius;
   }
    
    Circle.extends(Shape);
    
    Circle.prototype.draw = function (canvas) {
        canvas.beginPath();
        canvas.arc(this._x, this._y, this._radius, 0, 2*Math.PI);
        canvas.fillStyle = this._color;
        canvas.fill();
    };

    Circle.prototype.toString = function toString(){
        return Shape.prototype.toString.call(this) + ' Radius: ' + this._radius;
    };

    return Circle;
})();

var Rectangle = (function Rectangle() {
    function Rectangle(x, y, color, width, height) {
        Shape.call(this, x, y, color);
        validateProperty('Width', width);
        this._width = width;
        validateProperty('Height', height);
        this._height = height;
    }

    Rectangle.extends(Shape);

    Rectangle.prototype.getWidth = function getWidth() {
        return this._width; // Why
    };

    Rectangle.prototype.getHeight = function getHeight() {
        return this._height; // Why
    };

    Rectangle.prototype.draw = function (canvas) {
        canvas.beginPath();
        canvas.fillStyle = this._color;
        canvas.rect(this._x, this._y, 40, 50);
        canvas.fill();
    };

    return Rectangle;
})();

var Triangle = (function Triangle() {
    function Triangle(x, y, color, pointB, pointC) {
        Shape.call(this, x, y, color);
        this._pointA = new Point(this.getX(), this.getY());
        validateProperty('Point B', pointB);
        this._pointB = new Point(pointB.getX(), pointB.getY());
        validateProperty('Point C', pointC);
        this._pointC = pointC;
    }

    Triangle.extends(Shape);

    Triangle.prototype.getPointA = function getPointA() {
        return this._pointA; // Why
    };

    Triangle.prototype.getPointB = function getPointB() {
        return this._pointB; // Why
    };

    Triangle.prototype.getPointC = function getPointC() {
        return this._pointC; // Why
    };

    Triangle.prototype.draw = function (canvas) {
        canvas.beginPath();
        canvas.fillStyle = this._color;
        canvas.moveTo(this._pointA.getX(), this._pointA.getY());
        canvas.lineTo(this._pointB.getX(), this._pointB.getY());
        canvas.lineTo(this._pointC.getX(), this._pointC.getY());
        canvas.fill();
    };

    return Triangle;
})();

var Segment = (function Segment() {
    function Segment(x, y, color, pointB) {
        Shape.call(this, x, y, color);
        this._pointA = new Point(this.getX(), this.getY());
        validateProperty('Point B', pointB);
        this._pointB = new Point(pointB.getX(), pointB.getY());
    }

    Segment.extends(Shape);

    Segment.prototype.getPointA = function getPointA() {
        return this._pointA; // Why
    };

    Segment.prototype.getPointB = function getPointB() {
        return this._pointB; // Why
    };

    Segment.prototype.draw = function (canvas) {
        canvas.beginPath();
        canvas.strokeStyle = this._color;
        canvas.moveTo(this._pointA.getX(), this._pointA.getY());
        canvas.lineTo(this._pointB.getX(), this._pointB.getY());
        canvas.stroke();
    };

    return Segment;
})();

var canvas = getCanvas('shapes-canvas');

var pointB = new Point(120, 150);
var pointC = new Point(10, 10);
var point = new Point(35, 185, '#8080ff');
var circle = new Circle(15, 30, '#ff80c0', 20);
var rectangle = new Rectangle(150, 120, '#008000', 20, 60);
var triangle = new Triangle(180, 90, '#804040', pointB, pointC);
var segment = new Segment(10, 60, '#ff0000', pointB);

point.draw(canvas);
circle.draw(canvas);
rectangle.draw(canvas);
triangle.draw(canvas);
segment.draw(canvas);
