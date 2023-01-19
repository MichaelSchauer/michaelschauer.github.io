<?php
    $filename = $_POST["data"];
    $filename = "res/thumb/".$filename;
    if (!unlink($filename)) {
        echo ("$filename cannot be deleted");
    }
    else {
        echo ("$filename has been deleted");
    }
?>