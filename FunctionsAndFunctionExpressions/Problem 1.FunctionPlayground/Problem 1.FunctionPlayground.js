function printArguments(){
    var output = '';

    if (arguments.length == 0) {
    	output = 'No arguments passed';
    }

    for(var index = 0; index < arguments.length; index += 1){
        output += 'Argument ' + (index + 1) + ' - argument type: ' + typeof arguments[index] + '\n';
    }

    return output;
}

console.log(printArguments('String', 5.5, true));
console.log(printArguments('Apple', 'Orange', ['Apple', 'Grape', 'Lemon']));
console.log(printArguments());

function printDataFromThisScope() {
    var name = this.name;
    console.log(name);
}

// Print using global scope
name = 'GlobalName';
printDataFromThisScope();

// Print using object scope
var newObject = new printDataFromThisScope();

// Print using call
printDataFromThisScope.call({name: 'MyNamePassedThroughCall'});

// Print using apply
printDataFromThisScope.call({name: 'MyNamePassedThroughApply'});



