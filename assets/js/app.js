// Load the angular application
var mainAPIUrl = 'https://api.sikr.io/v1/';

// Timeouts. When reached, the content disappears.
var serviceTimeout = 30000; // 30 seconds
var itemTimeout = 300000; // 5 minutes

var app = angular.module('sikre', [
  'satellizer',
  'sikre.services',
  'sikre.controllers',
  'sikre.directives']);

app.config(function ($httpProvider, $authProvider) {

  // CORS
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  // Auth
  $authProvider.loginOnSignup = true;
  $authProvider.loginRedirect = '/';
  $authProvider.logoutRedirect = '/';
  $authProvider.signupRedirect = '/login';
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/login';
  $authProvider.loginRoute = '/login';
  $authProvider.signupRoute = '/login';
  $authProvider.tokenName = 'token';
  $authProvider.tokenPrefix = 'sikr'; // Local storage name prefix
  $authProvider.unlinkUrl = '/unlink/';

  // Facebook
  $authProvider.facebook({
    clientId: '971498276209878',
    url: 'https://api.sikr.io/v1/auth/facebook/login',
    authorizationEndpoint: 'https://www.facebook.com/dialog/oauth',
    redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
    scope: 'email',
    scopeDelimiter: ',',
    requiredUrlParams: ['display', 'scope'],
    display: 'popup',
    type: '2.0',
    popupOptions: { width: 481, height: 269 }
  });

  // Google+
  $authProvider.google({
    clientId: '1075871883509-hgan7d0sa90kot6redk939t7dcbk8gqh.apps.googleusercontent.com',
    url: 'https://api.sikr.io/v1/auth/google/login',
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
    scope: ['profile', 'email'],
    scopePrefix: 'openid',
    scopeDelimiter: ' ',
    requiredUrlParams: ['scope'],
    optionalUrlParams: ['display'],
    display: 'popup',
    type: '2.0',
    popupOptions: { width: 452, height: 633 }
  });

  // LinkedIn
  $authProvider.linkedin({
    url: 'https://api.sikr.io/v1/auth/linkedin/login',
    authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
    redirectUri: window.location.origin,
    requiredUrlParams: ['state'],
    scope: [],
    scopeDelimiter: ' ',
    state: 'STATE',
    type: '2.0',
    popupOptions: { width: 527, height: 582 }
  });

  // Twitter
  $authProvider.twitter({
    url: 'https://api.sikr.io/v1/auth/twitter/login',
    type: '1.0',
    popupOptions: { width: 495, height: 645 }
  });

  // GitHub
  $authProvider.github({
    clientId: '2d769d69d5106d8838ee',
    url: 'https://api.sikr.io/v1/auth/github/login',
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
    scope: [],
    scopeDelimiter: ' ',
    type: '2.0',
    popupOptions: { width: 1020, height: 618 }
  });
});

// Load foundation JS
$(document).foundation();

// Okay, this is a big pile of shit. Apparently foundation and angularjs don't
// get along very well, so we have to fire again foundation after the angular
// application is finished rendering. Otherwise the navigations and accordions
// will stop working inside ng-repeat
app.run(function ($timeout, $rootScope) {
  $rootScope.$on('$routeChangeSuccess', function () {
    $(document).foundation('reflow');
  });
  $timeout(function () {
    $(document).foundation({
      offcanvas : {
        // Sets method in which offcanvas opens.
        // [ move | overlap_single | overlap ]
        open_method: 'move',
        // Should the menu close when a menu link is clicked?
        // [ true | false ]
        close_on_click : true
      }
    });
    $('.off-canvas-wrap').foundation('offcanvas', 'toggle', 'move-right');

  }, 500);
});
