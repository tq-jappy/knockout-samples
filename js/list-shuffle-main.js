requirejs(['jquery', 'knockout'],
function($, ko) {

  function Item(name, value) {
    this.name = name;
    this.value = value;
  }

  function ViewModel() {
    this.leftItems = ko.observableArray([
        new Item("Item1", 111),
        new Item("Item2", 222),
        new Item("Item3", 333)
    ]);
    this.rightItems = ko.observableArray([]);

    this.selectedLeft = ko.observableArray([]);
    this.selectedRight = ko.observableArray([]);

    this.move = function(selectedItems, fromList, toList) {
      selectedItems.forEach(function(value) {
        var selectedItem = ko.utils.arrayFirst(fromList(), function(item) {
          return value === item.value;
        });

        if (selectedItem) {
          toList.push(selectedItem);
          fromList.remove(selectedItem);
        }
      }, this);
    };

    this.moveLeft = function() {
      this.move(this.selectedLeft(), this.leftItems, this.rightItems);
    };

    this.moveRight = function() {
      this.move(this.selectedRight(), this.rightItems, this.leftItems);
    };
  }

  $(document).ready(function() {
    ko.applyBindings(new ViewModel());
  });
});