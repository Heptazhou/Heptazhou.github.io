function hashsplit(str) {
	var list = str.match(/^#\/*(.*?)\/*$/)
	if (list != null && list[1] != "") return list[1].split(/\/+/)
	else return null
}
function pdec(pointer) {
	while (pointer.length % 4 != 0) pointer += "="
	return decodeURI(Base64.decode(pointer))
}
function redirect(dest) {
	document.body.innerHTML = ""
	document.body.style = "margin: 2.7rem"
	console.log(Base64.encode(dest).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"))
	if (silent === false) {
		document.body.innerHTML = `\n\t<h1 style="line-height: 3.14rem; font-weight: normal">Click to redirect...</h1>\n\t<br />\n\t<a href="${encodeURI(dest)}">> ${dest}</a>\n`
	}
	if (silent === true) {
		location.href = dest
		document.body.innerHTML = `\n\t<h1 style="line-height: 3.14rem; font-weight: normal">Redirecting...</h1>\n\t<br />\n\t<a href="javascript:;" onclick="hash_func()">> Click to retry if needed.</a>\n`
	}
}
function hash_func() {
	var list = hashsplit(location.hash)
	if (list == null) return null
	for (var i = 0; i < list.length; i++) {
		var para = list[i].replace(/=*\s*$/, "").trim()
		if (para.match(/.=./)) {
			var k = para.match(/^(.+?)=.+$/)[1]
			var v = para.match(/^.+?=(.+)$/)[1]
			if (v.startsWith("*")) {
				silent = true
				v = v.replace(/^\*+/, "")
			}
			v = decodeURI(v.replace(/\*/g, "/")).trim()
			v = clean_illegal(v)
			switch (k) {
				case "url":
					try {
						v = pdec(v)
						if (v.startsWith("*")) {
							silent = true
							v = v.replace(/^\*+/, "")
						}
						if (v.startsWith("//")) v = v.replace(/^\/+/, "https://")
						redirect(v)
					} catch (e) {
						console.log("Invalid pointer.")
						document.body.innerHTML = ""
						document.body.style = "margin: 2.7rem"
						document.body.innerHTML = `\n\t<h1 style="line-height: 3.14rem; font-weight: normal">Invalid argument</h1>\n\t<br />\n\tPlease check again.\n`
					}
					break
				case "b":
					if (0);
					else if (/^au/i.test(v)) redirect(`https://www.bilibili.com/audio/${v}`)
					else if (/^av/i.test(v)) redirect(`https://www.bilibili.com/video/${v}`)
					else if (/^bv/i.test(v)) redirect(`https://www.bilibili.com/video/${v}`)
					else if (/^md/i.test(v)) redirect(`https://www.bilibili.com/bangumi/media/${v}`)
					else if (/^ss/i.test(v)) redirect(`https://www.bilibili.com/bangumi/play/${v}`)
					else (silent = false) || redirect(`https://www.bilibili.com/${v}`)
					break
				case "bu":
					redirect(`https://space.bilibili.com/${v}`)
					break
				case "bv":
					redirect(`https://www.bilibili.com/video/av${v}`)
					break
				case "e":
				case "eg":
					redirect(`https://e-hentai.org/g/${v}`)
					break
				case "es":
					redirect(`https://e-hentai.org/s/${v}`)
					break
				case "ew":
					redirect(`https://ehwiki.org/index.php?title=Special:Search&fulltext=Search&search=${encodeURIComponent(v)}`)
					break
				case "g":
				case "gp":
					redirect(`https://gelbooru.com/index.php?page=post&s=view&id=${v}`)
					break
				case "k":
				case "kp":
					redirect(`https://konachan.com/post/show/${v}`)
					break
				case "n":
					if (0);
					else if (v.startsWith("sm")) redirect(`https://www.nicovideo.jp/watch/${v}`)
					else if (v.startsWith("ch")) redirect(`https://ch.nicovideo.jp/channel/${v}`)
					else if (v.startsWith("im")) redirect(`https://seiga.nicovideo.jp/seiga/${v}`)
					else if (v.startsWith("lv")) redirect(`https://live.nicovideo.jp/watch/${v}`)
					else if (v.startsWith("mg")) redirect(`https://seiga.nicovideo.jp/watch/${v}`)
					else if (v.startsWith("nw")) redirect(`https://news.nicovideo.jp/watch/${v}`)
					else if (v.startsWith("so")) redirect(`https://www.nicovideo.jp/watch/${v}`)
					break
				case "nh":
					redirect(`https://nhentai.net/g/${v}`)
					break
				case "nj":
					redirect(`https://nijie.info/view.php?id=${v}`)
					break
				case "p":
				case "pa":
					redirect(`https://www.pixiv.net/artworks/${v}`)
					break
				case "pu":
					redirect(`https://www.pixiv.net/users/${v}`)
					break
				case "t":
				case "ts":
					redirect(`https://twitter.com/i/status/${v}`)
					break
				case "ti":
					redirect(`https://pbs.twimg.com/media/${v}?format=jpg&name=large`)
					break
				case "w":
					redirect(`https://m.weibo.cn/status/${v}`)
					break
				case "y":
				case "yp":
					redirect(`https://yande.re/post/show/${v}`)
					break
				case "yt":
					redirect(`https://youtu.be/${v}`)
					break
				default:
					console.log("Unknown key.")
			}
		} else {
			console.log("Nothing to do.")
		}
	}
}
var silent = false
hash_func()
window.addEventListener("hashchange", hash_func, false)
