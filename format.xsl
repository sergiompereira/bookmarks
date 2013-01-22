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
					}
					h1{
						font-size:1em;
						display:inline;
						color:#339;
					}
					span.datetime{
						font-size:0.8em;
						padding-left:1em;
						color:#999;
					}
					a.url{
						color:#333;
						margin:0.3em 0;
						text-decoration:none;
						display:block;
						font-size:0.8em;
					}
					a.url:hover{
						text-decoration:underline;
					}
					div.tags{
						padding:0.3em 0.6em;
						display:inline-block;
						font-size:0.9em;
						font-weight:bold;
						color:#666;
						
					}
					div.bookmark{
						padding:1.2em 0;
						border-top:1px solid #ccc;
					}
					div.bookmark  p{
						font-size:0.8em;
						border:1px solid #e0e0e0;
						padding:10px;
						background-color:#eef;
					}
				</style>
				
			</head>
			<body>
				<div id="main">
					<xsl:for-each select="html/DL/DT">
						<div class="bookmark">
							<h1 ><xsl:value-of select="A" /></h1> 
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
						var dateTimeConts = document.getElementsByClassName("datetime");
						var i,len = dateTimeConts.length;
						for(i=0; i<len; i++){
							dateTimeConts[i].innerHTML = toDate(parseInt(dateTimeConts[i].innerHTML));
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