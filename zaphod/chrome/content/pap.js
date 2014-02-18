/* -*- Mode: JS; tab-width: 2; indent-tabs-mode: nil; -*-
 * vim: set sw=4 ts=4 et tw=78:
 */
Zaphod = this.Zaphod || {};
Zaphod.pap = {};
(function(exports, facets) {
  let labelCounter = 0,
      policies = {},
      f = Zaphod.facets;

  function label(fn) {
    let labels = [];
    for (let i = 0; i < fn.length; i++) {
      let label = new f.Label('pappy_' + labelCounter++);
      //Is it OK that we're relying on Label.prototype.toString to return the value, which here is
      //only going to be the unsigned value (since we're never making a reversed one)? Should we
      //explicitly use Label.prototype.unsigned()?
      policies[label] = function() { return true; };
      labels.push(label);
    }
    return fn.apply(this, labels);
  }

  function andf() {
    var args = [].slice.apply(arguments);
    return function (x) {
      args.reduce(function (previous, current) {
	return previous && current(x);
      }, true); // true because we default to 'true' in our policies
    };
  }

  function collect(sources) {
    
  }
  
  function restrict(label, policyFn) {
    let pc = Narcissus.interpreter.getPC();
    policies[label] = andf(
      policies[label],
      new f.FacetedValue(pc.join(label), policyFn, function() { return true; }));
  }

  function evaluateWrite(channel, value) {
    //labels from value, values' labels' policy fns, and PC
    var labelsForValue = collectLabels(value),
	labelsForValuePolicies = labelsForValue.reduce(
	  function(previous, current) {
	    return previous.concat(collectLabels(current));
	  },
	  labelsForValue
	),
	pc = Narcissus.interpreter.getPC(),
	finalPolicy = (function() {
	  var policyFns =
		[].concat(
		  labelsForValue,
		  labelsForValuePolicies,
		  pc.labelSet
		).map(function(label) { return policies[label]; });
	  return andf.apply(this, policyFns);
	}()),
	policyCheck = finalPolicy(channel);
    // FIXME: actually "commit" the write!
  }

  function collectLabels(fv) {
    if (!(fv instanceof facets.FacetedValue)) { return []; }
    // FIXME: stub
    return [];
  }

  function chan_network(url) {
    var urlHelper = content.document.createElement('a');
    urlHelper.href = url;
    return {
      host: urlHelper.host
    };
  }

  exports.label = label;
  exports.restrict = restrict;
  exports.evaluateWrite = evaluateWrite;
  exports.channel = {
    //Used for GET, POST, etc. Maybe we could separate those out, but
    //as far as we're concerned for now, they're all the same.
    network: chan_network
  };
})(Zaphod.pap, Zaphod.facets);
