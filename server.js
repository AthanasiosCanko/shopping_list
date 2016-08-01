var express = require('express');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var app = express();
app.use(express.static('public'));

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    
    this.items.push(item);
    this.id += 1;
    
    return item;
};

var storage = new Storage();

storage.add("Broad Beans");
storage.add("Tomatoes");
storage.add("Peppers");

app.get('/items', function(req, res) {
	res.status(200).json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
   	if (!req.body) {
       	return res.sendStatus(400);
   	}

	var item = storage.add(req.body.name);
   	res.status(200).json(item);
});

app.put('/items/:id', jsonParser, function(req, res) {
	if (!req.body) {
		return res.sendStatus(400);
	}
		
	storage.items[req.params.id].name = req.body.name;
	var item = storage.items[req.params.id].name;
	
	res.status(200).json(storage.items);
});

app.delete('/items/:id', jsonParser, function(req, res) {
	if (!req.body) {
		return res.sendStatus(400);
	}
	
	storage.items.splice(Number(req.params.id), 1);

	res.status(201).json(storage.items);
});

app.listen(process.env.PORT || 7000, function(err) {
	if (err) console.log(err);
	else console.log("Connected to port 7000...");
});

exports.app = app;
exports.storage = storage;