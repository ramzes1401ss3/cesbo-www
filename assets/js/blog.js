(function() {
'use strict';

var searchIndex = null,
	searchOpts = {
		bool: "AND",
		expand: true,
		fields: {
			title: { boost: 2 },
			body: { boost: 1 },
		},
	},
	searchBar = $('#search-bar'),
	searchClear = $('#search-clear'),
	tagSelect = $('#tag-select');

function clear() {
	$('.blog-item.d-none').forEach(function(item) {
		item.classList.remove('d-none');
	});
}

function doFilter(val) {
	$('.blog-item:not(.d-none)').forEach(function(item) {
		if(item.dataset.tags.split(',').indexOf(val) == -1) item.classList.add('d-none');
	});
}

function doSearch(val) {
	var urls = [];
	searchIndex.search(val, searchOpts).forEach(function(item) {
		urls.push(item.doc.url);
	});
	$('.blog-item:not(.d-none)').forEach(function(item) {
		if(urls.indexOf(item.dataset.url) == -1) item.classList.add('d-none');
	});
}

function tagSelectHandler() {
	clear();
	if(!!this.value) doFilter(this.value);
	if(!!searchBar.value) doSearch(searchBar.value);
	this.blur();
}

function searchBarHandler() {
	clear();
	var val = this.value.trim();
	if(val.length > 2) doSearch(val);
	if(!!tagSelect.value) doFilter(tagSelect.value);
}

function searchClearHandler() {
	clear();
	searchBar.value = '';
	this.blur();
}

function init(index) {
	searchIndex = elasticlunr.Index.load(index);

	searchBar.removeAttribute('disabled');
	searchBar.on('input', searchBarHandler, false);

	searchClear.on('click', searchClearHandler, false);
}

$(function() {
	tagSelect.on('change', tagSelectHandler, false);

	var xmlhttp = new XMLHttpRequest(),
		lang = document.documentElement.getAttribute('lang');
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			try {
				var index = JSON.parse(xmlhttp.responseText);
				init(index);
			} catch(err) {
				console.error(err.message);
			}
		}
	};
	xmlhttp.open('GET', '/assets/js/index.' + lang + '.json', true);
	xmlhttp.send();
});

})();
