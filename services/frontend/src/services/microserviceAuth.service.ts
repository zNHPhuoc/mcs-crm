import { ApiBase } from '@/services/baseApi.service.ts';

const baseURL = import.meta.env.VITE_MICROSERVICE_AUTH;

const microserviceAuth = new ApiBase(baseURL).instance;

export default microserviceAuth;
