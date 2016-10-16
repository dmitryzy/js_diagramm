//
$(document).ready(function(){
	//
	var trg = new trinagle("div#diagramm", "#comment", 600, 600);
	trg.SetSubstanceName();
	//
	$("#addpoint").on("click", OnBtnPoint);
	$("#addpath").on("click", OnBtnPath);
	//$("div#diagramm").on("click", OnBtnPoint);
	//$("input:number").on("change", OnChangeInput);
	//
	
	//
	function OnChangeInput(){
		console.log("1");
		$("div").css("background-color", "red");
	};
	//
	function OnBtnPath(){
		var PointsArray = trg.GetPoints();
		var SelPointsArray = [];
		$("input.point:checked").each(function(indx, element){
			SelPointsArray.push(PointsArray[+$(element).attr("id")]);
			$(element).prop('checked', false);
		});
		trg.AddPath(SelPointsArray);
		
	}
	//
	function OnBtnPoint(){
		var xa = +$("#xa").val();
		var xb = +$("#xb").val();
		var xc = +$("#xc").val();
		trg.AddPoint(xa,xb,xc);
	};
});