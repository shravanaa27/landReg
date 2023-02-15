/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const LandContract = require('./lib/land-contract');
const oldLandRecord = require('./lib/oldLand');

module.exports.LandContract = LandContract;
module.exports.oldLandRecord = oldLandRecord;
module.exports.contracts = [ LandContract , oldLandRecord];
