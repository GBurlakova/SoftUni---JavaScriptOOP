define(['Shapes/shape', 'point'], function (Shape, Point) {
    var Segment = (function Segment(Shape, Point) {
        function Segment(x, y, color, pointB) {
            Shape.call(this, x, y, color);
            this._pointA = new Point(this.getX(), this.getY());
            validateProperty('Point B', pointB);
            this._pointB = new Point(pointB.getX(), pointB.getY());
        }

        Segment.extends(Shape);

        Segment.prototype.getPointA = function getPointA() {
            return this._pointA;
        };

        Segment.prototype.getPointB = function getPointB() {
            return this._pointB;
        };

        Segment.prototype.draw = function draw(canvas) {
            canvas.beginPath();
            canvas.strokeStyle = this._color;
            canvas.moveTo(this._pointA.getX(), this._pointA.getY());
            canvas.lineTo(this._pointB.getX(), this._pointB.getY());
            canvas.stroke();
        };
		
		Segment.prototype.toString = function toString() {
            return 'Segment -> ' + Shape.prototype.toString.call(this) + ' Point A: { ' + this.getPointA().getX() + '; ' + this.getPointA().getY() +
				' } Point B: { ' + this.getPointB().getX() + '; ' + this.getPointB().getY() + ' }';
        };

        Segment.prototype.isClicked = function isClicked(userClickX, userClickY, canvas) {
            var TOLERATE = 50;
            var minY;
            var maxY;
            var adjustedUSerClick = Shape.prototype.isClicked.call(this, userClickX, userClickY, canvas);
            var adjustedUserClickX = adjustedUSerClick.x;
            var adjustedUserClickY = adjustedUSerClick.y;
            // Using y = slope * x + yIntercept
            var segmentSlope = (this._pointB.getY() - this._pointA.getY()) /
                        (this._pointB.getX() - this._pointA.getX());
            var segmentYAxeIntercept = this._pointA.getY() - (segmentSlope * this._pointA.getX());
            var targetYValue = segmentSlope * adjustedUserClickX + segmentYAxeIntercept;
            minY = targetYValue - TOLERATE;
            maxY = targetYValue + TOLERATE;
            var userClickXIsOnSegment =
                adjustedUserClickX >= Math.min(this._pointA.getX(), this._pointB.getX()) &&
                    adjustedUserClickX <= Math.max(this._pointA.getX(), this._pointB.getX());
            var userClickYIsOnSegment = adjustedUserClickY >= (minY) &&
                adjustedUserClickY <= (maxY);
            if (userClickXIsOnSegment && userClickYIsOnSegment) {
                return true;
            } else {
            	return false;
            }
        };

        return Segment;
    })(Shape, Point);

    return Segment;
});