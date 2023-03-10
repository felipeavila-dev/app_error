import axios from 'axios';

import { API_URL } from '../global/variables';

export const api = axios.create({
    baseURL: API_URL,
});
