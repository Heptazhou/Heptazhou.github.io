/* https://github.com/emn178/online-tools */
(function ($, window, document, undefined) {
	window.method = Base64.encode;
	function copy_output() {
		var copyText = document.querySelector("#output");
		copyText.select();
		document.execCommand("copy");
	}
	function copy_outurl() {
		var copyText = document.querySelector("#outurl");
		copyText.select();
		document.execCommand("copy");
	}
	document.querySelector("#output").addEventListener("click", copy_output);
	document.querySelector("#outurl").addEventListener("click", copy_outurl);
	$(document).ready(function () {
		var input = $("#input");
		var output = $("#output");
		var outurl = $("#outurl");
		var checkbox = $("#auto-update");
		var dropzone = $("#droppable-zone");
		var option = $("[data-option]");
		var execute = function () {
			try {
				output.val(method(input.val(), option.val()));
			} catch (e) {
				output.val(e);
			}
			try {
				var s = input.val();
				if (s == "") outurl.val(s);
				else {
					s = decodeURIComponent(s).replace(/^https:(?=\/\/.+)/i, "");
					s = method(s, option.val()).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_");
					outurl.val("https://heptazhou.com/&" + s);
				}
			} catch (e) {
				outurl.val(e);
			}
		};
		function autoUpdate() {
			if (!checkbox[0].checked) return;
			execute();
		}
		if (checkbox.length > 0) {
			input.bind("input propertychange", autoUpdate);
			option.bind("input propertychange", autoUpdate);
			checkbox.click(autoUpdate);
		}
		if (dropzone.length > 0) {
			var dropzonetext = $("#droppable-zone-text");
			$(document.body).bind("dragover drop", function (e) {
				e.preventDefault();
				return false;
			});
			if (!window.FileReader) {
				dropzonetext.text("Browser does not support.");
				$("input").attr("disabled", true);
				return;
			}
			dropzone.bind("dragover", function () {
				dropzone.addClass("hover");
			});
			dropzone.bind("dragleave", function () {
				dropzone.removeClass("hover");
			});
			dropzone.bind("drop", function (e) {
				dropzone.removeClass("hover");
				file = e.originalEvent.dataTransfer.files[0];
				dropzonetext.text(file.name);
				autoUpdate();
			});
			input.bind("change", function () {
				file = input[0].files[0];
				dropzonetext.text(file.name);
				autoUpdate();
			});
			var file;
			execute = function () {
				reader = new FileReader();
				var value = option.val();
				if (method.update) {
					var batch = 1024 * 1024 * 2;
					var start = 0;
					var total = file.size;
					var current = method;
					reader.onload = function (event) {
						try {
							current = current.update(event.target.result, value);
							asyncUpdate();
						} catch (e) {
							output.val(e);
						}
					};
					var asyncUpdate = function () {
						if (start < total) {
							output.val("Hashing..." + ((start / total) * 100).toFixed(2) + "%");
							var end = Math.min(start + batch, total);
							reader.readAsArrayBuffer(file.slice(start, end));
							start = end;
						} else {
							output.val(current.hex());
						}
					};
					asyncUpdate();
				} else {
					output.val("Hashing...");
					reader.onload = function (event) {
						try {
							output.val(method(event.target.result, value).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
						} catch (e) {
							output.val(e);
						}
					};
					reader.readAsArrayBuffer(file);
				}
			};
		}
		$("#execute").click(execute);
		var parts = location.pathname.split("/");
		$('a[href="' + parts[parts.length - 1] + '"]').addClass("active");
	});
})(jQuery, window, document);
