<?php
include "models/get_currencies.php";
$currencies = get_currencies($dbh);

//echo "<pre>";
//print_r($currencies);
//echo "</pre>";

include "models/update_currency_quantity.php";
if (!empty($_POST)){
    update_currency_count($dbh,2, 1, $_POST["quantity"], $_POST["libchange"]);
}

include "vue/currency-index.php";
