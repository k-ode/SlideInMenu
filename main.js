var SlideInMenu = function () {
    this.menuItems = ko.observableArray([
        { name: 'Menu 1' },
        { name: 'Menu 2' },
        { name: 'Menu 3' },
        { name: 'Menu 4' }
    ]);

    this.deleteMenuItem = function (menuItem) {
        this.menuItems.remove(menuItem);
    }.bind(this);
};

ko.bindingHandlers.menuSlider = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var val = valueAccessor(),
            animateCls = ko.unwrap(val.animateCls),
            animateEl = ko.unwrap(val.animateEl),
            clickEl = ko.unwrap(val.clickEl);

       var $clickEl = $(element).find(clickEl),
           $animateEl = $(element).find(animateEl);
        
        $clickEl.on('click', function (e) {
            $(document).trigger('click.menuSlider'); // Clear earlier delete boxes
            $(document).on('click.menuSlider', function () {
                $animateEl.removeClass(animateCls);
                $(document).off('click.menuSlider');
            });
            
            $animateEl.addClass(animateCls);
            
            // Needed to not trigger document click when bubbling
            e.stopPropagation();
        });
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    
    }
};   

ko.applyBindings(new SlideInMenu());
