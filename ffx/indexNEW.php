
<head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-status-bar-style"content="black-translucent">
    <link rel="icon" href="resources/favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="resources/favicon.ico" type="image/x-icon"/>
    <link rel="apple-touch-icon-precomposed" href="resources/icon.png"/>
    <link rel="apple-touch-icon" href="resources/512.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="resources/72.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="resources/114.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="resources/144.png" />
    <link rel="manifest" href="resources/manifest.webmanifest">
    <title>FF Info</title>
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <link rel="stylesheet" href="styleNEW.css">
    <link rel="stylesheet" href="animation.css">
    <link rel="stylesheet" href="chart.css">
    <script src="scriptNEW.js"></script>
    <script src="charts.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>
        <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
    <link rel="stylesheet" href="nav.css">
    <script src="nav.js"></script>
    </head>

 
 <body>
     <!--Header-->
    <div id="header">
        <p id="headertitle">Einsätze</p>
    </div>
    <div class="contentwrap">

    <!--Markup-->
        <div id="Title"><p>Einsätze</p></div>
        <section id="einsaetze">

            <div id="markup">
                <div class="entry">
                    <div class="leftentry">
                        <div class="leftentryff">UU - ST. GOTTHARD</div>
                        <div class="leftentrycase">Verkehrsunfall Aufräumarbeiten</div>
                        <div class="leftentrydate">05. April 2022</div>
                    </div>
                    <div class="rightentry">
                        <div class="rightentrytop">07:15</div>
                        <div class="rightentrymiddle"><div class="strich"></div></div>
                        <div class="rightentrybottom">08:15</div>
                    </div>
                </div>

            </div>

        </section>
    </div>
    <!--Nav-->
    <div class="navwrapper">
      <div class="navinner" onclick="nav(1)">
        <div class="navicon" id="navicon1"><img src="resources/iconalarm.svg" alt=" "></div>
        <div class="navtext" id="navtext1"><p>Einsätze</p></div>
      </div>
      <div class="navinner" onclick="nav(2)">
        <div class="navicon" id="navicon2"><img src="resources/iconchart.svg" alt=" "></div>
        <div class="navtext" id="navtext2"><p>Statistik</p></div>
      </div>
      <div class="navinner" onclick="nav(3)">
        <div class="navicon" id="navicon3"><img src="resources/iconmap.svg" alt=" "></div>
        <div class="navtext" id="navtext3"><p>Karte</p></div>
      </div>
      <div class="navinner" onclick="nav(4)">
        <div class="navicon" id="navicon4"><img src="resources/iconsettings.svg" alt=" "></div>
        <div class="navtext" id="navtext4"><p>Einstellungen</p></div>
      </div>
    </div> 
 </body>