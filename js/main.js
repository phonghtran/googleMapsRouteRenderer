var mplsIsAwesome = function(){
	$(document).ready(function() {
		var firstSectionHeight = $('.section').eq(1).offset().top,
			offsetScrollTrigger = 200; // trigger section detect early 

		/* ---------------------------------
			EVENT LISTENERS
		--------------------------------- */ 
		$('#menu').hover(
			function(){
				$('body').addClass('peekMenu');
			},
			function(){
				$('body').removeClass('peekMenu');
			}
		).click(function(){
			$('body').toggleClass('showMenu');
		});

		$('#menu .thumbnail').click(function(){
			$('#menu').click(); // debug

			return false;
		});

		$('#mainContent').hover(
			function(){
				$('body').addClass('peekMainContent');
			},
			function(){
				$('body').removeClass('peekMainContent');
			}
		).click(function(){
			$('body').removeClass('showMenu');
		});

		$(window).keyup(function(e){
			if (e.which == 77) $('#menu').click();
		});

		$('#chapterNav li').click(function(){
			var $currentMarkerTop = $('.section').eq($(this).index()).offset().top - offsetScrollTrigger ;
			
			$('body').animate({
				scrollTop : $currentMarkerTop + 'px'
			})

			return false;
		});

		/* ---------------------------------
			window scroll track
		--------------------------------- */
		$(window).scroll(function(){					
			var $this = $(this),
				scrollPos = $this.scrollTop(),
				section = 0;

			$('#chapterNav .profile').removeClass('active');

			// figure out section
			if (scrollPos < firstSectionHeight - offsetScrollTrigger){
				section = 0;
			} else if (scrollPos + $this.height() > $('#innerContainer').height()) { 
			
				$('#chapterNav .chapterMarker').each(function(){
					var $this = $(this),
						$thisImg = $this.find('img'),
						$thisSrc = $thisImg.attr('src'),
						newSrc = $thisSrc.replace(new RegExp('img/chapterNav/([0-9]{3})(_hover)*.png', 'g'), 'img/chapterNav/$1.png');

					$thisImg.attr('src', newSrc);
				});

				$('#chapterNav .profile').addClass('active');

				return false
			} else {

				$('.section').each(function(){
					var $this = $(this);

					if ($this.offset().top - offsetScrollTrigger <= scrollPos){
						section = $this.index();
					} else {
						return false;
					}
				});
			};
			
			// swap images
			// TODO eventually use sprites and class swaps
			$('#chapterNav .chapterMarker').each(function(){
				var $this = $(this),
					$thisImg = $this.find('img'),
					$thisSrc = $thisImg.attr('src'),
					newSrc = ($this.index() == section) ? 
						$thisSrc.replace(new RegExp('img/chapterNav/([0-9]{3}).png', 'g'), 'img/chapterNav/$1_hover.png') :
						$thisSrc.replace(new RegExp('img/chapterNav/([0-9]{3})(_hover)*.png', 'g'), 'img/chapterNav/$1.png');

				$thisImg.attr('src', newSrc);
			});
		});


		$(window).resize(function(){
			$('#mainContent #innerContainer').width($('#mainContent').width());
		});
		
	}); // init




}();
