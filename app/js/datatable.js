//����������� ������� ������� �������� m x n
//���������� ������, �������, ��� �������� ���������� ������:
//
//dimension() ���������� ������ ��������� {'rows':<����� �����>,'cols':<����� ��������>}
//
//
//
//
//
//
//���������:
//@rows ����� ����� 
//@cols ����� ��������
//@data ������ � ��������� �������
//@def �������� ������� �� ���������(�����������, ������������ ��� ���������� ��������� data)
//
//��������� ����� (rows) � �������� (cols) ���������� � ���� 
function Matrix(rows,cols,data,def){
	var MatrixArray={};//����� �����
	var Matrix_rows=rows||0;//����� ��������
	var Matrix_cols=cols||0;//�������� �������� ������� �� ���������
	var Matrix_default=def||NaN;//�������� �������
	var Matrix_data=[];
	//
	//������� ������ �������
	for(var i=0;i<Matrix_rows;i++){
		Matrix_data[i]=[];
		Matrix_data[i].length=Matrix_cols;
		Matrix_data[i].fill(Matrix_default);
	};
	//���������� ������� ��������� �������
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
	//����� ���������� ����������� ������� � ���� �������:
	//{'rows':<����� �����>,'cols':<����� ��������>}
	MatrixArray.dimension=function(){return {'rows':Matrix_rows,'cols':Matrix_cols};};
	//
	//
	//����� ��������� ���� �������� �� ��������� � ��������� �������� �������
	//���������:
	//@rowindex ������ ������
	//@colindex ������ �������
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
	//����� ���������� ������ �������� �������
	//��������� �������: [[a11,a12, ...],[a21,a22, ...], ... ]
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
	//����� ���������� �������� ��������, ������������ � ������ rowindex � ������� colindex 
	//���������:
	//@rowindex ������
	//@colindex �������
	MatrixArray.get_val=function(rowindex,colindex){
		if(in_array(rowindex,colindex)){
			return Matrix_data[rowindex][colindex];
		}
		else{return false;}
	};
	//
	//
	//����� ������������� �������� �������� � ������ rowindex � ������� colindex ������ val  
	//���������:
	//@rowindex ������ ������
	//@colindex ������ �������
	//@val �������� ������
	MatrixArray.set_val=function(rowindex,colindex,val){
		if(in_array(rowindex,colindex)){
			Matrix_data[rowindex][colindex]=val;
			return val;
		}
		else{return false;};
	};
	//
	//
	//����� ���������� �������� ������� � ������� colindex
	//���������:
	//@colindex �������
	MatrixArray.cols=function(colindex){
		if(in_array(0,colindex)){
			return Matrix_data.map(function(item){return item[colindex];});
		}
		else{return false;};
	};
	//
	//����� ���������� ������, ���������� �������� ������ � ������� rowindex
	//���������:
	//@rowindex ������
	MatrixArray.rows=function(rowindex){
		if(in_array(rowindex,0)){return Matrix_data[rowindex];}
		else{return false;};
	};	
	//
	//����� ������������� �������� �������� ������� �� ���������
	//���������:
	//@default_val ���������� �������� �� ���������
	MatrixArray.set_default_val=function(default_val){Matrix_default=default_val;};
	//
	//
	//����� ��������� ����� ������� � ������� (repl=false), ���� �������� ���� �� ��������� �������� ����� (repl=true) � ��������� �����
	//���������:
	//@colindex ����� ���� ������� �������� �������
	//(�� ��������� ��� ��� �������� �������� � �����)
	//@coldata ������ �������
	//(������, ����������� �������� �� ��������� ����� ����� ������� (rows). ������ �������� ����������)
	//@repl (true/false) ��������� �� ������ �������
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
	//����� ������� ������� � �������� ������� �� �������
	//���������:
	//@colindex ����� �������, ������� ������� �������
	//(��� �������� ��������� �� ������� ����������� ������ �� ���������)
	MatrixArray.del_cols=function(colindex){
		Matrix_cols--;
		if(in_array(0,colindex)){
			Matrix_data.forEach(function(item,rowindex){item.splice(colindex,1);});
		};
	};
	//
	//
	//����� ������� ������ � �������� ������� �� �������
	//���������:
	//@rowindex ����� ������, ������� ������� �������
	//(��� �������� ��������� �� ������� ����������� ������ �� ���������)
	MatrixArray.del_rows=function(rowindex){
		Matrix_rows--;
		if(in_array(rowindex,0)){
			Matrix_data.splice(rowindex,1);
		};
	};
	//
	//
	//����� ��������� ����� ������ � ������� (repl=false), ���� �������� ���� �� ��������� (repl=true) � ��������� �����
	//���������:
	//@rowindex ����� ���� ������� �������� ������
	//(�� ��������� ��� ��� �������� �������� � �����)
	//@rowdata ������ ������
	//(������, ����������� �������� �� ��������� ����� �������� ������� (cols). ������ �������� ����������)
	//@repl (true/false) ��������� �� ������ ������
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
	//�����, �������� ��������� ������ �������
	//���������:
	//@rowindex1 ����� 1-� ������ ��� ������������ 
	//@rowindex2 ����� 2-� ������ ��� ������������ 
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
	//�����, �������� ��������� ������� �������
	//���������:
	//@colindex1 ����� 1-�� ������� ��� ������������ 
	//@colindex2 ����� 2-�� ������� ��� ������������ 
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
	//����� ���������� �������� ������ � �������, � ������� ��������� ������� �������
	//���������:
	//@val ������� ��� ������
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
//������� � ������� �������� �� ������ ������� Matrix
//������� ��� ���������� ����������� jQuery
//����������� ������� ������ ������� � �������
//�������� ��� �������� ��� �������� � ��������� �������
//���������:
//@id ID ������� � html ��������. ������ ���� ������� <table id="id"></table>
//@rows ����� �����
//@cols ����� ��������
//@dataarray ������ ��� ���������� �������
//@rowheaders ��������� �����
//@colheaders ��������� ��������
function DataTable(id,rows,cols,dataarray,rowheaders,colheaders){
	rows=rows||1;
	cols=cols||1;
	dataarray=dataarray||NaN;
	var table_id=id;
	var Table={};
	var tabhtml=$('table#'+table_id);
	var _Data=new Matrix(rows,cols,dataarray,'');//������� ������� rows x cols ��� �������� ������ �������
	_Data.set_default_val('');//�������� �� ���������
	_Data.add_rows(0,colheaders);//��������� �������� 
	_Data.add_cols(0,[''].concat(rowheaders));//��������� �����
	for(var i=0;i<_Data.dimension().rows;i++){_add_rows_html(i);};//���������� �������
	
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
	//������� ��� �������� �������������� ���� �������� (������, �������) � ���������� �������� �������
	//���������:
	//@rowindex ������ ������
	//@colindex ������ �������
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
	//������� ��� ���������� html ���� ������ � �������� �������
	//���������:
	//@rowindex ����� ������
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
	//������� ��� ���������� html ���� ������� � �������� �������
	//���������:
	//@colindex ����� ������������� �������
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
	//������� ��� ����������� ������ � ������ � ������ rowindex � ������� colindex
	//���������:
	//@rowindex ����� ������
	//@colindex ����� �������
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
	//������� ��� ������ ����������� ������ ������ � ������ rowindex � ������� colindex
	//���������:
	//@rowindex ����� ������
	//@colindex ����� �������
	function _empty_cell(rowindex,colindex){
		tabhtml.find('tr').eq(rowindex)
		.find('td').eq(colindex)
		.empty();
	};
	//
	//
	//����� ����������� ������ � ��������� ����� ������� 
	//���������:
	//@rowheader ��������� ����������� ������
	//@rowdata ������ � ���������� ����������� ������
	//@rowindex ����� ����������� ������
	Table.add_rows=function(rowheader,rowdata,rowindex){
		if(!_in_array(rowindex,1)){rowindex=_Data.dimension().rows;};
		rowdata=[rowheader].concat(rowdata);
		_Data.add_rows(rowindex,rowdata);
		_add_rows_html(rowindex);
	};
	//
	//
	//����� ����������� ������� � ��������� ����� ������� 
	//���������:
	//@colheader ��������� ������������ �������
	//@coldata ������ � ���������� ������������ �������
	//@colindex ����� ������������ �������
	Table.add_cols=function(colheader,coldata,colindex){
		if(!_in_array(1,colindex)){colindex=_Data.dimension().cols;};
		coldata=[colheader].concat(coldata);
		_Data.add_cols(colindex,coldata);
		_add_cols_html(colindex);
	};
	//
	//
	//�����, ������������ ������� �������� ��������� ������, ���� ������ � ����� �����������
	//(��������������� ����� �������� ��������� ������, ���� ������ � ����� �����������) 
	//���������:
	//@rowindex ����� ������
	//@colindex ����� �������
	//@val ����� �������� ������
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
	//�����, ��������������� ������ �������
	//���������:
	//@widthtable ������ �������
	Table.set_width=function(widthtable){tabhtml.attr('width',widthtable);};
	//
	//
	//�����, ���������� ��������� ��������� ������
	//���������:
	//@rowheader ��������� ������
	//@rowindex ����� ������
	Table.set_rows_header=function(rowheader,rowindex){
		if(_in_array(rowindex,1)){
			_Data.set_val(rowindex,0,rowheader);
			_show_cell(rowindex,0);
		}
	}
	//
	//
	//�����, ���������� ��������� ���������� �������
	//���������:
	//@colheader ��������� �������
	//@colindex ����� �������
	Table.set_cols_header=function(colheader,colindex){
		if(_in_array(1,colindex)){
			_Data.set_val(0,colindex,colheader);
			_show_cell(0,colindex);
		}
	}
	//
	//
	//�����, ��������� ��������� ������
	//���������:
	//@rowindex ����� ������
	Table.remove_rows=function(rowindex){
		if(_in_array(rowindex,1)){
			_Data.del_rows(rowindex);
			tabhtml.find('tr:eq('+(rowindex-1)+')').remove();
		}
	}
	//
	//
	//�����, ��������� ��������� �������
	//���������:
	//@colindex ����� �������
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
	//�����, ���������� �������� ���� ����� ������
	//���������:
	//@rowdata ������ �������� ����� ������
	//@rowindex ����� ������
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
	//�����, ���������� �������� ���� ����� ������� 
	//���������:
	//@coldata ������ �������� ����� �������
	//@colindex ����� �������
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