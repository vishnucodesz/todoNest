import './index.css';

import { Route,  Routes } from 'react-router-dom';
import Login from './login';
import { Register } from './register';
import Protected from './protected';
import Itemlist from './itemList';


const App = () => {

	return (
			<Routes>
				<Route path='/home' element={<Protected Component={<Itemlist/>}/>}/>
				<Route path='/' element={<Login/>}/>
				<Route path='/register' element={<Register/>}/>
			</Routes>
	);
};

export default App;