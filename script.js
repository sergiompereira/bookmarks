(function(){

		var bookmarks = document.getElementsByClassName("bookmark");

		/**
		 * convert unix timestamp to human readable
		 */
		var dateTimeConts = document.getElementsByClassName("datetime");
		var i,len = dateTimeConts.length;
		for(i=0; i<len; i++){
			dateTimeConts[i].innerHTML = toDate(parseInt(dateTimeConts[i].innerHTML));
		}
		
		/**
		 * print the collection of tags
		 */
		var tagsConts = document.getElementsByClassName("tags");
		var j,len = tagsConts.length;
		var tags = "",strTags,arrTags,arrTagsLen,tagsData = {}, currTag;
		for(i=0; i<len; i++){
			strTags = tagsConts[i].innerHTML;
			arrTags = strTags.split(",");			
			arrTagsLen = arrTags.length;
			for(j=0; j<arrTagsLen; j++){
				currTag = trim(arrTags[j]).toLowerCase();
				if(tags.search(new RegExp("(^|,)"+currTag+"(,|$)","gi")) == -1) {
					tagsData[currTag] = {count:1,el:null};
					tags = tags+","+currTag;
				}else{
					tagsData[currTag].count++;
				}
			}
			
			/**
			 * separate tags
			 */
			tagsConts[i].setAttribute("data-tags",strTags);
			while(strTags.search(",") > 0){
				strTags = strTags.replace(",","</span><span>");
			}
			if(strTags.length>0){
				strTags = "<span>"+strTags+"</span>";
			}
			
			tagsConts[i].innerHTML = strTags;
		}
		
		tags = tags.substr(1);
		var tagsColl = tags.split(","), 
			tagsCollLen = tagsColl.length, 
			tagEl,tagLink,
			tagsCollCont = document.getElementById("tags").getElementsByTagName("ul")[0];
		
		tagsColl.sort(function(a,b){
					if (a.toLowerCase() < b.toLowerCase()) return -1;
					if (a.toLowerCase() > b.toLowerCase()) return 1;
					return 0;
				});
		
		var activeTags = [];
		for(i = 0; i<tagsCollLen; i++){
			tagEl = document.createElement("li");
			tagEl.innerHTML = '<a href="javascript:;">'+tagsColl[i]+'</a> | '+tagsData[tagsColl[i]].count;
			tagsData[tagsColl[i]].el = tagEl;
			tagLink = tagEl.getElementsByTagName("a")[0];
			tagLink.addEventListener("click", onTagClick);
			tagsCollCont.appendChild(tagEl);
		}
		
		/**
		 * Handle tags sorting
		 */
		 var activeSort = "alpha";
		 var sortLinks = document.getElementById("tag-tools").getElementsByTagName("a");
		 for(i=0; i<sortLinks.length; i++){
			sortLinks[i].addEventListener("click",onSortClick);
		 }
		 
		 /**
		  * Handle multiple selection operators
		  */
		  var activeOperator;
		  var opInputs = document.getElementById("tag-tools").getElementsByTagName("input");
		  for(i=0; i<opInputs.length; i++){
		  console.log(opInputs[i].getAttribute("checked"));
			if(opInputs[i].getAttribute("checked") == "checked"){
			console.log(opInputs[i].getAttribute("value"));
				activeOperator = opInputs[i].getAttribute("value");
			}
			opInputs[i].addEventListener("change",onOperatorChange);
		  }
		  
		 
		 /**
		  * Show totals
		  */
		  document.getElementById("tags").getElementsByTagName("header")[0].getElementsByTagName("span")[0].innerHTML = tagsColl.length;
		  document.getElementById("bookmarks").getElementsByTagName("header")[0].getElementsByTagName("span")[0].innerHTML = bookmarks.length;
		  
		
		//handlers
		function onOperatorChange(evt){
			activeOperator = evt.currentTarget.value;
			filter();
		}
		
		function onTagClick(evt){
			var target = evt.currentTarget;
			var i;
			
			if(target.parentNode.className != "active") {
				
				target.parentNode.className = "active";
				activeTags.push(target.innerHTML);
				
			}else{
				target.parentNode.className = "";
				for(i=0; i<activeTags.length; i++){
					if(activeTags[i] == target.innerHTML){
						activeTags.splice(i,1);
					}
				}
				
			}
			
			filter();
		}
		
		function filter(){
			var i,j, bookmarksCount = bookmarks.length, bookmarkTags,touched = 0;
			if(activeTags.length == 0){
				for(i = 0; i<bookmarksCount; i++){
					bookmarks[i].style.display = "block";
				}
			}else{
				for(i = 0; i<bookmarksCount; i++){
					bookmarkTags = bookmarks[i].getElementsByClassName("tags")[0].getAttribute("data-tags");
					touched = 0;
					for(j=0; j<activeTags.length; j++){
						if(bookmarkTags.search(new RegExp("(^|,)"+activeTags[j]+"(,|$)","gi")) >= 0){
							touched++;
						}
					}
					switch(activeOperator){
						case "OR":
							if(touched > 0){
								bookmarks[i].style.display = "block";
							}else{
								bookmarks[i].style.display = "none";
							}
							break;
						default:
							//AND
							if(touched == activeTags.length){
								bookmarks[i].style.display = "block";
							}else{
								bookmarks[i].style.display = "none";
							}
					}
					
				}
			}
			
		
			
		}
		function onSortClick(evt){
			var sorton = evt.currentTarget.getAttribute("href").substr(1).replace("sort-","");
			if(activeSort === sorton) return;
			
			for(i=0; i<sortLinks.length; i++){
				sortLinks[i].className = "";
			}
			evt.currentTarget.className = "active";
			
			activeSort = sorton;
			var i, tags = tagsCollCont.children, len = tags.length;
			
			switch(activeSort){
				case "count":
					tagsColl.sort(function(a,b){
						if (tagsData[a].count > tagsData[b].count) return -1;
						if (tagsData[a].count < tagsData[b].count) return 1;
						return 0;
					});
					break;
				default:
				//alpha
					tagsColl.sort(function(a,b){
						if (a.toLowerCase() < b.toLowerCase()) return -1;
						if (a.toLowerCase() > b.toLowerCase()) return 1;
						return 0;
					});
					
					
			}
			for(i=0; i<len; i++){
				tagsCollCont.appendChild(tagsData[tagsColl[i]].el);
			}
			
		}
		
		//utils
		function toDate(unix_timestamp){
			return new Date(unix_timestamp*1000).toLocaleString();
		}
		function trim(str)
		{
			var l=0; var r=str.length -1;
			while(l < str.length && str[l] == " ")
			{	l++; }
			while(r > l && str[r] == " ")
			{	r-=1;	}
			return str.substring(l, r+1);
		}
						
}());