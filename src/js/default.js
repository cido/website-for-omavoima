(function () {

	var page = {

		initialize: function () {
			var self = this;

			this._detectCssSupportFor('box-shadow');

			if (this._supportsSvg() === false) {
				var logo = document.getElementById('logo');
				logo.setAttribute('src', logo.getAttribute('data-fallback-src'));
			}

			window.addEventListener('resize', this._initializeFacebookLikeBox.bind(this));
			this._initializeFacebookLikeBox();

		},

		_supportsSvg: function () {
			return !! document.createElementNS &&
				!! document.createElementNS ('http://www.w3.org/2000/svg', "svg").createSVGRect;
		},

		// Adapted from http://www.sitepoint.com/detect-css3-property-browser-support/
		_detectCssSupportFor: function (cssPropertyWithDashes) {
			var cssProperty1 = this._toCamelCase(cssPropertyWithDashes);
			var cssProperty2 = this._capitaliseFirstLetter(cssProperty1);
			var d = document.createElement("detect");
			var cssPrefixes = ["Webkit", "Moz", "O", "ms", "Khtml"];
			var checkThese = (cssProperty1 + "," + cssPrefixes.join(cssProperty2 + ",") + cssProperty2).split(",");
			for (var n = 0, np = checkThese.length; n < np; n++) {
				if (d.style[checkThese[n]] === "") {
					document.getElementsByTagName("html")[0].className += " " + cssPropertyWithDashes;
					break;
				}
			}
		},

		_toCamelCase: function (str) {
			return str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
		},

		_capitaliseFirstLetter: function(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		},

		_elementIsVisible: function (element) {
			return (element && element.offsetWidth > 0 && element.offsetHeight > 0);
		},

		_likeBoxInitialized: false,
		_initializeFacebookLikeBox: function () {
			if (this._likeBoxInitialized === false) {

				var d = document;
				var sidebar = d.getElementsByTagName('aside')[0];

				if (this._elementIsVisible(sidebar)) {

					var likebox = d.getElementById('fb-like-box');
					var likeBoxHeight = Math.max(400, parseInt(window.innerHeight*0.8, 10));
					likebox.setAttribute('data-height', likeBoxHeight);

					var s = 'script';
					var id = 'facebook-jssdk';
					var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) return;
					js = d.createElement(s); js.id = id;
					js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=216895838369307";
					fjs.parentNode.insertBefore(js, fjs);
					this._likeBoxInitialized = true;

				}
			}
		}
	};

	page.initialize();

})();