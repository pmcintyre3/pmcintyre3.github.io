$(document).ready(function(){
	var loadingBarProgress = 0;
	var pageProgress = 0;
	
	var fname = "";
	var mInitial = "";
	var lname = "";
	var suffix = "";
	
	var genderOption;
	var genderProgress = false;
	
	var sAddress1 = "";
	var sAddress2 = "";
	
	var city = "";
	var state = "";
	var zip = "";
	
	var livedAddressOption = "";;
	var livedAddressProgress = false;
	
	var ssNumber = "";
	var dob = "";
	var phoneNum = "";
	
	var formVisible = false;
	
	var basicDetailsFormVisible = false;
	var addressDetailsFormVisible = false;
	var identityDetailsFormVisible = false;
	var submitDetailsFormVisible = false;
	
	var formVerified = false;
	
	$("#creditForm").hide();
	
	$("#beginForm").click(function() {
		if(formVisible == false){
			$("#creditForm").show();
			
			$("#beginForm").hide();
			$("#signupJb").hide();
			
			showDetailForms(0);
			formVisible = true;
		}
	});
	
	$("#regPrev").click(function() {
		pageProgress -= 1;
		
		if (pageProgress < 0)
			pageProgress = 0;
		
		showDetailForms(pageProgress);
	});
	
	$("#regNext").click(function() {
		pageProgress += 1;
		
		if (pageProgress > 100)
			pageProgress = 100;
		
		showDetailForms(pageProgress);
	});
	
	$("#regSubmit").click(function(){
		window.location.href = "creditScore.html";
	});
	
	$("#regVerify").click(function() {
		if($(this).is(":checked")){
			$("#regStep3").removeClass("activeInstructions");
			$("#regInfoStep3").removeClass("activeInstructions");
			$("#regStep3").addClass("completedInstructions");
			$("#regInfoStep3").addClass("completedInstructions");
			
			$("#regSubmit").prop("disabled", false);
			$("#regPrev").prop("disabled", true);
			changeProgressBar(100);
			
			formVerified = true;
		} else {
			$("#regStep3").removeClass("completedInstructions");
			$("#regInfoStep3").removeClass("completedInstructions");
			$("#regStep3").addClass("activeInstructions");
			$("#regInfoStep3").addClass("activeInstructions");
			
			$("#regSubmit").prop("disabled", true);
			$("#regPrev").prop("disabled", false);
			changeProgressBar(65);
			
			formVerified = false;
		}
	})
	
	function showDetailForms(index){
		if(index == 0){
			$("#basicDetails").show();
			$("#addressDetails").hide();
			$("#identityDetails").hide();
			$("#submitDetails").hide()
			
			$("#regStep1").removeClass("completedInstructions");
			$("#regInfoStep1").removeClass("completedInstructions");
			$("#regStep1").addClass("activeInstructions");
			$("#regInfoStep1").addClass("activeInstructions");
			
			$("#regStep2").removeClass("activeInstructions");
			$("#regInfoStep2").removeClass("activeInstructions");
			
			$("#regNext").prop("disabled", false);
			$("#regPrev").prop("disabled", true);
			changeProgressBar(0);
		} else if(index == 1) {
			$("#basicDetails").hide();
			$("#addressDetails").show();
			$("#identityDetails").hide();
			$("#submitDetails").hide()
			
			$("#regStep1").removeClass("activeInstructions");
			$("#regInfoStep1").removeClass("activeInstructions");
			$("#regStep1").addClass("completedInstructions");
			$("#regInfoStep1").addClass("completedInstructions");
			
			$("#regStep3").removeClass("activeInstructions");
			$("#regInfoStep3").removeClass("activeInstructions");
			
			$("#regStep2").removeClass("completedInstructions");
			$("#regInfoStep2").removeClass("completedInstructions");
			$("#regStep2").addClass("activeInstructions");
			$("#regInfoStep2").addClass("activeInstructions");
			
			$("#regNext").prop("disabled", false);
			$("#regPrev").prop("disabled", false);
			changeProgressBar(30);
		} else if (index == 2) {
			$("#basicDetails").hide();
			$("#addressDetails").hide();
			$("#identityDetails").show();
			$("#submitDetails").show()
			
			$("#regStep2").removeClass("activeInstructions");
			$("#regInfoStep2").removeClass("activeInstructions");
			$("#regStep2").addClass("completedInstructions");
			$("#regInfoStep2").addClass("completedInstructions");
			
			$("#regStep3").addClass("activeInstructions");
			$("#regInfoStep3").addClass("activeInstructions");
			
			$("#regNext").prop("disabled", true);
			changeProgressBar(65);
		}
	}
	
	function changeProgressBar(width){
		
		loadingBarProgress = width;
		
		if(loadingBarProgress < 0)
			loadingBarProgress = 0;
	
		$("#signUpBar").css("width", loadingBarProgress + "%").attr("aria-valuenow", loadingBarProgress);
		
		if(loadingBarProgress == 100){
			$("#signUpBar").addClass("progress-bar-success");
		} else {
			$("#signUpBar").removeClass("progress-bar-success");
		}
	}
	
	function changeProgressBarText(textcontent){
		$("#signUpBar")[0].textContent = textcontent;
	}
});