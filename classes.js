function Model() {
    var tableName = "clothes";
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

    this.readAll = function (id) {
        return data;
    };

    this.delete = function (id) {
        delete(data[id]);
        localStorage.setItem(tableName, JSON.stringify(data));
    };

}

function View() {
    this.form = document.getElementById("clothes");
    var table = document.getElementById("clothes-table");

    this.clearForm = function() {
        var editableInputs = this.form.getElementsByClassName("editable");
        [].forEach.call(editableInputs, function(eInput) {eInput.value = null});
    };
    
    this.addRow = function(rowData, id, removeFunction) {
        var tr = document.createElement("tr");
        for (const colName of ['type', 'brand', 'color', 'description', 'price', 'date', 'season']) {
            var td = document.createElement("td");
            td.innerText = rowData[colName];
            tr.appendChild(td);
        };
        var removeButton = document.createElement("button");
        removeButton.setAttribute("data-id", id);
        removeButton.innerText = "X";
        removeButton.classList.add("btn");
        removeButton.classList.add("btn-dark");
        removeButton.classList.add("btn-sm");
        removeButton.onclick = removeFunction;
        td = document.createElement("td");
        td.appendChild(removeButton);
        tr.appendChild(td);
        tr.setAttribute("data-id", id);
        table.tBodies[0].appendChild(tr);
    };

    this.removeRow = function(id) {
        var row = table.querySelector('tr[data-id="'+id+'"]');
        table.tBodies[0].removeChild(row);
    };
}

function Controller() {
    var model = new Model();
    var view = new View();
    this.view = view;

    function getFormData(form) {
        var obj = {};
        for(i = 0; i < form.elements.length; i ++) {
            var paramName = form.elements[i].name;
            if (paramName !== "") {
                obj[paramName] = form.elements[i].value;
            };
        };
        return obj;
    };

    function validate(form) {
        return [].every.call(form.elements, function(elem) {return !elem.validity.valueMissing});
    };

    function removeRow(event) {
        var target = event.target;
        var id = target.getAttribute("data-id");
        model.delete(id);
        view.removeRow(id);
    };

    this.loadData = function() {
        var data = model.readAll();
        var ids = Object.keys(data);
        ids.forEach(function (id) {view.addRow(data[id], id, removeRow)});
    };

    this.processForm = function() {
        if (!validate(view.form)) {
            throw "invalid form"
        };
        var obj = getFormData(view.form);
        var id = model.create(obj);
        view.addRow(obj, id, removeRow);
        view.clearForm();
    };
}