'use client';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@/app/material";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/FirebaseConfig";
import { MainState } from "@/interfaces/interfaces";
import { setLocal } from "@/context/mainReducer";

type Inputs = {
    name: string,
    email: string,
    password: string,
};
export default function Login() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const photo = "https://cdn.onlinewebfonts.com/svg/img_569204.png"
                const { displayName, email, photoURL, uid } = user
                const newUser: MainState = {
                    Author: {
                        name: displayName || "Anonymous",
                        email: email || "Anonymous",
                        photoURL: photoURL || photo,
                        uid: uid,
                    },
                    token: null,
                    data: [],
                    isLogged: true,
                    loading: false,
                    status: null,
                    error: false
                }
                setLocal(newUser)
                router.push("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign In
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to login.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 flex flex-col gap-6">
                        <Input type="email" size="lg" label="Email" {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-500">This field is required</span>}
                        <Input type="password" size="lg" label="Password" {...register("password", { required: true })} />
                        {errors.password && <span className="text-red-500">This field is required</span>}
                    </div>
                    <Button type="submit" className="mt-6" fullWidth>
                        Sign In
                    </Button>

                    <div className="mt-4 text-center font-normal text-gray-700">
                        Create Account {" "}
                        <div onClick={() => router.push("/register")}
                            className="font-medium text-blue-500 transition-colors hover:text-blue-700 cursor-pointer"
                        >
                            Sign Up
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
}