function Model() {

    this.create = function (obj, responseHandler) {
        $.ajax({
            url: '/api/clothes',
            type: 'POST',
            data: JSON.stringify(obj),
            contentType: 'application/json',
            success: responseHandler
        });
    };

    this.readAll = function (responseHandler) {
        $.ajax({
            url: '/api/clothes',
            type: 'GET',
            success: responseHandler
        });
    };

    this.delete = function (id, responseHandler) {
        $.ajax({
            url: '/api/clothes',
            type: 'DELETE',
            data: JSON.stringify({"id": id}),
            contentType: 'application/json',
            success: responseHandler
        });
    };

}

function View() {
    this.form = document.getElementById('clothes');
    var table = document.getElementById('clothes-table');

    this.clearForm = function() {
        $('.editable').val('');
        $('.editable').removeClass('is-invalid is-valid');
    };
    
    this.addRow = function(rowData, id, removeFunction) {
        var tr = document.createElement('tr');
        for (var colName of ['type', 'brand', 'color', 'description', 'price', 'date', 'season']) {
            var td = document.createElement('td');
            if(colName === 'color') {
                td.style.backgroundColor = 'rgb(' + rowData['color'] + ')';
            } else {
                td.innerText = rowData[colName];
            }
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
        model.delete(id, function() {
            self.view.removeRow(id);
        });
    };

    this.loadData = function() {
        model.readAll(function(data) {
            data.forEach(function(obj) {self.view.addRow(obj, obj.id, removeRow)})
        });
    };

    this.processForm = function() {
        if (!validate(self.view.form)) {
            $('#submit-button').removeAttr('data-dismiss');
            return;
        };
        $('#submit-button').attr('data-dismiss', 'modal');
        var obj = getFormData(self.view.form);
        model.create(obj, function(response) {
            var id = response.id;
            self.view.addRow(obj, id, removeRow);
        });
        self.view.clearForm();
    };
}