/**

"MbTogglePopup"

*/

;(function(global, $) {
	'use strict';

	var wrap, child, el,

	MbTogglePopup = function(el) {
		this.el = el;
	};

	MbTogglePopup.wrapper = 'underfind';

	MbTogglePopup.itOver = function(e) {
		
		MbTogglePopup.wrapper.addClass('active');

		$('body').bind('click', function(e) {
			el = $(e.target),
			wrap = el
			            .hasClass('toggle-popup active'),
		    child = el.parents()
		                .hasClass('toggle-popup active');
			
			if(wrap || child) {
				return false;
			} else {
				MbTogglePopup.itOut();
				$(this).unbind('click');
			}
		});
	};

	MbTogglePopup.itOut  = function(e) {
		MbTogglePopup.wrapper.removeClass('active');
	};

	MbTogglePopup.prototype = {
		cachEvt: function(e) {
			var el  = $(e.target);
			
			if(el.hasClass('icon')) {
				MbTogglePopup.wrapper = el.parent('.toggle-popup');
				switch(!MbTogglePopup.wrapper.hasClass('active')) {
					case true:
						MbTogglePopup.itOver(e);
						break;
					case false:
						MbTogglePopup.itOut(e);
						break;
					default:
						return false;
				}

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

	var mbTogglePopup = new MbTogglePopup($('.toggle-popup'));
	mbTogglePopup.init();

}(this, jQuery));