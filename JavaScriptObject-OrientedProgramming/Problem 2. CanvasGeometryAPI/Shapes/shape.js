define(function () {
    var Shape = (function() {
        function Shape(x, y, color) {
            validateProperty('X', x);
            this._x = x;
            validateProperty('Y', y);
            this._y = y;
            this._color = color;
            this._zIndex = 0;
            this._id = 0;
            this._isSelected = false;
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

        Shape.prototype.setId = function setId(id){
            this._id = id;
        };

        Shape.prototype.getId = function getId(){
            return this._id;
        };

        Shape.prototype.setZIndex = function setZIndex(zIndex){
            this._zIndex = zIndex;
        };

        Shape.prototype.getZIndex = function getZIndex(){
            return this._zIndex;
        };


        Shape.prototype.increaseZIndex = function increaseZIndex(){
            this._zIndex += 1;
        };

        Shape.prototype.decreaseZIndex = function decreaseZIndex(){
            this._zIndex -= 1;
        };

        Shape.prototype.getIsSelected = function getIsSelected(){
            return this._isSelected;
        };

        Shape.prototype.setIsSelected = function setIsSelected(isSelected){
            if (typeof(isSelected) === "boolean") {
                this._isSelected = isSelected;
            } else {
            	throw  new Error('Type of value that indicates whether the shape is selected should be boolean');
            }
        };

        Shape.prototype.draw = function draw(canvas) {
            if (this._isSelected) {
                canvas.strokeStyle = '#000000';
                canvas.stroke();
            }
        };

        Shape.prototype.isClicked = function isClicked(userClickX, userClickY, canvas) {
            var adjustedUserClickX = userClickX - canvas.offsetLeft;
            var adjustedUserClickY = userClickY - canvas.offsetTop;
            var userClick = {x: adjustedUserClickX, y: adjustedUserClickY};
            return userClick;
        };

        Shape.prototype.toString = function toString(){
            var stringOutput = 'Color(hex): ' + this._color + ';';
            return stringOutput;
        };

        return Shape;
    })();

    return Shape;
});