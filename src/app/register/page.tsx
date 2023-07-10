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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/app/FirebaseConfig";
import { setLocal } from "@/context/mainReducer";
import { MainState } from "@/interfaces/interfaces";
import { CreateUser } from "../form";

type Inputs = {
    name: string,
    email: string,
    password: string,
};

export default function Register() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const photo = "https://cdn.onlinewebfonts.com/svg/img_569204.png"
                updateProfile(user, {
                    displayName: data.name,
                    photoURL: photo,
                })
                const { email, photoURL, uid } = user
                const newUser: MainState = {
                    Author: {
                        name: data.name || "Anonymous",
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
                CreateUser(newUser, uid)
                setLocal(uid)
                router.push("/");
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to register.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 flex flex-col gap-6">
                        <Input type="text" size="lg" label="Name" {...register("name", { required: true })} />
                        {errors.name && <span className="text-red-500">This field is required</span>}
                        <Input type="email" size="lg" label="Email" {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-500">This field is required</span>}
                        <Input type="password" size="lg" label="Password" {...register("password", { required: true })} />
                        {errors.password && <span className="text-red-500">This field is required</span>}
                    </div>
                    <Checkbox
                        label={
                            (
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="flex items-center font-normal"
                                >
                                    I agree the
                                    <a
                                        href="#"
                                        className="font-medium transition-colors hover:text-blue-500"
                                    >
                                        &nbsp;Terms and Conditions
                                    </a>
                                </Typography>
                            )
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />

                    <Button
                        type="submit"
                        className="mt-6" fullWidth>
                        Sign Up
                    </Button>
                    <div className="mt-4 text-center font-normal text-gray-700">
                        Already have an account?{" "}
                        <div onClick={() => router.push("/login")}
                            className="font-medium text-blue-500 transition-colors hover:text-blue-700 cursor-pointer"
                        >
                            Sign In
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
}