import axios from 'axios';
import {Task} from '../@types'
const url = 'http://locahost:5000';

export const fetchPosts = () => axios.get(url);
