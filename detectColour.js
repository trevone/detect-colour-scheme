/* 
 * Detect Color Scheme
 * @Author Gerrit van Huyssteen
 * @Website www.gvh.co.za
 */
DetectColor = ( typeof DetectColor === 'undefined' ) ? {} : DetectColor;
(function(){
    DetectColor.Load = function() {
        this.colors = this.draw();
    }
    DetectColor.Load.prototype = {
        colors : [],
        attrs : ["border-color","background-color","color","font-color","outline-color"],
        hexDigits : ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],
        returnColor: function( string ) {
            string.match( / *\([^)]*\) */g );
        },
        groupColors:   function ( matchColor ){
            var matchCount = 0;
            for( var i in this.colors ) if( this.colors[i] == matchColor ) matchCount++;
            if( matchCount == 0 && !!matchColor ){
                this.colors.push(matchColor);
            }
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
            for ( var i = 0; i < len; i++ ) obj[ array[i] ] = 0;
            for ( var i in obj ) out.push(i);
            return out;
        },
        draw: function(){
            jQuery('*').each( function ( ) { 
                for( var a in DetectColor.Load.prototype.attrs ){
                    var background = jQuery( this ).css(DetectColor.Load.prototype.attrs[a]);
                    ( Object.prototype.toString.call( background ) === '[object Array]' ) ? 
                        DetectColor.Load.prototype.groupColors( DetectColor.Load.prototype.returnColor( background )[0] ) : DetectColor.Load.prototype.groupColors( background );
                }
            });
            jQuery('<div id="detectColorHolder" />').appendTo('body');
            DetectColor.Load.prototype.colors = DetectColor.Load.prototype.removeDuplicates ( DetectColor.Load.prototype.colors );
            for( var i in DetectColor.Load.prototype.removeDuplicates ( DetectColor.Load.prototype.colors ) )
                jQuery( '#detectColorHolder' ).append( function() {
                    if( !!DetectColor.Load.prototype.colors[i] ){
                        var hex = ( DetectColor.Load.prototype.colors[i].match('#') != 'null' ) ? 
                        DetectColor.Load.prototype.colors[i] : DetectColor.Load.prototype.colorToHex( DetectColor.Load.prototype.hasAlpha( DetectColor.Load.prototype.colors[i] ) + '' + DetectColor.Load.prototype.colors[i] ) ;              
                        return '<div class="color" style="background-color:'+hex+';" />'; 
                    }
                });
           return DetectColor.Load.prototype.colors;
        }
    }
})()