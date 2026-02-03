import { useEffect, useState } from "react";

export default function App() {
  const [inventory, setInventory] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("Available");

  function handleSubmit(e) {
    e.preventDefault();

    fetch('https://op-onboarding-project.onrender.com/inventory', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        category,
        quantity: Number(quantity),
        status,
      }),
    }).then(() => {
      fetch('https://op-onboarding-project.onrender.com/inventory')
        .then((res) => res.json())
        .then((data) => setInventory(data));
    });

    setName("");
    setCategory("");
    setQuantity("");
    setStatus("Available");
  }

  useEffect(() => {
    fetch('https://op-onboarding-project.onrender.com/inventory')
      .then((res) => res.json())
      .then((data) => setInventory(data));
  }, []);

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Available">Available</option>
        <option value="Unavailable">Unavailable</option>
      </select>

      <button type="submit">Add Item</button>
    </form>

    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.quantity}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}
