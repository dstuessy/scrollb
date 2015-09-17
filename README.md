# scrollb.js
JavaScript library for custom scrollbars.

###How To Use:

To add the library to your code use the following. 
Client side HTML:

```html
<script type="text/javascript" src="scrollb.js"></script>
```

Then use the following code to add a scrollbar to a given element.

```javascript
new ScrollBar({
	id: "scroll_bar",
	selectorID: "outerID",
	beforeScrollClick: function (scrollBar) {
		scrollBar.scrollEl.style.backgroundColor = "#333";
	},
	afterScrollClick: function (scrollBar) {
		scrollBar.scrollEl.style.backgroundColor = "#000";
	}
});
```

This needs to proceed the element to which you want to attach the scrollbar.

* **"id"** represents the element id to be set to the new scrollbar element. 
* **"selectorID"** represents the 'id' of the elment for which to create a scrollbar.
* **"el"** represents the HTML object (document.getElementById('anElement')) for which to create a scrollbar.
* **"beforeScrollClick"** represents the function to be executed when the scrollbar starts scrolling. This is executed on mousedown of the scroll bar element.
* **"afterScrollClick"** represents the function to be executed when the scrollbar stops scrolling. This is executed on mouseup of the window object.

###Notes on CSS.

By default the scrollbar has no CSS styling. This means it won't necessarily be visible. To reverse this, add your own in a '.css' file or 'style' element. 

