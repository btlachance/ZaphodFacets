(function(guestGlobal) {
  var originalHTMLImageElement_prototype_srcPD = Object.getOwnPropertyDescriptor(guestGlobal.Element, 'src');
  Object.defineProperty(guestGlobal.Element, 'src', {
    set: function (newSrc) {
      Zaphod.log('setter');
      if (newSrc instanceof Zaphod.facets.FacetedValue) {
	Zaphod.log('Yes!');
      }
      originalHTMLImageElement_prototype_srcPD.set.apply(this, newSrc);
    }
  });
  Zaphod.log('ran pap-dom.js');
})(Narcissus.interpreter.global);
