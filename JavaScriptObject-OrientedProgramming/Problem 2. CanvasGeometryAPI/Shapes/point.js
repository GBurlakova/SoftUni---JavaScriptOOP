define(['Shapes/shape'], function (Shape) {
    var Point = (function (Shape) {
        function Point(x, y, color) {
            Shape.call(this, x, y, color);
        }

        Point.extends(Shape);

        Point.prototype.draw = function draw(canvas) {
            canvas.beginPath();
            canvas.arc(this._x, this._y, 2, 0, 2 * Math.PI);
            canvas.fillStyle = this._color;
            canvas.fill();
            Shape.prototype.draw.call(this, canvas);
        };

        Point.prototype.isClicked = function isClicked(userClickX, userClickY, canvas) {
            var adjustedUSerClick = Shape.prototype.isClicked.call(this, userClickX, userClickY, canvas);
            var adjustedUserClickX = adjustedUSerClick.x;
            var adjustedUserClickY = adjustedUSerClick.y;
            var distance = Math.sqrt(
                (adjustedUserClickX - this._x) * (adjustedUserClickX - this._x) +
                    (adjustedUserClickY - this._y) * (adjustedUserClickY - this._y));
            return distance <= 2;
        };

        Point.prototype.toString = function toString(){
            return 'Point -> ' + Shape.prototype.toString.call(this);
        };

        return Point;
    })(Shape);

    return Point;
});