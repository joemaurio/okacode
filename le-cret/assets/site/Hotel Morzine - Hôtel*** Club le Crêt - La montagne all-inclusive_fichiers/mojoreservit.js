function get_today()
{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	if (dd<10) 
		{
		dd='0'+dd
		} 
	if (mm<10) 
		{
		mm='0'+mm
		} 
	today = yyyy+'-'+mm+'-'+dd;
	return today;	
}

function set_error(el)
{
	$('.reservit-error-row').show();
	$(el).show();
}

function check_values()
{
	$('.reservit-error').hide();
	$('.reservit-tarif').hide();	
	$('.reservit-tarif-undone').show();	
	var fromdate = $('.fromdate').val();
	var todate = $('.todate').val();
	var nb_adultes = $('.adultes').val();
	var nb_enfants = $('.enfants').val();
	var today = get_today();
	var error = 0;
	$('#fday').val(fromdate.substr(8,2));
	$('#fmonth').val(fromdate.substr(5,2));
	$('#fyear').val(fromdate.substr(0,4));
	$('#tday').val(todate.substr(8,2));
	$('#tmonth').val(todate.substr(5,2));
	$('#tyear').val(todate.substr(0,4));
	$('#nbadt').val(nb_adultes);
	$('#nbchd').val(nb_enfants);	
	$('.reservit_ages').remove();
	$('.reservit-reserver').off();	
	$('.reservit-reserver').removeClass('reservit-reserver-enable');
	$('.reservit-reserver').removeClass('reservit-reserver-enable-hover');
	$('.reservit-reserver').addClass('reservit-reserver-disable');
	$('.reservit-reserver').show();
	$('.reservit-reserver-calendar').hide();
	
	var i = 1;
	while(i <= nb_enfants)
	{
		$('#submit_reservit').append('<input type = "text" value = "5" name = "ages'+i+'" id = "ages'+i+'" class = "reservit_ages">');
		i = i + 1;
	}
	
	if ((fromdate.length == 10) && (todate.length == 10) && (nb_adultes.length >= 1))
	{
		if ((fromdate >= todate) || (fromdate < today))
			{
			error = 1;
			set_error('.reservit-error-date');
			}
		if (nb_adultes <= 0)
			{
			error = 1;
			set_error('.reservit-error-adulte');
			}
		if (error == 0)
			{
			$('.reservit-tarif').hide();
			$('.reservit-tarif-doing').show();
			$('.reservit-input').unbind('change');
			$('.reservit-input-number').off();
			jQuery.post(
				reserviturl,
				{
					'action': 'reservit_get',
					'fromdate': fromdate,
					'todate': todate,
					'nb_adultes': nb_adultes,
					'nb_enfants': nb_enfants
				},
				function(response){
					var answer = JSON.parse(response);
					if (answer.reservit_output == "Indisponible")
					{
						$('.reservit-tarif').hide();
						$('.reservit-tarif-indispo').show();
						$('.reservit-reserver').hide();
						$('.reservit-reserver-calendar').show();
					}
					else
					{
						$('.reservit-tarif').hide();
						$('.reservit-tarif-done').show();
						$('#reservit_return_tarif').html(answer.reservit_output);	
						$('.reservit-reserver').removeClass('reservit-reserver-disable');						
						$('.reservit-reserver').addClass('reservit-reserver-enable');		
						$('.reservit-reserver').click(function(){
							$('#submit_reservit').attr('action','http://hotel.reservit.com/reservit/reserhotel.php');
							$('#submit_reservit').submit();
						});						
					}
					
					var fromdate2 = $('.fromdate').val();
					var todate2 = $('.todate').val();
					var nb_adultes2 = $('.adultes').val();
					var nb_enfants2 = $('.enfants').val();	
					if ((fromdate != fromdate2) || (todate != todate2) || (nb_adultes != nb_adultes2) || (nb_enfants != nb_enfants2))
						{
							check_values();
						}
					else
						{
						$('.reservit-reserver-enable').mouseover(function()
							{			
							$(this).removeClass('reservit-reserver-enable');
							$(this).addClass('reservit-reserver-enable-hover');			
							$(this).mouseout(function()
								{
								$(this).removeClass('reservit-reserver-enable-hover');
								$(this).addClass('reservit-reserver-enable');
								});					
							});		

						$('.reservit-input').change(function(){
							check_values();
						});

						$('.reservit-input-number').keyup(function(event){
							check_values();
						});							
						}
				}
			);			
			}
	}
}


$('.reservit-reserver-enable').mouseover(function()
	{			
	$(this).removeClass('reservit-reserver-enable');
	$(this).addClass('reservit-reserver-enable-hover');			
	$(this).mouseout(function()
		{
		$(this).removeClass('reservit-reserver-enable-hover');
		$(this).addClass('reservit-reserver-enable');
		});					
	});		

$('.reservit-input').change(function(){
	check_values();
});

$('.reservit-input-number').keyup(function(event){
	check_values();
});

$('.reservit-reserver-calendar').click(function(){
	$('#submit_reservit').attr('action','http://hotel.reservit.com/front/front.do?m=booking');
	$('#submit_reservit').submit();
});

jQuery(function($){
	$('.fromdate').datepicker({
				closeText: 'Fermer',
				prevText: 'Précédent',
				nextText: 'Suivant',
				currentText: 'Aujourd\'hui',
				monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
				monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
				dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
				dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
				dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
				weekHeader: 'Sem.',				
				dateFormat:"yy-mm-dd",
				minDate: 0, 
				maxDate: "+1Y",
				onClose: function(dateText, inst) 
					{ 
					$(this).attr("disabled", false);
					$('.todate').datepicker( "destroy" );
					if (dateText.length)
						{
						var date_to = new Date(dateText);
						date_to.setDate(date_to.getDate()+1);
						}
					else
						{
						var date_to = new Date();
						}
					$('.todate').datepicker({
								closeText: 'Fermer',
								prevText: 'Précédent',
								nextText: 'Suivant',
								currentText: 'Aujourd\'hui',
								monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
								monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
								dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
								dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
								dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
								weekHeader: 'Sem.',								
								dateFormat:"yy-mm-dd",
								minDate: date_to, 
								onClose: function(dateText, inst) 
									{ 
									$(this).attr("disabled", false);
									},
								beforeShow: function(input, inst) 
									{
									$(this).attr("disabled", true);
									}				
								});					
					},
				beforeShow: function(input, inst) 
					{
					$(this).attr("disabled", true);
					}				
				});
				
	$('.todate').datepicker({
				closeText: 'Fermer',
				prevText: 'Précédent',
				nextText: 'Suivant',
				currentText: 'Aujourd\'hui',
				monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
				monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
				dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
				dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
				dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
				weekHeader: 'Sem.',		
				dateFormat:"yy-mm-dd",
				minDate: "+1D", 
				maxDate: "+1Y",
				onClose: function(dateText, inst) 
					{ 
					$(this).attr("disabled", false);
					},
				beforeShow: function(input, inst) 
					{
					$(this).attr("disabled", true);
					}				
				});
				
	});	