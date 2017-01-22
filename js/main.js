
q.ready(function(){
	

	var XNORMAL = 26;
	var YNORMAL = 26;
	var WIDTHNORMAL = 70;
	var YHEIGHTNORMAL = 50;
	var isNew = false;
	var XARR = 10;
	var YARR = 10;
	var zIndex = 100;



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

	var newButtonPass = q.getNode('passButton'); //通用
	var newButtonPassCopy = q.getNode('passButton-copy'); //通用

	var xieButton = q.getNode('xieButton');
	var xieButtonCopy = q.getNode('xieButton-copy');
	var xieTestItem = q.getNode('xieTest').children;

	var tableRev = q.getNode('table-rev'); //行高切换
	var objname = q.getNode('objname'); //标题
	var mesXY = q.getNode('mesXY'); //坐标显示
	var xWrap = x.children[0];
	var yWrap = y.children[0];
	var borderSelect = q.getNode('borderSelect');
	var closeGroup = q.getElementsByClassName('close');
	
	
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
		x : XARR,
		y : YARR,
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
		},
		setXieLine : function(type,color,bgColor,parentss,text1,text2){
			parentss.innerHTML = '';
			var bLine = document.createElement('span');
			var cLine = document.createElement('span');

			var con1 = document.createElement('span');
			var con2 = document.createElement('span');

			var parentBgColor = bgColor;
			var GGLine = {};


			parentss.style.position = 'relative';
			parentss.style.overflow = 'hidden';
			console.log(parentss.clientWidth)
			var W = parentss.clientWidth;
			var H = parentss.clientHeight;
			var LINEWidth = parentss.clientWidth/2 + 'px';
			var LINEHeight = parentss.clientHeight/2 + 'px';

			bLine.style.position = cLine.style.position = con1.style.position = con2.style.position = 'absolute';
			bLine.style.borderStyle = cLine.style.borderStyle = 'solid';
			bLine.style.display = cLine.style.display = con1.style.display = con2.style.display = 'block';
			bLine.style.left = bLine.style.top  ='0px';
			
			con1.innerHTML = text1;
			con2.innerHTML = text2;

			GGLine.width = LINEHeight+' '+LINEWidth+' '+LINEHeight+' '+LINEWidth;
			if(type == 1){
				cLine.style.left = '1px';
				cLine.style.top = '-1px';
				GGLine.colorX = color+ ' '+color+' '+'transparent transparent';
				GGLine.colorY = bgColor+ ' '+bgColor+' '+'transparent transparent';
			}else{
				cLine.style.left = '-1px';
				cLine.style.top = '-1px';
				GGLine.colorX = color+' transparent transparent '+color;
				GGLine.colorY = bgColor+' transparent transparent '+bgColor;
			}
			console.log()
			bLine.style.borderWidth = cLine.style.borderWidth = GGLine.width;
			bLine.style.borderColor = GGLine.colorX;
			cLine.style.borderColor = GGLine.colorY;



			parentss.appendChild(bLine);
			parentss.appendChild(cLine);
			parentss.appendChild(con1);
			parentss.appendChild(con2);

			return function(){

				var GH1 = H/2 + (H/2 - con1.offsetHeight) / 2 + 'px';
				var GH2 = (H/2  - con1.offsetHeight )/ 2 +'px';
				if(type==1){
					con1.style.top = GH1;
					con2.style.top = GH2;
				}else{
					con2.style.top = GH1;
					con1.style.top = GH2;
				}

				con1.style.left = (W/2 - con1.offsetWidth) / 2 + 'px'; 
				con2.style.left = ((W+W/2) - con2.offsetWidth) / 2 + 'px'; 
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
	function newProject(node){
		if(node.style.display == 'none'){
			node.style.zIndex = ++zIndex;
			windowHelp.open(node,'window-open');
		}else{
			windowHelp.close(node,'window-open');
		}
	}
	q.on(newButton,'click',function(){
		
		newProject(newButtonCopy);
	})
	//新建OK后关闭,执行render操作
	q.on(newButtonOK,'click',function(){

		if(isNew){
			alert('已经新建，无法重新创建。刷新页面重置。')
			return 0;
		}
		isNew = true;

		var inputs = newButtonCopy.getElementsByTagName('input');
		q.each(inputs,function(k,v){
			tableMessage[v.name] = v.value || tableMessage[v.name];
		})
		q.each(tableRev.children,function(k,v){
			if(q.hasClass(v,'active')){
				tableMessage.textAlign = v.getAttribute('title');
			}
		})

		console.log(tableMessage,'beta');
		var parAttr = ['width','height','x','y'];
		q.each(parAttr,function(k,v){
			tableMessage[v] = parseInt(tableMessage[v]);
		})
		tableMessage.tableWidth = tableMessage.x*tableMessage.width;
		tableMessage.tableHeight = tableMessage.y*tableMessage.height;
		console.log(tableMessage.tableHeight)
		tableMessage.tabObj = document.createElement('table');
		q.addClass(tableMessage.tabObj,tableMessage.tableName);
		tableMessage.tabObj.style.width =tableMessage.tableWidth +'px';
		tableMessage.tabObj.style.height = tableMessage.tableHeight + 'px';


		toolHelp.addRule(tableMessage.tableName,"."+tableMessage.tableName,"border-collapse: collapse;");
		toolHelp.addRule("border","."+tableMessage.tableName +" tr,"+"."+tableMessage.tableName+" th","border: "+tableMessage.border);

		toolHelp.addRule("lineHeight","."+tableMessage.tableName+" th","line-height:"+tableMessage.lineHeight+"px;text-align:"+tableMessage.textAlign+";");
		q.each(tableMessage.y,function(k,v){
			var tr = document.createElement('tr');
			q.addClass(tr,'row-'+k);
			q.each(tableMessage.x,function(key,value){
				var th = document.createElement('th');
				q.addClass(th,'x-'+k);
				q.addClass(th,'y-'+key);
				tr.appendChild(th);
			})	

			if(k>YNORMAL-1){
				var span = document.createElement('span');
				span.innerHTML = k+1;	
				yWrap.appendChild(span);
				yWrap.style.height = xWrap.offsetHeight + YHEIGHTNORMAL + 'px';	
			}
			tableMessage.tabObj.appendChild(tr);
		})
		q.each(tableMessage.x,function(k,v){
			if(k>XNORMAL-1){
				var span = document.createElement('span');
				span.style.width = WIDTHNORMAL+'px';
				span.innerHTML = 'Z-'+(k+1);	
				xWrap.appendChild(span);
				xWrap.style.width = xWrap.offsetWidth + WIDTHNORMAL + 'px';
			}
		})
			
		tablebox.appendChild(tableMessage.tabObj);


		

		console.log(tableMessage)
		
		q.each(tableMessage.y,function(k,v){
			var lister = tableMessage.tabObj.children[k];

			toolHelp.setitem(y,k,'height',lister.children[0].offsetHeight);
			q.each(parseInt(tableMessage.x),function(key,value){

				toolHelp.setitem(x,key,'width',lister.children[key].offsetWidth);

			})	
		})	


		objname.innerHTML = tableMessage.tableName;
		newProject(newButtonCopy);

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
		})
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
	q.each(closeGroup,function(k,v){
		q.on(v,'click',function(){
			newProject(this.parentNode.parentNode);
		})
	})
	q.on(newButtonPass,'click',function(){

		newProject(newButtonPassCopy);

	})
	q.on(xieButton,'click',function(){
		newProject(xieButtonCopy);
	})

	xieButtonCopy.style.display = 'block';
	q.each(xieTestItem,function(k,v){
		toolHelp.setXieLine(k+1,'#000','#E9E8E9',v,'内容一','内容二')();
	})
	xieButtonCopy.style.display = 'none';


	//样式
	// toolHelp.addRule("bodySet",'body',"color:red");
	// console.log(toolHelp.styleObject)
	// toolHelp.styleObject.bodySet.set("color",'pink');
})
