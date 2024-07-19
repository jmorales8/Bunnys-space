export function ErrorCheckDB(err, location, message) {
  if(err) {
    console.log(location + " ERROR:", message);
    throw err;
  }
}
