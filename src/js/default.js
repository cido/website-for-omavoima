(function () {

	var page = {

		initialize: function () {
			var self = this;

			var logo = document.getElementById('logo');
			var slogan = document.getElementById('slogan');
			var sloganTestingArea = this._addSloganTestingArea(slogan);

			if (this._supportsSvg() === false) {
				logo.setAttribute('src', logo.getAttribute('data-fallback-src'));
			}

			var listener = function () { self._onResize(logo, slogan, sloganTestingArea); };
			window.addEventListener('resize', listener);
			listener();

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
		}

	};

	page.initialize();

})();