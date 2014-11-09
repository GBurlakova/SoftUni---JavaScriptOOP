define(function () {
    var Section = (function() {
        function Section(sectionTitle) {
            if (sectionTitle !== '') {
                this._sectionTitle = sectionTitle;
                this._sectionElement = document.createElement('section');
                this._mainSection = document.createElement('div');
                this._submitButton = createButton('submit', '+');
                this._itemInput = createItemInput();
            } else {
                throw new Error('Please enter title for the section');
            }
        }

        Section.prototype.addToDOM = function addToDOM(parent) {
            this._sectionElement.appendChild(createHeader(this._sectionTitle));
            this._sectionElement.appendChild(this._mainSection);
            this._sectionElement.appendChild(createFooter(this._itemInput, this._submitButton));
            parent.appendChild(this._sectionElement);
        };

        Section.prototype.getMainSection = function getMainSection() {
            return this._mainSection;
        };

        Section.prototype.getItemInput = function getItemInput() {
            return this._itemInput;
        };

        Section.prototype.getSubmitButton = function getSubmitButton() {
            return this._submitButton;
        };

        return Section;
    })();

    function createHeader(headerText){
        var header = document.createElement('header');
        var p = document.createElement('p');

        p.innerHTML = headerText;
        header.appendChild(p);

        return header;
    }

    function createFooter(input, submitButton) {
        var footer = document.createElement('footer');
        var div = document.createElement('div');

        div.appendChild(submitButton);
        div.appendChild(input);
        footer.appendChild(div);

        return footer;
    }

    function createItemInput() {
        var input = document.createElement('input');

        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Add item...');

        return input;
    }

    function createButton(buttonType, buttonText) {
        var submitButton = document.createElement('button');

        submitButton.setAttribute('type', buttonType);
        submitButton.innerHTML = buttonText;

        return submitButton;
    }

    return Section;
});