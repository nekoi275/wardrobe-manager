function Model() {
    var tableName = 'clothes';
    var data = JSON.parse(localStorage.getItem(tableName));
    data = (data == null) ? {} : data;
    var idCounter = getLatestId();

    function getLatestId() {
        var keys = Object.keys(data);
        if (keys.length === 0){
            return 0;
        };
        return Math.max.apply(null, keys.map(function(z){return +z;}));
    };

    this.create = function (obj) {
        var id = ++idCounter;
        data[id] = obj;
        localStorage.setItem(tableName, JSON.stringify(data));
        return id;
    };

    this.readAll = function () {
        return data;
    };

    this.delete = function (id) {
        delete(data[id]);
        localStorage.setItem(tableName, JSON.stringify(data));
    };

}

function View() {
    this.form = document.getElementById('clothes');
    var table = document.getElementById('clothes-table');
    
    var self = this;

    this.clearForm = function() {
        $('.editable').val('');
        $('.editable').removeClass('is-invalid is-valid');
    };
    
    this.addRow = function(rowData, id, removeFunction) {
        var tr = document.createElement('tr');
        for (var colName of ['type', 'brand', 'color', 'description', 'price', 'date', 'season']) {
            var td = document.createElement('td');
            td.innerText = rowData[colName];
            tr.appendChild(td);
        };
        var removeButton = document.createElement('button');
        $(removeButton).attr('data-id', id);
        $(removeButton).addClass('btn btn-dark btn-sm');
        $(removeButton).html('<span>&times;</span>');
        $(removeButton).click(removeFunction);
        td = document.createElement('td');
        td.appendChild(removeButton);
        tr.appendChild(td);
        tr.setAttribute('data-id', id);
        table.tBodies[0].appendChild(tr);
    };

    this.removeRow = function(id) {
        var row = table.querySelector('tr[data-id="'+id+'"]');
        table.tBodies[0].removeChild(row);
    };
}

function Controller() {
    var model = new Model();
    this.view = new View();
    
    var self = this;

    function getFormData(form) {
        var obj = {};
        for(i = 0; i < form.elements.length; i ++) {
            var paramName = form.elements[i].name;
            if (paramName !== '') {
                obj[paramName] = form.elements[i].value;
            };
        };
        return obj;
    };

    function validate(form) {
        [].forEach.call(form.elements, function(elem) {
            if (elem.validity.valid) {
                elem.classList.remove('is-invalid');
                elem.classList.add('is-valid');
            } else {
                elem.classList.add('is-invalid');
                elem.classList.remove('is-valid');
            }
        });
        return [].every.call(form.elements, function(elem) {return !elem.validity.valueMissing});
    };

    function removeRow(event) {
        var target = event.target;
        var id = target.getAttribute('data-id');
        model.delete(id);
        self.view.removeRow(id);
    };

    this.loadData = function() {
        var data = model.readAll();
        var ids = Object.keys(data);
        ids.forEach(function (id) {self.view.addRow(data[id], id, removeRow)});
    };

    this.processForm = function() {
        if (!validate(self.view.form)) {
            return;
        };
        var obj = getFormData(self.view.form);
        var id = model.create(obj);
        self.view.addRow(obj, id, removeRow);
        self.view.clearForm();
    };
}