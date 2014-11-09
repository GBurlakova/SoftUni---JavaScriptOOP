define(['Shapes/shape', 'point'], function (Shape, Point) {
    var Triangle = (function Triangle(Shape, Point) {
        function Triangle(x, y, color, pointB, pointC) {
            Shape.call(this, x, y, color);
            this._pointA = new Point(this.getX(), this.getY());
            validateProperty('Point B', pointB);
            this._pointB = new Point(pointB.getX(), pointB.getY());
            validateProperty('Point C', pointC);
            this._pointC = pointC;
            var triangleExists = Triangle.prototype.triangleTest(this._pointA, this._pointB, this._pointC);
            if (triangleExists === false) {
            	alert('Your points do not form a valid triangle. Please try again.')
                throw new Error('Not a valid triangle');
            }
        }

        Triangle.extends(Shape);

        Triangle.prototype.getPointA = function getPointA() {
            return this._pointA;
        };

        Triangle.prototype.getPointB = function getPointB() {
            return this._pointB;
        };

        Triangle.prototype.getPointC = function getPointC() {
            return this._pointC;
        };

        Triangle.prototype.draw = function draw(canvas) {
            canvas.beginPath();
            canvas.fillStyle = this._color;
            canvas.moveTo(this._pointA.getX(), this._pointA.getY());
            canvas.lineTo(this._pointB.getX(), this._pointB.getY());
            canvas.lineTo(this._pointC.getX(), this._pointC.getY());
            canvas.fill();
            Shape.prototype.draw.call(this, canvas);
        };

        Triangle.prototype.isClicked = function (userClickX, userClickY, canvas) {
            var adjustedUSerClick = Shape.prototype.isClicked.call(this, userClickX, userClickY, canvas);
            var adjustedUserClickX = adjustedUSerClick.x;
            var adjustedUserClickY = adjustedUSerClick.y;

            var thisArea = this.calculateArea(
                this.getPointA().getX(), this.getPointA().getY(),
                this.getPointB().getX(), this.getPointB().getY(),
                this.getPointC().getX(), this.getPointC().getY());

            /* Calculate area of triangle PBC */
            var areaPBC = this.calculateArea(adjustedUserClickX, adjustedUserClickY,
                this.getPointB().getX(), this.getPointB().getY(),
                this.getPointC().getX(), this.getPointC().getY());

            /* Calculate area of triangle PAC */
            var areaPAC = this.calculateArea(this.getPointA().getX(), this.getPointA().getY(),
                adjustedUserClickX, adjustedUserClickY,
                this.getPointC().getX(), this.getPointC().getY());

            /* Calculate area of triangle PAB */
            var areaPAB = this.calculateArea(
                this.getPointA().getX(), this.getPointA().getY(),
                this.getPointB().getX(), this.getPointB().getY(),
                adjustedUserClickX, adjustedUserClickY);

            var userClickIsInTriangle = thisArea == areaPBC + areaPAC + areaPAB;
            return userClickIsInTriangle;
        };
        Triangle.prototype.triangleTest = function triangleTest(pointA, pointB, pointC) {
            var AB = Triangle.prototype.calculateSide(pointB, pointA);
            var BC = Triangle.prototype.calculateSide(pointC, pointB);
            var AC = Triangle.prototype.calculateSide(pointC, pointA);

            var triangleExists = ((AB + BC) > AC) && ((BC + AC) > AB) && ((AC + AB) > BC);
            return triangleExists;
        };

        Triangle.prototype.calculateSide = function calculateSide(firstPoint, secondPoint) {
            var distance = Math.sqrt(
                    (secondPoint.getX() - firstPoint.getX()) * (secondPoint.getX() - firstPoint.getX()) +
                    (secondPoint.getY() - firstPoint.getY()) * (secondPoint.getY() - firstPoint.getY())
            );

            return distance;
        };

        Triangle.prototype.toString = function toString() {
            return 'Triangle -> ' + Shape.prototype.toString.call(this) +
                ' Point A: { ' + this.getPointA().getX() + '; ' + this.getPointA().getY() + ' } Point B: { '
                + this.getPointB().getX() + '; ' + this.getPointB().getY() + ' }; Point C: { '
                + this.getPointC().getX() + '; ' + this.getPointC().getY() + ' }';
        };

        Triangle.prototype.calculateArea = function (pointAX, pointAY, pointBX, pointBY, pointCX, pointCY) {

            return Math.abs(
                    (pointAX * (pointBY - pointCY) +
                        pointBX * (pointCY - pointAY) + pointCX * (pointAY - pointBY)) / 2.0);

        };

        return Triangle;
    })(Shape, Point);

    return Triangle;
});