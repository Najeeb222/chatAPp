// import React, { useContext, useEffect, useState } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { signOut } from "firebase/auth";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   query,
//   updateDoc,
//   where,
// } from "firebase/firestore";
// import { AuthContextData } from "context";
// import {
//   Box,
//   List,
//   Paper,
//   Stack,
//   Button,
//   ListItem,
//   IconButton,
//   Typography,
//   ListItemText,
//   CircularProgress,
//   Divider,
// } from "@mui/material";
// import {
//   Close,
//   Logout,
//   EditOutlined,
//   DeleteOutline,
// } from "@mui/icons-material";
// import { COLORS, ROUTES } from "constant";
// import { useNavigate } from "react-router-dom";
// import { CustomTextfield } from "components";
// import AdminPage from "../AdminPage/AdminPage";
// import { auth, firebaseDb } from "libs";

// interface Todo {
//   id: string;
//   text: string;
// }

// const TodoList: React.FC = () => {
//   const { authLoading, firebaseUser,  } = useContext(AuthContextData);
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const methods = useForm<{ todo: string }>({
//     defaultValues: { todo: "" },
//   });
//   const { setValue, reset } = methods;

//   const fullUrl = window.location.href;
//   console.log(fullUrl, "Current URL");
//   useEffect(() => {
//     if (!firebaseUser) return;



//     const unsubscribe = onSnapshot(todosQuery, (snapshot) => {
//       const todosFromDb = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         text: doc.data().text,
//         userId: doc.data().userId, // include user info if needed
//       }));
//       setTodos(todosFromDb);
//     });

//     return () => unsubscribe();
//   }, [firebaseUser,]);

//   const handleSubmitTodo = async (data: { todo: string }) => {
//     const trimmed = data.todo.trim();
//     if (!trimmed || !firebaseUser) return;

//     if (editingId) {
//       await updateDoc(doc(firebaseDb, "todos", editingId), { text: trimmed });
//       setEditingId(null);
//     } else {
//       await addDoc(collection(firebaseDb, "todos"), {
//         text: trimmed,
//         userId: firebaseUser.uid,
//       });
//     }
//     reset();
//   };

//   const handleEditTodo = (id: string, text: string) => {
//     setEditingId(id);
//     setValue("todo", text);
//   };

//   const handleCancelEdit = () => {
//     setEditingId(null);
//     reset();
//   };

//   const handleDeleteTodo = async (id: string) => {
//     await deleteDoc(doc(firebaseDb, "todos", id));
//     if (editingId === id) handleCancelEdit();
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate(ROUTES.LOGIN);
//   };

//   if (authLoading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={6}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box maxWidth="700px" mx="auto" mt={6} px={2}>
//       <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
//         <Stack spacing={4}>
//           {/* 🔐 Header */}
//           <Stack
//             direction="row"
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <Box>
//               <Typography variant="h5" fontWeight={700}>
//                 Welcome,{" "}
//                 <Box
//                   component="span"
//                   sx={{ textTransform: "capitalize", color: COLORS.primary }}
//                 >
//                   {firebaseUser?.displayName}
//                 </Box>
//               </Typography>
           
//             </Box>
//             <Button
//               onClick={handleLogout}
//               variant="outlined"
//               startIcon={<Logout />}
//               sx={{ borderRadius: 2 }}
//             >
//               Logout
//             </Button>
//           </Stack>

//           <Divider />

//           {/* ✅ Todo Form */}
//           <FormProvider {...methods}>
//             <form onSubmit={methods.handleSubmit(handleSubmitTodo)}>
//               <Stack spacing={2}>
//                 <CustomTextfield
//                   name="todo"
//                   label={editingId ? "Edit Todo" : "New Todo"}
//                   placeholder="Write a task..."
//                   rules={{ required: "Todo cannot be empty" }}
//                   type="text"
//                 />
//                 <Stack direction="row" justifyContent="flex-end" spacing={1}>
//                   {editingId && (
//                     <Button
//                       onClick={handleCancelEdit}
//                       variant="outlined"
//                       color="inherit"
//                       startIcon={<Close />}
//                     >
//                       Cancel
//                     </Button>
//                   )}
//                   <Button type="submit" variant="contained">
//                     {editingId ? "Update" : "Add Todo"}
//                   </Button>
//                 </Stack>
//               </Stack>
//             </form>
//           </FormProvider>

//           <Divider />

//           {/* 📝 Todo List */}
//           <Box>
//             <Typography variant="h6" fontWeight={600} mb={2}>
//               Your Todos
//             </Typography>

//             {todos.length === 0 ? (
//               <Typography color="text.secondary" textAlign={"center"}>
//                 No todos yet.
//               </Typography>
//             ) : (
//               <List disablePadding>
//                 {todos.map((todo) => (
//                   <ListItem
//                     key={todo.id}
//                     divider
//                     secondaryAction={
//                       <Stack direction="row" spacing={1}>
//                         <IconButton
//                           color="primary"
//                           onClick={() => handleEditTodo(todo.id, todo.text)}
//                         >
//                           <EditOutlined />
//                         </IconButton>
//                         <IconButton
//                           color="error"
//                           onClick={() => handleDeleteTodo(todo.id)}
//                         >
//                           <DeleteOutline />
//                         </IconButton>
//                       </Stack>
//                     }
//                     sx={{
//                       py: 1.5,
//                       px: 2,
//                       borderRadius: 2,
//                       "&:hover": {
//                         bgcolor: "action.hover",
//                       },
//                     }}
//                   >
//                     <ListItemText primary={todo.text} />
//                   </ListItem>
//                 ))}
//               </List>
//             )}
//           </Box>

//           {/* 🛠 Admin Section */}
        
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default TodoList;
