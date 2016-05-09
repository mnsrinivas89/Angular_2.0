import {Component} from 'angular2/core';
import {FacebookService} from './../services/fb';

@Component({
	selector: 'facebookSection',
    templateUrl : './app/templates/facebookTemplate.html',
	providers: [FacebookService],
	
})
export class facebookSection implements OnInit { 
	
	/**
		constructor function by implementing the utitlity services/utility
	**/
	constructor(private _facebookService: FacebookService) { }
	
	/**
		Inititalisation phase of the content class
	**/
	ngOnInit() {
		this.albumData = [];
		this.sdkLoaded = false;
		this.fb_status = "not_connected";
		this.app_status = "not_connected";
		this.updateLoaderMsg("Checking FB and App login Status . . . ");
		let _this = this;
		// load facebook SDK to use the properties of it
		let myPromise = this._facebookService.initFB();
		myPromise.then(function (response) {
			_this.authChangeCallback(response);
		},
		function () {
			alert("Error in FB");
		});
		
		setTimeout(function () {
		_this.fb_status = "sadasfdsjfnwceormweiorv";
			if(_this.fb_status === "not_connected" && _this.app_status === "not_connected"){
				_this.updateLoaderMsg("Seems like you have not logged in to the FB. please login by tapping the below icon ");
			}
		}, 10000);
	}
	
	authChangeCallback (response) {
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
		} else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
			console.log('Please log into this app.');
			this.fb_status = "connected";
			this.app_status = "not_connected";
			this.updateLoaderMsg("Seems like you have logged in to the FB but not used the application . please login by tapping the below icon ");
		} else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
			this.fb_status = "not_connected";
			this.app_status = "not_connected";
			this.updateLoaderMsg("Seems like you have not logged in to the FB. please login by tapping the below icon ");
		}
	}
	
	/**
	fetch the album list for the logged in user
	**/
	getAlbumsList () {
		let albumPromise = this._facebookService.getListofAlbums(),
			_this = this;
		albumPromise.then(function(response){
			_this.loadAlbumData(response);
		}, function(response){
			_this.errorWhileFetchingAlbums(response);
		});
	}

	loadAlbumData (response) {
		console.log("inside loadAlbumData");
		this.albumData = response.data;
		console.log(response);
		/*$('#modal-content').modal({
			show: true
		});*/
	}

	getAlbumPhotos (albumID) {
		let albumPhotosPromise = this.facebookService.getListofPhotos(albumID);
	}
	
	errorWhileFetchingAlbums (response) {
		console.log("errorWhileFetchingAlbums");
	}	
	
	updateLoaderMsg (message) {
		$("facebookSection .loaderMessage").html(message);
	}
	
	hideLoaderMsg () {
		$("facebookSection .loaderMessage").hide();
	}
	
	loginToFB() {
		this._facebookService.logintoFacebook();
	}
