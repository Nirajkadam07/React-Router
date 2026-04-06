export default function Vans() {
  async function getData() {
    const response = await fetch("/api/vans");
    const data = await response.json();
    console.log(data);
  }
  getData();
  return <h1>Vans goes here</h1>;
}
