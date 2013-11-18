var p = Zaphod.policy,
    f = Zaphod.facets;
function principalName(url) {
  if (url.indexOf('http') === -1) return null;
  var p = url.slice(0, url.lastIndexOf('/'));
  return p;
}

p.addPolicyFn(function (element) {
  if (!(element.localName === 'input' && element.getAttribute('type') === 'password')) {
    return;
  }
  var principal = 'h';
  if (element.form && element.form.action) {
    principal = f.principalName(element.form.action);
  }
  element.value = f.cloak(element.value, principal);
});
