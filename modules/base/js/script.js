/**

"MbSwitch"

*/

;(function(global, $) {
	'use strict';

	var MbDelete = function(el) {
		this.el = el;
	};

	MbDelete.callback = function() {
		// TO DO
	};

	MbDelete.prototype = {
		cachEvt: function(e) {
			var targ = e;
			targ.parent().remove();
		},

		init: function() {
			var self = this;
			$(window).load(function(e) {
				self.el
					.on('click', function(e) {
						e.preventDefault();
						self.cachEvt($(this));
					});
			});
		}
	}

	var mbDelete = new MbDelete($('.delete'));
	mbDelete.init();

}(this, jQuery));