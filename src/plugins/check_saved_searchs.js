SF.pl.check_saved_searchs = new SF.plugin((function($) {
	var saved_searchs = { };

	var is_home = (location.origin + location.pathname) ===
		'http://fanfou.com/home';
	if (is_home) {
		var $saved_searchs = { };
		$('#savedsearchs ul li a span').each(function() {
			var $search = $(this);
			var keyword = $search.text();
			$saved_searchs[keyword] = $search;
			$search.parents('li').click(function(e) {
				$.get(
					'http://fanfou.com/q/' + encodeURIComponent(keyword),
					function(data) {
						$search.parent('a').removeClass('new');
						data = JSON.parse(data);
						var $div = $('<div />');
						$div.html(data.data.timeline);
						var $time = $('li .stamp .time', $div);
						if (! $time.length) return;
						var timestamp = Date.parse($time.first().attr('title'));
						saveTimestamp(keyword, timestamp);
					}
				);
			});
		});
	}

	var is_search_page = location.href.indexOf('http://fanfou.com/q/') === 0;
	if (is_search_page) {
		var keyword = decodeURIComponent(location.pathname.replace('/q/', ''));
		var $time = $('#stream li .stamp .time');
		if ($time.length) {
			var latest_timestamp = Date.parse($time.first().attr('title'));
			saveTimestamp(keyword, latest_timestamp);
		}
	}

	function saveTimestamp(keyword, timestamp) {
		timestamp = Math.max(timestamp, saved_searchs[keyword] || 0);
		SF.fn.setData('sf-saved-search-' + keyword, timestamp);
	}

	function loadData(keyword, timestamp) {
		saved_searchs[keyword] = timestamp;
		if (is_search_page) {
			saveTimestamp(keyword, Math.max(latest_timestamp, timestamp));
		}
		if (is_home) {
			processHome.apply(this, arguments);
		}
	}

	function processHome(keyword, timestamp) {
		var $search = $saved_searchs[keyword];
		if (! $search) return;
		var last_timestamp = SF.fn.getData('sf-saved-search-' + keyword);
		if (! last_timestamp) {
			saveTimestamp(keyword, timestamp);
			return;
		} else if (timestamp > last_timestamp) {
			$search.parent('a').addClass('new');
		} else {
			$search.parent('a').removeClass('new');
		}
	}

	function onStorage(e) {
		if (e.key.indexOf('sf-saved-search-') > -1) {
			var keyword = e.key.match(/sf-saved-search-(.+)/)[1];
			var timestamp = +e.newValue;
			processHome(keyword, timestamp);
		}
	}

	return {
		load: function() {
			if (is_home) {
				addEventListener('storage', onStorage);
			}
		},
		unload: function() {
			if (is_home) {
				removeEventListener('storage', onStorage);
			}
			$('#savedsearchs ul li a').removeClass('new');
		},
		loadData: loadData
	};
})(jQuery));