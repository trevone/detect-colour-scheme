/* 
 * Detect Colour Scheme
 * @Author Gerrit van Huyssteen
 * @Website www.gvh.co.za
 */

(function detectColour(){
       
    var colours = new Array();
    
    // Create UI
    jQuery('body').append(function(){
        var uiHolder = '<div id="detectColourHolder" style="position: absolute; top: 0px; right: 0px; padding: 10px; background: #cccccc;"></div>';
        return uiHolder;
    })
    
    jQuery('*').each(function(){
        var background = jQuery(this).css('background');
        var colour = jQuery(this).css('color');
        
        colour = returnColour(colour);
        background = returnColour(background);
        
        groupColours(background[0]);
        groupColours(colour[0]);
        
    });
    
    function returnColour(string){
        return string.match(/ *\([^)]*\) */g);
    }
    
    function groupColours(matchColour){
        var matchCount = 0;
        for(var i = 0; i <= colours.length; i++){

            if(colours[i] == matchColour){
                matchCount++;
            }
        }
        if(matchCount == 0){
            var colCount = colours.length;
            
            colours[colCount] = matchColour;
        }
    }
    
    function hasAlpha(c){
        c = c.split(',');
        if(c[3] == undefined){
            return 'rgb';
        }else{
            return 'rgba';
        }
    }
    
    //http://wowmotty.blogspot.com/2009/06/convert-jquery-rgb-output-to-hex-color.html
    function toHex(x) {
        var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }
    
    function colourToHex(rgbcol) {
        var regex;
        switch (hasAlpha(rgbcol)){
            case 'rgba': return rgbcol;
                break;
            case 'rgb': regex = /(.*?)\((\d+), (\d+), (\d+)\)/;
                break;
        }
        rgbcol = rgbcol.match(regex);
        
        var hex = '#'+toHex(rgbcol[2])+toHex(rgbcol[3])+toHex(rgbcol[4]);
        return hex;
    }
    
    
    
    (function addToHolder(){
        for(var i = 0; i < colours.length; i++){
            $('#detectColourHolder').append(function(){
                var hex = colourToHex(hasAlpha(colours[i])+''+colours[i]);
               return '<div style="width: 25px; height: 25px; border:1px solid #000000; margin:2px; background: '+hex+';" title="'+hex+'"></div>'; 
            });
        }
    })();
})();
