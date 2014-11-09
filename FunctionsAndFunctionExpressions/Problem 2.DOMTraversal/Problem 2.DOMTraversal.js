function traverse(selector) {

    var element = document.querySelector(selector);

    if (element !== undefined && element !== null) {
        traverseElement(element, '');
    }

    function traverseElement(element, spacing) {

        spacing = spacing || '  ';

        // Print current element
        var elementId = element.getAttribute('id');
        var elementClass = element.getAttribute('class');
        var nameSegment = spacing + element.nodeName.toLowerCase() + ':';
        var idSegment = elementId ? ' id="' + elementId + '"' : '';
        var classSegment = elementClass ? ' class="' + elementClass + '"' : '';
        console.log(nameSegment + idSegment + classSegment);

        for (var i = 0; i < element.childNodes.length; i++) {
            var child = element.childNodes[i];
            if (child.nodeType === document.ELEMENT_NODE) {
                traverseElement(child, spacing + '  ');
            }
        }
    }
}