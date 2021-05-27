const input_LV: HTMLInputElement = document.getElementById("BP_level_input") as HTMLInputElement;
const input_XP: HTMLInputElement = document.getElementById("BP_xp_input") as HTMLInputElement;

const today_bp: HTMLElement = document.getElementById("today_bp") as HTMLElement;

const log_button: HTMLButtonElement = document.getElementById("log_bp") as HTMLButtonElement;

let DOM_data_Element: HTMLElement = document.getElementById("DOM_data")!;

if (typeof DOM_data_Element === null){
    alert("Something went wrong. Please refresh the page");
    console.error("DOM_data not found.");
}

const DOM_data: string = DOM_data_Element.innerHTML;
const data_json: any = JSON.parse(DOM_data);

function get_bp_current(): number {
    return calculate_bp(
        +input_LV.value,
        +input_XP.value
    );
}

class bp_type {
    name: string;
    bp_goal: number;
    out: HTMLElement;

    constructor(name: string, goal: number) {
        this.name = name;
        this.bp_goal = goal;
        this.out = document.getElementById(this.name + "_BP_day")!;
    }

    refresh(): void {
        let bp_per_day: number = calculate_BP_per_day_left(
            get_bp_current(),
            this.bp_goal,
            data_json.days_left
        );

        if (bp_per_day !== 0) {
            this.out.innerHTML = String(bp_per_day) + " BP/day."
        } else {
            this.out.innerHTML = "Done !"
        }
    }
}

function input_handler (): void {
    refresh_all_bp_type();
    refresh_today_bp();
    check_submit_button()
}

function refresh_all_bp_type(): void {
    for (let bpType of bp_types) {
        bpType.refresh();
    }
}

function refresh_today_bp(): void {
    let bp_diff: number = get_bp_current() - data_json.yesterday_bp;

    if(bp_diff >= 0){
        today_bp.innerHTML = "" + bp_diff;
    } else {
        today_bp.innerHTML = "0"
    }
}

function changes_exist(): boolean {
    let diff: number = get_bp_current() - data_json.current_bp;

    let change_exist: boolean = diff !== 0;
    return change_exist;
}

function check_submit_button(): void {
    let diff: number = get_bp_current() - data_json.current_bp;

    let change_exist: boolean = diff <= 0;
    if (change_exist){
        log_button.classList.remove("btn-success");
        log_button.classList.add("btn-outline-success");
    } else {
        log_button.classList.remove("btn-outline-success");
        log_button.classList.add("btn-success");
    }

    log_button.disabled = change_exist;
}

function calculate_bp(bp_level: number, bp_xp: number): number {
    return bp_level * 1000 + bp_xp;
}

function calculate_BP_per_day_left(bp_current: number, bp_max: number, days_left: number): number {
    let bp_left: number = get_remaining_bp(bp_current, bp_max);

    let bp_left_per_day: number = bp_left / days_left;

    if (bp_left_per_day < 0) {
        bp_left_per_day = 0
    }

    return bp_left_per_day;
}

function get_remaining_bp(bp_current: number, bp_max: number): number {
    return bp_max - bp_current;
}

// We create the BP type instances
let bp_types: bp_type[] = []
for (let bpType of data_json.types) {
    bp_types.push(new bp_type(bpType.name, bpType.bp_goal))
}

// Create listener that triggers on change of the inputs
input_LV.addEventListener("input", input_handler);
input_XP.addEventListener("input", input_handler);

// Event listener for the 'beforeunload' event
window.addEventListener('beforeunload', function prevent_unsave (e) {

    // Check if any of the input fields are filled
    if (changes_exist()) {

        // Cancel the event and show alert that
        // the unsaved changes would be lost
        e.preventDefault();
        e.returnValue = '';
    }
});

input_handler();