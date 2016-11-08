'use strict';

/*
 USAGE : node calcIntervenantDomicile.js <prix> [<AEbrut>]
 brut (booléen) : si le prix donné est un brut d'AE
 */

require('console.table');
const _ = require('lodash');

const TMI = 0.3;

const CSAE = 1 / (1 - 0.233) - 1;
const CSEmployee = 0.83;

var prix = +process.argv[2];
if (process.argv[3])
  prix = prix * (1 - 0.233);

console.log('Prix net : ' + decimals(prix));

const cases = {
  black: {
    csInt: 0,
    rCsIntFixed: 0,
    rIRPrix: 0,
    rIRCS: 0,
    creditIS: 0,
    direct: 1,
  },
  AE: {
    csInt: CSAE,
    rCsIntFixed: 0,
    rIRPrix: 0,
    rIRCS: 0,
    creditIS: 0,
    direct: 1,
  },
  'AE-SAP': {
    csInt: CSAE,
    rCsIntFixed: 0,
    rIRPrix: 0.5,
    rIRCS: 0.5,
    creditIS: 0,
    direct: 1,
  },
  CESU: {
    csInt: CSEmployee,
    rCsIntFixed: 2,
    rIRPrix: 0.5,
    rIRCS: 0.5,
    creditIS: 0,
    direct: 1,
  },
  'CESU-pre': {
    csInt: CSEmployee,
    rCsIntFixed: 2,
    rIRPrix: 0,
    rIRCS: 0.5,
    creditIS: 0.25,
    direct: 0,
  },
  'CESU-pre-post': {
    csInt: CSEmployee,
    rCsIntFixed: 2,
    rIRPrix: 0.5,
    rIRCS: 0.5,
    creditIS: 0.25,
    direct: 1,
  },
  'CESU-decla': {
    csInt: CSEmployee,
    rCsIntFixed: 2,
    rIRPrix: 0.5,
    rIRCS: 0.5,
    creditIS: 0.25,
    direct: 0,
  },
}

function cout(prix, type) {
  const vars = cases[type];
  const r = {type: type};

  r.csInt = prix * vars.csInt - vars.rCsIntFixed;
  r.intTotal = prix + r.csInt;
  r.rIR = prix * vars.rIRPrix + r.csInt * vars.rIRCS;
  r.remu = (prix * vars.direct + r.csInt - r.rIR) / (1 - TMI);
  r.IR = r.remu * TMI;
  r.cs = r.remu * 0.45;
  r.rIS = (prix * !vars.direct + r.remu + r.cs) * 0.28 + prix * vars.creditIS;
  r.cout = r.remu + r.cs - r.rIS + prix * !vars.direct;

  return r;
}

function decimals(nb) {
  if (_.isString(nb))
    return nb;
  return Math.round(nb * 100) / 100;
}

function compute(type) {
  return _.mapValues(cout(prix, type), decimals);
}

const res = _.map(_.keys(cases), compute);
console.table(res);
