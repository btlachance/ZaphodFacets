document.body.addEventListener('change', function (event) {
  if (!event.target.mozMatchesSelector('.credit-card')) {
    return;
  }
  var cardNumber = event.target.value;
  //do some damage
}, false);
