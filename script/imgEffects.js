if ( doesFade || doesSlide ) {
	// Plugin @RokoCB :: Return the visible amount of px
	// of any element currently in viewport.
	// stackoverflow.com/questions/24768795/
	(function(jQuery, win) {
		jQuery.fn.inViewport = function(cb) {
			return this.each(function(i,el){
				function visPx(){
					var H = jQuery(this).height(),
						r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
					return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));
				} visPx();
				jQuery(win).on("resize scroll", visPx);
			});
		};
	}(jQuery, window));

	if ( doesFade ) {
		var images = jQuery(".body img:not(.hidden)");
		images.css("opacity", 0);
	}

	if ( doesSlide ) {
		var leftImages = jQuery(".block--left img:not(.hidden), .section-image.left:not(.hidden)");
		var rightImages = jQuery(".block--right img:not(.hidden), .section-image.right:not(.hidden)");
		leftImages.css("position", "relative");
		rightImages.css("position", "relative");
		leftImages.css("left","-50%");
		rightImages.css("right","-50%");
	}

	images.load(function(){
		jQuery(this).data("ready",1);
		window.setTimeout(function() {
			jQuery(window).resize();
		}, 3000);
	});

	jQuery( document ).ready(function() {
		updateImages();
	});

	function updateImages() {
		images.inViewport(function(px){
			if(px && jQuery(this).data("ready")) {
				if (doesFade) jQuery(this).animate({ opacity: 1 }, { duration: 1000, queue: false });
				if (doesSlide) jQuery(this).animate({ left: 0, right: 0 }, { duration: 500, queue: false });
				jQuery(this).data("ready",0);
			}
		});
	}
}