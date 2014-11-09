var domModule = (function domModule(){
    function addChild(childElement, parentElementSelector) {
        var parentElement = document.querySelector(parentElementSelector);
        if (parentElement != null && parentElement != undefined) {
            parentElement.appendChild(childElement);
        } else {
        	throw 'Parent element does not exists.';
        }
    }

    function removeChild(childElementSelector, parentElementSelector){
        var parentElement = document.querySelector(parentElementSelector);
        var childElement = document.querySelector(childElementSelector);
        var parentExists = parentElement != null && parentElement != undefined;
        var childExists = childElement != null && childElement != undefined;

        if (!parentExists) {
            throw 'Invalid operation over not existing parent element.';
        } else if(!childExists){
            throw 'Invalid operation over not existing child element.'
        } else {
            parentElement.removeChild(childElement);
        }
    }

    function addHandler(elementSelector, eventType, eventHandler){
        var elements = document.querySelectorAll(elementSelector);
        if (elements == null && elements == undefined) {
        	throw 'Invalid operation over not existing elements';
        } else {
        	for(var element = 0; element < elements.length; element++){
                elements[element].addEventListener(eventType, eventHandler);
        	}
        }
    }

    function retrieveElements(elementsSelector){
        var elements = document.querySelectorAll(elementsSelector);
        return elements;
    }

    return {
        addChild: addChild,
        removeChild: removeChild,
        addHandler: addHandler,
        retrieveElements: retrieveElements
    }
})();