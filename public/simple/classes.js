function Model() {
    var errorHandler = function(response) {
        console.log(response.responseText);
    }

    this.create = function(data, responseHandler) {
        $.ajax({
            url: '/api/clothes',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: responseHandler,
            error: errorHandler
        });
    };

    this.readAll = function(responseHandler) {
        $.ajax({
            url: '/api/clothes',
            type: 'GET',
            success: responseHandler,
            error: errorHandler
        });
    };

    this.edit = function(data, responseHandler) {
        $.ajax({
            url: '/api/clothes',
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: responseHandler,
            error: errorHandler
        });
    };

    this.delete = function(id, responseHandler) {
        $.ajax({
            url: '/api/clothes',
            type: 'DELETE',
            data: JSON.stringify({'id': id}),
            contentType: 'application/json',
            success: responseHandler,
            error: errorHandler
        });
    };
}

function View() {
    this.formInputs = $('#clothes-form input');
    var table = $('#clothes-table');
    var self = this;

    this.clearForm = function() {
        $('.editable').val('');
        $('input[name="season"]:checked').prop('checked', false);
        $('.editable.required').removeClass('is-invalid');
        $('.color-palette').removeClass('is-invalid');
    };
    
    this.addRow = function(data, id, removeFunction, editFunction) {
        var tr = $("<tr></tr>");
        for (var colName of ['type', 'brand', 'color', 'description', 'price', 'date', 'season']) {
            var td = $("<td></td>");

            switch(colName) {
                case 'color': 
                    td.css('background-color','rgb(' + data['color'] + ')');
                    td.attr('data-color', data['color']);
                    break;
                case 'date':
                    var date = new Date(data['date']).toLocaleString('ru', {year: 'numeric', month: 'long', day: 'numeric'});
                    td.text(date);
                    break;
                default: 
                    td.text(data[colName]);
            };
            tr.append(td);
        };

        td = $("<td></td>");
        td.append(createButton(id, editFunction, 'edit-button'));
        td.append(createButton(id, removeFunction, 'remove-button'));
        tr.append(td);
        tr.attr('data-id', id);
        table.append(tr);
    };

    this.removeRow = function(id) {
        $('tr[data-id="'+ id +'"]').remove();
    };

    this.editRow = function(data) { 
        $.each(['type', 'brand', 'color', 'description', 'price', 'date', 'season'], function(i, value) {
            var cell = $('tr[data-id="'+ data.id +'"]').children('td:eq(' + i + ')');
            
            switch(value) {
                case 'color': 
                    cell.css('background-color','rgb(' + data[value] + ')');
                    break;
                case 'date':
                    var date = new Date(data['date']).toLocaleString('ru', {year: 'numeric', month: 'long', day: 'numeric'});
                    cell.text(date);
                    break;
                default: 
                    cell.text(data[value]);
            };
        });
    };

    this.prepareForm = function(data, formHeader, submitFunction) {
        $('#form-name').text(formHeader);

        if(data.length) {
            this.formInputs.filter('[name="type"]').val(data[0]);
            this.formInputs.filter('[name="brand"]').val(data[1]);
            this.formInputs.filter('[name="color"]').val(data[2]);
            this.formInputs.filter('[name="description"]').val(data[3]);
            this.formInputs.filter('[name="price"]').val(data[4]);
            this.formInputs.filter('[name="date"]').val( moment(data[5], 'DD MMMM YYYY').format('YYYY-MM-DD') );
            this.formInputs.filter('[name="season"][value="' + data[6] + '"]').prop('checked', true);
            this.formInputs.filter('[name="id"]').val(data[7]);  
        };
        $('#submit-button').on('click', submitFunction);
    };

    this.modalToggle = function() {
        var target = $(this).attr('data-modal');
    
        if (target == 'close') {
            $('.modal-container').removeClass('active');
            $('.modal-container .modal').removeClass('active');
            self.clearForm();
        } else {
            $('.modal-container').addClass('active');
            $('.modal-container .modal').addClass('active');
        };
    };

    function createButton(id, onClickFunction, buttonClass) {
        var button = $('<button class="button" data-id="' + id + '"></button>');
        button.on('click', onClickFunction);
        button.addClass(buttonClass);
        if (buttonClass === 'edit-button') {
            button.attr('data-modal', 'open');
        };
        return button;
    };

    $('[data-modal]').on('click', this.modalToggle);
}

function Controller() {
    var model = new Model();
    this.view = new View();
    
    var self = this;

    function getFormData(formInputs) {
        var data = {};

        formInputs.each( function() {
            var name = $(this).attr('name');
            console.log(this);
            if (name === 'season') {
                data[name] = $('input[name="season"]:checked').val();
            };
            data[name] = $(this).val();
        });

        return data;
    };

    this.getCanvasColor = function (color) {
        $('input[name="color"]').val(color);
    };

    function validate(formInputs) {
        var isValid = true;
        formInputs.filter('.required').each( function() {
            var inputValue = $(this).val();
            if (!inputValue) {
                $(this).addClass('is-invalid');
                if ( $(this).attr('name') === 'color' ) $(this).next().addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
                if ( $(this).attr('name') === 'color' ) $(this).next().removeClass('is-invalid');
            };
        } ); 
        return isValid;
    };

    function removeRow() {
        var target = $(this);
        var id = target.attr('data-id');
        model.delete(id, function() {
            self.view.removeRow(id);
        });
    };

    function showEditModalForm(event) { 
        var target = event.target;
        var id = target.getAttribute('data-id');
        var data = [];

        $('tr[data-id="'+ id +'"] td').each( function(i) {
            if (i == 2) {
                data[i] = $(this).attr('data-color');
            } else {
                data[i] = $(this).text();
            }
        });

        data.splice(-1, 1, id)
        self.view.prepareForm(data, 'Редактировать', processFormEdit);
        self.view.modalToggle();
    }

    this.showAddModalForm = function() {
        self.view.prepareForm([], 'Добавить', processFormAdd);
    };

    this.loadData = function() {
        model.readAll(function(data) {
            data.forEach(function(data) {self.view.addRow(data, data.id, removeRow, showEditModalForm)})
        });
    };

    function processFormEdit() {
        var isValid = validate(self.view.formInputs);
        if (isValid) {
            var data = getFormData(self.view.formInputs);
            model.edit(data, function() {
                self.view.editRow(data);
            });
            self.view.clearForm();
            $('.modal-container').removeClass('active');
            $('.modal-container .modal').removeClass('active');
        }
    };

    function processFormAdd() {
        var isValid = validate(self.view.formInputs);
        if (isValid) {
            var data = getFormData(self.view.formInputs);

            model.create(data, function(response) {
                var id = response.id;
                self.view.addRow(data, id, removeRow, showEditModalForm);
            });

            self.view.clearForm();
            $('.modal-container').removeClass('active');
            $('.modal-container .modal').removeClass('active');    
        } 
    };
}