angular.module('sikre.controllers', [])

  .controller('AuthCtrl', function ($scope, $auth) {

    $scope.isAuthenticated = function () {
      return $auth.isAuthenticated();
    };

    $scope.authenticate = function (provider) {
      $auth.authenticate(provider).then(function () {
        window.location.href = '/app.html';
      });
    };

    $scope.logout = function () {
      $auth.logout().then(function () {
        jQuery.notify("You have been logged out", "error");
        window.location.href = '/login.html';
      });
    };
  })

  .controller('ShareCtrl', function ($scope, $compile, sikreAPIservice) {

    $scope.confirmshare = function (share) {
      $scope.share.resource = $('#shareResource').val();
      $scope.share.resource_id = $('#shareResourceID').val();
      sikreAPIservice.shareThis(share)
        .success(function () {
          $scope.share = null;
          $('#shareWith').foundation('reveal', 'close');
          jQuery.notify("Notification sent", "success");
        })
        .error(function () {
          jQuery.notify("ERROR", "error");
        });
      console.log(share);
    };

    $scope.addshare = function (type, id) {
      $('#shareWith').foundation('reveal', 'open');
      $('#shareResource').val(type);
      $('#shareResourceID').val(id);
    };
  })

  .controller('CategoriesCtrl', function ($scope, sikreAPIservice) {

    $scope.getcategories = function () {
      sikreAPIservice.getCategories()
        .success(function (response) {
          $scope.categoryList = response;
        })
        .error(function () {
          jQuery.notify("Can't access the API to get the categories.", "error");
        });
      $(document).foundation('reflow');
    };

    $scope.update = function () {
      sikreAPIservice.getCategories()
        .success(function (response) {
          $scope.categoryList = response;
        })
        .error(function () {
          jQuery.notify("Can't access the API to get the categories.", "error");
        });
      $(document).foundation('reflow');
    };

    $scope.getcategory = function (category) {
      sikreAPIservice.getCategory(category)
        .success(function (response) {
          $scope.category = response;
        })
        .error(function () {
          jQuery.notify("Can't get the category", "error");
        });
    };

    $scope.addcategory = function (category) {
      sikreAPIservice.createCategory(category)
        .success(function () {
          jQuery.notify("Category saved", "success");
          $scope.category = null;
          $('#addItem').foundation('reveal', 'close');
        })
        .error(function () {
          jQuery.notify("Can't save the category", "error");
        });
    };

    $scope.savecategory = function (category) {
      sikreAPIservice.saveCategory(category)
        .success(function () {
          jQuery.notify("Category saved", "success");
        })
        .error(function () {
          jQuery.notify("Can't save the category", "error");
        });
    };

    $scope.deletecategory = function (category) {
      sikreAPIservice.deleteCategory(category)
        .success(function () {
          jQuery.notify("Category deleted", "success");
          $('#confirmCategoryDelete').foundation('reveal', 'close');
        })
        .error(function () {
          jQuery.notify("Can't delete category", "error");
        });
    };
  })

  .controller('ItemsCtrl', function ($scope, $compile, $rootScope, sikreAPIservice) {

    $scope.getitemcategories = function () {
      sikreAPIservice.getCategories()
        .success(function (response) {
          $scope.categoryList = response;
        })
        .error(function () {
          jQuery.notify("Can't access the API to get the categories.", "error");
        });
      $(document).foundation('reflow');
    };

    $scope.createservice = function (itemId) {
      $('#addObject').foundation('reveal', 'open');
      $("#serviceItem").val(itemId);
    };

    $scope.getitem = function (item) {
      sikreAPIservice.getItem(item)
        .success(function (response) {
          $scope.item = response;
        })
        .error(function () {
          jQuery.notify("Can't get the item", "error");
        });
      $(document).foundation('reflow');
    };

    $scope.additem = function (item) {
      sikreAPIservice.createItem(item)
        .success(function () {
          jQuery.notify("Item created", "success");
          $('#addItem').foundation('reveal', 'close');
          $rootScope.$broadcast('updateItems', $scope.item.category);
          $scope.item = null;
        })
        .error(function () {
          jQuery.notify("Can't save the item", "error");
        });
    };

    $scope.saveitem = function (item) {
      sikreAPIservice.saveItem(item)
        .success(function () {
          jQuery.notify("Item updated", "success");
        })
        .error(function () {
          jQuery.notify("Can't save the item", "error");
        });
    };

    $scope.confirmdeleteitem = function (itemId) {
      $('#confirmItemDelete').foundation('reveal', 'open');
      // If there is a button, delete it
      if ($('#itemDeleteButtons').find('#deleteitem').length !== 0) {
        $('#itemDeleteButtons').empty();
      }
      var html = "<a id='deleteitem' href='#' class='alert button tiny' ng-click='deleteitem(" + itemId + ")'>Go for it!</a>";
      var template = angular.element(html);
      var linkFn = $compile(template);
      var element = linkFn($scope);
      $("#itemDeleteButtons").append(element);
    };

    $scope.deleteitem = function (item) {
      sikreAPIservice.deleteItem(item)
        .success(function () {
          jQuery.notify("Item deleted", "success");
          $rootScope.$broadcast('deleteItem', $scope.item.category);
          $('#confirmItemDelete').foundation('reveal', 'close');
        })
        .error(function () {
          jQuery.notify("Can't delete item", "error");
        });
    };
  })

  .controller('ServiceCtrl', function ($scope, sikreAPIservice) {

    $scope.getservices = function () {
      sikreAPIservice.getServices()
        .success(function (response) {
          $scope.serviceList = response;
        })
        .error(function () {
          jQuery.notify("Can't access the API to get the services.", "error");
        });
      $(document).foundation('reflow');
    };

    $scope.getservice = function (service) {
      sikreAPIservice.getService(service)
        .success(function (response) {
          $scope.service = response;
        })
        .error(function () {
          jQuery.notify("Can't get the service", "error");
        });
      $(document).foundation('reflow');
    };

    $scope.addservice = function (service) {
      $scope.service.item = $("#serviceItem").val();
      sikreAPIservice.createService(service)
        .success(function () {
          jQuery.notify("Service created", "success");
          $scope.service = null;
          $('#newService').foundation('reveal', 'close');
        })
        .error(function () {
          jQuery.notify("Can't save the service", "error");
        });
    };

    $scope.saveservice = function (service) {
      sikreAPIservice.saveService(service)
        .success(function () {
          jQuery.notify("Service updated", "success");
        })
        .error(function () {
          jQuery.notify("Can't save the service", "error");
        });
    };

    $scope.confirmdeleteservice = function (service) {
      $('#confirmServiceDelete').foundation('reveal', 'open', {
        success: function (data, item) {
          $("#deleteitem").attr("ng-click", "deleteitem(" + item + ")");
        },
      });
    };

    $scope.deleteitem = function (item) {
      sikreAPIservice.deleteItem(item)
        .success(function () {
          jQuery.notify("Item deleted", "success");
        })
        .error(function () {
          jQuery.notify("Can't delete item", "error");
        });
    };
  });
