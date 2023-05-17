import RewardTable from "./Components/RewardTable";

function App() {
    return (
        <div className="container">
            <RewardTable dataUrl="http://localhost:3001/data" />
        </div>
    );
}

export default App;
