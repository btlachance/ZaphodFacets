var p = Zaphod.policy,
    f = Zaphod.facets;
p.addPolicyFn(function (element) {
  if (element.localName === 'input' && element.mozMatchesSelector('.credit-card')) {
    element.value = f.cloak(element.value, 'h');
  }
});
