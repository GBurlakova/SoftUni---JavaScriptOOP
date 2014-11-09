define(function () {
    var currentAvailableId = 0;

    var Item = (function() {
        function Item(text) {
            if (text !== '') {
                this._text = text;
                this._itemElement = document.createElement('div');
                this._itemCheckbox = createItemCheckbox();
                this._itemLabel = createItemLabel(this._text);
                currentAvailableId += 1;
            } else {
                throw new Error('Please enter text for the item');
            }
        }

        Item.prototype.addToDOM = function addToDOM(parent) {
            this._itemElement.appendChild(this._itemCheckbox);
            this._itemElement.appendChild(this._itemLabel);
            parent.appendChild(this._itemElement);
        };

        Item.prototype.getItemElement = function getItemElement() {
            return this._itemElement;
        };

        Item.prototype.getItemCheckbox = function getItemCheckbox() {
            return this._itemCheckbox;
        };

        return Item;
    })();

    function createItemCheckbox() {
        var checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', currentAvailableId.toString());
        return checkbox;
    }

    function createItemLabel(text){
        var label = document.createElement('label');
        label.innerHTML = text;
        label.setAttribute('for', currentAvailableId.toString());
        return label;
    }

    return Item;
});