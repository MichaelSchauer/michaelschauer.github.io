<?php
    $url = $_POST['url'];   
  /*   $json = json_encode(json_decode(file_get_contents("https://cf-intranet.ooelfv.at/webext2/rss/json_laufend.txt"), true));
 */
    $url = 'https://cf-intranet.ooelfv.at/webext2/rss/json_laufend.txt';
/*     $json = file_get_contents($url);
    $jo = json_decode($json);
    echo $jo; */



    $url = "https://cf-intranet.ooelfv.at/webext2/rss/json_laufend.txt";
    $json = file_get_contents($url);
    $json_data = json_decode($json, true);
    echo $json_data;
/*     echo $json;
 */?>