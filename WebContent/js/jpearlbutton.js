(function($) {

	var labels = [];
	var anchors = {};
	var anchorTabs = {};
	var customIcons = {};
	var customColors = {};
	var subButtonColors = [ '#FFD600', '#2196F3', '#8BC34A', '#FF5722',
			'#FFC107', '#03A9F4', '#4CAF50' ];
	var addIconSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AMGDDYwHoTMkwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAU0lEQVRIx2NgIAH8hwJS9DCRYHgVNjbVLCAXjFowasEQsICF1IxDSmZjZGRsYyQ16w+6IGIkMYhaoXQ1UYYzMraRFOb/EWC0sBu1YNQCWgFymi0AiN42YmLOynIAAAAASUVORK5CYII=';
	var penIconSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AMGDQkjwybNRgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAmUlEQVRYw+3U2Q3CMBBF0TtWWkgv6YUW7GqScuiIIoYPSDRYVqQgDJF458ubxk/yAiIiIn1Z7Lj7vE2YlTB+Aaa3N3mtNddjAEO1IId+XDzFuaPcvQ6Uq/qkVogOWrVzPIH0hRC7AdcwwwnuaXb3x9H82GJmJZ0hBEB6NpbeG+6F2O6ImZX1ibXePnAFbsD4ib+kDiEiIvJX7kwlOuF6VctNAAAAAElFTkSuQmCC';

	var settings = {
		show : true,
		mainIcon : penIconSrc
	};
	var isExpanding = true;
	var $buttonElement;

	$.fn.jPearlButton = function(options) {

		settings = $.extend(settings, options);

		// get label and setting from html
		setData(this);

		this.hide();

		// create button element (also color, icon)
		$buttonElement = createButtonElement();

		// bind event
		bindEvent();

		// apply css
		arrangeDesign();

		// add method
		addMethod($buttonElement);

		// append
		$('body').append($buttonElement);

		return $buttonElement;
	};

	var setData = function($ul) {
		$.each($ul.children(), function(index) {
			labels.push($(this).text());
			anchors['anchor' + index] = $(this).data('jp-anchor');
			anchorTabs['anchortab' + index] = $(this).data('jp-anchortab');
			customIcons['icon' + index] = $(this).data('jp-icon');
			customColors['color' + index] = $(this).data('jp-color');
		});
	};

	var createButtonElement = function() {
		var $wrapper = $('<div class="wrapper"></div>');
		$
				.each(
						labels,
						function(index) {
							var $recordDiv, $button;
							var anchor = anchors['anchor' + index];
							var onclickEvent = anchor === void 0 ? ''
									: 'onclick=\'location.href="' + anchor
											+ '"\'';
							var anchorTab = anchorTabs['anchortab' + index];
							onclickEvent = anchorTab === void 0 ? onclickEvent
									: 'onclick=\'window.open("' + anchorTab
											+ '")\'';
							if (index === 0) {
								$recordDiv = $('<div class="record mainrecord"></div>');
								$button = $('<div><button class="mainbutton"'
										+ onclickEvent
										+ '><img class="addicon" src="'
										+ addIconSrc + '" /></button></div>');
							} else {
								$recordDiv = $('<div class="record subrecord"></div>');
								var customIcon = customIcons['icon' + index];
								var buttonLabel = customIcon === void 0 ? this
										.charAt(0)
										: '<img class="subicon" src="'
												+ customIcon + '" />'
								$button = $('<div><button class="subbutton"'
										+ onclickEvent + '>' + buttonLabel
										+ '</button></div>');
							}
							var $labelDiv = $('<div class="labelwrapper" style="display:none;"><p class="label">'
									+ this + '</p></div>');
							$recordDiv.append($button).append($labelDiv);
							$wrapper.prepend($recordDiv);
						});

		return $wrapper;
	};

	var bindEvent = function() {
		$buttonElement.on('mouseenter', function() {
			$.each($('.subbutton', $buttonElement).get().reverse(), function(
					index) {
				if (index == 0) {
					isExpanding = true;
				}
				var self_ = this;
				$(this).height('20px').width('20px').css({
					position : 'relative',
					left : '-5px',
					top : '5px'
				});
				setTimeout(function() {
					if (!isExpanding) {
						return false;
					}
					$(self_).animate({
						left : '0px',
						top : '0px',
						width : '40px',
						height : '40px',
						opacity : '1'
					}, 65);
					// $(self_).show();
				}, 25 * (index + 1));
			});
			$($('.mainbutton > .addicon', $buttonElement)[0]).stop().animate(
					{
						'z-index' : '+=1'
					},
					{
						duration : 200,
						step : function(num) {
							$(this).css({
								transform : 'rotate(' + (num * 135) + 'deg)'
							});
						},
						complete : function() {
							$('.mainbutton > .addicon', $buttonElement).css(
									'z-index', 5000);
						}
					});
			setTimeout(function() {
				$($('.mainbutton > .addicon', $buttonElement)[0]).attr('src',
						settings.mainIcon);
				$('.mainbutton > .addicon', $buttonElement).css({
					'height' : '20px',
					'width' : '20px'
				});
			}, 200);
		});
		$buttonElement.on('mouseleave', function() {
			$.each($('.subbutton', $buttonElement), function(index) {
				if (index == 0) {
					isExpanding = false;
				}
				var self_ = this;
				setTimeout(function() {
					if (isExpanding) {
						return false;
					}
					$(self_).animate({
						opacity : '0'
					}, 65);
				}, 25 * (index + 1));
			});
			$($('.mainbutton > .addicon', $buttonElement)[0]).stop().animate(
					{
						'z-index' : '+=1'
					},
					{
						duration : 200,
						step : function(num) {
							$(this).css({
								transform : 'rotate(-' + (num * 180) + 'deg)'
							});
						},
						complete : function() {
							$('.mainbutton > .addicon', $buttonElement).css(
									'z-index', 5000);
						}
					});
			setTimeout(function() {
				$($('.mainbutton > .addicon', $buttonElement)[0]).attr('src',
						addIconSrc);
				$('.mainbutton > .addicon', $buttonElement).css({
					'height' : '16px',
					'width' : '16px'
				});
			}, 200);
		});
		$.each($('button', $buttonElement).get().reverse(), function(index) {
			var self_ = this;
			$(this).on('mouseenter', function() {
				$('.labelwrapper', this.parentElement.parentElement).show();
			});
			$(this).on('mouseleave', function() {
				$('.labelwrapper', this.parentElement.parentElement).hide();
			});
			$(this).on('click', {
				label : $('.label', this.parentElement.parentElement).text()
			}, function(e) {
				settings.onclick(e.data.label, e);
			});
		});
	}

	var arrangeDesign = function() {
		$buttonElement.css({
			'position' : 'fixed',
			'right' : '50px',
			'bottom' : '30px',
			'width' : '80px',
			'cursor' : 'pointer',
			'z-index' : '5000',
			'display' : settings.show ? 'block' : 'none',
			'font-family' : '"Helvetica Neue", Helvetica, Arial, sans-serif'
		});

		$('.record', $buttonElement).css({
			'display' : 'flex',
			'flex-direction' : 'row-reverse',
			'height' : '60px'
		});

		$('.subrecord', $buttonElement).css({
			'padding-right' : '8px'
		});

		$('button', $buttonElement).css({
			'box-shadow' : '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)',
			'outline' : 'none',
			'border-width' : '0px',
			'cursor' : 'pointer',
			'color' : '#fff'
		});

		$('.mainbutton', $buttonElement).css({
			'height' : '56px',
			'width' : '56px',
			'border-radius' : '28px',
			'background-color' : '#db4437'
		});

		$('.mainbutton > .addicon', $buttonElement).css({
			'height' : '16px',
			'width' : '16px'
		});

		$('.subbutton', $buttonElement).css({
			'height' : '40px',
			'width' : '40px',
			'border-radius' : '20px',
			'opacity' : '0',
			'font-size' : '20px',
			'font-weight' : 'bold'
		});

		$('.subicon', $buttonElement).css({
			'height' : '16px',
			'width' : '16px'
		});

		$('.labelwrapper', $buttonElement).css({
			'color' : '#ddd',
			'margin-right' : '8px',
			'font-size' : '14px'
		});

		$('.mainrecord > .labelwrapper', $buttonElement).css({
			'padding-top' : '18px'
		});

		$('.subrecord > .labelwrapper', $buttonElement).css({
			'padding-top' : '10px'
		});

		$('.label', $buttonElement).css({
			'background-color' : '#424242',
			'margin' : '0px',
			'padding' : '4px 6px',
			'font-weight' : 'bold',
			'border-radius' : '2px',
			'white-space' : 'nowrap'
		});

		$.each($('.subbutton', $buttonElement).get().reverse(),
				function(index) {
					var customColor = customColors['color' + (index + 1)];
					$(this).css(
							'background-color',
							customColor === void 0 ? subButtonColors[index % 7]
									: customColor);
				});
	};

	var addMethod = function($button) {
		$button.addButton = function(label, index, onclick, color, icon) {
			// validation
			var hasError = false;
			if (label === void 0) {
				console.error('label is needed');
				hasError = true;
			}
			if (index <= 0) {
				console.error('index should be a natural number');
				hasError = true;
			}
			if (hasError) {
				return;
			}

			// create element
			var $recordDiv, $subbutton;

			$recordDiv = $('<div class="record subrecord"></div>');
			var buttonLabel = icon === void 0 ? label.charAt(0)
					: '<img class="subicon" src="' + icon + '" />'
			$subbutton = $('<div><button class="subbutton">' + buttonLabel
					+ '</button></div>');

			var $labelDiv = $('<div class="labelwrapper" style="display:none;"><p class="label">'
					+ label + '</p></div>');
			$recordDiv.append($subbutton).append($labelDiv);

			// bind event
			$recordDiv.on('mouseenter', function() {
				$('.labelwrapper', $recordDiv).show();
			});
			$($recordDiv).on('mouseleave', function() {
				$('.labelwrapper', $recordDiv).hide();
			});
			$($recordDiv).on('click', {
				label : $('.label', $recordDiv).text()
			}, function(e) {
				onclick(e.data.label, e);
			});

			// arrange design
			$recordDiv.css({
				'display' : 'flex',
				'flex-direction' : 'row-reverse',
				'height' : '60px',
				'padding-right' : '8px'
			});

			$('button', $recordDiv)
					.css(
							{
								'box-shadow' : '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)',
								'outline' : 'none',
								'border-width' : '0px',
								'cursor' : 'pointer',
								'color' : '#fff',
								'height' : '40px',
								'width' : '40px',
								'border-radius' : '20px',
								'opacity' : '0',
								'font-size' : '20px',
								'font-weight' : 'bold'
							});

			$('.subicon', $recordDiv).css({
				'height' : '16px',
				'width' : '16px'
			});

			$('.labelwrapper', $recordDiv).css({
				'color' : '#ddd',
				'margin-right' : '8px',
				'font-size' : '14px',
				'padding-top' : '10px'
			});

			$('.label', $recordDiv).css({
				'background-color' : '#424242',
				'margin' : '0px',
				'padding' : '4px 6px',
				'font-weight' : 'bold',
				'border-radius' : '2px',
				'white-space' : 'nowrap'
			});

			if (index === void 0) {
				$('.subbutton', $recordDiv).css('background-color',
						color === void 0 ? subButtonColors[1] : color);
				$button.prepend($recordDiv);
			} else {
				$('.subbutton', $recordDiv).css('background-color',
						color === void 0 ? subButtonColors[index % 7] : color);
				$($button.children().get().reverse()[index]).after($recordDiv);
			}
			return $button;
		};
		$button.removeButton = function(index) {
			if (index === 0) {
				console.error('you cannot remove the main button.');
			} else if (index < 0) {
				console.error('index should be a natural number');
			} else {
				$button.children().get().reverse()[index].remove();
			}
			return $button;
		};
		$button.removeAll = function() {
			$.each($button.children().get().reverse(), function(index) {
				if (index === 0) {
					return true;
				}
				this.remove();
			});
			return $button;
		};
	};

})(jQuery);