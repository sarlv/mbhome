/**

"MbSwitch"

*/

;(function(global, $) {
	'use strict';

	var MbSwitch = function(el) {
		this.el = el;
	};

	MbSwitch.callback = function() {
		// TO DO
	};

	MbSwitch.prototype = {
		cachEvt: function(e) {
			var targ = ($(e.target).get(0).tagName !== 'LI')
						? $(e.target).parents('li')
						: $(e.target);
			
			if(!targ.hasClass('active')) {
				this.el.find('.active').removeClass('active');
				targ.addClass('active');
				MbSwitch.callback();
			}
		},

		init: function() {
			var self = this;
			$(window).load(function(e) {
				self.el
					.on('click', function(e) {
						e.preventDefault();
						self.cachEvt(e);
					});
			});
		}
	}

	var mbSwitch = new MbSwitch($('.switch-button'));
	mbSwitch.init();

}(this, jQuery));