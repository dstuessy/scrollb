/*!
 * scrollb.js
 *
 * @author: Daniel Stuessy 
 * @version: 1.0
 * @description: A JavaScript class for making custom HTML scrollbars.
 */
var ScrollBar = (function(){

	/**
	 * A Class representing a scroll bar.
	 *
	 * It takes a few options as parameters
	 * then creates and attaches a div element
	 * to a given parent to act as a scrollbar.
	 *
	 * @param {object} options A JavaScript hash table holding values for the scrollbar.
	 * @return {undefined}
	 */
	function ScrollBar (options) {
		
		// SET PROPERTIES
		this.id = options.id;
		this.selector = options.selector;
		this.el = document.querySelector( this.selector );
		this.scrollEl = document.createElement('div');
		this.parentEl = this.el.parentNode;
		this.mousedown = false;
		this.duringScroll = ( options.duringScroll || function () {} );
		this.endScroll = ( options.endScroll || function () {} );
		this.outerHeight;
		this.scrollHeight;
		this.ratio;
		this.height;
		 
		// SET SIZE
		this.setSize();
		// SET POSITION
		this.setPosition();

		// DISPLAY SCROLLBAR
		this.display();

		// SET POSITION
		this.setPosition();
		this.display();

		// SET EVENT LISTENERS
		this.setEventListeners();
	}

	// SET PROTOTYPE FUNCTIONS
	/**
	 * Sets the CSS properties for the ScrollBar,
	 * then appends it to the parentNode of the
	 * this.el element.
	 *
	 * @return {undefined}
	 */
	ScrollBar.prototype.display = function () {

		this.scrollEl.id = this.id;

		this.scrollEl.style.position = 'absolute';
		this.scrollEl.style.height = this.height + 'px';
		this.scrollEl.style.top = this.top + 'px'; 
		this.scrollEl.style.left = this.right + 'px';

		this.parentEl.appendChild(this.scrollEl);
	};
	/**
	 * Sets the size of the ScrollBar.
	 *
	 * Obtains ratio and times it by the scrollbar's
	 * outerHeight.
	 *
	 * Rounds the height.
	 *
	 * @return {undefined}
	 */
	ScrollBar.prototype.setSize = function () {

		this.setRatio();

		// set height
		this.height = this.outerHeight * this.ratio;
		// round height
		this.height = Math.round( this.height );
	};
	/**
	 * Sets the top and right position of the
	 * scroll bar.
	 *
	 * @return {undefined}
	 */
	ScrollBar.prototype.setPosition = function () {

		this.top = this.el.offsetTop + this.el.clientTop + (this.el.scrollTop * this.ratio);
		var rectEl = this.el.getBoundingClientRect();
		this.right = this.el.offsetLeft + this.el.clientLeft + this.el.clientWidth - this.scrollEl.clientWidth;
	};
	/**
	 * Sets the ratio fo the ScrollBar.
	 *
	 * Obtains the current heights for "this.el",
	 * and divides its "clientHeight" by its
	 * "scrollHeight".
	 *
	 * @return {undefined}
	 */
	ScrollBar.prototype.setRatio = function () {

		this.setHeights();
		
		this.ratio = this.outerHeight / this.scrollHeight;
	};
	/**
	 * Obtains the heights of the ScrollBar's
	 * "this.el" element: clientHeight and 
	 * scrollHeight.
	 *
	 * @return {undefined}
	 */
	ScrollBar.prototype.setHeights = function () {

		this.outerHeight = this.el.clientHeight;
		this.scrollHeight = this.el.scrollHeight;
	};
	/**
	 * Sets all the event listeners for the ScrollBar.
	 *
	 * @return {undefined}
	 */
	ScrollBar.prototype.setEventListeners = function () {
		
		var self = this;
		var scrollEl = document.getElementById(this.id);
		var body = document.getElementsByTagName('body')[0];

		// ON SCROLL EVENT 
		this.el.onscroll = function () {

			self.setPosition();
			self.display();
		};

		// ON MOUSEDOWN 
		this.scrollEl.onmousedown = function () {

			self.mousedown = true;

			body.style['cursor'] = 'default';
			body.style['-webkit-touch-callout'] = 'none';
			body.style['-webkit-user-select'] = 'none';
			body.style['-khtml-user-select'] = 'none';
			body.style['-moz-user-select'] = 'none';
			body.style['-ms-user-select'] = 'none';
			body.style['user-select'] = 'none';

			self.duringScroll(self);
		};

		// ON MOUSEUP
		window.onmouseup = function () {

			self.mousedown = false;

			body.style['cursor'] = '';
			body.style['-webkit-touch-callout'] = '';
			body.style['-webkit-user-select'] = '';
			body.style['-khtml-user-select'] = '';
			body.style['-moz-user-select'] = '';
			body.style['-ms-user-select'] = '';
			body.style['user-select'] = '';

			self.endScroll(self);
		};

		// ON MOUSEMOVE
		window.onmousemove = function (e) {
			if (self.mousedown) {

				var mousemoveX = e.movementX;
				var mousemoveY = e.movementY;

				var mousemove = mousemoveY;

				self.el.scrollTop = self.el.scrollTop + (mousemove / self.ratio);
			}
		};
	};

	return ScrollBar;
})();

