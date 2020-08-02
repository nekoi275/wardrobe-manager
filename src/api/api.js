const urlFactory = function (url) {
    url = url || "";
    return {
        get(tableName) {
            return url + "api/?table=" + tableName
        },
        add() {
            return url + "api/"
        },
        edit() {
            return url + "api/"
        },
        delete(id) {
            return url + "api/?_id=" + id
        },
        upload() {
            return url + "api/upload"
        },
        imageUrl(id) {
            return url + "api/images/" + id
        }
    }
}('https://nekoi.pp.ua/clothes/');

export default {
    imageUrl(id) {
        return urlFactory.imageUrl(id)
    },
    get(tableName, onSuccess, onError) {
        fetch(urlFactory.get(tableName))
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    onError("getting error.Status: " + response.statusText + " " + response.text);
                }
            })
            .then(onSuccess)
            .catch(onError);
    },
    add(data, onSuccess, onError) {
        fetch(urlFactory.add(), {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    onError("adding error. Status: " + response.statusText + " " + response.text);
                }
            })
            .then(onSuccess)
            .catch(onError);
    },
    upload(formData, onSuccess, onError) {
        fetch(urlFactory.upload(), {
                method: 'POST',
                body: formData
            })
            .then(onSuccess)
            .catch(onError);
    },
    edit(data, onSuccess, onError) {
        fetch(urlFactory.edit(), {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    onError("update error. Status: " + response.statusText + " " + response.text);
                }
            })
            .then(onSuccess)
            .catch(onError);
    },
    delete(id, onSuccess, onError) {
        fetch(urlFactory.delete(id), {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    onSuccess();
                } else {
                    onError("delete error. Status: " + response.statusText + " " + response.text);
                }
            })
            .catch(onError);
    }
}