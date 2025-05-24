const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models/db"); // Connexion MySQL
const userRoutes = require("./routes/users.routes");
const messageRoutes = require("./routes/messages.routes");
const routineRoutes = require("./routes/routines.routes");
const emotionRoutes = require("./routes/emotions.routes");
const userEmotionRoutes = require("./routes/userEmotion.routes");
const agendaRoutes = require("./routes/agenda.routes");
const forumCategoryRoutes = require("./routes/forumCategories.routes");
const forumPostRoutes = require("./routes/forumPosts.routes");
const forumCommentRoutes = require("./routes/forumComments.routes");
const learningModuleRoutes = require("./routes/learningModules.routes");
const userProgressRoutes = require("./routes/userLearningProgress.routes");
const permissionsRoutes = require("./routes/permissions.routes");
const userPermissionsRoutes = require("./routes/userPermission.routes");
const modulePermissionsRoutes = require("./routes/modulePermission.routes");



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// Routes Users
app.use("/api/users", userRoutes);
// Routes Messages
app.use("/api/messages", messageRoutes);
// Routes Routines
app.use("/api/routines", routineRoutes);
// Routes Emotions
app.use("/api/emotions", emotionRoutes);
// Routes UserEmotion
app.use("/api/user-emotions", userEmotionRoutes);
// Routes Agenda
app.use("/api/agenda", agendaRoutes);
// Routes Forum Catgories
app.use("/api/forum-categories", forumCategoryRoutes);
// Routes Forum Posts
app.use("/api/forum-posts", forumPostRoutes);
// Routes Forum Comments
app.use("/api/forum-comments", forumCommentRoutes);
// Routes learning Modules
app.use("/api/learning-modules", learningModuleRoutes);
// Routes user learning progress
app.use("/api/user-progress", userProgressRoutes);
// Routes Permissions
app.use("/api/permissions", permissionsRoutes);
// Routes user permissions
app.use("/api/user-permissions", userPermissionsRoutes);
// Routes module permissions
app.use("/api/module-permissions", modulePermissionsRoutes);





// Route test
app.get("/", (req, res) => {
  res.send("Backend Nodiri en ligne !");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
