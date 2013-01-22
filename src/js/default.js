(function () {

	var page = {

		initialize: function () {
			var self = this;

			var logo = document.getElementById('logo');
			//var slogan = document.getElementById('slogan');
			//var sloganTestingArea = this._addSloganTestingArea(slogan);

			this._detectCssSupportFor('box-shadow');

			if (this._supportsSvg() === false) {
				logo.setAttribute('src', logo.getAttribute('data-fallback-src'));
			}

			window.addEventListener('resize', this._initializeFacebookLikeBox.bind(this));
			this._initializeFacebookLikeBox();

		},

		_addSloganTestingArea: function (slogan) {
			var span = document.createElement('span');
			span.className = 'slogan testing-area';
			span.innerHTML = slogan.innerHTML;
			document.body.appendChild(span);
			return span;
		},

		_onResize: function (logo, slogan, testingArea) {
			if (logo.offsetWidth !== 0 && testingArea.offsetWidth !== 0) {
				var showAligned = (logo.offsetWidth * 0.46 >= testingArea.offsetWidth);
				var newClassName = (showAligned ? 'slogan aligned' : 'slogan');
				if (slogan.className !== newClassName) {
					slogan.className = newClassName;
				}
			}
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

		_likeBoxInitialized: false,
		_initializeFacebookLikeBox: function () {
			if (this._likeBoxInitialized === false) {

				var d = document;
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
	};

	page.initialize();

})();