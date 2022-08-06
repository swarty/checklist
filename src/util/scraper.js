/* eslint-disable */
var EPriority;
(function (EPriority) {
    EPriority["HIGH"] = "high";
    EPriority["MEDIUM"] = "medium";
    EPriority["LOW"] = "low";
})(EPriority || (EPriority = {}));
function scraper() {
    var sectionList = document.querySelectorAll('[data-section');
    var elementList = [];
    sectionList.forEach(function (section) {
        var group = section.dataset.section;
        var listItem = section.querySelectorAll('[data-item-id]');
        listItem.forEach(function (task) {
            var priority = 3;
            if (task.dataset.itemPriority === EPriority.HIGH) {
                priority = 1;
            }
            else if (task.dataset.itemPriority === EPriority.MEDIUM) {
                priority = 2;
            }
            var title = {
                description: task.querySelector('.label__description').textContent.replaceAll('"', '\'')
            };
            if (task.querySelector('.label__title')) {
                title.prefix = task.querySelector('.label__title').textContent;
            }
            var tags = Array.from(task.querySelectorAll('.c-tags__item')).map(function (tag) { return tag.textContent; });
            var additionData = Array.from(task.querySelectorAll('.documentation__list li')).map(function (listItem) {
                var tag = listItem.querySelector('a');
                var title = tag.textContent.replaceAll('"', '\'');
                var link = tag.href;
                return {
                    title: title,
                    link: link
                };
            });
            elementList.push({
                group: group,
                priority: priority,
                title: title,
                tags: tags,
                additionData: additionData
            });
        });
    });
    return elementList;
}
/* eslint-enable */
