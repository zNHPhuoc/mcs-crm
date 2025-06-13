// import microserviceAuth from '@/services/microserviceAuth.service.ts';

export const login = async (payload: { email: string; password: string }) => {
  console.log(payload);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: true,
        email: 'test@gmail.com',
        token: '123',
      });
    }, 1000);
  });
};

export const getUserInfo = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: true,
        email: 'test@gmail.com',
        token: '123',
      });
    }, 1000);
  });

  // return await microserviceAuth.get('me');
};
