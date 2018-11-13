(function() {
'use strict';

window.$ = function() {
	var x = arguments[0];

	if(typeof(x) == 'string') {
		if(x[0] == '#') return document.getElementById(x.substring(1));
		return document.querySelectorAll(x);
	}

	if(typeof(x) == 'function') {
		document.addEventListener('DOMContentLoaded', function w() {
			document.removeEventListener('DOMContentLoaded', w, false);
			x();
		});
	}
};

Element.prototype.on = function(event, fn) {
	this.addEventListener(event, fn, false);
	return this;
};

Element.prototype.off = function(event, fn) {
	this.removeEventListener(event, fn);
	return this;
};

$(function() {
	var mainMenu = $('#main-menu');
	$('#main-menu-button').on('click', function() {
		mainMenu.classList.toggle('show');
		this.blur();
	});

	var postToc = $('#post-toc');
	if(postToc) {
		var ul, li;
		$('h2,h3').forEach(function(item) {
			if(item.tagName == 'H2') {
				ul = postToc;
			} else if(ul == postToc) {
				ul = document.createElement('ul');
				li.appendChild(ul);
			}

			li = document.createElement('li');
			ul.appendChild(li);
			var a = document.createElement('a');
			a.setAttribute('href', '#' + item.id);
			a.innerText = item.innerText;
			li.appendChild(a);
		});
	}
})

})();
