var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open('GET', 'static/data.json', false);
req.send();
//if(req.status == 200) {  
	var data = JSON.parse(req.responseText);
//}

window.onload = function(){
	var textarea = document.querySelector("input");
	textarea.value = "";
	var timeout;  
	textarea.addEventListener("keydown", function() {    
		clearTimeout(timeout);    
		timeout = setTimeout(function() {  
			search(textarea.value);   
			console.log(textarea.value);
		}, 500);  
	});

	if(localStorage.getItem("left") == null) {
		var left = document.getElementById("left");
		for (var item in data){
		    left.innerHTML += '<div class="item"><div class="pic"><span><img src="'
		    + data[item].img +'"></span></div><div class="title"><span><b>Название:</b>'
		    + data[item].name +'</span><span><b>Автор:</b><span class="author">'
		    + data[item].author +'</span></span></div><div class="after" onclick="remove(this)"></div></div>';
		}
	} else {
		document.getElementById("left").innerHTML = localStorage.getItem("left");		
		document.getElementById("right").innerHTML = localStorage.getItem("right");
	}
}

function search(author){
	let items = document.getElementsByClassName("author");
	for(var i = 0; i < items.length; i++){
		if(items[i].innerHTML.indexOf(author) > -1){
			items[i].parentNode.parentNode.parentNode.style.display = "";
		} else {
			items[i].parentNode.parentNode.parentNode.style.display = "none";
		}
	}
}

function remove(element){
	if(element.parentNode.parentNode.id == "left"){
		var side = document.getElementById("right");
		element.classList.replace("after","before");
	} else {
		var side = document.getElementById("left");
		element.classList.replace("before","after");
	}
	element.parentNode.parentNode.removeChild(element.parentNode);
	side.appendChild(element.parentNode);

	localStorage.setItem("left", document.getElementById("left").innerHTML);
	localStorage.setItem("right", document.getElementById("right").innerHTML);
}
