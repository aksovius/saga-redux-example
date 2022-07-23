import {useDispatch, useSelector} from "react-redux";

function App() {

    const store = useSelector(store => store);
    const dispatch = useDispatch()

    return (
        <div className="App">
         Hello saga
             <button
             onClick={() => dispatch({type:'LOAD_DATA'})}>
                 Click me
             </button>
        </div>
      );
}

export default App;
