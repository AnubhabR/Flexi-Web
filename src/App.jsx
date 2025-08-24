import Card from "./components/card";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card
        inputfield={true}
        label="Custom label"
        inputtext="Custom placeholder"
        btntext="Custom label"
        cardtitle="Custom card title"
      />
    </div>
  );
}

export default App;
