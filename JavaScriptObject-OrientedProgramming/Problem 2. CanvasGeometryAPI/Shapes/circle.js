define(['Shapes/shape'], function (Shape) {
    var Circle = (function Circle(Shape) {
        function Circle(x, y, color, radius) {
            Shape.call(this, x, y, color);
            validateProperty('Radius', radius);
            this._radius = radius;
        }

        Circle.extends(Shape);

        Circle.prototype.draw = function (canvas) {
            canvas.beginPath();
            canvas.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
            canvas.fillStyle = this._color;
            canvas.fill();
            Shape.prototype.draw.call(this, canvas);
        };

        Circle.prototype.toString = function toString(){
            return 'Circle -> ' + Shape.prototype.toString.call(this) + ' Radius: ' + this._radius + ';';
        };

        Circle.prototype.isClicked = function isClicked(userClickX, userClickY, canvas) {
            var adjustedUSerClick = Shape.prototype.isClicked.call(this, userClickX, userClickY, canvas);
            var adjustedUserClickX = adjustedUSerClick.x;
            var adjustedUserClickY = adjustedUSerClick.y;
            var distance = Math.sqrt(
                    (adjustedUserClickX - this._x) * (adjustedUserClickX - this._x) +
                    (adjustedUserClickY - this._y) * (adjustedUserClickY - this._y));
            return distance <= this._radius;
        };

        return Circle;
    })(Shape);

    return Circle;
});