// Create and export a date time string in the format yyyy-mm-dd-hh-mm-ss
// ======================================================================
// Useful to set as directory name for logs files to quickly see when they were 
// generated

// Create new date object
const date = new Date()

// Calculate the difference between UTC time and local time in minutes
const offset = date.getTimezoneOffset();

// Create a new date object using the number of seconds elapsed since epoch offset by the `offset`
const localDate = new Date(offset < 0 ? date.getTime() - date.getTimezoneOffset() * 60 * 1000 : date.getTime() + date.getTimezoneOffset() * 60 * 1000)

// Convert date object to date time string in ISO format and conver to hyphen case
const localDateTimeString = localDate.toISOString().replace(/T/, '-').replace(/:/g, '-').replace(/\.\d{3}Z/, '');

export default localDateTimeString;
