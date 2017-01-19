
q.ready(function(){
	

	var XNORMAL = 26;
	var YNORMAL = 26;
	var WIDTHNORMAL = 70;
	var YHEIGHTNORMAL = 50;


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
	/*
		eles
	*/

	/*
	data
	*/
	var tableMessage = {
		tableName : 'myTable',
		width : WIDTHNORMAL,
		height : YHEIGHTNORMAL,
		lineHeight : YHEIGHTNORMAL,
		textAlign : 'center',
		x : XNORMAL,
		y : YNORMAL,
		tableWidth : 0,
		tableHeight : 0
	}
	/*
	data
	*/
	var toolHelp = {
		setRuler : function(){
			var NOWWIDTH = testwrap.offsetWidth;
			var NOWHeight = mainbox.offsetHeight;
			x.style.width = NOWWIDTH-20 + 'px';
			y.style.height = NOWHeight-20 + 'px';

			var xWrap = x.children[0];
			var yWrap = y.children[0];
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
				tableMessage.lineHeight = v.getAttribute('title');
			}
		})
		tableMessage.tableWidth = tableMessage.x*tableMessage.width;
		tableMessage.tableHeight = tableMessage.y*tableMessage.height;
		console.log(tableMessage)
		newProject();

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
	//样式
	// toolHelp.addRule("bodySet",'body',"color:red");
	// console.log(toolHelp.styleObject)
	// toolHelp.styleObject.bodySet.set("color",'pink');
})
