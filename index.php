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
            #div1{
                width: 200px;
                height: 200px;
                background-color: #678e44;
            }
            #div2{
                width: 200px;
                height: 200px;
                background-color: #834f00;
            }
            #div3{
                width: 200px;
                height: 200px;
                background-color: #23500;
            }
            #detectColorHolder{
                position: absolute; top: 0px; right: 0px; padding: 10px; background: #cccccc;
            }
            .color{
                width: 25px; height: 25px; border:1px solid #000000; margin:2px;
            }
            h3{
                color:#336699;
            }
        </style>
        <script type="text/javascript" src="jquery.js"></script>
        <script type="text/javascript" src="detectColour.js"></script>
    </head>
    <body>
        <div id="divRed"></div>
        <div id="divGreen"></div>
        <div id="div1"></div>
        <div id="div2"><h3>Test</h3></div>
        <div id="div3"><span>test</span></div>
        <script type="text/javascript">
        jQuery(document).ready(function() {
            var detectColor = new DetectColor.Load();
            console.log("Heres your object:");
            console.log( detectColor );
        });
        </script>
    </body>
</html>
