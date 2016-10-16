//Диаграмма
function trinagle(element, leg, width, height){
	//Рисование точек на диаграмме
	function point(x,y,label){
		this.x = x || 0;
		this.y = y || 0;
		this.label = label || "";
		this.coordinates = function(){
			return [this.x, this.y];
		};
		this.mollStr = function(){
			let moll = CoordToMoleFract(this.coordinates());
			return "xA=" + moll.xA + " %, " + "xB=" + moll.xB + " %, " + "xC=" + moll.xC + " %, ";
		};
		this.getStr = function(){
			return "" + this.x + "," + this.y + " ";
		};
		this.key = function(){
			return ""+this.x+this.y;
		};
		this.getName = function(){
			return this.label;
		}
		this.draw = function(color, label, labelX, labelY){
			label = label || this.label;
			labelX = labelX || 0;
			labelY = labelY || 0;
			group2.append("circle")
		   		.attr("cx", this.x)
		   		.attr("cy", this.y)
		   		.attr("r", 2)
		   		.attr("id", "p" + this.key())
		   		.style("fill", color)
    	   		.style("stroke", "steelblue");
    		group2.append("text")
    	   		.attr("x", this.x + labelX)
    	   		.attr("y", this.y + labelY)
    	   		.attr("id", "t" + this.key())
    	   		.style("fill", "black")
    	   		.text(label || this.label); 
		}
	}
	//
	var x = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
	//Массив точек диаграммы
	var Data = [];
	//Массив путей диаграммы
	var PathArray = [];
	//Сообщение об ошибке
	var ErrorComment = "";
	//Счетчик точек
	var counter = 0;
	//
	var counterPath = 0;
	//отступ
	var delta = 10;
	//Начало координат
	var beginX = 2 * delta;
	var beginY = 4 * delta;
	//сторона треугольника
	var SideOfTriangle = Math.min(width, height) - 6 * delta;
	var HeightOfTrinagle = SideOfTriangle * Math.cos(Math.PI / 6);
	var HalfSideOfTrinagle = SideOfTriangle / 2;
	//Вершины треугольника по умолчанию (координата x, координата y, стандартная подпись)
	var pointA = new point(beginX, beginY + HeightOfTrinagle, "A");
	var pointB = new point(beginX + SideOfTriangle, beginY + HeightOfTrinagle, "B");
	var pointC = new point(beginX + SideOfTriangle / 2, beginY, "C");
	//
	var TrinaglePoints = pointA.getStr()+pointB.getStr()+pointC.getStr();
	//Холст
	var svg = d3.select(element).append("svg");
	svg.attr("width", width)
	   	.attr("height", height)
	   	.style("background-color", "white");
	var group2 = svg.append("g")
		.attr("render-order", "-1");
	//Линии
	x.forEach(function(p){
		//AB
		svg.append("line")
    		.style("stroke", "gray")
    		.style("stroke-width", "1")
    		.attr("x1", pointA.x + p * HalfSideOfTrinagle)
    		.attr("y1", pointA.y - p * HeightOfTrinagle)
    		.attr("x2", pointB.x - p * HalfSideOfTrinagle)
    		.attr("y2", pointB.y - p * HeightOfTrinagle);
    	//BC
    	svg.append("line")
    		.style("stroke", "gray")
    		.style("stroke-width", "1")
    		.attr("x1", pointB.x - SideOfTriangle * p)
    		.attr("y1", pointB.y)
    		.attr("x2", pointC.x - p * HalfSideOfTrinagle)
    		.attr("y2", pointC.y + p * HeightOfTrinagle);
    	//AC
    	svg.append("line")
    		.style("stroke", "gray")
    		.style("stroke-width", "1")
    		.attr("x1", pointA.x + SideOfTriangle * p)
    		.attr("y1", pointA.y)
    		.attr("x2", pointC.x + p * HalfSideOfTrinagle)
    		.attr("y2", pointC.y + p * HeightOfTrinagle);
	});
	//Контур треугольника
	var trinagle = svg.append("polygon")
		.style("fill", "white")
		.style("stroke", "steelblue")
		.style("stroke-width", "1")
		.style("fill-opacity", 0.5)
		.attr("points", TrinaglePoints)
		.attr("id","plg");
	trinagle.on('click', SetPoint)
			.on('mousemove', KursorMove)
			.on('mouseout', KursorOut);
	//Добавить названия веществ
	this.SetSubstanceName = function(substA, substB, substC){
		pointA.draw("blue", substA, - 2 * delta, 3 * delta);
		pointB.draw("blue", substB, delta, 3 * delta);
		pointC.draw("blue", substC, - delta, - 2 * delta);
	}
	//Добавить точку по заданным концентрациям
	this.AddPoint = function(xA, xB, xC){
		var coordinates = MoleFractToCoord(xA, xB, xC);
		if(coordinates){
			return SetPoint(coordinates);
		}
		else{
			this.ErrorComment ="неправильная сумма";
		}
	};
	//
	this.GetErrorComment = function(){
		return ErrorComment;
	}
	//Получение данных
	this.GetData = function(){
		return Data.map(function(p){
			return p.coordinates();
		});
	};
	//
	this.GetPoints = function(){
		return Data.map(function(p){
			return p;
		});
	};
	//Добавить путь на диаграмму по массиву точек
	this.AddPath = function(PointsArray){
		var coordPointsArray = PointsArray.map(function(p){
			return {x: p.x, y: p.y};
		});
		var line = d3.svg.line().interpolate("linear")
            .x(function(d){return d.x;})
            .y(function(d){return d.y;});
        var path = group2.append("path");
		path.attr("d", line(coordPointsArray))
		.attr("id", counterPath ++)
		.style("stroke", "black")
    	.style("stroke-width", "2")
    	.style("fill", "none")
    	.style("fill-opacity", 0.3);
    	PathArray.push(path);
    	return path;
	}
	//Закравсить область
	this.selectPath = function(pathID, color){
		PathArray[pathID].style("fill", color);
	}
	//Расчет мольных долей компонентов (состава) по координатам
	function CoordToMoleFract(coordinates){
		var x = coordinates[0];
		var y = coordinates[1];
		var xC = 1 - (y - pointC.y) / SideOfTriangle / Math.cos(Math.PI / 6);
		var xB = (x - pointA.x - SideOfTriangle / 2 + (y - pointC.y) / Math.cos(Math.PI / 6) / 2) / SideOfTriangle ;
		var xA = 1 - xC - xB;
		return {"xA": Math.round(xA * 100), "xB": Math.round(xB * 100),"xC": Math.round(xC * 100)};
	};
	//Рассчет координат точки по составу 
	function MoleFractToCoord(xA, xB, xC){
		if(xA + xB + xC == 100){
			var x = pointA.x + SideOfTriangle * (xB + xC / 2) / 100;
			var y = pointC.y + SideOfTriangle * (1 - xC / 100) * Math.cos(Math.PI / 6);
			return [x, y];
		}
	}
	//Обработка клика по диаграммме
	function SetPoint(coordinates, label){
		var coordinates = coordinates || d3.mouse(svg.node());
		var label = label || "" + counter ++;
		var p = new point(coordinates[0], coordinates[1], label);
		Data.push(p);
		p.draw("blue");
		//
		var chb = $("<input>",{
			type: "checkbox",
			id: p.label,
			class: "point"
		});
		var lab = $("<label>");
		var par = $("<p>").text("точка " + p.getName() + " (" + p.mollStr() + ")");
		lab.append(chb);
		par.append(lab);
		$(leg).append(par);
		//
		return(p);
	}
	//Линии курсора
	var lineAB = group2.append("line");
	var lineCB = group2.append("line");
	var lineAC = group2.append("line");
	var comment = svg.append("text")
					.attr({
						x: pointC.x + 50,
						y: pointC.y + 20
					})
					.style("fill", "black");
	//Курсор
	var KursorCircle = group2.append("circle");
	//При наведении курсора
	function KursorMove(){
		var coordinates = d3.mouse(svg.node());
		var Mole = CoordToMoleFract(coordinates);
		var textComment = "xA="+Mole.xA+" % ";
		textComment += "xB="+Mole.xB+" % ";
		textComment += "xC="+Mole.xC+" %"
		comment.text(textComment);
		//AB xC
		lineAB.attr({
				x2: pointA.x + (pointC.y - coordinates[1]) / Math.tan(Math.PI / 3) + SideOfTriangle / 2 ,
				x1: coordinates[0],
				y2: coordinates[1],
				y1: coordinates[1]
			})
			.style("stroke", "red")
    		.style("stroke-width", "1");
    	//AC xB
    	lineAC.attr({
				x2: pointA.x / 2 + SideOfTriangle / 4 - pointC.y / 2 / Math.tan(Math.PI / 3) + coordinates[0] / 2 + coordinates[1] / 2 / Math.tan(Math.PI / 3),
				x1: coordinates[0],
				y2: (- pointA.x * Math.tan(Math.PI / 3) - SideOfTriangle * Math.sin(Math.PI / 3)+ pointC.y) / 2 + coordinates[1] / 2 + coordinates[0] * Math.sin(Math.PI / 3),
				y1: coordinates[1]
			})
			.style("stroke", "red")
    		.style("stroke-width", "1");
    	//CB xA
    	lineCB.attr({
				x2: SideOfTriangle / 2 + pointC.y / Math.tan(Math.PI / 3) +coordinates[0] - coordinates[1] / Math.tan(Math.PI / 3),
				x1: coordinates[0],
				y2: pointC.y + SideOfTriangle * Math.sin(Math.PI / 3),
				y1: coordinates[1]
			})
			.style("stroke", "red")
    		.style("stroke-width", "1");
    	//Курсор
    	KursorCircle.attr({
    				cx: coordinates[0],
		   			cy: coordinates[1],
		   			r: 3
		   		})
		   		.style("fill", "none")
    	   		.style("stroke", "red")
    	   		.style("stroke-width", "1");
	}
	//При удалении курсора за пределы треугольника
	function KursorOut(){
		[lineAB, lineCB, lineAC, KursorCircle].forEach(function(e){
			e.style("stroke-width", "0")
			.style("stroke", "none");
		});
	};
}