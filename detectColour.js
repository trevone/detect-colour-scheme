/* 
 * Detect Color Scheme
 * @Author Gerrit van Huyssteen
 * @Website www.gvh.co.za
 */
//this is how we roll
DetectColor = (typeof DetectColor === 'undefined') ? {} : DetectColor;
DetectColor.Load = function(  ) {
        colors : new Array(),
        DetectColor.Load.prototype = {
            colors : new Array(),
            hexDigits : ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],
            returnColor: function( string ) {
       		string.match( / *\([^)]*\) */g );
		},
            groupColors:   function ( matchColor ){
                    var matchCount = 0;
                    for( i in this.colors ) if( this.colors[i] == matchColor ) matchCount++;
                    if( matchCount == 0 ) this.colors[this.colors.length] = matchColor;
                },
            hasAlpha:   function ( attr ){
                return ( attr.split(',')[3] == undefined) ? 'rgb' : 'rgba';
            },
            toHex: function ( x ) {
                return isNaN( x ) ? "00" : this.hexDigits[(x - x % 16) / 16] + this.hexDigits[x % 16];
            },
            colorToHex: function ( rgbToColor ) {
                if( this.hasAlpha( rgbToColor ) ) return rgbToColor;
                if( Object.prototype.toString.call( rgbToColor.match(/(.*?)\((\d+), (\d+), (\d+)\)/) ) === '[object Array]' ) 
                    return '#'+this.toHex( rgbToColor[2] )+this.toHex( rgbToColor[3] )+this.toHex( rgbToColor[4] );
            },
            draw: function(){
                jQuery('*').each( function ( ) { 
                    var background = jQuery( this ).css('background-color');
                    var color = jQuery( this ).css('color');
                    color = DetectColor.Load.prototype.returnColor( color );
                    ( Object.prototype.toString.call( background ) === '[object Array]' ) ? 
                        DetectColor.Load.prototype.groupColors( DetectColor.Load.prototype.returnColor( background )[0] ) : DetectColor.Load.prototype.groupColors( background );
                    ( Object.prototype.toString.call( color ) === '[object Array]' ) ? 
                        DetectColor.Load.prototype.groupColors( color[0] ) : DetectColor.Load.prototype.groupColors( background );                    
                });
                jQuery('body').append( '<div id="detectColorHolder" style="position: absolute; top: 0px; right: 0px; padding: 10px; background: #cccccc;"></div>');
                    for( var i in DetectColor.Load.prototype.colors )
                        $( '#detectColorHolder' ).append( function() {
                            var hex = ( DetectColor.Load.prototype.colors[i].match('#') != 'null' ) ? DetectColor.Load.prototype.colors[i] : DetectColor.Load.prototype.colorToHex(DetectColor.Load.prototype.hasAlpha( DetectColor.Load.prototype.colors[i] )+''+DetectColor.Load.prototype.colors[i]) ;              
                            return '<div style="width: 25px; height: 25px; border:1px solid #000000; margin:2px; background: '+hex+';" title="'+hex+'"></div>'; 
                        });
            }
        },DetectColor.Load.prototype.draw() 
};