(function () {

	// Adapted from Underscore.js 1.4.4
	var bind = function(func, context) {
		var args = Array.prototype.slice.call(arguments, 2);
		return function() {
			return func.apply(context, args.concat(Array.prototype.slice.call(arguments)));
		};
	};

	var page = {

		initialize: function () {
			var self = this;

			this._detectCssSupportFor('box-shadow');

			if (this._supportsSvg() === false) {
				var logo = document.getElementById('logo');
				logo.setAttribute('src', logo.getAttribute('data-fallback-src'));
			}

		},

		_supportsSvg: function () {
			return !! document.createElementNS &&
				!! document.createElementNS ('http://www.w3.org/2000/svg', "svg").createSVGRect;
		},

		_toCamelCase: function (str) {
			return str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
		},

		_capitaliseFirstLetter: function(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
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
		}

	};

	page.initialize();

})();