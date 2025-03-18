import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { authAction } from "../../redux/slices/authSlice"; // Імпорт дії з Redux
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../types/reduxType";

const RegisterComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
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
        const { firstname, lastname, email, password } = userData;
        if (!firstname || !lastname || !email || !password) {
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
        setFormError(''); // Очищаємо помилку, якщо форма валідна
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // Викликаємо signUp action
                await dispatch(authAction.signUp(userData)).unwrap();

                navigate("/task");
            } catch (err) {
                console.error("Registration failed:", err);
                setFormError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstname"
                    value={userData.firstname}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastname"
                    value={userData.lastname}
                    onChange={handleChange}
                    required
                />
            </div>
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
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default RegisterComponent;
