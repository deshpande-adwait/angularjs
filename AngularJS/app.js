var myApp = angular.module('myApp', ['ngRoute']);

/**
 * Section START
 * Routing, templates & controllers.
**/
myApp.config(function($routeProvider) {
	
	$routeProvider
	.when('/', {
		templateUrl: 'pages/first.html',
		controller: 'mainController'
	})
	
	.when('/second', {
		templateUrl: 'pages/second.html',
		controller: 'subController1'
	})
	
	.when('/second/:num', {
		templateUrl: 'pages/second.html',
		controller: 'subController1'
	})
});
/**
 * Section END
 * Routing, templates & controllers.
**/

/**
 * Section START
 * Custom services.
**/
myApp.service('customNameService', function() {
   
    var that = this;
    this.name = 'Gargi Deshpande';
    
    this.getNameLength = function () {
      
        return that.name.length;
    };
});
/**
 * Section START
 * Custom services.
**/

myApp.controller('mainController', ['$log', '$scope', 'customNameService', function(b, a, cns) {
    
	b.info("This is the scope: ");
	b.log(a);
	b.info("This is the log itslef: ");
	b.log(b);
    
    a.name = cns.name;
    
	b.log("Person: ");	
	
    var person1 = myNameSpace.createPerson('Adwait', 'Deshpande'),
        person2 = myNameSpace.createPerson('Kanchan', 'Deshpande'),
        person3 = myNameSpace.createPerson('Gargi', 'Deshpande');
    
	a.people = [person1, person2, person3];
	myNameSpace.logPerson(a.person);
    
    a.getAddress = function(person) {
        
        return 'This is a cool address!'
    };
	
}]);

myApp.controller('subController1', ['$scope', '$timeout', '$filter', '$log', '$routeParams', 'customNameService', function($s, $t, $f, $l, $rp, cns) {
        
    $s.num = $rp.num || 1;
	$s.action = '';
	$s.response = '';
	
	/**
	 * Section START
	 * Watchers and Digest loop
	**/
	$s.$watch('action', function(newValue, oldValue) {
		$l.warn('Changed!');
		$l.log('newValue:' +newValue);
		$l.log('oldValue:' +oldValue);
	});
	
	$t(function(){		
		$s.action = 'Had Lunch?';
		$l.log('Changed again!');
	}, 4000);
	/**
	 * Section END
	 * Watchers and Digest loop
	**/
	
	/**
	 * Section START
	 * Directives and 2-way binding
	**/
	$t(function () {
		$s.action = 'Had breakfast?'
	}, 2000);
	
	$s.replyToResponse = function() {
		$t(function () {
			$s.response = 'Great I had it too!';
		}, 6000);
	};	
	/**
	 * Section END
	 * Directives and 2-way binding
	**/

    /**
     * Section START
     * Custom services.
    **/
    $s.name = cns.name;
    
    $s.$watch('name', function() {
       cns.name = $s.name; 
    });
    /**
     * Section END
     * Custom services.
    **/
	
}]);

/**
 * Section START
 * Custom directive.
**/
myApp.directive('searchResult', function() {
  
    return {
        restrict: 'EACM',
        templateUrl: 'directives/searchResult.html',
        replace: true,
        scope: {
            person: '=',
            getAddressFunction: "&"
        },
        link: function(scope, elements, attributes) {            
                    
            console.log("<<<<<< Post-linking >>>>>>");
            console.log(scope);

            if(scope.person.firstName === 'Adwait') {
                elements.removeAttr('class');
            }
        },
        transclude: true
        /*,
        compile: function(element, attributes) {
            console.log("**** Compiling **** ");
            console.log(element.html());
            console.log(attributes);
            
            return {
        */   
                /**
                 * Pre API hook is not recommended to use
                **/
                /*pre: function(scope, elements, attributes) {
                    
                    console.log("<<<<<< Pre-linking >>>>>>");
                    console.log(elements);
                    console.log(attributes);
                },*/
        /*      post: function(scope, elements, attributes) {
                    
                    console.log("<<<<<< Post-linking >>>>>>");
                    console.log(scope);
                    
                    if(scope.person.firstName === 'Adwait') {
                        elements.removeAttr('class');
                    }
                }
            };
        }
        */
    }
});
/**
 * Section END
 * Custom directive.
**/

var myNameSpace = {};
myNameSpace.createPerson = function (firstName, lastName) {

	var person = {
		firstName: firstName,
		lastName: lastName,
        address: 'Pune 14'
	};
	return person;
};
myNameSpace.logPerson = function (person) {

	console.log(person);
};