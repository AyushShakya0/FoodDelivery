import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name || '',
        email: user.email || '',
        image: user.image || '',
        number: user.number|| '',
        address: user.address || '',
        state: user.state || '',
        city: user.city || '',
        pincode: user.pincode || '',
        longitude: user.longitude || '',
        latitude: user.latitude || '',

        address1: user.address1 || '',
        state1: user.state1 || '',
        city1: user.city1 || '',
        pincode1: user.pincode1 || '',

        address2: user.address2 || '',
        state2: user.state2 || '',
        city2: user.city2 || '',
        pincode2: user.pincode2 || '',

        address3: user.address3 || '',
        state3: user.state3 || '',
        city3: user.city3 || '',
        pincode3: user.pincode3 || '',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
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
                    <InputLabel htmlFor="Number" value="Number" />

                    <TextInput
                        id="number"
                        className="mt-1 block w-full"
                        value={data.number}
                        onChange={(e) => setData('number', e.target.value)}
                    // required
                    // autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.number} />
                </div>
                <div>


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
                    <InputLabel htmlFor="state" value="state" />

                    <TextInput
                        id="state"
                        className="mt-1 block w-full"
                        value={data.state}
                        onChange={(e) => setData('state', e.target.value)}
                        autoComplete="state" // Assuming you want to autocomplete for state
                    />

                    <InputError className="mt-2" message={errors.state} />
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

                <div>
                    <InputLabel htmlFor="pincode" value="pincode" />

                    <TextInput
                        id="pincode"
                        className="mt-1 block w-full"
                        value={data.pincode}
                        onChange={(e) => setData('pincode', e.target.value)}
                        autoComplete="pincode" // Assuming you want to autocomplete for pincode
                    />

                    <InputError className="mt-2" message={errors.pincode} />
                </div>

                <div>
                    <InputLabel htmlFor="longitude" value="longitude" />
                    <TextInput
                        id="longitude"
                        className="mt-1 block w-full"
                        value={data.longitude}
                        // onChange={(e) => setData({ ...data, longitude: e.target.value })}
                        onChange={(e) => setData('longitude', e.target.value)}

                    />
                    {errors && errors.longitude && <InputError message={errors.longitude[0]} />}
                </div>

                <div>
                    <InputLabel htmlFor="latitude" value="latitude" />
                    <TextInput
                        id="latitude"
                        className="mt-1 block w-full"
                        value={data.latitude}
                        // onChange={(e) => setData({ ...data, latitude: e.target.value })}
                        onChange={(e) => setData('latitude', e.target.value)}

                    />
                    {errors && errors.latitude && <InputError message={errors.latitude[0]} />}
                </div>

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
