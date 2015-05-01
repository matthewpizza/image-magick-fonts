module.exports = {
	getHome: function getHome() {
	  return process.env.HOME || process.env.HOMEPATH || process.env.HOMEDIR || process.cwd();
	}
};