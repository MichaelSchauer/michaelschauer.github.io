<?php
    //Write data from ajax request to variable obj
    $obj = $_POST["data"];
    //open file orders.json and write (overwrite) data into file 
    $file = fopen("res/items.json", "w");
    echo fwrite($file, $obj);
    //close stream
    fclose($file);
?>