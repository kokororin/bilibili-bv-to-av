var $bv = document.querySelector('#bv');
var $av = document.querySelector('#av');

var bvFunc = function() {
  var bv = $bv.value;
  if (!bv) {
    $av.value = '';
    return;
  }
  bv = 'BV' + bv.replace(/^BV/, '');
  var av = bv2av(bv);
  if (/^[0-9]+$/.test(av)) {
    $av.value = 'av' + av;
  } else {
    $av.value = '';
  }
};
var avFunc = function() {
  var av = $av.value;
  if (!av) {
    $bv.value = '';
  }
  av = av.replace(/^av/, '');
  if (/^[0-9]+$/.test(av)) {
    $bv.value = av2bv(av);
  } else {
    $bv.value = '';
  }
};

$bv.addEventListener('input', bvFunc, false);
$bv.addEventListener('paste', bvFunc, false);
$av.addEventListener('input', avFunc, false);
$av.addEventListener('input', avFunc, false);
