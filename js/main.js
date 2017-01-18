q.ready(function(){
	
	var XNORMAL = 26;
	var YNORMAL = 26;
	var WIDTHNORMAL = 70;
	var YHEIGHTNORMAL = 50;
	var HEIGHTNORMAL = 40;

	var con = document.getElementById('con');
	var mainbox = document.getElementById('mainbox');
	var tablebox = document.getElementById('tablebox');
	var x = document.getElementById('x');
	var y = document.getElementById('y');
	var testwrap = document.getElementById('testwrap');
	var table = document.createElement('table');
	var TEXTX = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		
	var toolHelp = {
		setRuler : function(){
			var NOWWIDTH = testwrap.offsetWidth;
			var NOWHeight = mainbox.offsetHeight;
			x.style.width = NOWWIDTH-20 + 'px';
			y.style.height = NOWHeight-20 + 'px';

			var xWrap = x.children[0];
			var yWrap = y.children[0];
			q.each(XNORMAL,function(k,v){
				var span = document.createElement('span');
				span.style.width = WIDTHNORMAL+'px';
				span.innerHTML = TEXTX[k];
				xWrap.appendChild(span);
				xWrap.style.width = xWrap.offsetWidth + WIDTHNORMAL + 'px';
			})
			q.each(XNORMAL,function(k,v){
				var span = document.createElement('span');
				span.style.height = YHEIGHTNORMAL+'px';
				span.style.lineHeight = YHEIGHTNORMAL+'px';
				span.innerHTML = k+1;
				yWrap.appendChild(span);
				yWrap.style.height = xWrap.offsetWidth + WIDTHNORMAL + 'px';
			})
		},
		resize : function(){
			con.style.height = mainbox.style.height = (document.documentElement.clientHeight - 110)+'px';
			tablebox.style.height = document.documentElement.clientHeight - 130+'px';
			tablebox.style.width = mainbox.offsetWidth - 20+'px';	
		}
	}

	
	toolHelp.resize();
	toolHelp.setRuler();


})
