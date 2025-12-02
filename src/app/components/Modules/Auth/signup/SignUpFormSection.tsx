'use client';

import { registerUser } from '@/services/AuthServices';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type SignUpFormData = {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
};

const SignUpFormSection = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        mode: 'onChange',
    });

    const router = useRouter();

    const onSubmit = async (data: SignUpFormData) => {
        console.log('Form submitted:', data);
       
        try {
            const res = await registerUser(data);
            if (res?.success) {
                toast.success(res?.message);
                setTimeout(() => {
                    router.push("/signin")
                }, 1000);
            } else {
                toast.error(res?.message);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="rounded-2xl bg-white p-8 shadow-xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign up to get started with your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register('name', {
                                    required: 'Name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Name must be at least 2 characters',
                                    },
                                })}
                                className={`mt-1 block w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    } px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                placeholder="John Doe"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Please enter a valid email address',
                                    },
                                })}
                                className={`mt-1 block w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    } px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                placeholder="john@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters',
                                    },
                                })}
                                className={`mt-1 block w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    } px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Phone Number Field */}
                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                {...register('phoneNumber', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^\+?[\d\s\-()]+$/,
                                        message: 'Please enter a valid phone number',
                                    },
                                })}
                                className={`mt-1 block w-full rounded-lg border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                                    } px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                placeholder="+1 (555) 000-0000"
                            />
                            {errors.phoneNumber && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.phoneNumber.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Sign Up
                        </button>

                        {/* Sign In Link */}
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/signin"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpFormSection;