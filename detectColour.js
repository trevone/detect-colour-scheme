/* 
 * Detect Color Scheme
 * @Author Gerrit van Huyssteen
 * @Website www.gvh.co.za
 * @Contributer TrevorSchuil
 * https://github.com/trevone/detect-colour-scheme
 * 
 * Abstract
 * This is a concrete instance of the Scheme
 * 
 * Usage
 * var scheme = DetectColor.Load();
 * 
 * Propterties
 * colors - Array
 * hasAlpha - Function
 * toHex - Function
 * rgbToHex - Function String
 * removeDuplicates - Function Array
 * draw - Function Array
*/

DetectColor = ( typeof DetectColor === 'undefined' ) ? {} : DetectColor;

( function (){
    
    /* 
    * Strip a string down to its color
    * DetectColor.Load.returnColor( someColor );
    */
    DetectColor.Load = function() {
        this.colors = this.draw(); 
    }
    
    /* 
    * Extend DetectColor.Load with some default properties 
    */
    DetectColor.Load.prototype = {
        
        /* 
         * Set up some constants
         */
        colors : [],
        attrs : ["border-color","background-color","color","font-color","outline-color"],
        hexDigits : ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],
        
        /* 
         * Strip a string down to its color
         * DetectColor.Load.returnColor( someColor );
         */
        returnColor: function( string ) {
            string.match( / *\([^)]*\) */g );
        },
        
        /* 
         * this one needs an explaination
         */
        groupColors: function ( matchColor ){
            var matchCount = 0;
            for( var i in this.colors ) if( this.colors[i] == matchColor ) matchCount++;
            if( matchCount == 0 && !!matchColor ) this.colors.push( matchColor );
        },
        
        /* 
         * Checks a color string for the alpha attribute
         * DetectColor.Load.hasAlpha( someColor );
         */
        hasAlpha: function ( attr ){
            return ( attr.split(',')[3] == undefined) ? 'rgb' : 'rgba';
        },
        
        /* 
         * Converts single value to Hex
         * DetectColor.Load.toHex( 120 );
         */
        toHex: function ( value ) {
            return isNaN( value ) ? "00" : this.hexDigits[ ( value - value % 16 ) / 16 ] + this.hexDigits[ value % 16];
        },
        
        /* 
         * Converts rgb to Hex
         * DetectColor.Load.rgbToHex('rgb(120, 120, 0));
         */
        rgbToHex: function ( rgb ) {
            if( this.hasAlpha( rgb ) ) return rgb;
            /* IE8 and below fail safe */
            if( Object.prototype.toString.call( rgb.match( /(.*?)\((\d+), (\d+), (\d+)\)/ ) ) === '[object Array]' ) 
                return '#'+this.toHex( rgb[2] ) + this.toHex( rgb[3] ) + this.toHex( rgb[4] );
        },
        
        /* 
         * Used to remove duplicated colors
         * DetectColor.Load.removeDuplicates(['#eee',#eee]);
         */
        removeDuplicates: function ( array ) {
            var i, uniques = [], object = {};
            for ( var i = 0; i < array.length; i++ ) object[array[i]] = 0;
            for ( var i in object ) uniques.push(i);
            return uniques;
        },
        
        /* 
         * Called from the constructor and returns all the colors it found 
         * DetectColor.Load.draw();
         */
        draw: function(){
            jQuery('*').each( function () { 
                for( var a in DetectColor.Load.prototype.attrs ){
                    var background = jQuery( this ).css(DetectColor.Load.prototype.attrs[a]);
                    /* IE8 and below fail safe */
                    ( Object.prototype.toString.call( background ) === '[object Array]' ) ? 
                        DetectColor.Load.prototype.groupColors( DetectColor.Load.prototype.returnColor( background )[0] ) : DetectColor.Load.prototype.groupColors( background );
                }
            });
            jQuery('<div id="colors" />').appendTo('body');
            DetectColor.Load.prototype.colors = DetectColor.Load.prototype.removeDuplicates ( DetectColor.Load.prototype.colors );
            for( var i in DetectColor.Load.prototype.removeDuplicates ( DetectColor.Load.prototype.colors ) )
                jQuery( '#colors' ).append( function() {
                    if( !!DetectColor.Load.prototype.colors[i] ){
                        var hex = ( DetectColor.Load.prototype.colors[i].match('#') != 'null' ) ? 
                        DetectColor.Load.prototype.colors[i] : DetectColor.Load.prototype.rgbToHex( DetectColor.Load.prototype.hasAlpha( DetectColor.Load.prototype.colors[i] ) + '' + DetectColor.Load.prototype.colors[i] ) ;              
                        return '<div class="color" style="background-color:' + hex + ';" />'; 
                    }
                });
           return DetectColor.Load.prototype.colors;
        }
        
    }
    
})()