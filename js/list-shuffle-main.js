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
    this.rightItems = ko.observableArray([
      new Item("Item4", 444)
    ]);

    this.selectedLeft = ko.observableArray([]);
    this.selectedRight = ko.observableArray([]);
  }

  ViewModel.prototype.move = function(selectedItems, fromList, toList) {
    selectedItems().forEach(function(selectedItem) {
      if (selectedItem) {
        toList.push(selectedItem);
        fromList.remove(selectedItem);
      }
    }, this);
  };

  ViewModel.prototype.moveLeft = function() {
    this.move(this.selectedRight, this.rightItems, this.leftItems);
  };

  ViewModel.prototype.moveRight = function() {
    this.move(this.selectedLeft, this.leftItems, this.rightItems);
  };

  ViewModel.prototype.setMoveOne = function(option, item) {
    var fn = function() {
      this.moveItemToOther(item);
    };
    ko.applyBindingsToNode(option, {event: {dblclick: fn}}, this);
  };

  ViewModel.prototype.moveItemToOther = function(item) {
    var existsInLeft = this.leftItems.indexOf(item) >= 0;
    var existsInRight = this.rightItems.indexOf(item) >= 0;

    if (existsInLeft) {
      this.leftItems.remove(item);
      this.rightItems.push(item);
    }

    if (existsInRight) {
      this.rightItems.remove(item);
      this.leftItems.push(item);
    }
  };

  $(document).ready(function() {
    ko.applyBindings(new ViewModel());
  });
});