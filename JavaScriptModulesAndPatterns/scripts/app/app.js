(function () {
    require.config({
        paths: {
           'factory': 'scripts/classes/factory',
           'container': 'scripts/classes/container',
           'section': 'scripts/classes/section',
           'item': 'scripts/classes/item'
        }
    });
})();

(function() {
    require(['factory'],
        function (Factory) {
            var factory = new Factory();
            var todoContainer = factory.createContainer("todo-list", "todo-list");
            todoContainer.addToDOM();
            todoContainer.getSubmitButton().addEventListener('click', function () {
                    var newSection = factory.createSection(todoContainer.getTitleInput().value);
                    todoContainer.getTitleInput().value = '';
                    newSection.addToDOM(todoContainer.getMainSection());
                newSection.getSubmitButton().addEventListener('click', function () {
                    var newItem = factory.createItem(newSection.getItemInput().value);
                    newSection.getItemInput().value = '';
                    newItem.getItemCheckbox().addEventListener('change', function () {
                        if (newItem.getItemCheckbox().checked) {
                            newItem.getItemElement().setAttribute('class', 'checked');
                        } else {
                            newItem.getItemElement().removeAttribute('class');
                        }
                    });
                    newItem.addToDOM(newSection.getMainSection());
            })
            });
        });
})();
