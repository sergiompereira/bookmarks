<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output indent="yes" method="html" media-type="text/xhtml" omit-xml-declaration="yes" />

	<xsl:template match="/">
		
		<html>
			<head>
				<meta http-equiv="Content-Type" content="text/xhtml; charset=UTF-8" />
				<style>
					body{
						font-family:sans-serif;
						font-size:80%;
					}
					h1{
						font-size:1.6em;
						color:#444;
					}
					h2{
						font-size:1.6em;
						display:inline;
						color:#339;
					}
					span.datetime{
						padding-left:1em;
						color:#999;
					}
					a.url{
						color:#333;
						margin:0.5em 0;
						text-decoration:none;
						display:block;
					}
					a.url:hover{
						text-decoration:underline;
					}
					div.tags{
						padding:0.5em 0.8em;
						display:inline-block;
						font-weight:bold;
						color:#393;
						
					}
					div.bookmark{
						padding:1.4em 0;
						border-top:0.2em solid #ccc;
					}
					div.bookmark  p{
						border:0.2em solid #e0e0e0;
						padding:1em;
						background-color:#eef;
					}
					ul{
						margin:0;
						padding:0;
					}
					ul#tags-collection li{
						font-size:0.9em;
						list-style:none;
						padding:0.2em 0.5em;
						margin:0.2em 0.5em;
						background-color:#eef;
						-webkit-border-radius: 0.3em;
						-moz-border-radius: 0.3em;
						border-radius: 0.3em;
						display:inline-block;
						
					}
				</style>
				
			</head>
			<body>
				<h1>Tags</h1>
				<ul id="tags-collection"></ul>
				<div id="main">
					<xsl:for-each select="html/DL/DT">
						<div class="bookmark">
							<h2 ><xsl:value-of select="A" /></h2> 
							<span class="datetime"><xsl:value-of select="A/@ADD_DATE"/></span>
							<br/>
							<a class="url" href="{A/@HREF}"><xsl:value-of select="A/@HREF" /></a>
							<div class="tags"><xsl:value-of select="A/@TAGS" /></div>
							<xsl:if test="DD != ''">
								<p><xsl:value-of select="DD" /></p>
							</xsl:if>
						</div>
						
					</xsl:for-each>
				</div>
				
				<script type="text/javascript">
					<![CDATA[
						//convert unix timestamp to human readable
						var dateTimeConts = document.getElementsByClassName("datetime");
						var i,len = dateTimeConts.length;
						for(i=0; i<len; i++){
							dateTimeConts[i].innerHTML = toDate(parseInt(dateTimeConts[i].innerHTML));
						}
						
						//print the collection of tags
						var tagsConts = document.getElementsByClassName("tags");
						var j,len = tagsConts.length;
						var tags = "",strTags,arrTags,arrTagsLen;
						for(i=0; i<len; i++){
							strTags = tagsConts[i].innerHTML;
							arrTags = strTags.split(",");

							arrTagsLen = arrTags.length;
							for(j=0; j<arrTagsLen; j++){
								if(tags.search(new RegExp("(^|,)"+arrTags[j]+"(,|$)","gi")) == -1) {
									tags = tags+","+arrTags[j];
								}
							}
							
							while(strTags.search(",") > 0){
								strTags = strTags.replace(",","&nbsp; &nbsp;")
							}
							tagsConts[i].innerHTML = strTags;
						}
						tags = tags.substr(1);
						var tagsColl = tags.split(","), 
							tagsCollLen = tagsColl.length, 
							tagEl,
							tagsCollCont = document.getElementById("tags-collection");
						
						tagsColl.sort(function(a,b){
									if (a.toLowerCase() < b.toLowerCase()) return -1;
									if (a.toLowerCase() > b.toLowerCase()) return 1;
									return 0;
								});
						for(i = 0; i<tagsCollLen; i++){
							tagEl = document.createElement("li");
							tagEl.innerHTML = tagsColl[i];
							tagsCollCont.appendChild(tagEl);
						}
						
					
						function toDate(unix_timestamp){
							return new Date(unix_timestamp*1000).toLocaleString();
						}
					]]>
				</script>
			</body>
		</html>
	</xsl:template>
	

</xsl:stylesheet>