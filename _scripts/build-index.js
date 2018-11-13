#!/usr/bin/env node

'use strict';

const assets = __dirname + '/../_site/assets/js';
const fs = require('fs');
const elasticlunr = require(assets + '/elasticlunr.min.js');
const data = JSON.parse(fs.readFileSync(assets + '/content.json'));

for(let [lang, value] of Object.entries(data)) {
	const fname = 'index.' + lang + '.json';
	console.log('Build: ' + fname);

	var index = elasticlunr(function () {
		this.addField('title'),
		this.addField('body'),
		this.addField('url'),
		this.setRef('id')
	});

	value.forEach(function(doc) {
		index.addDoc(doc);
	});

	var out = index.toJSON();
	for(var id in out.documentStore.docs) {
		delete out.documentStore.docs[id].body;
	}
	fs.writeFileSync(assets + '/' + fname, JSON.stringify(out));
}
