/*
 *      Plugin dateTimed
 *      -------------------
 *
 *      Manage datetime from input text
 *      display date and time splitted
 */

(function($) {
	
	$.fn.dateTimed = function() {

		let elementMain = $(this);
		// let elementMain = $('.date-timed');

		// for each element, evalute date and time to split
		elementMain.each(function(index, ele) {    
			let element = $(ele),
			 class_name = element.attr('class'),
			       date = element.val().split(' ')[0],
			       time = element.val().split(' ')[1] || '00:00', 
	   css_class_custom = (class_name !== undefined || class_name.length > 0) ?
			               class_name.replace(/js_datetime/, '') : '';
			
			// check the node type text
			if (element.attr('type') !== 'text') {
				console.error('js_datetime : You must have an attribute text to use this !');
				return false;
			}
			
			// remove class added on the main input hidden
			if (css_class_custom.length > 0)
			element.removeClass(css_class_custom);

			// put content raw html and fill classes added on the new inputs
			// on elements jQuery
			let eleDateTime = $(`
			<input type="date" value="${date}" class="${css_class_custom}">
			<input type="time" value="${time}" class="${css_class_custom}">
			`);
			
			// add inputs and attr done to flag
			element
				.before(eleDateTime)
				.attr('done', true)
				.hide();

			// put event into the loop
			// let date = '',
			//	time = '';
			$(eleDateTime, $(element).not('[done="true"]')).change(function(e) {
				let currentDateTime = $(e.currentTarget),	
				      selectElement = element;
			
				// visual setting
				currentDateTime.attr('value', currentDateTime.val());				
				if (currentDateTime.attr('type') === 'date') {		
					date = currentDateTime.val();			
					time = '00:00';
				} else { 
					time = currentDateTime.val();
				}
				// set values on inputs
				console.log('date :', date);
				console.log('time :', time);

				selectElement.attr('value', date + ' ' + time);
								
				return false;

			}); 

		});


	}


} (jQuery));

