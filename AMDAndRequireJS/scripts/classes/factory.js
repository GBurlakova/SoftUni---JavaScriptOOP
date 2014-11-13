define(['container', 'section', 'item'], function (Container, Section, Item) {
    var Factory = (function Factory(Container, Section, Item) {
        function Factory() {
        }

        Factory.prototype.createContainer = function createContainer(id, cssClass) {
            return new Container(id, cssClass);
        };

        Factory.prototype.createSection = function createSection(headerText) {
            return new Section(headerText);
        };

        Factory.prototype.createItem = function createItem(text) {
            return new Item(text);
        };

        return Factory;
    })(Container, Section, Item);

    return Factory;
});