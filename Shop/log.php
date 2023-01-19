<?php
    //Write data from ajax request to variable obj
    $data = $_POST["data"].PHP_EOL;
    //open file orders.json and write (overwrite) data into file 
    $file = fopen("log.txt", "a");
    echo fwrite($file, $data);
    //close stream
    fclose($file);
?>