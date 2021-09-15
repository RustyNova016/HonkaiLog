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
    bp_bonus_per_week: number;
    out_bp_per_day: HTMLElement;
    out_bp_per_day_bonus: HTMLElement;
    out_daily_limit: HTMLElement;

    constructor(name: string, goal: number, bp_per_week: number) {
        this.name = name;
        this.bp_goal = goal;
        this.bp_bonus_per_week = bp_per_week;
        this.out_bp_per_day = document.getElementById(this.name + "_BP_day")!;
        this.out_bp_per_day_bonus = document.getElementById(this.name + "_bp_per_day_bonuses")!;
        this.out_daily_limit = document.getElementById(this.name + "_weekly_limit")!;
    }

    refresh(): void {
        let bp_per_day: number = calculate_BP_per_day_left(
            get_bp_current(),
            this.bp_goal,
            data_json.days_left
        );

        if (bp_per_day !== 0) {
            this.out_bp_per_day.innerHTML = String(bp_per_day) + " BP/day."
        } else {
            this.out_bp_per_day.innerHTML = "Done !"
        }

        if (get_today_bp_gain() >= bp_per_day){
            this.out_bp_per_day.setAttribute("style", "color:green;");
        } else {
            this.out_bp_per_day.setAttribute("style", "color:red;");
        }

        let bp_per_day_bonuses: number = calculate_BP_per_day_left(
            get_bp_current() + (data_json.weeks_left * this.bp_bonus_per_week),
            this.bp_goal,
            data_json.days_left
        );

        if (bp_per_day_bonuses !== 0) {
            this.out_bp_per_day_bonus.innerHTML = "With weekly BP bonuses: " + String(bp_per_day_bonuses)+ " BP/day."
        } else {
            this.out_bp_per_day_bonus.innerHTML = "Done !"
        }

        if (get_today_bp_gain() >= bp_per_day_bonuses){
            this.out_bp_per_day_bonus.setAttribute("style", "color:green;");
        } else {
            this.out_bp_per_day_bonus.setAttribute("style", "color:red;");
        }


        let daily_limit: number = data_json.weekly_limit / 7;
        let weekly_daily: number = calculate_BP_per_day_left(
            get_bp_current() + (data_json.weeks_left * this.bp_bonus_per_week),
            this.bp_goal,
            data_json.weeks_left * 7
        );
        if (weekly_daily < daily_limit){
            this.out_daily_limit.innerHTML = "Finishing is still possible within the weekly limit (" + String(daily_limit) + "BP/day limit, " + String(weekly_daily) + " needed)"
        } else {
            this.out_daily_limit.innerHTML = "Finishing is impossible within the weekly limit (" + String(daily_limit) + "BP/day limit, " + String(weekly_daily) + " needed)"
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

function get_today_bp_gain() {
    return get_bp_current() - data_json.yesterday_bp;
}

function refresh_today_bp(): void {
    today_bp.innerHTML = "" + get_today_bp_gain();
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
    bp_types.push(new bp_type(bpType.name, bpType.bp_goal, 2000))
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