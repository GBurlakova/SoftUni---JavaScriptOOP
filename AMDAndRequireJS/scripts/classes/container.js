define(function () {
    var Container = (function() {
        function Container(id, cssClass) {
            this._id = id;
            this._cssClass = cssClass;
            this._containerElement = document.createElement('section');
            this._mainSection = document.createElement('div');
            this._submitButton = createButton('submit', 'Section');
            this._titleInput = createTitleInput();
        }

        Container.prototype.getSubmitButton = function getSubmitButton() {
            return this._submitButton;
        };

        Container.prototype.addToDOM = function addToDOM() {
            this._containerElement.setAttribute('id', this._id);
            this._containerElement.setAttribute('class', this._cssClass);
            this._containerElement.appendChild(createHeader());
            this._containerElement.appendChild(this._mainSection);
            this._containerElement.appendChild(createFooter(this._titleInput, this._submitButton));
            var htmlMain = document.getElementById('main');
            htmlMain.appendChild(this._containerElement);
        };

        Container.prototype.getMainSection = function getMainSection() {
            return this._mainSection;
        };

        Container.prototype.getSubmitButton = function getSubmitButton() {
            return this._submitButton;
        };

        Container.prototype.getTitleInput = function getTitleInput() {
            return this._titleInput;
        };

        return Container;
    })();

    function createHeader(){
        var header = document.createElement('header');
        var p = document.createElement('p');

        p.innerHTML = getDayOfWeek() + ' TODO List';
        header.appendChild(p);

        return header;
    }

    function createFooter(input, submitButton) {
        var footer = document.createElement('footer');
        var div = document.createElement('div');

        div.appendChild(input);
        div.appendChild(submitButton);
        footer.appendChild(div);

        return footer;
    }

    function createTitleInput() {
        var input = document.createElement('input');

        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Title...');

        return input;
    }

    function createButton(buttonType, buttonText) {
        var submitButton = document.createElement('button');
        submitButton.setAttribute('type', buttonType);
        submitButton.innerHTML = buttonText;
        return submitButton;
    }

    function getDayOfWeek() {
        var day = new Date();
        var dayOfWeek;
        var weekdays = new Array(7);
        weekdays[0]=  "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";

        dayOfWeek = weekdays[day.getDay()];
        return dayOfWeek;
    }

    return Container;
});