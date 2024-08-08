import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_URI } from '@/app/constants';
import { useAppDispatch } from '@/redux/hooks';
import { saveToken } from '@/redux/slices/tokenSlice';

interface LoginBoxProps {
    /**
   * Is the user currently trying to login?
   */
    isLogin: boolean;
}

const LoginBox: React.FC<LoginBoxProps> = ({ isLogin }) => {
    const [domLoaded, setDomLoaded] = useState(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [ConfirmPassword, setConfirmPassword] = useState<string>('');
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [loginText, setLoginText] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const login = isLogin;
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleShowPasswordChange = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleShowConfirmPasswordChange = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
    };

    const handleLoginTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginText(e.target.value)
    }

    const handleAccountclick = () => {
        router.push(login ? '/register' : '/login');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
        const formData = new FormData();
        try {
            if (login) {
                // logic login
                formData.append('username', loginText);
                formData.append('password', password);
                const response = await axios.post(`${API_URI}/login`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 200) {
                    const {username, token} = response.data;
                    dispatch(saveToken({username, token}));
                    router.push('/dashboard');
                }
                else
                    console.error('Login failed:', response.statusText)
            } else {
                // logic register
                formData.append('name', name);
                formData.append('full_name', fullName);
                formData.append('email', email);
                formData.append('password', password);

                const response = await axios.post(`${API_URI}/register`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 201) {
                    // Redirect to login on successful registration

                    router.push('/login');
                } else {
                    console.error('Registration failed:', response.statusText);
                }
            }
        } catch (e) {
            console.error('Error from the web: ', e)
        }
    };

    return (
        <div className="backdrop-blur-xl bg-white/60 p-8 rounded-3xl shadow-md max-w-sm w-full mx-auto mt-10">
            <form onSubmit={handleSubmit}>
                {/* {!domLoaded ? null : */}
                <div className="flex flex-col space-y-10">
                    <h2 className="text-2xl font-bold text-center">
                        {login ? 'Login' : 'Register'}
                    </h2>
                    {login ? null :
                        <input
                            className="pb-0.5 w-full bg-transparent placeholder-gray-600 border-b-2 border-gray-500/70 focus:outline-none focus:border-gray-800"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Nama Pengguna"
                            value={!domLoaded ? "" : name}
                            onChange={handleNameChange}
                            required
                        />
                    }
                    {login && <input
                        className="pb-0.5 w-full bg-transparent placeholder-gray-600 border-b-2 border-gray-500/70 focus:outline-none focus:border-gray-800"
                        type="text"
                        id="login"
                        name="login"
                        placeholder="Nama Pengguna"
                        value={!domLoaded ? "" : loginText}
                        onChange={handleLoginTextChange}
                        required
                    />}
                    {!login && <input
                        className="pb-0.5 w-full bg-transparent placeholder-gray-600 border-b-2 border-gray-500/70 focus:outline-none focus:border-gray-800"
                        type="text"
                        id="full_name"
                        name="full_name"
                        placeholder="Nama Lengkap"
                        value={!domLoaded ? "" : email}
                        onChange={handleFullNameChange}
                        required
                    />}
                    {!login && <input
                        className="pb-0.5 w-full bg-transparent placeholder-gray-600 border-b-2 border-gray-500/70 focus:outline-none focus:border-gray-800"
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={!domLoaded ? "" : email}
                        onChange={handleEmailChange}
                        required
                    />}
                    <div className="relative">
                        <input
                            type={!domLoaded ? "" : showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={!domLoaded ? "" : password}
                            onChange={handlePasswordChange}
                            required
                            className="mt-1 pb-0.5 w-full bg-transparent placeholder-gray-600 border-b-2 border-gray-500/70 focus:outline-none focus:border-gray-800"
                        />
                        <div
                            onClick={handleShowPasswordChange}
                            className="absolute right-2 top-2 cursor-pointer text-gray-500"
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                    {login ? null :
                        <div className="relative">
                            <input
                                type={!domLoaded ? "" : showConfirmPassword ? 'text' : 'password'}
                                id="Confirm password"
                                name="Confirm password"
                                placeholder="Confirm Password"
                                value={!domLoaded ? "" : ConfirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                                className="mt-1 pb-0.5 w-full bg-transparent placeholder-gray-600 border-b-2 border-gray-500/70 focus:outline-none focus:border-gray-800"
                            />
                            <div
                                onClick={handleShowConfirmPasswordChange}
                                className="absolute right-2 top-2 cursor-pointer text-gray-500"
                            >
                                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>
                    }
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {login ? 'Login' : 'Register'}
                    </button>
                    {login ?
                        <p className="text-center text-gray-600 text-sm">
                            Belum punya akun? {' '}
                            <span
                                onClick={handleAccountclick}
                                className="font-extrabold hover:underline cursor-pointer"
                            >
                                Register
                            </span>
                        </p>
                        :
                        <p className="text-center text-gray-600 text-sm">
                            Sudah punya akun? {' '}
                            <span
                                onClick={handleAccountclick}
                                className="font-extrabold hover:underline cursor-pointer"
                            >
                                Login
                            </span>
                        </p>
                    }
                </div>
                {/* } */}
            </form>
        </div>
    );
};

export default LoginBox;