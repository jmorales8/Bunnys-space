import { intro } from "./src/intro";

async function fetchData() {
  try {
    const data = await intro();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
