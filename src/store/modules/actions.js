import api from '../../api/api.js'

const actions = {
    loadData({ dispatch, commit, rootState }) {
        api.get(rootState.table.current.name, json => {
            commit("setData", json);
            dispatch("showData");
        }, reason => console.error(reason));
    },
    add({ commit, rootState }) {
        rootState.form.currentData.table = rootState.table.current.name;
        api.add(rootState.form.currentData, json => {commit("add", json); commit("countItems")}, reason => console.error(reason));
    },
    uploadImage({ rootState }, onSuccess) {
        if (rootState.form.currentImage) {
            api.upload(rootState.form.currentImage, onSuccess, reason => console.error(reason));
        } else {
            onSuccess();
        }
    },
    uploadMoodboardImage({ rootState }, onSuccess) {
        if (rootState.moodboard.currentImage.file) {
            api.upload(rootState.moodboard.currentImage.file, onSuccess, reason => console.error(reason));
        } else {
            onSuccess();
        }
    },
    edit({ dispatch, commit, rootState }, table) {
        if (table) {
            rootState.form.currentData.table = table;
        } else {
            rootState.form.currentData.table = rootState.table.current.name;
        }
        var update = {...rootState.form.currentData};
        delete update._id;
        var data = {
            query: {
                '_id': rootState.form.currentData._id
            },
            update: update
        }
        api.edit(data, json => {
            if (table) {
                commit("move", json);
            } else {
                commit("edit", json);
            }
            dispatch("showData");
        }, reason => console.error(reason));
    },
    delete({ commit, rootState }) {
        var id = rootState.form.currentData._id;
        api.delete(id, () => {commit("remove", id); commit("countItems")}, reason => console.error(reason));
    }
}

export default {
    actions
}