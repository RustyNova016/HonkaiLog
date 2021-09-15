"use strict";
var input_LV = document.getElementById("BP_level_input");
var input_XP = document.getElementById("BP_xp_input");
var today_bp = document.getElementById("today_bp");
var log_button = document.getElementById("log_bp");
var DOM_data_Element = document.getElementById("DOM_data");
if (typeof DOM_data_Element === null) {
    alert("Something went wrong. Please refresh the page");
    console.error("DOM_data not found.");
}
var DOM_data = DOM_data_Element.innerHTML;
var data_json = JSON.parse(DOM_data);
function get_bp_current() {
    return calculate_bp(+input_LV.value, +input_XP.value);
}
var bp_type = /** @class */ (function () {
    function bp_type(name, goal, bp_per_week) {
        this.name = name;
        this.bp_goal = goal;
        this.bp_bonus_per_week = bp_per_week;
        this.out_bp_per_day = document.getElementById(this.name + "_BP_day");
        this.out_bp_per_day_bonus = document.getElementById(this.name + "_bp_per_day_bonuses");
        this.out_daily_limit = document.getElementById(this.name + "_weekly_limit");
    }
    bp_type.prototype.refresh = function () {
        var bp_per_day = calculate_BP_per_day_left(get_bp_current(), this.bp_goal, data_json.days_left);
        if (bp_per_day !== 0) {
            this.out_bp_per_day.innerHTML = String(bp_per_day) + " BP/day.";
        }
        else {
            this.out_bp_per_day.innerHTML = "Done !";
        }
        if (get_today_bp_gain() >= bp_per_day) {
            this.out_bp_per_day.setAttribute("style", "color:green;");
        }
        else {
            this.out_bp_per_day.setAttribute("style", "color:red;");
        }
        var bp_per_day_bonuses = calculate_BP_per_day_left(get_bp_current() + (data_json.weeks_left * this.bp_bonus_per_week), this.bp_goal, data_json.days_left);
        if (bp_per_day_bonuses !== 0) {
            this.out_bp_per_day_bonus.innerHTML = "With weekly BP bonuses: " + String(bp_per_day_bonuses) + " BP/day.";
        }
        else {
            this.out_bp_per_day_bonus.innerHTML = "Done !";
        }
        if (get_today_bp_gain() >= bp_per_day_bonuses) {
            this.out_bp_per_day_bonus.setAttribute("style", "color:green;");
        }
        else {
            this.out_bp_per_day_bonus.setAttribute("style", "color:red;");
        }
        var daily_limit = data_json.weekly_limit / 7;
        var weekly_daily = calculate_BP_per_day_left(get_bp_current() + (data_json.weeks_left * this.bp_bonus_per_week), this.bp_goal, data_json.weeks_left * 7);
        if (weekly_daily < daily_limit) {
            this.out_daily_limit.innerHTML = "Finishing is still possible within the weekly limit (" + String(daily_limit) + "BP/day limit, " + String(weekly_daily) + " needed)";
        }
        else {
            this.out_daily_limit.innerHTML = "Finishing is impossible within the weekly limit (" + String(daily_limit) + "BP/day limit, " + String(weekly_daily) + " needed)";
        }
    };
    return bp_type;
}());
function input_handler() {
    refresh_all_bp_type();
    refresh_today_bp();
    check_submit_button();
}
function refresh_all_bp_type() {
    for (var _i = 0, bp_types_1 = bp_types; _i < bp_types_1.length; _i++) {
        var bpType = bp_types_1[_i];
        bpType.refresh();
    }
}
function get_today_bp_gain() {
    return get_bp_current() - data_json.yesterday_bp;
}
function refresh_today_bp() {
    today_bp.innerHTML = "" + get_today_bp_gain();
}
function changes_exist() {
    var diff = get_bp_current() - data_json.current_bp;
    var change_exist = diff !== 0;
    return change_exist;
}
function check_submit_button() {
    var diff = get_bp_current() - data_json.current_bp;
    var change_exist = diff <= 0;
    if (change_exist) {
        log_button.classList.remove("btn-success");
        log_button.classList.add("btn-outline-success");
    }
    else {
        log_button.classList.remove("btn-outline-success");
        log_button.classList.add("btn-success");
    }
    log_button.disabled = change_exist;
}
function calculate_bp(bp_level, bp_xp) {
    return bp_level * 1000 + bp_xp;
}
function calculate_BP_per_day_left(bp_current, bp_max, days_left) {
    var bp_left = get_remaining_bp(bp_current, bp_max);
    var bp_left_per_day = bp_left / days_left;
    if (bp_left_per_day < 0) {
        bp_left_per_day = 0;
    }
    return bp_left_per_day;
}
function get_remaining_bp(bp_current, bp_max) {
    return bp_max - bp_current;
}
// We create the BP type instances
var bp_types = [];
for (var _i = 0, _a = data_json.types; _i < _a.length; _i++) {
    var bpType = _a[_i];
    bp_types.push(new bp_type(bpType.name, bpType.bp_goal, 2000));
}
// Create listener that triggers on change of the inputs
input_LV.addEventListener("input", input_handler);
input_XP.addEventListener("input", input_handler);
// Event listener for the 'beforeunload' event
window.addEventListener('beforeunload', function prevent_unsave(e) {
    // Check if any of the input fields are filled
    if (changes_exist()) {
        // Cancel the event and show alert that
        // the unsaved changes would be lost
        e.preventDefault();
        e.returnValue = '';
    }
});
input_handler();
//# sourceMappingURL=BP_XP.js.map