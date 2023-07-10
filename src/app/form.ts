import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/FirebaseConfig";
import { FormPage, MainState } from "@/interfaces/interfaces";

const GetUserDetails = async (uid: string) => {
    // console.log('uid', uid)
    try {
        const docSnap = await getDoc(doc(db, 'users', uid)).then((doc) => {
            if (doc.exists()) {
                return doc.data() as MainState;
            } else {
                return false;
            }
        })
        return docSnap;
    } catch (error) {
        return false;
    }
}

const CreateUser = async (data: MainState, uid: string) => {
    try {
        await setDoc(doc(db, 'users', uid), data);
        return true;
    } catch (e) {
        return false;
    }
}

const updateUserFirebase = async (User: MainState) => {
    try {
        await updateDoc(doc(db, 'users', User.Author?.uid!), { data: User.data });
        return true;
    } catch (e) {
        return false;
    }
}

const getDatabase = async (uid: string) => {
    const docSnap = await getDoc(doc(db, 'users', uid)).then((doc) => {
        if (doc.exists()) {
            return doc.data() as MainState;
        } else {
            return null;
        }
    })
    return docSnap;
}

const CreateForm = async (newForm: FormPage) => {
    try {
        await setDoc(doc(db, 'forms', newForm.id), newForm);
        return true;
    } catch (e) {
        return false;
    }
}

const ReadForm = async (FormId: string) => {
    const docSnap = await getDoc(doc(db, 'forms', FormId)).then((doc) => {
        if (doc.exists()) {
            return doc.data() as FormPage;
        } else {
            return null;
        }
    })
    return docSnap;
}

const DeleteForm = async (FormId: string) => {
    try {
        await deleteDoc(doc(db, 'forms', FormId));
        return true;
    } catch (error) {
        return false;
    }
}

const UpdateForm = async (updateForm: FormPage) => {
    const updateData = {
        id: updateForm.id,
        userName: updateForm.userName,
        userId: updateForm.userId,
        date: updateForm.date,
        title: updateForm.title,
        description: updateForm.description,
        questions: updateForm.questions,
        userResponse: updateForm.userResponse
    }
    await updateDoc(doc(db, 'forms', updateForm.id), updateData)
}


export {
    CreateUser,
    GetUserDetails,
    CreateForm,
    DeleteForm,
    UpdateForm,
    getDatabase,
    ReadForm,
    updateUserFirebase
}