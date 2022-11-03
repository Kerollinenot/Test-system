import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

import Header from './Components/Header/Header';
import AdminHeader from './Components/AdminHeader/AdminHeader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<Header />} />
				<Route path='admin-panel/*' element={<AdminHeader />} />
			</Routes>
		</BrowserRouter>
	// </React.StrictMode>
);
