/** 
 * 封装logo函数
*/

import { formatTime } from './common';

const defaults = {
	level: 'log',
	logger: console,
	logErrors: true,
	colors: {
		title:'logger',
		req:'#9e9e9e',
		res:'#4caf50',
		error:'#f20404',
	}
}

function printBuffer(logEntry, options){
	const {logger,colors} = defaults;
	let {title,started,req,res} = logEntry;
	
	// Message
	const headerCSS = ['color:gray; font-weight:lighter;']
	const styles = s => `color ${s}; font-weight: bold`;

	// render
	logger.group(`%c ${title} @${formatTime(started)}`, ...headerCSS);
	logger.log('%c req', styles(colors.req), req)
	logger.log('%c res', styles(colors.res), res)
	logger.groupEnd()

}

interface LogEntry{
	started ? : object  // 触发时间
}

function createLogger(options: LogEntry = {}){
	const loggerOptions = Object.assign({}, defaults, options)
	const logEntry = options
	logEntry.started = new Date();
	printBuffer(logEntry, Object.assign({}, loggerOptions))
}

export {
	defaults,
	createLogger,
}