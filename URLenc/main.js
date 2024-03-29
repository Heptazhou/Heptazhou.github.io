/* https://github.com/emn178/online-tools */
;(function ($, window, document, undefined) {
	window.decode = require("base")("0123456789").decode
	window.encode = require("base")("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").encode
	window.method = Base64.encode
	function copy_output() {
		var copyText = document.querySelector("#output-common")
		copyText.select()
		document.execCommand("copy")
	}
	function copy_outurl() {
		var copyText = document.querySelector("#output-special")
		copyText.select()
		document.execCommand("copy")
	}
	document.querySelector("#output-common").addEventListener("click", copy_output)
	document.querySelector("#output-special").addEventListener("click", copy_outurl)
	$(document).ready(function () {
		var input = $("#input")
		var output1 = $("#output-common")
		var output2 = $("#output-special")
		var checkbox = $("#auto-update")
		/* https://github.com/the1812/Bilibili-Evolved/blob/v2.0.8/min/url-params-clean.min.js */
		function cleanurl(z) {
			// prettier-ignore
			const a = ["__cf_chl_captcha_tk__", "__cf_chl_jschl_tk__", "_ff", "_ts", "ab_channel", "accept_quality", "ad_od", "adpicid", "amp", "app_version", "apptime", "appuid", "bar", "bbid", "bddid", "bdtype", "broadcast_type", "bsource", "bu", "cg", "ch", "cid", "client", "cs", "ct", "cu", "current_qn", "current_quality", "di", "display", "dm_progress", "dmid", "eqid", "euri", "expiration", "f", "fbclid", "feature", "featurecode", "fm", "fr", "from_source", "from_spmid", "from", "fromid", "fromtitle", "fromurl", "group_id", "gsm", "gx", "hs", "inputT", "ipn", "is_reflow", "is", "isappinstalled", "islist", "issp", "jid", "lfid", "lm", "ln", "lpn", "luicode", "mpshare", "msource", "network_status", "network", "oid", "oq", "oriquery", "os", "p1", "p2p_type", "pid", "platform_network_status", "playurl_h264", "playurl_h265", "pn", "pp", "prefixsug", "puid", "qbl", "qid", "quality_description", "query", "querylist", "rand", "ref_src", "ref_url", "refd", "referfrom", "req_id", "retcode", "rn", "rsf", "rsp", "rsv_bp", "rsv_btype", "rsv_cq", "rsv_dl", "rsv_enter", "rsv_idx", "rsv_iqid", "rsv_pq", "rsv_spt", "rsv_t", "rt", "s", "sc", "scene", "seid", "session_id", "sfr", "share_medium", "share_plat", "share_session_id", "share_source", "share_tag", "share_token", "sharer_shareid", "sharer_sharetime", "simid", "sme", "source", "sourceFrom", "sourceType", "spm_id_from", "spm", "spn", "src", "srcid", "tdsourcetag", "timestamp", "tn", "ts", "tt_from", "uct", "unique_k", "user", "usm", "utm_campaign", "utm_content", "utm_medium", "utm_oi", "utm_relevant_index", "utm_source", "utm_term", "utm_user", "visit_id", "weibo_id", "wfr", "wm", "wxa_abtest", "wxshare_count", "xhsshare", "z"]
			const b = z.match(/(?:\?.+)?$/)[0]
			const c = b.substring(1).split("&")
			const d = c.filter((j) => !a.some((k) => j.startsWith(`${k}=`))).join("&")
			const e = z.replace(b, "")
			return !d ? `${e}` : `${e}?${d}`
		}
		var execute = function () {
			try {
				var s = cleanurl(clean_illegal(decodeURIComponent(input.val()).trim()))
				if (s === "") output1.val("")
				else {
					var silent = !s.startsWith("*")
					s = silent ? s : s.replace(/^\*+/, "")
					// https://www.ietf.org/rfc/rfc3986.html#section-3.1 Scheme
					if (/^[a-z][a-z0-9+.-]*:.+/i.test(s)) s = s.replace(/^https:(?=\/\/.+)/i, "")
					else if (s[0] !== "/") s = "//" + s
					s = silent ? s : "*" + s
					s = method(s).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_")
					output1.val(`heptazhou.com/&${s}`)
				}
			} catch (e) {
				output1.val(e)
			}
			try {
				var s = cleanurl(clean_illegal(decodeURIComponent(input.val()).trim()))
				if (s === "") output2.val("")
				else {
					var silent = !s.startsWith("*")
					s = silent ? s : s.replace(/^\*+/, "")
					// https://www.ietf.org/rfc/rfc3986.html#section-3.1 Scheme
					if (/^[a-z][a-z0-9+.-]*:.+/i.test(s)) {
						if (!/^https?:\/{2,}[^\/]/i.test(s)) throw ""
						s = s.replace(/^https?:\/+/i, "")
					} else {
						if (s[0] === "/" && !/^\/{2,}[^\/]/i.test(s)) throw ""
						s = s.replace(/^\/+/, "")
					}
					s = s.replace(/\/{2,}/g, "/")
					var k = s.match(/^(.+?)\//)[1]
					var v = s.match(/^.+?\/(.+)/)[1]
					switch (k) {
						case "b23.tv":
							if (v.length < 3 || !/(au|av|bv|md|ss)/i.test(v.substring(0, 2)) || !/^\d+?(#.*)?$/.test(v.substring(2))) throw ""
						case "bilibili.com":
						case "m.bilibili.com":
						case "www.bilibili.com":
							k = "b"
							v = (v.match(/^(?:audio|bangumi\/(?:media|play)|video)\/(.+)/) || v.match(/^(av\d+.*)/) || ["", v])[1]
							if ((s = v.match(/^av(\d+.*)\b/))) {
								k = "bv"
								v = s[1]
							}
							break
						case "space.bilibili.com":
							k = "bu"
							break
						case "e-hentai.org":
						case "exhentai.org":
							s = v.match(/^(.+?)\/(.+?)\/*$/)
							switch (s[1]) {
								case "g":
									k = "e"
									break
								case "s":
									k = "es"
									break
								default:
									k = ""
							}
							v = s[2]
							break
						case "ehwiki.org":
							k = "ew"
							v = v.match(/^index\.php\?(?:.+?&)*search=([^&]+)/)[1]
							break
						case "gelbooru.com":
							k = "g"
							v = v.match(/^index\.php\?(?:.+?&)*id=(\d+)/)[1]
							break
						case "konachan.com":
							k = "k"
							v = v.match(/^post\/show\/(.+)/)[1]
							break
						case "nicovideo.jp":
						case "www.nicovideo.jp":
							k = "n"
							v = v.match(/^watch\/(.+)/)[1]
							break
						case "live.nicovideo.jp":
						case "live2.nicovideo.jp":
							k = "n"
							v = v.match(/^watch\/(.+)/)[1]
							break
						case "seiga.nicovideo.jp":
							k = "n"
							v = (v.match(/^seiga\/(.+)/) || v.match(/^watch\/(.+)/))[1]
							break
						case "nhentai.net":
							s = v.match(/^g\/(.+?)\/*$/)
							k = "nh"
							v = s[1]
							break
						case "nijie.info":
							k = "nj"
							v = v.match(/^view\.php\?(?:.+?&)*id=(\d+)/)[1]
							break
						case "pixiv.net":
						case "www.pixiv.net":
							s = v.match(/^(.+?)\/(.+)/)
							switch (s[1]) {
								case "artworks":
									k = "p"
									break
								case "users":
									k = "pu"
									break
								default:
									k = ""
							}
							v = s[2]
							break
						case "twitter.com":
						case "mobile.twitter.com":
							k = "t"
							v = v.match(/^.+?\/status\/(.+)/)[1]
							v = encode(decode(v))
							break
						case "pbs.twimg.com":
							k = "ti"
							v = v.match(/^media\/([^.?]+)/)[1]
							break
						case "yande.re":
							k = "y"
							v = v.match(/^post\/show\/(.+)/)[1]
							break
						case "youtu.be":
							k = "yt"
							v = v.replace("?", "&")
							break
						case "youtube.com":
						case "m.youtube.com":
						case "www.youtube.com":
							k = "yt"
							v = v.replace(/([?&])time_continue=/, "$1t=")
							var t = v.match(/^watch\?(?:.+?&)*(t=\d+)/)
							v = (v.match(/^watch\?(?:.+?&)*v=([\w-]+)/) || v.match(/^embed\/([\w-]+)/))[1]
							if (t) v = v + "&" + t[1]
							break
						default:
							k = ""
					}
					if (k === "" || v === "") throw ""
					v = v.replace(/\*/g, "%2a").replace(/\//g, "*")
					v = silent ? v : "*" + v
					output2.val(`heptazhou.com/#${k}=${v}`)
				}
			} catch (e) {
				output2.val("")
			}
		}
		function autoUpdate() {
			if (!checkbox[0].checked) return
			execute()
		}
		if (checkbox.length > 0) {
			input.bind("input propertychange", autoUpdate)
			checkbox.click(autoUpdate)
		}
		$("#execute").click(execute)
	})
})(jQuery, window, document)
