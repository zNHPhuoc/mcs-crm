import { ApiBase } from '@/services/baseApi.service.ts';

const baseURL = import.meta.env.VITE_MICROSERVICE_PRODUCT;

const microserviceProduct = new ApiBase(baseURL).instance;

export default microserviceProduct;
