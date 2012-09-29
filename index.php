<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Detect Colour Scheme</title>
        <style type="text/css">
            body{
                background-color: #efefef;
                color:#00000;
            }
            #divRed{
                width: 200px;
                height: 200px;
                background-color: #ff0000;
            }
            #divGreen{
                width: 200px;
                height: 200px;
                background-color: #00ff00;
            }
        </style>
        <script type="text/javascript" src="jquery.js"></script>
        <script type="text/javascript" src="detectColour.js"></script>
    </head>
    <body>
        <div id="divRed"></div>
        <div id="divGreen"></div>
        <script type="text/javascript">
        jQuery(document).ready(function($) {
            var detectColor = new DetectColor.Load();
            console.log("Heres your object:");
            console.log(detectColor);
        });
        </script>
    </body>
</html>
