 /*
 * TipTip
 * Copyright 2010 Drew Wilson
 * www.drewwilson.com
 * code.drewwilson.com/entry/tiptip-jquery-plugin
 *
 * Version 1.3   -   Updated: Mar. 23, 2010
 *
 * This Plug-In will create a custom tooltip to replace the default
 * browser tooltip. It is extremely lightweight and very smart in
 * that it detects the edges of the browser window and will make sure
 * the tooltip stays within the current window size. As a result the
 * tooltip will adjust itself to be displayed above, below, to the left 
 * or to the right depending on what is necessary to stay within the
 * browser window. It is completely customizable as well via CSS.
 *
 * This TipTip jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($){
	$.fn.tipTip = function(options) {
		var defaults = { 
			activation: "hover",
			tooltipClass: null,
			tipId: 'default',
			keepAlive: false,
			maxWidth: "200px",
			edgeOffset: 3,
			arrowOffset: 0,
			defaultPosition: "bottom",
			delay: 200,
			fadeIn: 200,
			fadeOut: 200,
			attribute: "title",
			closeBtn: false,
			content: false, // HTML or String to fill TipTIp with
			theme: 'white', // New: choose theme, default is white, "black" is the black tooltips from close buttons in popups, "proposalteam" is used in proposal team tooltips
		  	tipHeader: null, // Used for user preference tooltips
		  	tipBody: null, // Used for user preference tooltips
		  	tipName: null, // Used for user preference tooltips
		  	tipKey: null, // Used for user preference tooltips
		  	deleteClass: 'default',
		  	enter: function(){},
		  	scroll: function(){},
		  	exit: function(){}
	  	};
	 	var opts = $.extend(defaults, options);
	 	
	 	// Setup tip tip elements and render them to the DOM
	 	if(opts.tipId == 'default'){
	 		var tipHolder = '#tiptip_holder_' + opts.theme;
	 	} else {
	 		var tipHolder = '#tiptip_content_' + opts.tipId;
	 	}

	 	if(opts.theme == 'userpref') {
	 		maxWidth = '300px';
	 	} else {
	 		maxWidth = opts.maxWidth;
	 	}

	 	if($(tipHolder).length <= 0){
	 		var tiptip_holder = $('<div id="tiptip_holder_' + opts.theme + '" style="max-width:'+ maxWidth +';" class = "tip_holder_class"></div>');

	 		if(opts.tipId == 'default') {
	 			var tiptip_content = $('<div id="tiptip_content"></div>');
	 		} else {
	 			var tiptip_content = $('<div id="tiptip_content_"' + opts.tipId +'></div>');
	 		}
			var tiptip_content = $('<div id="tiptip_content"></div>');
			var tiptip_arrow = $('<div id="tiptip_arrow"></div>');
			$("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')));
		} else {
			var tiptip_holder = $('#tiptip_holder_' + opts.theme);
			if(opts.tipId == 'default') {
				var tiptip_content = $("#tiptip_content");
			} else {
				var tiptip_content = $("#tiptip_content_" + opts.tipId);
			}
			var tiptip_arrow = $("#tiptip_arrow");
		}
	 	tiptip_holder.addClass(opts.deleteClass);
	 	
		return this.each(function(){
			var org_elem = $(this);
			if(opts.theme == 'userpref'){
				var org_title = $('<div class="tooltip-wrapper">'
                                       + '<span class="tooltip-header">'+ opts.tipHeader +'</span>'
                                       + '<span class="tip_close" onClick="toggleUserPreference()"></span>'
                                       + '<span class="tooltip-body">'+ opts.tipBody
                                       + '<span id="tooltip-tipname" style="display:none;">' + opts.tipName + '</span>'
                                       + '<span id="tooltip-tipkey" style="display:none;">' + opts.tipKey + '</span>'
                                       + '</span>'
                                    + '</div>');
			} else if(opts.content){
				var org_title = opts.content;
			} else {
				var org_title = org_elem.attr(opts.attribute);
			}
			if(org_title != ""){
				if(!opts.content){
					org_elem.removeAttr(opts.attribute); //remove original Attribute
				}
				var timeout = false;
				
				if(opts.theme == "userpref") {
					org_elem.bind("userpref",function(e){ 
						initialize_tiptip();
					});
				} else if (opts.activation == "hover"){
					org_elem.hover(function(){
						initialize_tiptip();
					}, function(){
						if(!opts.keepAlive){
							deactive_tiptip();
						}
					});
					if(opts.keepAlive){
						tiptip_holder.hover(function(){}, function(){
							if(opts.closeBtn == true){
							} else if (opts.closeBtn == false) {
							deactive_tiptip();
							}
						});
					}
				} else if(opts.activation == "focus"){
					org_elem.focus(function(){
						initialize_tiptip();
					}).blur(function(){
						deactive_tiptip();
					});
				} else if(opts.activation == "click"){
					org_elem.click(function(){
						initialize_tiptip();
						return false;
					}).hover(function(){},function(){
						if(!opts.keepAlive){
							deactive_tiptip();
						}
					});
					if(opts.keepAlive){
						tiptip_holder.hover(function(){}, function(){
							if(opts.closeBtn == true){
							} else if (opts.closeBtn == false) {
							deactive_tiptip();
							}
						});
					}
				}else if (opts.activation == "other"){
					org_elem.hover(function(){
						org_title = org_elem.attr('content');
						if(org_title)
							initialize_tiptip();
					}, function(){
						if(!opts.keepAlive){
							deactive_tiptip();
						}
					});
					if(opts.keepAlive){
						tiptip_holder.hover(function(){}, function(){
							if(opts.closeBtn == true){
							} else if (opts.closeBtn == false) {
							deactive_tiptip();
							}
						});
					}
				}	
			
				function initialize_tiptip(){
					tiptip_content.html(org_title);
					opts.enter.call(this);
					tiptip_holder.hide().removeAttr("class").css("margin","0");
					tiptip_arrow.removeAttr("style");
					
					var top = parseInt(org_elem.offset()['top']);
					var left = parseInt(org_elem.offset()['left']);
					var org_width = parseInt(org_elem.outerWidth());
					var org_height = parseInt(org_elem.outerHeight());
					var tip_w = tiptip_holder.outerWidth();
					var tip_h = tiptip_holder.outerHeight();
					var w_compare = Math.round((org_width - tip_w) / 2);
					var h_compare = Math.round((org_height - tip_h) / 2);
					var marg_left = Math.round(left + w_compare);
					var marg_top = Math.round(top + org_height + opts.edgeOffset);
					var t_class = "";
					var arrow_top = "";
					var arrow_left = (Math.round(tip_w - 12) / 2) + opts.arrowOffset;

                    if(opts.defaultPosition == "bottom"){
                    	t_class = "_bottom";
                   	} else if(opts.defaultPosition == "top"){ 
                   		t_class = "_top";
                   	} else if(opts.defaultPosition == "left"){
                   		t_class = "_left";
                   	} else if(opts.defaultPosition == "right"){
                   		t_class = "_right";
                   	}
					
					var right_compare = (w_compare + left) < parseInt($(window).scrollLeft());
					var left_compare = (tip_w + left) > parseInt($(window).width());
					
					if((right_compare && w_compare < 0) || (t_class == "_right" && !left_compare) || (t_class == "_left" && left < (tip_w + opts.edgeOffset + 5))){
						t_class = "_right";
						arrow_top = Math.round(tip_h - 13) / 2;
						arrow_left = -12;
						marg_left = Math.round(left + org_width + opts.edgeOffset);
						marg_top = Math.round(top + h_compare);
					} else if((left_compare && w_compare < 0) || (t_class == "_left" && !right_compare)){
						t_class = "_left";
						arrow_top = Math.round(tip_h - 13) / 2;
						arrow_left =  Math.round(tip_w);
						marg_left = Math.round(left - (tip_w + opts.edgeOffset + 5));
						marg_top = Math.round(top + h_compare);
					}

					var top_compare = (top + org_height + opts.edgeOffset + tip_h + 8) > parseInt($(window).height() + $(window).scrollTop());
					var bottom_compare = ((top + org_height) - (opts.edgeOffset + tip_h + 8)) < 0;
					
					if(top_compare || (t_class == "_bottom" && top_compare) || (t_class == "_top" && !bottom_compare)){
						if(t_class == "_top" || t_class == "_bottom"){
							t_class = "_top";
						} else {
							t_class = t_class+"_top";
						}
						arrow_top = tip_h;
						marg_top = Math.round(top - (tip_h + 5 + opts.edgeOffset));
					} else if(bottom_compare | (t_class == "_top" && bottom_compare) || (t_class == "_bottom" && !top_compare)){
						if(t_class == "_top" || t_class == "_bottom"){
							t_class = "_bottom";
						} else {
							t_class = t_class+"_bottom";
						}
						if(opts.theme=="userpref") {
							arrow_top = -20;	
						} else {
							arrow_top = -12;
						}		
						marg_top = Math.round(top + org_height + opts.edgeOffset);
					}
				
					if(t_class == "_right_top" || t_class == "_left_top"){
						marg_top = marg_top + 5;
					} else if(t_class == "_right_bottom" || t_class == "_left_bottom"){		
						if(opts.theme!="userpref") {
							marg_top = marg_top - 5;
						} else {
							marg_top = marg_top;
						}
					}
					if(t_class == "_left_top" || t_class == "_left_bottom"){	
						marg_left = marg_left + 5;
					}

					tiptip_arrow.css({"margin-left": arrow_left+"px", "margin-top": arrow_top+"px"});
					tiptip_holder.css({"margin-left": marg_left+"px", "margin-top": marg_top+"px"}).attr("class","tip"+t_class);
					tiptip_holder.addClass(opts.deleteClass);
					
					open_tiptip();
				}
				
				function open_tiptip(){
					//if (timeout){ clearTimeout(timeout); }
					//timeout = setTimeout(function(){ tiptip_holder.stop(true,true).fadeIn(opts.fadeIn); }, opts.delay);
					tiptip_holder.stop(true,true).fadeIn(opts.fadeIn);
					opts.scroll.call(this);
				}

				function deactive_tiptip(){
					opts.exit.call(this);
					if (timeout){ clearTimeout(timeout); }
					tiptip_holder.fadeOut(opts.fadeOut);
				}
			}				
		});
	}
})(jQuery);  	