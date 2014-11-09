define(['Shapes/shape'], function (Shape) {
    var Rectangle = (function Rectangle(Shape) {
        function Rectangle(x, y, color, width, height) {
            Shape.call(this, x, y, color);
            validateProperty('Width', width);
            this._width = width;
            validateProperty('Height', height);
            this._height = height;
        }

        Rectangle.extends(Shape);

        Rectangle.prototype.getWidth = function getWidth() {
            return this._width;
        };

        Rectangle.prototype.getHeight = function getHeight() {
            return this._height;
        };

        Rectangle.prototype.draw = function (canvas) {
            canvas.beginPath();
            canvas.fillStyle = this._color;
            canvas.rect(this._x, this._y, 40, 50);
            canvas.fill();
            Shape.prototype.draw.call(this, canvas);
        };

        Rectangle.prototype.isClicked = function isClicked(userClickX, userClickY, canvas) {
            var adjustedUSerClick = Shape.prototype.isClicked.call(this, userClickX, userClickY, canvas);
            var adjustedUserClickX = adjustedUSerClick.x;
            var adjustedUserClickY = adjustedUSerClick.y;
            var minX = this._x;
            var maxX = this._x + this._width;
            var minY = this._y;
            var maxY = this._y + this._height;
            var userClickXIsInRectangle = adjustedUserClickX >= minX && adjustedUserClickX <= maxX;
            var userClickYIsInRectangle = adjustedUserClickY >= minY && adjustedUserClickY <= maxY;

            if (userClickXIsInRectangle && userClickYIsInRectangle) {
            	return true;
            } else {
            	return false;
            }
        };

        Rectangle.prototype.toString = function toString(){
            return 'Rectangle -> Width: ' + this.getWidth() + '; Height: ' + this.getHeight() + '; ';
        };

        return Rectangle;
    })(Shape);

    return Rectangle;
});