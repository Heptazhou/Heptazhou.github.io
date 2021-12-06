/* https://github.com/emn178/online-tools */
;(function ($, window, document, undefined) {
	window.decode = require("base")("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").decode
	window.encode = require("base")("0123456789").encode
	function copy_output() {
		var copyText = document.querySelector("#output")
		copyText.select()
		document.execCommand("copy")
	}
	document.querySelector("#output").addEventListener("click", copy_output)
	$(document).ready(function () {
		var input = $("#input")
		var output = $("#output")
		var checkbox = $("#auto-update")
		var execute = function () {
			try {
				output.val(encode(decode(input.val())))
			} catch (e) {
				output.val(e)
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
