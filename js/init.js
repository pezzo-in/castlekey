//------------------------------init jpreLoader -----------------------		
	$('#wrapper').jpreLoader({
		loaderVPos: '50%',
		autoClose: true,
	}, 
	function() {
		$('#wrapper').animate({"opacity":'1'},{queue:false,duration:700,easing:"easeInOutQuad"});			
		$('h1.animtext').textillate({ in: { effect: 'flipInX',delayScale: 2.5  } });
		setTimeout( function(){
			$('h1.animtext').fadeOut(1200);		
			$('.swiper-container').animate({"opacity":'1'},{queue:false,duration:1200,easing:"easeInOutQuad"});
		},2200);
	});

function initlaxy() {

	"use strict";

//------------------------------init swiper-----------------------

	var mySwiper = new Swiper('.swiper-container',{
		initialSlide:1,
		speed: 1500

	});

	$('.arrow-left').on('click', function(e){
    	e.preventDefault()
   		mySwiper.swipePrev()
  	});
	
	$('.arrow-right').on('click', function(e){
		e.preventDefault()
		mySwiper.swipeNext()
	});
	
    $('.navigation').hover(
		function(){
			var $this = $(this);
			expand($this);
		},
		function(){
			var $this = $(this);
			collapse($this);
		}
	);
	function expand($elem){
			$elem.stop(true,true).animate({width:'150px'}, 1000).find('.text').delay(500).fadeIn(400);
		}
	function collapse($elem){
			$elem.stop(true,true).animate({width:'50px'}, 1000).find('.text').fadeOut(400);
		}	
//------------------------------init countdown-----------------------

	$('.countdown').downCount({
		date: '09/12/2015 12:00:00', // your date
		offset: 0
	});	
	
//------------------------------init fitText-----------------------

	$('h2').fitText(1.8,{minFontSize:'30px',maxFontSize:'52px'});	
	$('h1.animtext').fitText(1.8,{minFontSize:'30px',maxFontSize:'42px'});
	
//------------------------------init owlCarousel-----------------------	

	var owl = $("#subscribe-slider");	
	owl.owlCarousel({		
		navigation : false,
		pagination:false,
		singleItem : true,
		paginationSpeed : 1000,
		goToFirstSpeed : 2000,
		autoHeight : true,
		mouseDrag:	false,	
		touchDrag:false,
		transitionStyle : "goDown"	   
	});
	$(".show-sub").click(function(){
      	owl.trigger('owl.goTo',1);  		
    });	

	$(".close-sub").click(function(){
      	owl.trigger('owl.goTo',0);  		
    });
	
	var owl2 = $("#about-slider");	
	owl2.owlCarousel({		
		navigation : false,
		pagination:false,
		singleItem : true,
		paginationSpeed : 1000,
		goToFirstSpeed : 2000,
		autoHeight : true,
		mouseDrag:	false,	
		touchDrag:false,
		transitionStyle : "backSlide"	   
	});
	$(".show-ser").click(function(){
      	owl2.trigger('owl.goTo',1);  		
    });	

	$(".show-about").click(function(){
      	owl2.trigger('owl.goTo',0);  		
    });	
    var owl3 = $("#cotnact-slider");	
	owl3.owlCarousel({		
		navigation : false,
		pagination:false,
		singleItem : true,
		paginationSpeed : 1000,
		goToFirstSpeed : 2000,
		autoHeight : true,
		mouseDrag:	false,	
		touchDrag:false,
		transitionStyle : "backSlide"	   
	});
	
	$(".showmail").click(function(){
      	owl3.trigger('owl.goTo',1);  		
    });	

	$(".showmap").click(function(){
      	owl3.trigger('owl.goTo',2);  		
    });
		
	$(".close").click(function(){
      	owl3.trigger('owl.goTo',0);  		
    });		
	
	
//------------------------------init subscription -----------------------

	$('.subscriptionForm').submit(function(){		
		var email = $('#subscriptionForm').val();
		$.ajax({
			url:'php/subscription.php',
			type :'POST',
			dataType:'json',
			data: {'email': email},success: function(data){
				if(data.error){
					$('#error').fadeIn()
				}
				else{
					$('#success').fadeIn();
					$("#error").hide();}
				}
			});
		return false
	});
	
	$('#subscriptionForm').focus(function(){
		$('#error').fadeOut();
		$('#success').fadeOut();	
	});
	
	$('#subscriptionForm').keydown(function(){	
		$('#error').fadeOut();
		$('#success').fadeOut();		
	});		
};

//------------------------------init Contact -----------------------

	$("#submit_btn").click(function(){		
		var user_name=$('input[name=name]').val();
		var user_email=$('input[name=email]').val();
		var user_message=$('textarea[name=message]').val();
		var proceed=true;
			if(user_name==""){
				$('input[name=name]').css('border','1px solid #c33');
				proceed=false
			}
			if(user_email==""){
				$('input[name=email]').css('border','1px solid #c33');
				proceed=false
			}
			if(user_message==""){
				$('textarea[name=message]').css('border','1px solid #c33');
				proceed=false
			}
			if(proceed){
				post_data={'userName':user_name,'userEmail':user_email,'userMessage':user_message};
				$.post('php/contact_me.php',
				post_data,
				function(data){
					$("#result").hide().html('<div class="success">'+data+'</div>').fadeIn(500);
					$('#contact_form input').val('');
					$('#contact_form textarea').val('')}).fail(
						function(err){
							$("#result").hide().html('<div class="error">'+err.statusText+'</div>').fadeIn(1500)
					});
			}
	});
	
	$("#contact_form input, #contact_form textarea").keyup(function(){		
			$("#contact_form input, #contact_form textarea").css('border','1px solid #fff');
			$("#result").fadeOut(1500)			
	});	
	
	
//------------------------------init map -----------------------

	var map;
	
	// your coordinates   --------
	
	var laxyloc = new google.maps.LatLng( 40.761467,-73.956379);	
	function initialize() {	
	   var styles = [
    {
		featureType: 'water',
		elementType: 'all',
		stylers: [
			{ hue: '#cdcdcd' },
			{ saturation: -100 },
			{ lightness: 18 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'landscape',
		elementType: 'all',
		stylers: [
			{ hue: '#e8e8e8' },
			{ saturation: -100 },
			{ lightness: 18 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'road',
		elementType: 'all',
		stylers: [
			{ hue: '#fdfdfd' },
			{ saturation: -100 },
			{ lightness: -1 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'road.local',
		elementType: 'all',
		stylers: [
			{ hue: '#fdfdfd' },
			{ saturation: -100 },
			{ lightness: -1 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'poi.park',
		elementType: 'all',
		stylers: [
			{ hue: '#c0c0c0' },
			{ saturation: -100 },
			{ lightness: -3 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'poi',
		elementType: 'all',
		stylers: [
			{ hue: '#c0c0c0' },
			{ saturation: -100 },
			{ lightness: -3 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'transit',
		elementType: 'all',
		stylers: [
			{ hue: '#ffffff' },
			{ saturation: -100 },
			{ lightness: -9 },
			{ visibility: 'on' }
		]
	}
	
	  ];   
	var mapOptions = {
		zoom:18,
		zoomControl: true,
		scaleControl: true,
		scrollwheel: true,
		disableDefaultUI:true,
		draggable: false,
		center: laxyloc,
		mapTypeControlOptions: {
		   mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'bestfromgoogle']
		}
	  };
		map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
		var styledMapOptions = {
			  name: "laxyloc"
		}	
		var jayzMapType = new google.maps.StyledMapType(
			styles, styledMapOptions);
		map.mapTypes.set('bestfromgoogle', jayzMapType);
		map.setMapTypeId('bestfromgoogle');				
		var companyImage = new google.maps.MarkerImage('img/marker.png',
			new google.maps.Size(64,64),
			new google.maps.Point(0,0),
			new google.maps.Point(28,58)
		);
		
		// your marker coordinates   --------
		
		var companyPos = new google.maps.LatLng(40.761467,-73.956379);
		var companyMarker = new google.maps.Marker({
			position: companyPos,
			map: map,
			icon: companyImage,
			zIndex: 3
		});
	}
$(document).ready(function(){
	initlaxy();
});