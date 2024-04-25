import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import * as React from "react";
import { enableRipple } from '@syncfusion/ej2-base';

// Enable ripple effect
enableRipple(true);

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    // Initialize form state using useForm hook
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        image: user.image,
        description: user.description,
        address: user.address,
        number: user.number,
        city: user.city,
        cuisine: user.cuisine,
        start_time: user.start_time,
        end_time: user.end_time,
    });

    // Function to handle form submission
    const submit = (e) => {
        e.preventDefault();
        patch(route('vendor.profile.update')),{
            start_time:data.start_time,
            end_time:data.end_time,
        };
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* Image */}
                <div>
                    <InputLabel htmlFor="image" value="Image" />
                    <TextInput
                        id="image"
                        name="image"
                        type="file"
                        onChange={(e) => setData("image", e.target.files[0])}
                    />
                    <InputError className="mt-2" message={errors.image} />
                </div>

                {/* Description */}
                <div>
                    <InputLabel htmlFor="description" value="Description" />
                    <TextInput
                        id="description"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        autoComplete="description"
                    />
                    <InputError className="mt-2" message={errors.description} />
                </div>


                {/* Time */}
                <div>
                    <InputLabel htmlFor="start_time" value="start_time" />
                    <TextInput
                        type="time"
                        value={data.start_time}
                        onChange={(e) =>setData("start_time", e.target.value)}

                        required
                    />
                    <InputError className="mt-2" message={errors.start_time} />
                </div>

                <div>
                    <InputLabel htmlFor="end_time" value="end_time" />
                    <TextInput
                        type="time"
                        value={data.end_time}
                        onChange={(e) =>setData("end_time", e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.end_time} />
                </div>

                {/* Address */}
                <div>
                    <InputLabel htmlFor="address" value="Address" />
                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        autoComplete="address"
                    />
                    <InputError className="mt-2" message={errors.address} />
                </div>

                {/* Number */}
                <div>
                    <InputLabel htmlFor="number" value="Number" />
                    <TextInput
                        id="number"
                        className="mt-1 block w-full"
                        value={data.number}
                        onChange={(e) => setData('number', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.number} />
                </div>

                {/* City */}
                <div>
                    <InputLabel htmlFor="city" value="City" />
                    <TextInput
                        id="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        autoComplete="city"
                    />
                    <InputError className="mt-2" message={errors.city} />
                </div>

                {/* Conditional rendering based on email verification */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                {/* Save button */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
