const responseInterceptors =  [    
    {
        name: 'newsFetch',
        succsss: (res) => {
            return res.data;
        },
        fail: (err) => {
            return Promise.reject(err.response.data);
        }
    }
];

const interceptors = {
    response : responseInterceptors
};

const install = (instance, options) => {
    const {type, ignoreInterceptors} = options;

    interceptors[type]
    .filter(interceptor => !~ignoreInterceptors.indexOf(interceptor.name))
    .forEach(interceptor => {
        const {succsss, fail} = interceptor;
        instance.interceptors[type].use(succsss, fail);
    });
};


export const doInstall = (instance, options={}) => {
    const {ignoreInterceptors = []} = options;
    install(instance, {
        type : 'response',
        ignoreInterceptors: ignoreInterceptors
    });
};