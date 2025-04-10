import axios from "axios";
import user from '../../src/templates/user.json' with { type: "json" };
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

const url = process.env.DOMINIO_DEV_BACK;

// Obtención y almacenamiento de token
export async function login(){


	try{
		const response = axios.post(url,user);

		const token = response.data.token;
		console.log(token);
		localStorage.setItem('token',token);
			
	} catch (error) {
	}
}

await login();

