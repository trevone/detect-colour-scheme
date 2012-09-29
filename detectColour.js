/* 
 * Detect Colour Scheme
 * @Author Gerrit van Huyssteen
 * @Website www.gvh.co.za
 * @Version 0.2
 */
DetectColor = ( typeof DetectColor === 'undefined' ) ? {} : DetectColor;
(function(){
    DetectColor = function() {
        this.colors = this.draw();
    }
    DetectColor.prototype = {
        colors : [],
        attrs : ["border-color","background-color","color","font-color","outline-color"],
        hexDigits : ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],
        returnColor: function( string ) {
            string.match( / *\([^)]*\) */g );
        },
        groupColors:   function ( matchColor ){
            var matchCount = 0;
            for( var i in this.colors ) if( this.colors[i] == matchColor ) matchCount++;
            if( matchCount == 0 && !!matchColor )this.colors.push(matchColor);
        },
        hasAlpha:   function ( attr ){
            return ( attr.split(',')[3] == undefined) ? 'rgb' : 'rgba';
        },
        toHex: function ( x ) {
            return isNaN( x ) ? "00" : this.hexDigits[(x - x % 16) / 16] + this.hexDigits[x % 16];
        },
        colorToHex: function ( rgbToColor ) {
            if( this.hasAlpha( rgbToColor ) ) return rgbToColor;
            if( Object.prototype.toString.call( rgbToColor.match( /(.*?)\((\d+), (\d+), (\d+)\)/ ) ) === '[object Array]' ) 
                return '#'+this.toHex( rgbToColor[2] ) + this.toHex( rgbToColor[3] ) + this.toHex( rgbToColor[4] );
        },
        removeDuplicates: function ( array ) {
            var i,len=array.length,out=[],obj={};
            for ( i = 0; i < len; i++ ) obj[ array[i] ] = 0;
            for ( i in obj ) out.push(i);
            return out;
        },
        draw: function(){
            jQuery('*').each( function ( ) { 
                for( var a in DetectColor.prototype.attrs ){
                    var background = jQuery( this ).css(DetectColor.prototype.attrs[a]);
                    ( Object.prototype.toString.call( background ) === '[object Array]' ) ? 
                    DetectColor.prototype.groupColors( DetectColor.prototype.returnColor( background )[0] ) : DetectColor.prototype.groupColors( background );
                }
            });
            jQuery('<div id="detectColorHolder" style="position: absolute; top: 0px; right: 0px; padding: 10px; background: #cccccc;" />').appendTo('body');
            DetectColor.prototype.colors = DetectColor.prototype.removeDuplicates ( DetectColor.prototype.colors );
            for( var i in DetectColor.prototype.removeDuplicates ( DetectColor.prototype.colors ) )
                jQuery( '#detectColorHolder' ).append( function() {
                    if( !!DetectColor.prototype.colors[i] ){
                        var hex = ( DetectColor.prototype.colors[i].match('#') != 'null' ) ? 
                        DetectColor.prototype.colors[i] : DetectColor.prototype.colorToHex( DetectColor.prototype.hasAlpha( DetectColor.prototype.colors[i] ) + '' + DetectColor.prototype.colors[i] ) ;              
                        return '<div class="color" style="width: 25px; height: 25px; border:1px solid #000000; margin:2px; background-color:'+hex+';" title="'+hex+'"/>'; 
                    }
                });
            return DetectColor.prototype.colors;
        }
    }
})();
new DetectColor();