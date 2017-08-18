SF.pl.emoji_selector = new SF.plugin((function($) {
  var $location_btn_wrapper = $('.location-button-wrapper');
  if (!$location_btn_wrapper.length) return;

  var textarea = $('#phupdate textarea')[0];

  var $emoji_btn_wrapper = $('<div />');
  $emoji_btn_wrapper.prop('className', 'emoji-button-wrapper');
  $emoji_btn_wrapper.click(function(e) {
    e.stopPropagation();
  });

  var $emoji_btn = $('<div />');
  $emoji_btn.prop('id', 'emoji-button');
  $emoji_btn.prop('title', '\u6dfb\u52a0 Emoji \u8868\u60c5');
  $emoji_btn.click(function(e) {
    $emoji_selector.toggle();
    showCategory('人物', 1);
  });
  $emoji_btn.appendTo($emoji_btn_wrapper);

  var $emoji_selector = $('<div />');
  $emoji_selector.prop('id', 'emoji-selector');
  $emoji_selector.appendTo($emoji_btn_wrapper);

  var emojis = {
    '人物': ["😄","😃","😊","☺","😏","😍","😘","😚","😜","😝","😳","😁","😌","😔","😒","😞","😣","😥","😂","😭","😪","😢","😰","😅","😓","😩","😫","😨","😱","😠","😡","😤","😖","😆","😋","😷","😎","😵","😲","👿","😉","👲","👳","👮","👷","💂","👶","👦","👧","👨","👩","👴","👵","👱","👼","👸","😺","😸","😻","😽","😼","🙀","😿","😹","😾","👹","👺","🙈","🙉","🙊","💀","👽","💩","🔥","✨","🌟","💫","💥","💢","💦","💧","💤","💨","👂","👀","👃","👅","👄","👍","👎","👌","👊","✊","✌","👋","✋","👐","👆","👇","👉","👈","🙌","🙏","☝","👏","💪","🚶","🏃","💃","👫","👪","👬","👭","💏","💑","👯","🙆","🙅","💁","🙋","💆","💇","💅","👰","🙎","🙍","🙇","👑","👒","👟","👞","👡","👠","👢","👕","👔","👚","👗","🎽","👖","👘","👙","💼","👜","👝","👛","👓","🎀","🌂","💄","💛","💙","💜","💚","❤","💔","💗","💓","💕","💖","💞","💘","💌","💋","💍","💎","👤","💬","👣"],
    '大自然': ["🐶","🐺","🐱","🐭","🐹","🐰","🐸","🐯","🐨","🐻","🐷","🐽","🐮","🐗","🐵","🐒","🐴","🐑","🐘","🐼","🐧","🐦","🐤","🐥","🐣","🐔","🐍","🐢","🐛","🐝","🐜","🐞","🐌","🐙","🐚","🐠","🐟","🐬","🐳","🐫","🐩","🐾","🐲","🌸","🌷","🍀","🌹","🌻","🌺","🍁","🍃","🍂","🌿","🌾","🍄","🌵","🌴","🌲","🌳","🌰","🌱","🌼","🌑","🌓","🌔","🌕","🌛","🌙","☀","🌏","🌋","🌌","🌃","⛅","⚡","☔","❄","⛄","🌀","🌁","🌈","🌊"],
    '物体': ["☁","💝","🎎","🎒","🎓","🎏","🎆","🎇","🎐","🎑","🎃","👻","🎅","🎄","🎁","🎋","🎉","🎊","🎈","🎌","🔮","🎥","📷","📹","📼","💿","📀","💽","💾","💻","📱","☎","📞","📟","📠","📡","📺","📻","📢","📣","⏳","⌛","⏰","⌚","🔓","🔒","🔏","🔐","🔑","🔎","💡","🔦","🔌","🔋","🔍","🛀","🚽","🔧","🔩","🚪","🚬","💣","🔫","🔪","💊","💉","💰","💴","💵","💳","💸","📲","📧","📥","📤","✉","📩","📨","📫","📪","📮","📦","📝","📄","📃","📑","📊","📈","📉","📜","📋","📅","📆","📇","📁","📂","✂","📌","📎","✒","✏","📏","📐","📕","📗","📘","📙","📓","📔","📒","📚","📖","🔖","📛","📰","🎨","🎬","🎤","🎧","🎼","🎵","🎶","🎹","🎻","🎺","🎷","🎸","👾","🎮","🃏","🎴","🀄","🎲","🎯","🏈","🏀","⚽","⚾","🎾","🎱","🎳","⛳","🏁","🏆","🎿","🏂","🏊","🏄","🎣","☕","🍵","🍶","🍺","🍻","🍸","🍹","🍷","🍴","🍕","🍔","🍟","🍗","🍖","🍝","🍛","🍤","🍱","🍣","🍥","🍙","🍘","🍚","🍜","🍲","🍢","🍡","🍳","🍞","🍩","🍮","🍦","🍨","🍧","🎂","🍰","🍪","🍫","🍬","🍭","🍯","🍎","🍏","🍊","🍋","🍒","🍇","🍉","🍓","🍑","🍈","🍌","🍍","🍆","🍅","🌽"],
    '地点': ["🏠","🏡","🏫","🏢","🏣","🏥","🏦","🏪","🏩","🏨","⛪","🏬","🌇","🌆","🏯","🏰","🏭","🗼","🗾","🗻","🌄","🌅","⛺","🗽","🌉","🎠","🎡","⛲","🎢","🚢","⛵","🚤","⚓","🚀","✈","💺","🚉","🚅","🚄","🚃","🚌","🚙","🚗","🚕","🚚","🚨","🚓","🚒","🚑","🚲","💈","🚏","🎫","🚥","⚠","🚧","🔰","⛽","🏮","🎰","♨","🗿","🎪","🎭","📍","🚩","🇯🇵","🇰🇷","🇩🇪","🇨🇳","🇺🇸","🇫🇷","🇪🇸","🇮🇹","🇷🇺","🇬🇧"],
    '符号': ["1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","0⃣","🔟","🔢","😀","🔣","⬆","⬇","⬅","➡","🔠","🔡","🔤","↗","↖","↘","↙","↔","↕","◀","▶","🔼","🔽","↩","↪","ℹ","⏪","⏩","⏫","⏬","⤵","⤴","🆗","🆕","🆙","🆒","🆓","🆖","📶","🎦","🈁","🚻","#⃣","🔝","🈯","🈳","🈵","🈴","🈲","🉐","🈹","🈺","🈶","🈚","🈷","🈸","㊙","㊗","🉑","🈂","Ⓜ","🅿","🚇","🚭","♿","🚾","🚹","🚺","🆑","🆘","🆔","🆚","📳","📴","💟","🅰","🅱","🆎","🅾","🚼","♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","⛎","🔯","🏧","💹","✅","❎","✳","❇","✴","💠","💲","💱","©","®","™","❌","‼","⁉","❗","❓","❕","❔","⭕","🔙","🔚","🔛","🔜","🔃","🕛","🕕","🕒","🕘","🕐","🕑","🕓","🕔","🕖","🕗","🕙","🕚","➕","➖","✖","➗","♠","♥","♣","♦","💮","💯","✔","☑","🔘","🔗","➰","〰","〽","🔱","◼","◻","◾","◽","▪","▫","🔺","🔻","🔳","🔲","⬛","⬜","⚪","⚫","🔴","🔵","⭐","🔶","🔷","🔸","🔹"]
  };

  var categories = {
    '人物': 'people',
    '大自然': 'nature',
    '物体': 'object',
    '地点': 'location',
    '符号': 'symbol'
  };

  function showCategory(cat, p) {
    $emoji_selector.html('');
    var $categories_wrapper = $('<div />');
    $categories_wrapper.addClass('categories-wrapper');

    var $categories = $('<ul />');
    $categories.addClass('categories');
    Object.keys(emojis).forEach(function(category) {
      $('<li />').append(
        $('<span />').addClass(categories[category]).
        toggleClass('current', cat === category).text(category)
      ).click(function() {
        showCategory($(this).text(), 1);
      })
      .toggleClass('current', cat === category).appendTo($categories);
    });
    $categories.appendTo($categories_wrapper);

    var $emoji_list = $('<ul />');
    $emoji_list.addClass('list');
    var emoji_list = emojis[cat].slice(60 * (p - 1), 60 * p);
    var html = emoji_list.map(function(e, i) {
      var in_last_line = parseInt(i / 12) >= parseInt((emoji_list.length - 1) / 12);
      var code = in_last_line ? ' class="last-line"' : '';
      return '<li' + code + '>' + e + '</li>';
    }).join('');
    if (emoji_list.length % 12 !== 0) {
      var i = emoji_list.length;
      while (i++ % 12) {
        html += '<li class="placeholder"></li>';
      }
    }
    $emoji_list.html(html);
    $('li.placeholder', $emoji_list).first().css({ height: '32px' });
    $emoji_list.on('click', 'li', function(e) {
      var emoji = e.target.textContent;
      insertText(emoji);
      $emoji_selector.hide();
      textarea.focus();
    });

    if (emojis[cat].length > 60) {
      var $emoji_paginator = $('<ul />');
      $emoji_paginator.addClass('paginator');
      var total_pages = Math.ceil(emojis[cat].length / 60);
      for (var i = 1; i <= total_pages; i++) (function(i) {
        var $page_number = $('<li />');
        $page_number.text(i);
        if (i === p) {
          $page_number.addClass('current');
        } else {
          $page_number.click(function(e) {
            showCategory(cat, i);
          });
        }
        $emoji_paginator.append($page_number);
      })(i);
    }

    $emoji_selector.append($categories_wrapper);
    $emoji_selector.append($emoji_list);
    $emoji_selector.append($emoji_paginator);
  }

  $('body').click(function() {
    $emoji_selector.hide();
  });

  function insertText(text) {
    var start = textarea.selectionStart,
      end = textarea.selectionEnd;
    textarea.value = textarea.value.substring(0, start) +
      text + textarea.value.substring(end, textarea.value.length);
    textarea.selectionStart = textarea.selectionEnd = start + text.length;
  }

  return {
    load: function() {
      if ($location_btn_wrapper.length) {
        $('.upload-button-wrapper').before($emoji_btn_wrapper);
      }
    },
    unload: function() {
      $emoji_btn_wrapper.detach();
    }
  };
})(jQuery));
