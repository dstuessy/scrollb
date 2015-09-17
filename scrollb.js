/*!
 * @title: scrollb.js
 * @author: Daniel Stuessy 
 * @version: 1.2
 * @description: A JavaScript class for making custom HTML scrollbars.
 * @license: MIT License
 */
var ScrollBar = (function () {

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
		this.selectorID = options.selectorID;
		this.el = options.el,
		this.el = (this.selectorID != null) ? document.getElementById( this.selectorID ) : this.el;
		this.scrollEl = document.createElement('div');
		this.parentEl = this.el.parentNode;
		this.mousedown = false;
		this.beforeScrollClick = ( options.beforeScrollClick || function () {} );
		this.afterScrollClick = ( options.afterScrollClick || function () {} );
		this.duringScroll = ( options.duringScroll || function () {} ); // not currently used
		this.duringNotScroll = ( options.duringNotScroll || function () {} ); // not currently used
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
	 *
	 * @return {undefined}
	 */
	ScrollBar.prototype.setSize = function () {

		this.setRatio();

		// set height
		this.height = this.outerHeight * this.ratio;
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
		
		var scrollEl = document.getElementById(this.id);
		var body = document.getElementsByTagName('body')[0];

		// ON SCROLL EVENT 
		this.el.onscroll = function () {
			this.setPosition();
			this.display();
		}.bind(this);

		// ON MOUSEDOWN 
		this.scrollEl.onmousedown = function (e) {

			this.mousedown = true;
			this.scrollCenterY = e.offsetY;

			body.style['cursor'] = 'default';
			body.style['-webkit-touch-callout'] = 'none';
			body.style['-webkit-user-select'] = 'none';
			body.style['-khtml-user-select'] = 'none';
			body.style['-moz-user-select'] = 'none';
			body.style['-ms-user-select'] = 'none';
			body.style['user-select'] = 'none';

			this.beforeScrollClick(this);
		}.bind(this);

		// ON MOUSEUP
		window.onmouseup = function () {
			if (this.mousedown) {

				this.mousedown = false;
				this.scrollCenterX = undefined;
				this.scrollCenterY = undefined;

				body.style['cursor'] = '';
				body.style['-webkit-touch-callout'] = '';
				body.style['-webkit-user-select'] = '';
				body.style['-khtml-user-select'] = '';
				body.style['-moz-user-select'] = '';
				body.style['-ms-user-select'] = '';
				body.style['user-select'] = '';

				this.afterScrollClick(this);
			}
		}.bind(this);

		// ON MOUSEMOVE
		window.onmousemove = function (e) {
			if (this.mousedown) {
				var mouseY = e.clientY;
				var mouseDeltaY = e.movementY; //mouseY - (this.scrollCenterY + this.top);
				this.el.scrollTop = this.el.scrollTop + (mouseDeltaY / this.ratio);
			}
		}.bind(this);
	};

	return ScrollBar;
})();

