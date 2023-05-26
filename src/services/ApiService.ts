import axios from 'axios';

const API_URL = 'https://api-python-vue.onrender.com';
const access_token = localStorage.getItem('access_token');

export default class ApiService {
  async postLogin(loginForm: any) {
    const response = await axios.post(`${API_URL}/login`, loginForm);
    return response;
  };

  async postLembretes(lembreteForm: any) {
    const response = await axios.post(`${API_URL}/lembretes`, lembreteForm, {headers: {Authorization: `Bearer ${access_token}`},
  });
    return response;
  };

  async getAllLembretes(codigoUsuario: string) {
    const response = await axios.get(`${API_URL}/lembretes/${codigoUsuario}`, {headers: {Authorization: `Bearer ${access_token}`},
    });
    return response;
  };

  async deleteLembretes(codigoUsuario: string, codigoLembrete: number) {
    const response = await axios.delete(`${API_URL}/lembretes/${codigoUsuario}/${codigoLembrete}`, {headers: {Authorization: `Bearer ${access_token}`},
  });
    return response;
  };
}
