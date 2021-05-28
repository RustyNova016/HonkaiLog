// Data variable
const DOM_data_Element: HTMLElement = document.getElementById("DOM_data")!;

// Constant list of elements
const material_count_outputs: HTMLCollectionOf<Element> = document.getElementsByClassName("material-current-count")

let data_json = JSON.parse(DOM_data_Element.innerHTML);
console.log(data_json);

// Class definitions

class material_class {
    id: number;
    name: string;
    private _description: string;
    log_list: material_log[];

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this._description = description;
    }

    get description(): string {
        console.log(this._description)
        if ((this._description !== "") && (this._description !== null)){
            return this._description;
        } else {
            return "(No description provided.)";
        }
    }
}

class material_log {
    id: number;
    quantity: number;
    timestamp: Date;

    constructor(id: number, quantity: number, timestamp: Date) {
        this.id = id;
        this.quantity = quantity;
        this.timestamp = timestamp;
    }
}

const current_material = new material_class(data_json.id_material, data_json.name, data_json.description)

function put_data(item: material_class) {
    // Constant elements
    const title: HTMLElement = document.getElementById("title")!;
    const description_element: HTMLElement = document.getElementById("description")!;

    title.innerHTML = item.name;
    description_element.innerHTML = item.description;
}

// Now, we put data
put_data(current_material);