<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output indent="yes" method="html" media-type="text/xhtml" omit-xml-declaration="yes" />

	<xsl:template match="/">
		
		<html>
			<head>
				<meta http-equiv="Content-Type" content="text/xhtml; charset=UTF-8" />
				<link rel="stylesheet" href="style.css" />
				
			</head>
			<body>
				<h1>Tags</h1>
				<div id="sort">Sort: <a href="#sort-alpha" class="active">Alpha</a> | <a href="#sort-count">Count</a></div>
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
				
				<script type="text/javascript" src="script.js"></script>
			</body>
		</html>
	</xsl:template>
	

</xsl:stylesheet>