import axiosClient from './_axiosClient';

export default {
    getAll: ({ token ,params }) => {
        return new Promise(async (resolve,reject) => {
            const url = '/benhnhan/list';
            const headers = {
                token,
            }
            const res = await axiosClient.get(url, { headers, params });
           if (res.status) {
                resolve(res)
            }
            else {
                reject(res)
            }

        });
    },
}