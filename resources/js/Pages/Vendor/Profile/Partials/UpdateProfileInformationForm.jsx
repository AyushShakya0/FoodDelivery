import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import * as React from 'react';
import dayjs from 'dayjs';


export default function UpdateProfileInformation({ mustVerifyEmail, status, className = ''}) {
    const user = usePage().props.auth.user;
    console.log(user);



    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        image: user.image,
        address: user.address,
        number: user.number,
        city: user.city,
        cuisine: user.cuisine,
        time1: user.time1, // Add time1 to form state
        time2: user.time2,
        time: `${user.time1} - ${user.time2}`,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('vendor.profile.update'));
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

                <div>
                    <InputLabel htmlFor="Image" value="Image" />

                    <TextInput
                        id="image"
                        name="image"
                        type="file"
                        onChange={(e) => setData("image", e.target.files[0])}
                    />

                    <InputError className="mt-2" message={errors.image} />
                </div>


                <div>
                    <InputLabel htmlFor="address" value="address" />

                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        autoComplete="address" // Assuming you want to autocomplete for address
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div>
                    <InputLabel htmlFor="Number" value="Number" />

                    <TextInput
                        id="number"
                        className="mt-1 block w-full"
                        value={data.number}
                        onChange={(e) => setData('number', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.number} />
                </div>

                <div>
                    <InputLabel htmlFor="time" value="time" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker
                                label="Opening time"
                                value={data.time1}
                                onChange={(e) => setData('time1', e.target.value)}
                            />
                            <TimePicker
                                label="Closing time"
                                value={data.time2}
                                onChange={(e) => setData('time2', e.target.value)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <InputError className="mt-2" message={errors.time} />
                </div>

                <div>
                    <InputLabel htmlFor="city" value="city" />

                    <TextInput
                        id="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        // required
                        autoComplete="city"
                    />

                    <InputError className="mt-2" message={errors.city} />
                </div>

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
