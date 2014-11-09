var specialConsole = (function consoleModule() {
    var MESSAGE_TYPE = {
        LINE: 1,
        ERROR: 2,
        WARNING: 3
    };

    // Public functions
    function writeLine() {
        write(arguments, MESSAGE_TYPE.LINE);
    }

    function writeError() {
        write(arguments, MESSAGE_TYPE.ERROR);
    }

    function writeWarning() {
        write(arguments, MESSAGE_TYPE.WARNING);
    }

    // Private functions
    function write(arguments, messageType) {
        var writeFunction;
        var inputMessage;

        switch (messageType){
            case MESSAGE_TYPE.LINE: writeFunction = writeOrdinaryMessage;
                break;
            case MESSAGE_TYPE.ERROR: writeFunction = writeErrorMessage;
                break;
            case MESSAGE_TYPE.WARNING: writeFunction = writeWarningMessage;
                break;
            default: throw 'Invalid write function';
                break;
        }

        if (arguments.length === 0) {
            console.log('\n');
        } else if (arguments.length == 1) {
            inputMessage = arguments[0];
            writeFunction(inputMessage);
        } else {
            inputMessage = arguments[0];
            inputMessage = fillPlaceholders.apply(this, arguments);
            writeFunction(inputMessage);
        }
    }

    function writeOrdinaryMessage(message){
        var messageToString = message.toString();
        console.log(messageToString);
    }

    function writeErrorMessage(message){
        var messageToString = message.toString();
        console.error(messageToString);
    }

    function writeWarningMessage(message){
        var messageToString = message.toString();
        console.warn(messageToString);
    }

    function fillPlaceholders() {
        var inputMessage = arguments[0];
        var placeholdersArgumentsArray = Array.prototype.slice.call(arguments, 1);
        var placeholdersIndexes = getPlaceholdersIndexes(inputMessage);
        var uniqueIndexes = placeholdersIndexes.unique();
        var maxPlaceholderIndex = Math.max.apply(null, uniqueIndexes);

        if (maxPlaceholderIndex >= placeholdersArgumentsArray.length) {
            throw 'Each placeholder index should be greater than or equal to zero ' +
                'and less than the length of the placeholders arguments.'
        }

        for (var index = 0; index < uniqueIndexes.length; index++) {
            var currentPlaceHolder = '\\{' + index + '\\}';
            var currentPlaceholderRegex = new RegExp(currentPlaceHolder, "g");
            inputMessage = inputMessage.replace(currentPlaceholderRegex, placeholdersArgumentsArray[index]);
        }

        return inputMessage;
    }

    function getPlaceholdersIndexes(inputMessage) {
        var placeholderPattern = /{([\d]+)}/g;
        var placeholdersIndexes = [];
        var currentMatch;

        while (currentMatch = placeholderPattern.exec(inputMessage)) {
            placeholdersIndexes.push(parseInt(currentMatch[1]));
        }

        return placeholdersIndexes;
    }

    Array.prototype.unique = function() {
        var auxiliaryObject = {};
        var length = this.length;
        var uniqueArray = [];
        for(var index = 0; index < length; index+=1) {
            auxiliaryObject[this[index]] = this[index];
        }
        for(var uniqueElement in auxiliaryObject){
            uniqueArray.push(auxiliaryObject[uniqueElement]);
        }
        return uniqueArray;
    };

    return {
        writeLine: writeLine,
        writeError: writeError,
        writeWarning: writeWarning
    }

})();

specialConsole.writeLine("Message: hello");
specialConsole.writeLine("Message: {0}", "hello");
specialConsole.writeError("Error: {0}", "A fatal error has occurred.");
specialConsole.writeWarning("Warning: {0}", "You are not allowed to do that!");
