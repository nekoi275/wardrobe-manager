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

    this.edit = function (obj, responseHandler) {
        $.ajax({
            url: '/api/clothes',
            type: 'PUT',
            data: JSON.stringify(obj),
            contentType: 'application/json',
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
        $('#submit-button').off('click');
    };
    
    this.addRow = function(rowData, id, removeFunction, editFunction) {
        var tr = document.createElement('tr');
        for (var colName of ['type', 'brand', 'color', 'description', 'price', 'date', 'season']) {
            var td = document.createElement('td');
            if(colName === 'color') {
                td.style.backgroundColor = 'rgb(' + rowData['color'] + ')';
            } else {
                td.innerText = rowData[colName];
            };
            tr.appendChild(td);
        };
        td = document.createElement('td');
        td.appendChild(createButton(id, "x", removeFunction, 'remove-button'));
        td.appendChild(createButton(id, "pencil", editFunction, 'edit-button'));
        tr.appendChild(td);
        tr.setAttribute('data-id', id);
        table.tBodies[0].appendChild(tr);
    };

    this.removeRow = function(id) {
        var row = table.querySelector('tr[data-id="'+id+'"]');
        table.tBodies[0].removeChild(row);
    };

    this.editRow = function(rowData) {
        var id = rowData.id;
        var row = table.querySelector('tr[data-id="'+id+'"]');
        $.each(['type', 'brand', 'color', 'description', 'price', 'date', 'season'], function(index, value){
            var cell = row.cells[index];
            if(value === 'color') {
                cell.style.backgroundColor = 'rgb(' + rowData[value] + ')';
            } else {
                cell.innerText = rowData[value];
            };
        });
    };

    this.prepareForm = function(arr, formHeader, submitFunction) {
        $('#form-name').text(formHeader);
        if(arr.length) {
            for(i = 0; i < this.form.elements.length; i ++) {
                this.form.elements[i].value = arr[i];
            };
        };
        $('#submit-button').on('click', submitFunction);
    };

    function createButton(id, iconName, onClickFunction, buttonClass) {
        var button = document.createElement('button');
        $(button).addClass('btn btn-dark btn-sm');
        $(button).append('<span class="oi oi-' + iconName + '"></span>');
        $(button).attr('data-id', id);
        $(button).addClass(buttonClass);
        if (buttonClass === 'edit-button') {
            $(button).attr('data-toggle', 'modal');
            $(button).attr('data-target', '#modal-form');
        }
        $(button).click(onClickFunction);
        return button;
    }
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

    function showEditModalForm(event) {
        var target = event.target;
        var id = target.getAttribute('data-id');
        var arr = [];
        $('tr[data-id="'+id+'"] td').each(function(key, td) {
            arr[key] = td.innerText;
        });
        arr.splice(-1, 1, id)
        self.view.prepareForm(arr, 'Редактировать', processFormEdit);
    }

    this.showAddModalForm = function() {
        self.view.prepareForm([], 'Добавить', processFormAdd);
    };

    this.loadData = function() {
        model.readAll(function(data) {
            data.forEach(function(obj) {self.view.addRow(obj, obj.id, removeRow, showEditModalForm)})
        });
    };

    function processFormEdit() {
        if (!validate(self.view.form)) {
            $('#submit-button').removeAttr('data-dismiss');
            return;
        };
        $('#submit-button').attr('data-dismiss', 'modal');
        var obj = getFormData(self.view.form);
        model.edit(obj, function() {
            self.view.editRow(obj);
        });
    };

    function processFormAdd() {
        if (!validate(self.view.form)) {
            $('#submit-button').removeAttr('data-dismiss');
            return;
        };
        $('#submit-button').attr('data-dismiss', 'modal');
        var obj = getFormData(self.view.form);
        model.create(obj, function(response) {
            var id = response.id;
            self.view.addRow(obj, id, removeRow, showEditModalForm);
        });
        self.view.clearForm();
    };
}