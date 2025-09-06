import { useEffect, useState } from "react";
import API from "../api";
import type { Expense } from "../types";
import InputAdornment from "@mui/material/InputAdornment";
import ExpenseChart from "../components/ExpenseChart";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Add as AddIcon,
    AttachMoney as AttachMoneyIcon,
    Category as CategoryIcon,
    Description as DescriptionIcon,
    CalendarToday as CalendarIcon
} from "@mui/icons-material";

const Dashboard = () => {
    // State for expenses and form
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    // State for editing
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editCategory, setEditCategory] = useState("");
    const [editAmount, setEditAmount] = useState<number>(0);
    const [editDate, setEditDate] = useState("");
    const [editDescription, setEditDescription] = useState("");

    // Delete confirmation dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null);

    // Categories for dropdown
    const categories = [
        "Food",
        "Transportation",
        "Housing",
        "Entertainment",
        "Utilities",
        "Healthcare",
        "Education",
        "Shopping",
        "Other"
    ];

    // Start editing handler
    const startEditing = (exp: Expense) => {
        setEditingId(exp._id);
        setEditCategory(exp.category);
        setEditAmount(exp.amount);
        setEditDate(exp.date.split("T")[0]);
        setEditDescription(exp.description || "");
    };

    // Fetch expenses
    const fetchExpenses = async () => {
        try {
            const res = await API.get("/expenses");
            setExpenses(res.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch expenses");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Add new expense
    const handleAddExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post("/expenses", { category, amount, date, description });
            setCategory("");
            setAmount(0);
            setDate("");
            setDescription("");
            fetchExpenses();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add expense");
        }
    };

    // Update handler
    const handleUpdateExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;
        try {
            const res = await API.put(`/expenses/${editingId}`, {
                category: editCategory,
                amount: editAmount,
                date: editDate,
                description: editDescription,
            });
            setExpenses(expenses.map(exp => exp._id === editingId ? res.data : exp));
            setEditingId(null);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update expense");
        }
    };

    // Delete handler
    const handleDeleteExpense = async () => {
        if (!expenseToDelete) return;
        try {
            await API.delete(`/expenses/${expenseToDelete}`);
            setExpenses(expenses.filter((exp) => exp._id !== expenseToDelete));
            setDeleteDialogOpen(false);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to delete expense");
        }
    };

    const openDeleteDialog = (id: string) => {
        setExpenseToDelete(id);
        setDeleteDialogOpen(true);
    };

    const cancelEditing = () => {
        setEditingId(null);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Expense Dashboard
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Add Expense Form */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Add New Expense
                        </Typography>
                        <Box component="form" onSubmit={handleAddExpense}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    label="Category"
                                    required
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <CategoryIcon color="action" />
                                        </InputAdornment>
                                    }
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Amount"
                                type="number"
                                value={amount || ""}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoneyIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                multiline
                                rows={2}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                                startIcon={<AddIcon />}
                            >
                                Add Expense
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Expense Chart */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Expense Overview
                        </Typography>
                        <ExpenseChart expenses={expenses} />
                    </Paper>
                </Grid>

                {/* Expenses Table */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Your Expenses
                        </Typography>
                        {loading ? (
                            <Box display="flex" justifyContent="center" p={4}>
                                <CircularProgress />
                            </Box>
                        ) : expenses.length === 0 ? (
                            <Alert severity="info">No expenses found. Add some to get started!</Alert>
                        ) : (
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Category</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell align="center">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {expenses.map((exp) => (
                                            <TableRow key={exp._id} hover>
                                                {editingId === exp._id ? (
                                                    <>
                                                        <TableCell>
                                                            <FormControl fullWidth size="small">
                                                                <Select
                                                                    value={editCategory}
                                                                    onChange={(e) => setEditCategory(e.target.value)}
                                                                    required
                                                                >
                                                                    {categories.map((cat) => (
                                                                        <MenuItem key={cat} value={cat}>
                                                                            {cat}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                size="small"
                                                                type="number"
                                                                value={editAmount || ""}
                                                                onChange={(e) => setEditAmount(Number(e.target.value))}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                size="small"
                                                                type="date"
                                                                value={editDate}
                                                                onChange={(e) => setEditDate(e.target.value)}
                                                                required
                                                                InputLabelProps={{ shrink: true }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                size="small"
                                                                value={editDescription}
                                                                onChange={(e) => setEditDescription(e.target.value)}
                                                                fullWidth
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <IconButton
                                                                color="primary"
                                                                onClick={handleUpdateExpense}
                                                            >
                                                                <SaveIcon />
                                                            </IconButton>
                                                            <IconButton color="secondary" onClick={cancelEditing}>
                                                                <CancelIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </>
                                                ) : (
                                                    <>
                                                        <TableCell>{exp.category}</TableCell>
                                                        <TableCell align="right">₹{exp.amount.toFixed(2)}</TableCell>
                                                        <TableCell>
                                                            {new Date(exp.date).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            {exp.description || "-"}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <IconButton
                                                                color="primary"
                                                                onClick={() => startEditing(exp)}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                color="error"
                                                                onClick={() => openDeleteDialog(exp._id)}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </>
                                                )}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this expense?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleDeleteExpense}
                        color="error"
                        variant="contained"
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Dashboard;