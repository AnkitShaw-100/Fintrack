import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    Divider,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Lock as LockIcon, Email as EmailIcon } from "@mui/icons-material";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        showPassword: false,
        rememberMe: false
    });

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleClickShowPassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await API.post("/auth/login", {
                email: formData.email,
                password: formData.password
            });

            // Store token and user data
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            if (formData.rememberMe) {
                localStorage.setItem("rememberEmail", formData.email);
            } else {
                localStorage.removeItem("rememberEmail");
            }

            navigate("/dashboard");
        } catch (err: unknown) {
            if (err && typeof err === "object" && "response" in err && err.response && typeof err.response === "object" && "data" in err.response && err.response.data && typeof err.response.data === "object" && "message" in err.response.data) {
                setError((err.response as { data: { message: string } }).data.message);
            } else {
                setError("Something went wrong during login. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box textAlign="center" mb={3}>
                    <LockIcon color="primary" sx={{ fontSize: 50 }} />
                    <Typography variant="h4" component="h1" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Log in to continue to your account
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        name="password"
                        type={formData.showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />

                        <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                            <Typography variant="body2" color="primary">
                                Forgot password?
                            </Typography>
                        </Link>
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </Button>

                    <Divider sx={{ my: 3 }}>OR</Divider>

                    <Box textAlign="center" mt={2}>
                        <Typography variant="body2">
                            Don't have an account?{" "}
                            <Link to="/signup" style={{ textDecoration: "none" }}>
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;