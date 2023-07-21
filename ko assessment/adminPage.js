require.config({
    baseUrl: 'customFolder',
    paths: {
        'Knockout': 'knockout',
        'require' : 'require',
    },
});

require(['knockout'], function(ko){

    function AppViewModel() {
        var self = this;
        self.products = ko.observableArray([]);
        var storedData = localStorage.getItem('userData');
        self.products(JSON.parse(storedData));
        
        self.showdata= function(products){
        window.location.href="product.html"
        localStorage.setItem('productDisplay',JSON.stringify(products))
        }

        self.showdetails= function(){
            window.location.href="cartitems.html"
        }

        self.pageSize = 4;
        self.currentPageIndex = ko.observable(0);

        self.maxPageIndex = ko.computed(function () {
        return Math.ceil(self.products().length / self.pageSize) - 1;
        });


        self.pagedProducts = ko.computed(function () {
        var startIndex = self.pageSize * self.currentPageIndex();
        return self.products().slice(startIndex, startIndex + self.pageSize);
        });

        self.paginationNumbers = ko.computed(function () {
        var pages = [];
        for (var i = 0; i <= self.maxPageIndex(); i++) {
            pages.push(i + 1);
        }
        return pages;
        });

        self.previousPage = function () {
        if (self.currentPageIndex() > 0) {
            self.currentPageIndex(self.currentPageIndex() - 1);
        
        }};

        self.nextPage = function () {
        if (self.currentPageIndex() < self.maxPageIndex()) {
            self.currentPageIndex(self.currentPageIndex() + 1);
        }};

        self.goToPage = function (pageIndex) {
        self.currentPageIndex(pageIndex - 1);
        };

        self.isActivePage = function (pageIndex) {
        return self.currentPageIndex() === (pageIndex - 1);
        };

        self.searchInput= ko.observable();

        self.obj = ko.observableArray([]);

        self.searchButton = function() {
            var searchTerm = self.searchInput();
            self.obj([]);

            self.products().forEach(function(product) {
                for (const key in product) {
                    if (product[key].indexOf(searchTerm) != -1) {
                        self.obj.push(product);
                        break; 
                    }
                }
            });
        };

        self.showTableData = ko.computed(function() {
            if (self.obj().length > 0) {
                return self.obj();
            } else {
                return self.pagedProducts();
            }
        });
    }

    ko.applyBindings(new AppViewModel());

})
