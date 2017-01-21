
q.ready(function(){
	

	var XNORMAL = 26;
	var YNORMAL = 26;
	var WIDTHNORMAL = 70;
	var YHEIGHTNORMAL = 50;
	var isNew = false;



	var con = q.getNode('con');
	var mainbox = q.getNode('mainbox');
	var tablebox = q.getNode('tablebox');
	var x = q.getNode('x');
	var y = q.getNode('y');
	var testwrap = q.getNode('testwrap');
	var table = document.createElement('table');
	var TEXTX = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var styleSheets = document.styleSheets[1] || document.styleSheets[1] || window.CSSRule.STYLE_RULE;
	var ocssRules=styleSheets.cssRules || styleSheets.rules || styleSheets;  
	/*
		eles
	*/
	var newButton = q.getNode('newButton'); //新建
	var newButtonCopy = q.getNode('newButton-copy'); //新建
	var newButtonOK = q.getNode('newButtonOK'); //新建后OK
	var tableRev = q.getNode('table-rev'); //行高切换
	var objname = q.getNode('objname'); //标题
	var mesXY = q.getNode('mesXY'); //坐标显示
	var xWrap = x.children[0];
	var yWrap = y.children[0];
	var borderSelect = q.getNode('borderSelect');
	/*
		eles
	*/

	/*
	data
	*/
	var tableMessage = {
		tableName : 'myTable',
		width : 60,
		height : 30,
		lineHeight : 30,
		textAlign : 'center',
		x : 10,
		y : 10,
		tableWidth : 0,
		tableHeight : 0,
		tabObj : null,
		border : '1px solid #000',
	}
	/*
	data
	*/
	var mesShow = {
		isSelect : false,
		selectObj : []
	}
	var toolHelp = {
		setRuler : function(){
			var NOWWIDTH = testwrap.offsetWidth;
			var NOWHeight = mainbox.offsetHeight;
			x.style.width = NOWWIDTH-20 + 'px';
			y.style.height = NOWHeight-20 + 'px';

			
			xWrap.innerHTML = yWrap.innerHTML = '';
			q.each(XNORMAL,function(k,v){
				var span = document.createElement('span');
				span.style.width = WIDTHNORMAL+'px';
				span.innerHTML = TEXTX[k];
				xWrap.appendChild(span);
				xWrap.style.width = xWrap.offsetWidth + WIDTHNORMAL + 'px';
			})
			q.each(YNORMAL,function(k,v){
				var span = document.createElement('span');
				span.style.height = YHEIGHTNORMAL+'px';
				span.style.lineHeight = YHEIGHTNORMAL+'px';
				span.innerHTML = k+1;
				yWrap.appendChild(span);
				yWrap.style.height = yWrap.offsetWidth + WIDTHNORMAL + 'px';
			})
		},
		resize : function(){
			con.style.height = mainbox.style.height = (document.documentElement.clientHeight - 110)+'px';
			tablebox.style.height = document.documentElement.clientHeight - 130+'px';
			tablebox.style.width = mainbox.offsetWidth - 20+'px';	
			var hrefX = mainbox.offsetWidth / 2;
			var hrefY = mainbox.offsetHeight / 2;
			x.style.marginLeft = -(hrefX - 20)+'px';
			x.style.marginTop = -(hrefY)+'px';
			y.style.marginLeft = -(hrefX)+'px';
			y.style.marginTop = -(hrefY - 20)+'px';
		},
		addRule : function(name,ele,attr,size){
			var s = size || 0;
			if(styleSheets.insertRule){ 
				styleSheets.insertRule(ele+" {"+attr+"} ",s)
			}else{
				styleSheets.addRule(ele,attr,s)
			}
			this.styleObject[name] = {
				obj :ocssRules[0],
				get : function(attr){
					return this.obj.style[attr];
				},
				set : function(attr,value){
					return this.obj.style[attr] = value;
				}
			};
			return ocssRules[0];
		},
		styleObject : {

		},
		setitem:function(obj,k,attr,value){

			var gg = obj.children[0].children[k];
			switch(attr){
				case "width":
					gg.style.width = value+'px';
					break;
				case "height":
					gg.style.height = gg.style.lineHeight = value+'px';	
					break;
			}
		}
	}


	var windowHelp = {
		close : function(node,className,time){
			q.removeClass(node,className);
			setTimeout(function(){
				node.style.display = 'none';
			},500);
		},
		open : function(node,className){
			node.style.display = 'block';
			setTimeout(function(){
				q.addClass(node,className);
			},10);
		}
	}
	//只执行一次
	toolHelp.resize();

	//可以执行多次的样式重置，例如新建。
	toolHelp.setRuler();

	//无侵入式define

	//新建
	function newProject(){
		if(newButtonCopy.style.display == 'none'){
			windowHelp.open(newButtonCopy,'window-open');
		}else{
			windowHelp.close(newButtonCopy,'window-open');
		}
	}
	q.on(newButton,'click',function(){
		if(isNew){
			alert('已经新建，无法重新创建。刷新页面重置。')
			return 0;
		}
		isNew = true;
		newProject();
	})
	//新建OK后关闭,执行render操作
	q.on(newButtonOK,'click',function(){

		var inputs = newButtonCopy.getElementsByTagName('input');
		q.each(inputs,function(k,v){
			tableMessage[v.name] = v.value || tableMessage[v.name];
		})
		q.each(tableRev.children,function(k,v){
			if(q.hasClass(v,'active')){
				tableMessage.textAlign = v.getAttribute('title');
			}
		})

		// console.log(tableMessage);

		tableMessage.tableWidth = tableMessage.x*tableMessage.width;
		tableMessage.tableHeight = tableMessage.y*tableMessage.height;
		tableMessage.tabObj = document.createElement('table');
		q.addClass(tableMessage.tabObj,tableMessage.tableName);
		tableMessage.tabObj.style.width = tableMessage.x*tableMessage.width + 'px';
		tableMessage.tabObj.style.height = tableMessage.y*tableMessage.height + 'px';


		toolHelp.addRule(tableMessage.tableName,"."+tableMessage.tableName,"border-collapse: collapse;");
		toolHelp.addRule("border","."+tableMessage.tableName +" tr,"+"."+tableMessage.tableName+" th","border: "+tableMessage.border);
		console.log("border: "+tableMessage.border)
		toolHelp.addRule("lineHeight","."+tableMessage.tableName+" th","line-height:"+tableMessage.lineHeight+"px;text-align:"+tableMessage.textAlign+";");
		q.each(parseInt(tableMessage.x),function(k,v){
			var tr = document.createElement('tr');
			q.addClass(tr,'row-'+k);
			q.each(parseInt(tableMessage.y),function(key,value){
				var th = document.createElement('th');
				q.addClass(th,'x-'+k);
				q.addClass(th,'y-'+key);
				tr.appendChild(th);
			})	
			if(k>XNORMAL-1){
				var span = document.createElement('span');
				span.style.width = WIDTHNORMAL+'px';
				span.innerHTML = 'Z-'+(k+1);	
				xWrap.appendChild(span);
				xWrap.style.width = xWrap.offsetWidth + WIDTHNORMAL + 'px';

				var span = document.createElement('span');
				
				span.innerHTML = k+1;	
				yWrap.appendChild(span);
				yWrap.style.height = xWrap.offsetHeight + YHEIGHTNORMAL + 'px';	
			}
			tableMessage.tabObj.appendChild(tr);
		})
		tablebox.appendChild(tableMessage.tabObj);


		

		console.log(tableMessage)
		
		q.each(parseInt(tableMessage.x),function(k,v){
			var lister = tableMessage.tabObj.children[k];

			toolHelp.setitem(y,k,'height',lister.children[0].offsetHeight);
			q.each(parseInt(tableMessage.y),function(key,value){

				toolHelp.setitem(x,key,'width',lister.children[key].offsetWidth);

			})	
		})	


		objname.innerHTML = tableMessage.tableName;
		newProject();

		q.on(tableMessage.tabObj,'mouseover',function(e){
			if(!mesShow.isSelect){
				q.pao(e,'th',function (ele) {
					mesXY.innerHTML = ele.className;
				})
			}
			
		})
		q.on(tableMessage.tabObj,'click',function(e){

			mesShow.isSelect = true;
			var isHave = false;
			q.pao(e,'th',function (ele) {

				q.each(mesShow.selectObj,function(k,v){
					if(v == ele){
						isHave = true;
						mesShow.selectObj.splice(k,1);
						ele.style.background = '';
						
					}
				})
				if(!isHave){
					mesShow.selectObj.push(ele);
					ele.style.background = 'pink';
				}
				mesXY.innerHTML = '选择 '+mesShow.selectObj.length+' 个';
				if(mesShow.selectObj.length == 0){
					mesShow.isSelect = false;
				}
				return ;

			})

			//else
			//{
			//	mesShow.isSelect = true;
			//	mesShow.selectObj.style.backGround = '';
			//	mesShow.selectObj = null;
				
			//}
			
		})

		console.log(toolHelp.styleObject.border)
	})
	q.on(tableRev,'click',function(e){
		q.pao(e,'span',function(ele){
			console.log(ele.parentNode.children)
			q.each(ele.parentNode.children,function(k,v){
				q.removeClass(v,'active');
			})
			q.addClass(ele,'active');
		})

	})
	q.on(tablebox,'scroll',function(a){

		y.scrollTop= tablebox.scrollTop;
		x.scrollLeft = tablebox.scrollLeft;
	})
	q.on(borderSelect,'click',function(e){
		var tar = e.target || e.srcElement;
		if(q.hasClass(tar,'ic')){
			q.each(tar.parentNode.children,function(k,v){
				q.removeClass(v,'active');
			})
			q.addClass(tar,'active');
		}
	})
	//样式
	// toolHelp.addRule("bodySet",'body',"color:red");
	// console.log(toolHelp.styleObject)
	// toolHelp.styleObject.bodySet.set("color",'pink');
})
