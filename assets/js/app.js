// Load the angular application
var app = angular.module('sikre', ['satellizer']);

app.config(function($authProvider) {

    // Facebook
    $authProvider.facebook({
        clientId: '971498276209878',
        url: '/auth/facebook/login',
        authorizationEndpoint: 'https://www.facebook.com/dialog/oauth',
        redirectUri: window.location.origin + '/',
        scope: 'email',
        scopeDelimiter: ',',
        requiredUrlParams: ['display', 'scope'],
        display: 'popup',
        type: '2.0',
        popupOptions: { width: 481, height: 269 }
    });

    // Google+
    $authProvider.google({
        clientId: '1075871883509-gqm88vara6jqf58a11rs1jb38qbsps6v.apps.googleusercontent.com',
        url: '/auth/google/login',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: window.location.origin,
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
        url: '/auth/linkedin/login',
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
        url: '/auth/twitter/login',
        type: '1.0',
        popupOptions: { width: 495, height: 645 }
    });

    // GitHub
    $authProvider.github({
        clientId: '2d769d69d5106d8838ee',
        name: 'github',
        url: '/auth/github/login',
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        redirectUri: window.location.origin,
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
app.run(function($timeout){
    $timeout(function() {
        $(document).foundation();
    }, 500);
});
