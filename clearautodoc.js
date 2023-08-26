parse = (txt)=> {
    var html = '<head><link rel="stylesheet" href="clearautodoc.css"></head><body>'
    txt = txt.replace(/^\s*[\r\n]/gm,"") // remove blank lines
	txt = txt.replace(/\[key\]/g,"⌨ Introduce ")
	txt = txt.replace(/\[btn\]/g,"Clic en el botón: ")
	txt = txt.replace(/\[chk\]/g,"Clic en la opción: ")
	txt = txt.replace(/\[lnk\]/g,"Clic en la liga: ")
    var array = txt.split("\n");
	html +='<div style="font-size: 1.1em">'+array[0]+'</div>' // get title
	html +='<ol>'
	var i = 0
	var actorTotal = 0
	var actor = {};
    for(i = 1; i < 5; i++) { // get actors
		if ( m = array[i].match(/^([^ ]+) ([^:]+): (.+$)/) ) { 
			if (m[1] == 'APP') icon = '💻'
			else icon = '💁'
			html+='<li actor on='+i+'><i>'+icon+'</i> '+m[3]+'</li>' 
			actor[m[2]] = i
			actorTotal++
		}
    }
	if (actorTotal >= 2) {
		for(i = actorTotal + 1; i < array.length; i++) { 
				if ( m = array[i].match(/^ROL (.+$)/) ) actor['ROL'] = actor[m[1]]
			else if ( m = array[i].match(/^SYS (.+$)/) ) actor['SYS'] = actor[m[1]]
			else if ( m = array[i].match(/^([^-]+)->([^:]+): (.+$)/) ) html+='<li fr='+actor[m[1]]+' to='+actor[m[2]]+(actor[m[1]] > actor[m[2]]? ' bk' : '')+'>'+m[3]+'</li>'
			else if ( m = array[i].match(/^([^:]+): (.+$)/) ) html+='<li on='+actor[m[1]]+'>'+m[2]+'</li>'
		}
	} else { html='Error: actors not found' }
	console.log(actor)
	console.log(actor['SYS'])
	html+='</body>'
	
}
