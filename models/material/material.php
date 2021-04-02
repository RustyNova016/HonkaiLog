<?php
include_once "models/date_function.php";

class material {
    private int $id;
    private string $name;
    private array $history;

    public function __construct($new_id, $new_name){
        $this->id = $new_id;
        $this->name = $new_name;
        $this->history = [];
    }

    /**
     * @return int
     */
    public function getCurrentCount(): int
    {
        return $this->history[0]->get_current_count();
    }

    public function request_material_history($dbh, time_frame $timestamp, $recursion_depth=0) {
        // Wholeday:
        // 0: We take exactly $date time before
        // 1: We take take the whole day
        
        $user = unserialize($_SESSION["user"]);

        if (!$timestamp->getWholeDay()){
            // We get all the logs of the materials that are after [Actual time] - [Timespan to remove]

            $SQLrequest = "SELECT quantity, time_stamp 
                           FROM material_count 
                           WHERE id_user = :id_user 
                                AND id_material = :id_material 
                                AND time_stamp  > DATE_SUB(:next_reset, INTERVAL ".$timestamp->getSQL().")
                           ORDER BY time_stamp -- without wholeday";

            $values = [
                ":id_user" => $user->get_id_user(),
                ":id_material" => strval($this->id),
                ":next_reset" => last_reset()->format('Y-m-d H:i:s')
            ];
        }
        else {
            // We get all the logs of the materials that are after ([Actual time] - [Timespan to remove]) [Honkai reset time]
            
            // 
            
            
            $SQLrequest = "SELECT quantity, time_stamp 
                           FROM material_count 
                           WHERE id_user = :id_user 
                                AND id_material = :id_material 
                                AND time_stamp > DATE_SUB(:next_reset, INTERVAL ".$timestamp->getSQL().")
                           ORDER BY time_stamp -- with wholeday";

            // DATE_SUB(time_stamp, INTERVAL 4 HOUR) < ((GETDATE() - time) +4 h)

            $values = [
                ":id_user" => $user->get_id_user(),
                ":id_material" => $this->id,
                ":next_reset" => last_reset()->format('Y-m-d H:i:s')
            ];
            
            
        }

        //var_dump($SQLrequest);
        //var_dump($values);

        $sth = $dbh->prepare($SQLrequest);
        $exe = $sth->execute($values);
        $result_in_range = $sth->fetchall();
        //var_dump($result_in_range);


        // Now, we take one value before the time range
        if (!empty($result_in_range)){
            $SQLrequest = "SELECT quantity, time_stamp 
                           FROM material_count
                           WHERE id_user = :id_user
                             AND id_material = :id_mat
                             AND time_stamp < :last_timestamp
                           ORDER BY time_stamp DESC
                           LIMIT 1;";

            $values = [
                ":id_user" => $user->get_id_user(),
                ":id_mat" => $this->id,
                ":last_timestamp" => $result_in_range[0]["time_stamp"]
            ];

        } else {
            $SQLrequest = "SELECT quantity, time_stamp FROM material_count WHERE id_user = :id_user AND id_material = :id_mat AND time_stamp < NOW() ORDER BY time_stamp DESC LIMIT 1;";

            $values = [
                ":id_user" => $user->get_id_user(),
                ":id_mat" => $this->id
            ];
        }

        $sth = $dbh->prepare($SQLrequest);
        $exe = $sth->execute($values);
        $result = $sth->fetchall();

        $result = array_merge_recursive($result, $result_in_range);
        
        if (empty($result)){
            if ($recursion_depth < 1) {
                $this->log_material_count($dbh, 0, "Init");
                $this->request_material_history($dbh, $timestamp, $recursion_depth + 1);
            } else {
                echo "<pre>";
                echo "Recursion limit";
                echo "</pre>";
            }
        } else {
            array_push($this->history, new material_history($result, $timestamp));
        }
        
        //var_dump($result);
        
        //var_dump($result);

        
        //var_dump($this->name);
        //var_dump($this->history);
    }

    public function log_material_count($dbh, $quantity, $lib_change, $time_stamp="CURRENT_TIMESTAMP()"){
        $user = unserialize($_SESSION["user"]);
        
        $SQLrequest = "INSERT INTO material_count (id_user,  id_material , quantity, libchange)
                        VALUES (:id_user, :id_material, :quantity, :libchange);";

        $values = [
            ":id_user" => $user->get_id_user(),
            ":id_material" => strval($this->id),
            ":quantity" => $quantity,
            ":libchange" => $lib_change//,
            //":time_stamp" => $time_stamp
        ];

        //var_dump($SQLrequest);
        //var_dump($values);

        $sth = $dbh->prepare($SQLrequest);
        $outp = [$sth->execute($values)];

        return $outp;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return array
     */
    public function getHistory(): array
    {
        return $this->history;
    }
}