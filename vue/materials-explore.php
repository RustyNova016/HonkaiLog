<div class="bg">
    <div class="container bg">
        <h1 class="title">Materials: <?=$list_of_material_type[$id_selected_mat_type]->get_name()?></h1>

        <?php
            include "vue/material/material_select.php";
        ?>

        <div style="margin-top: 50px">
            <h1>Statistics:</h1>
            <?php
                include "vue/material/material_stats.php"
            ?>
        </div>
    </div>
</div>