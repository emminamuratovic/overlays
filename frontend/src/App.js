function App() {
  return (
    <div className="p-10 bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">Test UI Box</h1>
      <input
        type="text"
        className="border border-blue-500 p-3 w-full mb-4"
        placeholder="Type something..."
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
}

export default App;
