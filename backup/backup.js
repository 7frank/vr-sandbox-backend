'use strict';
/**
 * @file tar example
 * @module mongodb-backup
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var backup = require('mongodb-backup');
var config = require('./config');
/*
 * use
 */

backup(config);