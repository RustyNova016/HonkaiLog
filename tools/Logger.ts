const DEFAULT_NAMESPACE = '';

const info = (message: any, namespace?: string, values?: any) => {
    if (typeof message === 'string') {
        console.log(`[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [INFO] ${message}`, values);
    } else {
        console.log(`[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [INFO]`, message, values);
    }
};

const warn = (message: any, namespace?: string) => {
    if (typeof message === 'string') {
        console.log(`[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [WARN] ${message}`);
    } else {
        console.log(`[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [WARN]`, message);
    }
};

const error = (message: any, namespace?: string) => {
    if (typeof message === 'string') {
        console.log(`[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [ERROR] ${message}`);
    } else {
        console.log(`[${getDate()}] [${namespace || DEFAULT_NAMESPACE}] [ERROR]`, message);
    }
};

const getDate = () => {
    return new Date().toISOString();
};

const logging = { info, warn, error };

export default logging;