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
            data: JSON.stringify({'id': id}),
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
            switch(colName) {
                case 'color': 
                    td.style.backgroundColor = 'rgb(' + rowData['color'] + ')';
                    td.setAttribute('data-color', rowData['color']);
                    break;
                case 'date':
                    var date = new Date(rowData['date']).toLocaleString('ru', {year: 'numeric', month: 'long', day: 'numeric'});
                    td.innerText = date;
                    break;
                default: 
                    td.innerText = rowData[colName];
            };
            
            tr.appendChild(td);
        };
        td = document.createElement('td');
        td.appendChild(createButton(id, removeFunction, 'remove-button'));
        td.appendChild(createButton(id, editFunction, 'edit-button'));
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
            switch(value) {
                case 'color': 
                    cell.style.backgroundColor = 'rgb(' + rowData[value] + ')';
                    break;
                case 'date':
                    var date = new Date(rowData['date']).toLocaleString('ru', {year: 'numeric', month: 'long', day: 'numeric'});
                    cell.innerText = date;
                    break;
                default: 
                    cell.innerText = rowData[value];
            };
        });
    };

    this.prepareForm = function(arr, formHeader, submitFunction) {
        $('#form-name').text(formHeader);
        if(arr.length) {
            for(i = 0; i < arr.length; i ++) {
                if(i == 5) {
                    arr[i] = moment(arr[i], 'DD MMMM YYYY').format('YYYY-MM-DD');
                    this.form.elements[i].value = arr[i];
                };
                this.form.elements[i].value = arr[i];
            };
        };
        $('#submit-button').on('click', submitFunction);
    };

    this.search = function(searchColumn, $input) {
        var filter, tr, td, text;
        filter = $input.val().toUpperCase();
        tr = table.getElementsByTagName('tr');

        for(i = 0; i < tr.length; i ++) {
            td = tr[i].getElementsByTagName('td')[searchColumn];
            if(td) {
                text = td.innerText;
                if (text.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = '';
                } else tr[i].style.display = 'none';
            };
        };
    };

    this.searchAnimate = function($container, text) {
        var $span = $container.children('span');
        var $input = $container.children('input');
        $input.on('focus', function() {$span.text('')});
        $input.on('focusout', function() {$span.text(text)});
    };

    function createButton(id, onClickFunction, buttonClass) {
        var button = document.createElement('button');
        $(button).click(onClickFunction);
        $(button).addClass('btn btn-dark btn-sm');
        $(button).attr('data-id', id);
        $(button).addClass(buttonClass);
        if (buttonClass === 'remove-button') {
            $(button).html('<span>&times;</span>');
        };
        if (buttonClass === 'edit-button') {
            $(button).html('<span>&#9998;</span>');
            $(button).attr('data-toggle', 'modal');
            $(button).attr('data-target', '#modal-form');
        };
        return button;
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

    this.getCanvasColor = function (color) {
        $('input[name="color"]').val(color);
    };

    function validate(form) {
        Array.prototype.forEach.call(form.elements, function(elem) {
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
            if (key == 2) {
                arr[key] = td.getAttribute('data-color');
            } else {
                arr[key] = td.innerText;
            }
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

    this.initSearch = function() {
        var searchType = $('#search-type input');
        searchType.on('keyup', function() {
            self.view.search(0, searchType);
        });
        self.view.searchAnimate($('#search-type'), 'Тип');

        var searchBrand = $('#search-brand input');
        searchBrand.on('keyup', function() {
            self.view.search(1, searchBrand);
        });
        self.view.searchAnimate($('#search-brand'), 'Производитель');
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