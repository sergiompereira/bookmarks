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
			while(strTags.search(",") > 0){
				strTags = strTags.replace(","," ")
			}
			tagsConts[i].innerHTML = strTags;
		}
		tags = tags.substr(1);
		var tagsColl = tags.split(","), 
			tagsCollLen = tagsColl.length, 
			tagEl,tagLink,
			tagsCollCont = document.getElementById("tags-collection");
		
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
		 * handle sort
		 */
		 var activeSort = "alpha";
		 var sortLinks = document.getElementById("sort").getElementsByTagName("a");
		 for(i=0; i<sortLinks.length; i++){
			sortLinks[i].addEventListener("click",onSortClick);
		 }
		 
		
		//handlers
		function onTagClick(evt){
			var target = evt.currentTarget;
			var i,j, bookmarksCount = bookmarks.length, bookmarkTags,touched = 0;
			
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
			if(activeTags.length == 0){
				for(i = 0; i<bookmarksCount; i++){
					bookmarks[i].style.display = "block";
				}
			}else{
				for(i = 0; i<bookmarksCount; i++){
					bookmarkTags = bookmarks[i].getElementsByClassName("tags")[0].innerHTML;
					touched = 0;
					for(j=0; j<activeTags.length; j++){
						if(bookmarkTags.search(new RegExp("(^| )"+activeTags[j]+"( |$)","gi")) >= 0){
							touched++;
						}
					}
					if(touched == activeTags.length){
						bookmarks[i].style.display = "block";
					}else{
						bookmarks[i].style.display = "none";
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