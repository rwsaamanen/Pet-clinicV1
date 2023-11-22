import { Credentials } from '../../constants/index'

const Login = () => {
    const credentials = Credentials;

    const inputStyle = {
        width: '300px',
    };

    return (
        <div className='flex flex-col min-h-screen w-full items-center justify-center py-16'>
            <h1 className='text-white'>
                Log in to Pets
            </h1>
            <div className='mt-4'>
                <input
                    type='text'
                    placeholder='Email'
                    className='border rounded-md px-2 py-1'
                    style={inputStyle}
                />
            </div>
            <div className='mt-4'>
                <input
                    type='password'
                    placeholder='Password'
                    className='border rounded-md px-2 py-1'
                    style={inputStyle}
                />
            </div>
            <button
                type='button'
                className='mt-4 rounded-md border bg-opacity-30 border-gray-700 bg-gray-900 p-2 px-2 text-sm text-white transition-all hover:bg-gray-900 hover:text-white'
            >
                Log In
            </button>
        </div>
    );
};

export default Login;
