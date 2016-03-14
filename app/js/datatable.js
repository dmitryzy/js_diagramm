//Конструктор создает матрицу размером m x n
//Возвращает объект, матрицу, для которого определены методы:
//
//dimension() возвращает объект структуры {'rows':<число строк>,'cols':<число столбцов>}
//
//
//
//
//
//
//Параметры:
//@rows число строк 
//@cols число столбцов
//@data массив с исходными данными
//@def значение матрицы по умолчанию(заполнитель, используемый при незаданном параметре data)
//
//Нумерация строк (rows) и столбцов (cols) начинается с нуля 
function Matrix(rows,cols,data,def){
	var MatrixArray={};//число строк
	var Matrix_rows=rows||0;//число столбцов
	var Matrix_cols=cols||0;//значение элемента матрицы по умолчанию
	var Matrix_default=def||NaN;//элементы матрицы
	var Matrix_data=[];
	//
	//Создает пустую матрицу
	for(var i=0;i<Matrix_rows;i++){
		Matrix_data[i]=[];
		Matrix_data[i].length=Matrix_cols;
		Matrix_data[i].fill(Matrix_default);
	};
	//заполнение матрицы исходными данными
	if(data instanceof Array){
		data.length=Matrix_rows;
		data.forEach(function(rowdata,rowindex){
			if(rowdata instanceof Array){
				rowdata.length=Matrix_cols;
				rowdata.forEach(function(item,colindex){
					Matrix_data[rowindex][colindex]=item;
				});
			};
		});
	};
	//
	//
	//Метод возвращает размерность матрицы в виде объекта:
	//{'rows':<число строк>,'cols':<число столбцов>}
	MatrixArray.dimension=function(){return {'rows':Matrix_rows,'cols':Matrix_cols};};
	//
	//
	//Метод проверяет пару индексов на вхождение в интервалы индексов матрицы
	//Параметры:
	//@rowindex индекс строки
	//@colindex индекс столбца
	function in_array(rowindex,colindex){
		if((rowindex>=0)&&(rowindex<Matrix_rows)&&(colindex>=0)&&(colindex<Matrix_cols)){
			return true;
		}
		else{return false;};
	};
	//
	//
	MatrixArray.in_array=in_array;
	//
	//
	//Метод возвращает массив значений матрицы
	//структура массива: [[a11,a12, ...],[a21,a22, ...], ... ]
	MatrixArray.data=function(){
		var data=[];
		for(var i=0;i<Matrix_rows;i++){
			data.push([]);
			for(var j=0;j<Matrix_cols;j++){
				data[i][j]=Matrix_data[i][j];
			}
		}
		return data;
	};
	//
	//
	//Метод возвращает значение элемента, находящегося в строке rowindex и столбце colindex 
	//Параметры:
	//@rowindex строка
	//@colindex столбец
	MatrixArray.get_val=function(rowindex,colindex){
		if(in_array(rowindex,colindex)){
			return Matrix_data[rowindex][colindex];
		}
		else{return false;}
	};
	//
	//
	//Метод устанавливает значение элемента в строке rowindex и столбце colindex равным val  
	//Параметры:
	//@rowindex индекс строки
	//@colindex индекс столбца
	//@val значение ячейки
	MatrixArray.set_val=function(rowindex,colindex,val){
		if(in_array(rowindex,colindex)){
			Matrix_data[rowindex][colindex]=val;
			return val;
		}
		else{return false;};
	};
	//
	//
	//Метод возвращает элементы столбца с номером colindex
	//Параметры:
	//@colindex столбец
	MatrixArray.cols=function(colindex){
		if(in_array(0,colindex)){
			return Matrix_data.map(function(item){return item[colindex];});
		}
		else{return false;};
	};
	//
	//Метод возвращает массив, содержащий элементы строки с номером rowindex
	//Параметры:
	//@rowindex строка
	MatrixArray.rows=function(rowindex){
		if(in_array(rowindex,0)){return Matrix_data[rowindex];}
		else{return false;};
	};	
	//
	//Метод устанавливает значение элемента матрицы по умолчанию
	//Параметры:
	//@default_val задаваемое значение по умолчанию
	MatrixArray.set_default_val=function(default_val){Matrix_default=default_val;};
	//
	//
	//Метод добавляет новый столбец в матрицу (repl=false), либо замещает один из имеющихся столбцов новым (repl=true) в указанном месте
	//Параметры:
	//@colindex место куда следует вставить столбец
	//(по умолчанию или при неверном значении в конец)
	//@coldata данные столбца
	//(массив, размерность которого не превышает число строк матрицы (rows). Лишние элементы обрезаются)
	//@repl (true/false) указывает на замену столбца
	MatrixArray.add_cols=function(colindex,coldata,repl){
		repl=repl||false;
		var del=1;
		if(!repl){
			Matrix_cols++;
			del=0;
		};
		if(!(coldata instanceof  Array)){coldata=[];};
		for(var len=Matrix_rows-coldata.length;len>0;len--){
			coldata.push(Matrix_default);
		};
		if(!in_array(0,colindex)){colindex=Matrix_cols;}
		Matrix_data.forEach(function(item,rowindex){item.splice(colindex,del,coldata[rowindex]);});
	};
	//
	//
	//Метод удаляет столбец с заданным номером из матрицы
	//Параметры:
	//@colindex номер столбца, который следует удалить
	//(при значении выходящем за пределы допустимого ничего не удаляется)
	MatrixArray.del_cols=function(colindex){
		Matrix_cols--;
		if(in_array(0,colindex)){
			Matrix_data.forEach(function(item,rowindex){item.splice(colindex,1);});
		};
	};
	//
	//
	//Метод удаляет строку с заданным номером из матрицы
	//Параметры:
	//@rowindex номер строки, которую следует удалить
	//(при значении выходящем за пределы допустимого ничего не удаляется)
	MatrixArray.del_rows=function(rowindex){
		Matrix_rows--;
		if(in_array(rowindex,0)){
			Matrix_data.splice(rowindex,1);
		};
	};
	//
	//
	//Метод добавляет новую строку в матрицу (repl=false), либо замещает одну из имеющихся (repl=true) в указанном месте
	//Параметры:
	//@rowindex место куда следует вставить строку
	//(по умолчанию или при неверном значении в конец)
	//@rowdata данные строки
	//(массив, размерность которого не превышает число столбцов матрицы (cols). Лишние элементы обрезаются)
	//@repl (true/false) указывает на замену строки
	MatrixArray.add_rows=function(rowindex,rowdata,repl){
		repl=repl||false;
		var del=1;
		if(!repl){
			Matrix_rows++;
			del=0;
		}
		if(!(rowdata instanceof  Array)){rowdata=[];};
		for(var len=Matrix_cols-rowdata.length;len>0;len--){
			rowdata.push(Matrix_default);
		};
		if(!in_array(rowindex,0)){rowindex=Matrix_rows;};
		Matrix_data.splice(rowindex,del,rowdata);
	};
	//
	//
	//Метод, меняющий указанные строки местами
	//Параметры:
	//@rowindex1 номер 1-й строки для перестановки 
	//@rowindex2 номер 2-й строки для перестановки 
	MatrixArray.swap_rows=function(rowindex1,rowindex2){
		if(in_array(rowindex1,0)&&in_array(rowindex2,0)){
			for(var i=0;i<Matrix_cols;i++){
				var tmp = Matrix_data[rowindex1][i];
				Matrix_data[rowindex1][i]=Matrix_data[rowindex2][i];
				Matrix_data[rowindex2][i]=tmp;
			};
			return true;
		}
		else{return false;};
	};
	//
	//
	//Метод, меняющий указанные столбцы местами
	//Параметры:
	//@colindex1 номер 1-го столбца для перестановки 
	//@colindex2 номер 2-го столбца для перестановки 
	MatrixArray.swap_cols=function(colindex1,colindex2){
		if(in_array(0,colindex1)&&in_array(0,colindex2)){
			for(var i=0;i<Matrix_rows;i++){
				var tmp = Matrix_data[i][colindex1];
				Matrix_data[i][colindex1]=Matrix_data[i][colindex2];
				Matrix_data[i][colindex2]=tmp;
			};
			return true;
		}
		else{return false;};
	};
	//
	//
	//Метод возвращает значение строки и столбца, в которых находится искомый элемент
	//Параметры:
	//@val образец для поиска
	MatrixArray.find=function(val){
		var rowindex=false;
		var colindex=false;
		Matrix_data.forEach(function(item,i){
			item.forEach(function(el,j){
				if(el===val){rowindex=i;colindex=j;};
			});
		});
		if(rowindex){return {'row':rowindex,'col':colindex};}
		else{return false;};
	} ;
	//
	//
	return MatrixArray;
};
//
//
//
//
//Таблица с данными работает на основе объекта Matrix
//Требует для реализации подключения jQuery
//Конструктор создает объект таблицы с данными
//Включает все операции над строками и столбцами таблицы
//Параметры:
//@id ID таблицы в html разметке. Должна быть таблица <table id="id"></table>
//@rows число строк
//@cols число столбцов
//@dataarray данные для заполнения таблицы
//@rowheaders заголовки строк
//@colheaders заголовки столбцов
function DataTable(id,rows,cols,dataarray,rowheaders,colheaders){
	rows=rows||1;
	cols=cols||1;
	dataarray=dataarray||NaN;
	var table_id=id;
	var Table={};
	var tabhtml=$('table#'+table_id);
	var _Data=new Matrix(rows,cols,dataarray,'');//Матрица размера rows x cols для хранения данных таблицы
	_Data.set_default_val('');//Значение по умолчанию
	_Data.add_rows(0,colheaders);//Заголовки столбцов 
	_Data.add_cols(0,[''].concat(rowheaders));//Заголовки строк
	for(var i=0;i<_Data.dimension().rows;i++){_add_rows_html(i);};//Отобразить таблицу
	
	//
	//
	var cell_width=30;
	var cell_height=12;
	//
	$('#'+table_id+' td').css('width','200px')
	var input=$('<div id="edcell"><input type="text" id="edit"></div>');
	var input_value=NaN;
	var cell={'row':0,'col':0};
	//
	tabhtml.on('click','td',function(event){
		var rowindex=$(this).parent().index();
		var colindex=$(this).index();
		$(tabhtml).append(input);
		//input.width($(this).width()*0.8).height($(this).height()*0.8);
		input.show();
		input.offset().left=$(this).offset().left;
		input.offset().top=$(this).offset().top;
		//var old_val=$(this).val();
		//if(!isNaN(input_value)){
		//	_Data.set_val(cell.row,cell.col,input.val());
		//	_show_cell(cell.row,cell.col);
		//}
		//cell.row=rowindex;
		//cell.col=colindex;
		//input_value=_Data.get_val(rowindex,colindex);
		//$(this).empty();
		//input.val(input_value).width($(this).width()*0.8).height($(this).height()*0.8);
		//$(this).append(input);
		//input.show().focus();
		
		
		//_empty_cell(rowindex,colindex);
		//_Data.set_val(rowindex,colindex,input.val());
		// tbl.val(cell.row,cell.col,ed.);
		// cell=
		
	})
	//
	//
	//Функция для проверки принадлежности пары индексов (строка, столбец) к диапазонам индексов таблицы
	//Параметры:
	//@rowindex индекс строки
	//@colindex индекс столбца
	function _in_array(rowindex,colindex){return _Data.in_array(rowindex-1,colindex-1);
//		if((rowindex>0)&&(rowindex<=_Data.dimension().rows)&&(colindex>0)&&(colindex<=_Data.dimension().cols)){
//			return true;
//		}
//		else{
//			return false;
//		};
	};
	//
	//
	//Функция для добавления html кода строки с заданным номером
	//Параметры:
	//@rowindex номер строки
	function _add_rows_html(rowindex){
		var rowdata=_Data.rows(rowindex);
		var rows=$('#'+table_id+' tr.table-row');
		var new_row_html='<tr class="table-row">';
		if(rows.size()===0){tabhtml.append(new_row_html);}
		else{rows.eq(rowindex-1).after(new_row_html);};
		var sel_row=$('#'+table_id+' tr.table-row').eq(rowindex);
		rowdata.forEach(function(item){
			sel_row.append('<td class="table-cell">'+item+'</td>');
		});
	};
	//
	//
	//Функция для добавления html кода столбца с заданным номером
	//Параметры:
	//@colindex номер отображаемого столбца
	function _add_cols_html(colindex){
		coldata=_Data.cols(colindex);
		//tabhtml.find('tr').each(function(rowindex,item){
		//	$(item).children().eq(colindex-1).after('<td>'+coldata[rowindex]+'</td>');
		//});
		$('#'+table_id+' tr.table-row').each(function(rowindex,rowdata){
			$(rowdata).children().eq(colindex-1).after(('<td class="table-cell">'+coldata[rowindex]+'</td>'));
		});
	};
	//
	//
	//Функция для отображения данных в ячейке в строке rowindex и столбце colindex
	//Параметры:
	//@rowindex номер строки
	//@colindex номер столбца
	function _show_cell(rowindex,colindex){
		if(_in_array(rowindex,colindex)){
			tabhtml.find('tr').eq(rowindex)
			.find('td').eq(colindex)
			.empty()
			.append(_Data.get_val(rowindex,colindex));
		}
	};
		//
	//
	//Функция для отмены отображения данных ячейки в строке rowindex и столбце colindex
	//Параметры:
	//@rowindex номер строки
	//@colindex номер столбца
	function _empty_cell(rowindex,colindex){
		tabhtml.find('tr').eq(rowindex)
		.find('td').eq(colindex)
		.empty();
	};
	//
	//
	//Метод добавляющий строку в указанное место таблицы 
	//Параметры:
	//@rowheader заголовок добавляемой строки
	//@rowdata массив с элементами добавляемой строки
	//@rowindex номер добавляемой строки
	Table.add_rows=function(rowheader,rowdata,rowindex){
		if(!_in_array(rowindex,1)){rowindex=_Data.dimension().rows;};
		rowdata=[rowheader].concat(rowdata);
		_Data.add_rows(rowindex,rowdata);
		_add_rows_html(rowindex);
	};
	//
	//
	//Метод добавляющий столбец в указанное место таблицы 
	//Параметры:
	//@colheader заголовок добавляемого столбца
	//@coldata массив с элементами добавляемого столбца
	//@colindex номер добавляемого столбца
	Table.add_cols=function(colheader,coldata,colindex){
		if(!_in_array(1,colindex)){colindex=_Data.dimension().cols;};
		coldata=[colheader].concat(coldata);
		_Data.add_cols(colindex,coldata);
		_add_cols_html(colindex);
	};
	//
	//
	//Метод, возвращающий текущее значение указанной ячейки, если вызван с двумя параметрами
	//(устанавливающий новое значение указанной ячейки, если вызван с тремя параметрами) 
	//Параметры:
	//@rowindex номер строки
	//@colindex номер столбца
	//@val новое значение ячейки
	Table.cell_value=function(rowindex,colindex,val){
		val=val||NaN;
		if(_in_array(rowindex,colindex)){
			if(isNaN(val)){return _Data.get_val(rowindex,colindex);}
			else{
				_Data.set_val(rowindex,colindex,val);
				//
				_show_cell(rowindex,colindex);
				return val;
			};
		}
		else{return false;};
	};
	//
	//
	Table.data=function(){return _Data.data();};
	//
	//
	//Метод, устанавливающий ширину таблицы
	//Параметры:
	//@widthtable ширина таблицы
	Table.set_width=function(widthtable){tabhtml.attr('width',widthtable);};
	//
	//
	//Метод, изменяющий заголовок указанной строки
	//Параметры:
	//@rowheader Заголовок строки
	//@rowindex номер строки
	Table.set_rows_header=function(rowheader,rowindex){
		if(_in_array(rowindex,1)){
			_Data.set_val(rowindex,0,rowheader);
			_show_cell(rowindex,0);
		}
	}
	//
	//
	//Метод, изменяющий заголовок указанного столбца
	//Параметры:
	//@colheader Заголовок столбца
	//@colindex номер столбца
	Table.set_cols_header=function(colheader,colindex){
		if(_in_array(1,colindex)){
			_Data.set_val(0,colindex,colheader);
			_show_cell(0,colindex);
		}
	}
	//
	//
	//Метод, удаляющий указанную строку
	//Параметры:
	//@rowindex номер строки
	Table.remove_rows=function(rowindex){
		if(_in_array(rowindex,1)){
			_Data.del_rows(rowindex);
			tabhtml.find('tr:eq('+(rowindex-1)+')').remove();
		}
	}
	//
	//
	//Метод, удаляющий указанный столбец
	//Параметры:
	//@colindex номер столбца
	Table.remove_cols=function(colindex){
		if(_in_array(1,colindex)){
			_Data.del_cols(colindex);
			tabhtml.find('tr').each(function(indexrow,item){
				$(item).children().eq(colindex-1).remove();
			});
		}
	}
	//
	//
	//Метод, изменяющий значения всех ячеек строки
	//Параметры:
	//@rowdata Массив значений ячеек строки
	//@rowindex Номер строки
	Table.edit_rows=function(rowdata,rowindex){
		if(_in_array(rowindex,1)){
			rowdata=[].concat(rowdata);
			cols_count=_Data.dimension().cols;
			var colindex=1;
			rowdata.forEach(function(item){
				_Data.set_val(rowindex,colindex,item);
				_show_cell(rowindex,colindex);
				colindex++;
			});
			return true;
		}
		else{
			return false;
		}
	}
	//
	//
	//Метод, изменяющий значения всех ячеек столбца 
	//Параметры:
	//@coldata Массив значений ячеек столбца
	//@colindex Номер столбца
	Table.edit_cols=function(coldata,colindex){
		if(_in_array(1,colindex)){
			coldata=[].concat(coldata);
			cols_count=_Data.dimension().cols;
			var rowindex=1;
			coldata.forEach(function(item){
				_Data.set_val(rowindex,colindex,item);
				_show_cell(rowindex,colindex);
				rowindex++;
			});
			return true;
		}
		else{
			return false;
		}
	}
	//
	//
	
	// //
	// var 
	// //
	// this.rows=[];
	// this.colls=[];
	// this.data=[];
	// this.cellwidth=15;
	// //
	// var tbl=this;
	// var cell={'row':1,'col':1};
	// //
	// $('table#'+this.id).on('click','td.'+this.id+'-data',function(event){
		// var inp='<input type="text" id="inp">';
		// var ed=$('input#inp');
		// ed.remove();
		// $(this).append(inp);
		// var row=$(this).parent().index();
		// var col=$(this).parent().parent().index();
		// tbl.val(cell.row,cell.col,ed.val());
		// cell={'row':row,'col':col};
		// ed.val(tbl.val(row,col)).show().focus();
	// })
	// //
	
	// //this.table.find('td.'+this.id+'-col-row-header').append(inp);
	// //var ed=$('input#inp');
	// //ed.hide().attr('size',this.cellwidth);
	return Table;
}