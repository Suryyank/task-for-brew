import { db, auth } from "@/db/firebaseContext";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  getDocs,
  orderBy,
  updateDoc,
  deleteDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { NewTaskData, TaskDoc } from "@/types/NewTaskData";

//create task
export async function createTask(task: NewTaskData) {
  const tasksCol = collection(db, "tasks");
  const userId = auth.currentUser?.uid;

  const docRef = await addDoc(tasksCol, {
    ...task,
    userId, // 🔥 save logged-in user
    createdAt: Timestamp.now(),
  });

  return docRef.id;
}

//Read One Task
export async function getTask(id: string) {
  const snapshot = await getDoc(doc(db, "tasks", id));

  if (!snapshot.exists()) return null;

  return { id: snapshot.id, ...snapshot.data() };
}

//Read all task
export async function getAllTasks(): Promise<TaskDoc[]> {
  const snapshot = await getDocs(collection(db, "tasks"));

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title ?? "",
      description: data.description ?? "",
      dueDate: data.dueDate ?? "",
      priority: data.priority ?? "low",
      status: data.status ?? "to_do",
      userId: data.userId ?? "",
    } satisfies TaskDoc;
  });
}

//update task
export async function updateTask(id: string, data: Partial<NewTaskData>) {
  await updateDoc(doc(db, "tasks", id), {
    ...data,
    updatedAt: new Date().toISOString(),
  });

  return true;
}

//delete task
export async function deleteTask(id: string) {
  await deleteDoc(doc(db, "tasks", id));
  return true;
}

//get task for user
export async function getTasksForUser(userId: string): Promise<TaskDoc[]> {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title ?? "",
      description: data.description ?? "",
      dueDate: data.dueDate ?? "",
      priority: data.priority ?? "low",
      status: data.status ?? "to_do",
      userId: data.userId ?? "",
    } satisfies TaskDoc;
  });
}
