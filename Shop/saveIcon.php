<?php
    $img = $_POST['data'];
    $name = $_POST['name'];

    // $img = str_replace('data:image/png;base64,', '', $img);
    // $img = str_replace(' ', '+', $img);

    $base64 = $img;
    $data = base64_decode($base64);
    $fileName = $name;
    file_put_contents('res/thumb/'.$fileName, $data);
    // $fileData = base64_decode($img);
    // //saving
    // $fileName = 'photo.png';
    // file_put_contents('/res/thumb/'.$fileName, $fileData);
    echo $filename;
?>