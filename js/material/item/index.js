"use strict";
// Data variable
var DOM_data_Element = document.getElementById("DOM_data");
// Constant list of elements
var material_count_outputs = document.getElementsByClassName("material-current-count");
var data_json = JSON.parse(DOM_data_Element.innerHTML);
console.log(data_json);
// Class definitions
var material_class = /** @class */ (function () {
    function material_class(id, name, description) {
        this.id = id;
        this.name = name;
        this._description = description;
    }
    Object.defineProperty(material_class.prototype, "description", {
        get: function () {
            console.log(this._description);
            if ((this._description !== "") && (this._description !== null)) {
                return this._description;
            }
            else {
                return "(No description provided.)";
            }
        },
        enumerable: false,
        configurable: true
    });
    return material_class;
}());
var material_log = /** @class */ (function () {
    function material_log(id, quantity, timestamp) {
        this.id = id;
        this.quantity = quantity;
        this.timestamp = timestamp;
    }
    return material_log;
}());
var current_material = new material_class(data_json.id_material, data_json.name, data_json.description);
function put_data(item) {
    // Constant elements
    var title = document.getElementById("title");
    var description_element = document.getElementById("description");
    title.innerHTML = item.name;
    description_element.innerHTML = item.description;
}
// Now, we put data
put_data(current_material);
//# sourceMappingURL=index.js.map