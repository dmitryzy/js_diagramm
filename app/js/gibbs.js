  $(document).ready(function(){
	  var a=new Matrix(2,3,[[1,2],[8,88]],7);
	  console.log(a.data());
	  a.add_rows(0,[1,2,3]);
	  console.log(a.data());
	  a.add_cols(0,[77,27,73]);
	  console.log(a.data());
	  	  a.del_rows(2);
	  console.log(a.data());
	  console.log(a.find(27));
	  console.log(a.find(555));
	  var table= new DataTable('datatable1',2,2,[[1,2],[5,6]],['rr','tt'],['ee','ww']);
	  table.add_rows('f',[7,8],1);
	  //console.log(table.data());
	  table.add_cols('ll',[76,78,99],3);
	  //console.log(table.data());
	  //console.log(table.cell_value(2,2));
	  //table.cell_value(2,2,1000);
	  //console.log(table.cell_value(2,2));
	  //table.set_width('90%')
	  //console.log(table.data());
	  //table.edit_cols([0,0,555,1],1);
	  //console.log(table.data());
	  //table.edit_rows([35,36,37,1],1);
	  $('button#add_tab').bind("click", function(event){
		  //console.log(table.dimension());
		  //var table= new datatable($('div#inp2'),'datatable1',15,12);
		  //table.set_width('50%');
		  //table.add_coll('df');
		  //table.add_coll('aa');
		  //table.add_row('hh');
		  //table.add_row('mm');
		  //table.add_coll('nn')
		  //table.add_row('kkk');
		  //table.edit(1,2,15.5);
		  //table.edit(0,0,'ggggg');
	  });
	  $('button#del_row').bind("click", function(event){
		  table.remove_row(1);
	  });
	  //$('input').bind("keyup",function(event){this.val()=parseInt(this.val()) | 0});
	  var max_inp=0;
	  $('button#add').bind("click", function(event){
		  max_inp++;
		  $('tr#datahead').append('<td class="inp"><p>'+max_inp+'</p></td>');
		  $('tr#data1').append('<td class="inp"><input type="text" id="inp1_'+max_inp+'"></td>');
		  $('tr#data2').append('<td class="inp"><input type="text" id="inp2_'+max_inp+'"></td>');
		  $('tr#data3').append('<td class="inp"><input type="text" id="inp3_'+max_inp+'"></td>');
	  });
	  $('button#del').bind("click", function(event){
		  $('tr#datahead').children('td.inp').last().remove();
		  $('tr#data1').children('td.inp').last().remove();
		  $('tr#data2').children('td.inp').last().remove();
		  $('tr#data3').children('td.inp').last().remove();
		  if(max_inp>0){max_inp--;}
	  });
	  $('button#del_all').bind("click", function(event){
		  $('td.inp').remove();
		  max_inp=0;
	  });
	  $('button#viev').bind("click", function(event){
		  var arr_x_a=$('tr#data1 input').map(function(){
			  return parseFloat($(this).val().replace(',','.'));
		  }).get();
		  var arr_x_b=$('tr#data2 input').map(function(index,element){
			  return parseFloat($(this).val().replace(',','.'));
		  }).get();
		  var arr_x_c=$('tr#data3 input').map(function(index,element){
			  return parseFloat($(this).val().replace(',','.'));
		  }).get();
		  //Создание массива точек
		  var arr_abc=Array();
		  for(var i=0;i<max_inp;i++){
			  arr_abc[i]={'xa':arr_x_a[i],'xb':arr_x_b[i],'xc':arr_x_c[i]};
		  }
		  //Построение
		  var ctx=document.querySelector("canvas").getContext("2d");
		  var trg=new gibbs_trinagle(ctx,600,40,600);
		  console.log(trg.coord_B);
		  trg.draw_trinagle();
		  arr_abc.forEach(function(item){
			  trg.draw_point(item.xb,item.xc);
		  });
		  //trg.draw_point(0.5,0.4);
		  console.log(arr_abc);
		  
		  
	  });
  });
function is_ein(xa,xb,xc){
	if(xa+xb+xb==1){return  true;}
	else{return false;}
}

//Объекты
//Треугольник
function gibbs_trinagle(ctx,a,begin_x,begin_y){
	this.xs=[0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];
	//Основные точки
	this.coord_A={'x': begin_x,'y': begin_y};
	this.coord_B={'x': begin_x+a,'y': begin_y};
	this.coord_C={'x': begin_x+0.5*a,'y': -0.5*a*Math.sqrt(3)+begin_y};
	//точки изолинии
	this.c_line=this.xs.map(function(item){
		return {'begin':{'x':begin_x+0.5*a*item,'y':-0.5*a*item*Math.sqrt(3)+begin_y},
				'end':{'x':begin_x+a*(1-0.5*item),'y':-0.5*a*item*Math.sqrt(3)+begin_y}};
	});
	this.a_line=this.xs.map(function(item){
		return {'begin':{'x':begin_x+a*(1-item),'y':begin_y},
				'end':{'x':begin_x+0.5*a*(1-item),'y':-0.5*a*(1-item)*Math.sqrt(3)+begin_y}};});
	this.b_line=this.xs.map(function(item){
		return {'begin':{'x':begin_x+a*item,'y':begin_y},
				'end':{'x':begin_x+0.5*a*(1+item),'y':-0.5*a*(1-item)*Math.sqrt(3)+begin_y}};});
	//Перпендикуляры к сторонам
	function height_a(xb,xc){return {'x':0.25*a*(1+3*xb+xc),'y':-0.25*a*(5+3*xb+xc)/Math.sqrt(3)+begin_y};}
	function height_b(xb,xc){return {'x':0.25*a*(3*xb+2*xc),'y':-0.25*a*(3*xb+2*xc)/Math.sqrt(3)+begin_y};}
	function height_c(xb,xc){return {'x':a*(xb+0.5*xc),'y':0+begin_y};}
	function get_point(xb,xc){return {'x':a*(xb+0.5*xc),'y':-a*0.5*xc/Math.sqrt(3)+begin_y};}
	//координаты точек
	this.get_pointXY=function(xb,xc){
		return {'x':begin_x+a*(xb+0.5*xc),'y':begin_y-a*0.5*xc*Math.sqrt(3)};
	}
	//рисование 
	this.draw_trinagle=function(){
		ctx.beginPath();
        ctx.moveTo(this.coord_A.x,this.coord_A.y);
        ctx.lineTo(this.coord_B.x,this.coord_B.y);
		ctx.lineTo(this.coord_C.x,this.coord_C.y);
		ctx.lineTo(this.coord_A.x,this.coord_A.y);
		ctx.closePath();
		ctx.strokeStyle = "red";
		ctx.lineWidth = 3;
		ctx.stroke();
		//
		ctx.font = "italic 10pt Arial";
		var N=0
		this.c_line.forEach(function(item){
			ctx.beginPath();
			ctx.moveTo(item.begin.x,item.begin.y);
			ctx.lineTo(item.end.x,item.end.y);
			ctx.strokeStyle = "black";
			ctx.lineWidth = 1;
			ctx.closePath();
			ctx.stroke();
			ctx.fillText((N++)*10,item.begin.x-15,item.begin.y);
		});
		//
		N=10;
		this.b_line.forEach(function(item){
			ctx.beginPath();
			ctx.moveTo(item.begin.x,item.begin.y);
			ctx.lineTo(item.end.x,item.end.y);
			ctx.strokeStyle = "black";
			ctx.lineWidth = 1;
			ctx.closePath();
			ctx.stroke();
			ctx.fillText(N*10,item.begin.x-15,item.begin.y+15);
			ctx.fillText((10-N)*10,item.end.x+15,item.end.y);
			N--;
		});
		//
		N=10;
		this.a_line.forEach(function(item){
			ctx.beginPath();
			ctx.moveTo(item.begin.x,item.begin.y);
			ctx.lineTo(item.end.x,item.end.y);
			ctx.strokeStyle = "black";
			ctx.lineWidth = 1;
			ctx.closePath();
			ctx.stroke();
		});
		//
		ctx.font = "italic 16pt Arial";
		ctx.fillText("A", this.coord_A.x-30,this.coord_A.y);
		ctx.fillText("B", this.coord_B.x+10,this.coord_B.y+20);
		ctx.fillText("C", this.coord_C.x+10,this.coord_C.y-20);
	}
	//
	this.draw_point=function(xb,xc){
		var x=begin_x+a*(xb+0.5*xc);
		var y=begin_y-a*0.5*xc*Math.sqrt(3);
		ctx.beginPath();
		ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	//function draw array_point(arr){}
	return this;
}
//var a=1;
//var xs=[0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];
//var c1=xs.map(function(item){return {'x':0.5*a*item,'y':0.5*a*item*Math.sqrt(3)};});