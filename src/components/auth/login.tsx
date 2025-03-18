import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { authAction } from "../../redux/slices/authSlice"; // Імпорт дії з Redux
import { useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import {AppDispatch} from "../../types/reduxType";

const SignInComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useAppSelector((state) => state.auth);

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const [formError, setFormError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const validateForm = () => {
        const { email, password } = userData;
        if (!email || !password) {
            setFormError('Please fill in all fields');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setFormError('Please enter a valid email');
            return false;
        }
        if (password.length < 6) {
            setFormError('Password must be at least 6 characters long');
            return false;
        }
        setFormError('');
        return true;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {

                await dispatch(authAction.signIn(userData)).unwrap();

                navigate("/dashboard");
            } catch (err) {
                console.error("Login failed:", err);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            {formError && <p>{formError}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <button type="submit">Sign In</button>
            )}
            {error && <p>{error}</p>}

            <p>
                Don't have an account? <button type="button" onClick={() => navigate("/register")}>Sign Up</button>
            </p>
        </form>
    );
};

export default SignInComponent;
