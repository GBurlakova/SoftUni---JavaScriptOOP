if (!Array.prototype.first)
{
    Array.prototype.first = function(predicate) {
        "use strict";
        var match;

        if (this === null || this === undefined) {
            throw new TypeError('Argument for function first is not defined');
        }

        if (typeof predicate != 'function') {
            throw new TypeError('Argument for function first should be of type function');
        }

        for (var i = 0; i < this.length; i++) {
            if (predicate(this[i])) {
                match = this[i];
                break;
            }
        }

        return match;
    }
}