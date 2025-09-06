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
    IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        showPassword: false
    });

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await API.post("auth/signup", {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            setSuccess("Signup successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err: unknown) {
            if (err && typeof err === "object" && "response" in err && err.response && typeof err.response === "object" && "data" in err.response && err.response.data && typeof err.response.data === "object" && "message" in err.response.data) {
                setError((err.response as { data: { message: string } }).data.message);
            } else {
                setError("Something went wrong during signup. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box textAlign="center" mb={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create an Account
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Join our community today
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        {success}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Full Name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

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

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </Button>

                    <Divider sx={{ my: 3 }}>OR</Divider>

                    <Box textAlign="center" mt={2}>
                        <Typography variant="body2">
                            Already have an account?{" "}
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                Log in
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Signup;