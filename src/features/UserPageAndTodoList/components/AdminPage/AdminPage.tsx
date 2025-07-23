import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { firebaseDb } from "libs/firebase";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface TodoData {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
}

const AdminPage = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndTodos = async () => {
      try {
        const usersSnapshot = await getDocs(collection(firebaseDb, "users"));
        const userList: UserData[] = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserData[];

        const todosSnapshot = await getDocs(collection(firebaseDb, "todos"));
        const todoList: TodoData[] = todosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TodoData[];

        setUsers(userList.filter((user) => user.role !== "admin"));
        setTodos(todoList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndTodos();
  }, []);

  const handleDelete = async (todoId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(firebaseDb, "todos", todoId));
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = (todo: TodoData) => {
    // Placeholder — implement edit modal or inline form if needed
    alert(`Edit todo: ${todo.text}`);
  };

  if (loading) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="900px" mx="auto" mt={4}>
      <Typography variant="h4" mb={3}>
        All Users and Their Todos
      </Typography>

      {users.map((user) => {
        const userTodos = todos.filter((todo) => todo.userId === user.id);

        return (
          <Accordion key={user.id} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2">{user.email}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Role: {user.role}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              {userTodos.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Todo</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Actions</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userTodos.map((todo) => (
                        <TableRow key={todo.id}>
                          <TableCell>{todo.text}</TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              onClick={() => handleEdit(todo)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(todo.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No todos found for this user.
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default AdminPage;
