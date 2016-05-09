System.register(['angular2/core', './../services/fb'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, fb_1;
    var facebookSection;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (fb_1_1) {
                fb_1 = fb_1_1;
            }],
        execute: function() {
            facebookSection = (function () {
                /**
                    constructor function by implementing the utitlity services/utility
                **/
                function facebookSection(_facebookService) {
                    this._facebookService = _facebookService;
                }
                /**
                    Inititalisation phase of the content class
                **/
                facebookSection.prototype.ngOnInit = function () {
                    this.albumData = [];
                    this.sdkLoaded = false;
                    this.fb_status = "not_connected";
                    this.app_status = "not_connected";
                    this.updateLoaderMsg("Checking FB and App login Status . . . ");
                    var _this = this;
                    // load facebook SDK to use the properties of it
                    var myPromise = this._facebookService.initFB();
                    myPromise.then(function (response) {
                        _this.authChangeCallback(response);
                    }, function () {
                        alert("Error in FB");
                    });
                    setTimeout(function () {
                        _this.fb_status = "sadasfdsjfnwceormweiorv";
                        if (_this.fb_status === "not_connected" && _this.app_status === "not_connected") {
                            _this.updateLoaderMsg("Seems like you have not logged in to the FB. please login by tapping the below icon ");
                        }
                    }, 10000);
                };
                facebookSection.prototype.authChangeCallback = function (response) {
                    this.fb_status = "ZxzxzXZ";
                    console.log("inside authChangeCallback");
                    // The response object is returned with a status field that lets the
                    // app know the current login status of the person.
                    // Full docs on the response object can be found in the documentation
                    // for FB.getLoginStatus().
                    if (response.status === 'connected') {
                        // Logged into your app and Facebook.
                        console.log("logged into facebook");
                        console.log(this);
                        this.fb_status = "connected";
                        this.app_status = "connected";
                        this.getAlbumsList();
                    }
                    else if (response.status === 'not_authorized') {
                        // The person is logged into Facebook, but not your app.
                        console.log('Please log into this app.');
                        this.fb_status = "connected";
                        this.app_status = "not_connected";
                        this.updateLoaderMsg("Seems like you have logged in to the FB but not used the application . please login by tapping the below icon ");
                    }
                    else {
                        // The person is not logged into Facebook, so we're not sure if
                        // they are logged into this app or not.
                        this.fb_status = "not_connected";
                        this.app_status = "not_connected";
                        this.updateLoaderMsg("Seems like you have not logged in to the FB. please login by tapping the below icon ");
                    }
                };
                /**
                fetch the album list for the logged in user
                **/
                facebookSection.prototype.getAlbumsList = function () {
                    var albumPromise = this._facebookService.getListofAlbums(), _this = this;
                    albumPromise.then(function (response) {
                        _this.loadAlbumData(response);
                    }, function (response) {
                        _this.errorWhileFetchingAlbums(response);
                    });
                };
                facebookSection.prototype.loadAlbumData = function (response) {
                    console.log("inside loadAlbumData");
                    this.albumData = response.data;
                    console.log(response);
                };
                facebookSection.prototype.getAlbumPhotos = function (albumID) {
                    var albumPhotosPromise = this._facebookService.getListofPhotos(albumID), _this = this;
                    albumPhotosPromise.then(function (response) { return _this.loadAlbumPhotos(response); }, function (response) { return _this.errorWhileFetchingPhotos; });
                };
                facebookSection.prototype.loadAlbumPhotos = function (response) {
                    $('#modal-content').modal({
                        show: true
                    });
                    this.selectedAlbumPhotos = response.data;
                    console.log(response);
                };
                facebookSection.prototype.errorWhileFetchingPhotos = function (response) {
                    console.log("errorWhileFetchingPhotos");
                };
                facebookSection.prototype.errorWhileFetchingAlbums = function (response) {
                    console.log("errorWhileFetchingAlbums");
                };
                facebookSection.prototype.updateLoaderMsg = function (message) {
                    $("facebookSection .loaderMessage").html(message);
                };
                facebookSection.prototype.hideLoaderMsg = function () {
                    $("facebookSection .loaderMessage").hide();
                };
                facebookSection.prototype.loginToFB = function () {
                    this._facebookService.logintoFacebook();
                };
                facebookSection = __decorate([
                    core_1.Component({
                        selector: 'facebookSection',
                        templateUrl: './app/templates/facebookTemplate.html',
                        providers: [fb_1.FacebookService],
                    }), 
                    __metadata('design:paramtypes', [fb_1.FacebookService])
                ], facebookSection);
                return facebookSection;
            }());
            exports_1("facebookSection", facebookSection);
        }
    }
});
