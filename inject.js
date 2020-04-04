var table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF',
  tr = {};
for (var i = 0; i < 58; i++) {
  tr[table[i]] = i;
}
var s = [11, 10, 3, 8, 4, 6],
  xor = 177451812,
  add = 8728348608;

function bv2av(x) {
  var r = 0;
  for (var i = 0; i < 6; i++) {
    r += tr[x[s[i]]] * 58 ** i;
  }
  return (r - add) ^ xor;
}

function av2bv(x) {
  x = (x ^ xor) + add;
  r = 'BV1  4 1 7  '.split('');
  for (var i = 0; i < 6; i++) {
    r[s[i]] = table[Math.floor(x / 58 ** i) % 58];
  }
  return r.join('');
}

function bvUrl2AvUrl(url) {
  return url.replace(/\/video\/(BV([a-zA-Z0-9]+))/, function (str, bv) {
    var avCode = bv2av(bv);
    return str.replace(bv, 'av' + avCode);
  });
}

if (!location.href.startsWith('chrome-extension')) {
  var url = window.location.href.replace(window.location.origin, '');

  url = bvUrl2AvUrl(url);

  if (/\/video\/av[0-9]+/.test(url)) {
    window.history.replaceState(null, null, url);
  }

  var observer = new MutationObserver(function (mutations, observer) {
    mutations.forEach(function (mutation) {
      var links = document.querySelectorAll('a');
      Array.prototype.forEach.call(links, function (a) {
        if (a.href) {
          var href = a.href;
          href = bvUrl2AvUrl(href);
          a.href = href;
        }
      });
    });
  });

  observer.observe(document.querySelector('body'), {
    childList: true,
    characterData: true,
    subtree: true
  });
}
