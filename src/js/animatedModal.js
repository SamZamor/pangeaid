/*=========================================
 * animatedModal.js: Version 1.0
 * author: João Pereira
 * website: https://joaopereira.pt
 * email: joaopereirawd@gmail.com
 * Licensed MIT 
=========================================*/

(function ($) {
 
    $.fn.animatedModal = function(options) {
        var modal = $(this);
        
        //Defaults
        var settings = $.extend({
            modalTarget: modal.attr('href').replace('#',''), 
            // position:'fixed', 
            // width:'100%', 
            height:'100%', 
            // top:'0px', 
            // left:'0px', 
            zIndexIn: '9999',  
            zIndexOut: '-9999',  
            //color: '#0B1459', 
            opacityIn:'1',  
            opacityOut:'0', 
            animatedIn:'fadeInUpBig',
            animatedOut:'fadeOutDownBig',
            animationDuration:'.6s', 
            overflow:'hidden', 
            // Callbacks
            beforeOpen: function() {},           
            afterOpen: function() {}, 
            beforeClose: function() {}, 
            afterClose: function() {}
 
            

        }, options);
        
        var closeBt = $('.close-'+settings.modalTarget);

        var backBt = $('.back-'+settings.modalTarget);

        var href = $(modal).attr('href'),
            id = $('body').find('#'+settings.modalTarget),
            idConc = '#'+id.attr('id');
            // Default Classes
            id.addClass('animated');
            id.addClass(settings.modalTarget+'-off');

        //Init styles
        var initStyles = {
            'position':settings.position,
            'width':settings.width,
            'height':settings.height,
            'top':settings.top,
            'left':settings.left,
            'background-color':settings.color,
            'overflow-y':settings.overflow,
            'z-index':settings.zIndexOut,
            'opacity':settings.opacityOut,
            '-webkit-animation-duration':settings.animationDuration,
            '-moz-animation-duration':settings.animationDuration,
            '-ms-animation-duration':settings.animationDuration,
            'animation-duration':settings.animationDuration
        };
        //Apply stles
        id.css(initStyles);

        modal.click(function(event) {       
            event.preventDefault();
            if (!$(this).hasClass('disabledAction')) {
                $('body, html').css({'overflow':'hidden'});
                if (href == idConc) {
                    if (id.hasClass(settings.modalTarget+'-off')) {
                        id.removeClass(settings.animatedOut);
                        id.removeClass(settings.modalTarget+'-off');
                        id.addClass(settings.modalTarget+'-on');
                    } 

                    if (id.hasClass(settings.modalTarget+'-on')) {
                        settings.beforeOpen();
                        id.css({'opacity':settings.opacityIn,'z-index':settings.zIndexIn});
                        id.addClass(settings.animatedIn);  
                        id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterOpen);
                    };  
                } 
            }
        });



        closeBt.click(function(event) {
            event.preventDefault();
            $('body, html').css({'overflow':'auto'});
            if (settings.beforeClose()) {
                settings.beforeClose().then((res) => {
                    result = res;
                    if (res) {
                        /**
                         * RESETING SCREENS ON CLOSE PRESS
                        */
                        resetScreens();
                        let classList = $(this).data('classes').split(/\s+/);
                        closeClasses(classList, settings.zIndexOut)
                    }
                });
            } else {
                if (id.hasClass(settings.modalTarget+'-on')) {
                    id.removeClass(settings.modalTarget+'-on');
                    id.addClass(settings.modalTarget+'-off');
                } 
    
                if (id.hasClass(settings.modalTarget+'-off')) {
                    id.removeClass(settings.animatedIn);
                    id.addClass(settings.animatedOut);
                    id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterClose);
                };
            }
        });

        backBt.click(function(event) {
            event.preventDefault();
            $('body, html').css({'overflow':'auto'});
            if (id.hasClass(settings.modalTarget+'-on')) {
                id.removeClass(settings.modalTarget+'-on');
                id.addClass(settings.modalTarget+'-off');
            } 

            if (id.hasClass(settings.modalTarget+'-off')) {
                id.removeClass(settings.animatedIn);
                id.addClass(settings.animatedOut);
                id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterClose);
            };
        });

        function afterClose () {       
            id.css({'z-index':settings.zIndexOut});
            settings.afterClose(); //afterClose
        }

        function afterOpen () {       
            settings.afterOpen(); //afterOpen
        }

    }; // End animatedModal.js

}(jQuery));


function closeClasses(classList, zIndexOut, afterClose) {
    if (!afterClose) {
        afterClose = function() {};
    }
    if (!zIndexOut) {
        zIndexOut = '-9999';
    }
    $.each(classList, function(index, item) {
        if (item.toLowerCase().indexOf('close-') >= 0) {
            let selector = item.replace('close-','');
            if ($('#' + selector).hasClass(selector+'-on')) {
                $('#' + selector).removeClass(selector+'-on');
                $('#' + selector).addClass(selector+'-off');
            }
            if ($('#' + selector).hasClass(selector+'-off')) {
                $('#' + selector).removeClass('fadeInUpBig');
                $('#' + selector).addClass('fadeOutDownBig');
                $('#' + selector).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterClose);
            };
        }
    });
}