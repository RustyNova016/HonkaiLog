<?php
class material{
    private static $dbh;
    private static $material_list;

    public function __construct($myDbh){
        material::$dbh = $myDbh;
    }


    public function get_material_list(){
        $this->request_material_list();
        return material::$material_list;
    }

    /**
     * Get all of the materials from the database if they aren't expired
     */
    private function request_material_list(): void
    {
        $SQLrequest = "SELECT * FROM material WHERE expiration_date IS NULL OR expiration_date > NOW()";//TODO: Honkai timezone

        $sth = material::$dbh->prepare($SQLrequest);
        $sth->execute();
        material::$material_list = $sth->fetchall();
    }

    /**
     * Get all of the X type materials from the database if they aren't expired
     */
    public function get_material_list_of_type($type){
        $SQLrequest = "SELECT * 
                       FROM material 
                           INNER JOIN material_type ON material.id_material_type = material_type.id_material_type
                       WHERE (expiration_date IS NULL OR expiration_date > NOW()) 
                           AND material_type.name = :type_material";//TODO: Honkai timezone

        $values = [
            ":type_material" => $type
        ];

        $sth = material::$dbh->prepare($SQLrequest);
        $sth->execute($values);
        $result = $sth->fetchall();
        return $result;
    }

    public function get_material_types(){
        $SQLrequest = "SELECT *
                       FROM material_type;"; //TODO: Honkai timezone

        $sth = material::$dbh->prepare($SQLrequest);
        $sth->execute();
        $result = $sth->fetchall();
        return $result;
    }

    /** Add a log to the database
     * @param $id_user
     * @param $id_material
     * @param $quantity
     * @param $libchange
     * @return array
     */
    public function update_material($id_user, $id_material, $quantity, $libchange){
        $SQLrequest = "INSERT INTO material_count (id_user,  id_material , quantity, libchange) VALUES (:id_user, :id_material, :quantity, :libchange);";

        $values = [
            ":id_user" => $id_user,
            ":id_material" => $id_material,
            ":quantity" => $quantity,
            ":libchange" => $libchange
        ];

        $sth = material::$dbh->prepare($SQLrequest);
        $outp = [$sth->execute($values)];

        return $outp;
    }

    public function get_material_history($id_user, $id_mat, $date, $wholeday = 1){
        // Wholeday:
        // 0: We take exactly $date time before
        // 1: We take take the whole day

        if (!$wholeday){
            // We get all the logs of the materials that are after [Actual time] - [Timespan to remove]

            $SQLrequest = "SELECT quantity, time_stamp FROM material_count WHERE id_user = :id_user AND id_material = :id_mat AND time_stamp  > DATE_SUB(NOW(), INTERVAL :date_back) ORDER BY time_stamp";

            $values = [
                ":id_user" => $id_user,
                ":id_material" => $id_mat,
                ":date_back" => $date
            ];
        }
        else {
            // We get all the logs of the materials that are after ([Actual time] - [Timespan to remove]) [Honkai reset time]
            $SQLrequest = "SELECT quantity, time_stamp FROM material_count WHERE id_user = :id_user AND id_material = :id_mat AND DATE_SUB(time_stamp, INTERVAL 4 HOUR) > DATE_ADD(DATE_SUB(CURRENT_DATE(), INTERVAL ".$date."), INTERVAL 4 HOUR) ORDER BY time_stamp";

            // DATE_SUB(time_stamp, INTERVAL 4 HOUR) < ((GETDATE() - time) +4 h)

            $values = [
                ":id_user" => $id_user,
                ":id_mat" => $id_mat
            ];
        }

        //var_dump($SQLrequest);

        $sth = material::$dbh->prepare($SQLrequest, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $exe = $sth->execute($values);
        $result_in_range = $sth->fetchall();
        //var_dump($result_in_range);


        // Now, we take one value before the time range
        if (!empty($result_in_range)){
            $SQLrequest = "SELECT quantity, time_stamp FROM material_count WHERE id_user = :id_user AND id_material = :id_mat AND time_stamp < :last_timestamp ORDER BY time_stamp DESC LIMIT 1;";

            $values = [
                ":id_user" => $id_user,
                ":id_mat" => $id_mat,
                ":last_timestamp" => $result_in_range[0]["time_stamp"]
            ];

        } else {
            $SQLrequest = "SELECT quantity, time_stamp FROM material_count WHERE id_user = :id_user AND id_material = :id_mat AND time_stamp < NOW() ORDER BY time_stamp DESC LIMIT 1;";

            $values = [
                ":id_user" => $id_user,
                ":id_mat" => $id_mat
            ];
        }

        $sth = material::$dbh->prepare($SQLrequest);
        $exe = $sth->execute($values);
        $result = $sth->fetchall();

        $result = array_merge_recursive($result, $result_in_range);

        return $result;
    }
}