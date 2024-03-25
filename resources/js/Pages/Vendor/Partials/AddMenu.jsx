import Table_Menu from '@/Components/Table_Menu';
import AuthenticatedLayout_Vendor from '@/Layouts/AuthenticatedLayout_Vendor';
import { Head } from '@inertiajs/react';
import { useState } from 'react';


const columns = [
    'name',
    'description',
    'price',
    'image',
    'Category',
    'Toppings',
    'Availaibility',
];



export default function AddMenu({ auth, menus }) {
    return (

        // we are not using this maybe
        // hello


        <AuthenticatedLayout_Vendor
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Menu</h2>}
        >
            <Head title="Menu" />


            <div>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                    </div>

                    {/* Add other input fields for itemCode, description, price, category, images, availability, customization */}

                    <div>
                        <InputLabel htmlFor="status" value="Status" />
                        <SelectInput
                            id="status"
                            className="mt-1 block w-full"
                            options={statusOptions}
                            value={data.availability} // Change to data.availability or data.status as per your data structure
                            onChange={(e) => setData({ ...data, availability: e.target.value })} // Change to data.availability or data.status as per your data structure
                        />
                        <InputError className="mt-2" message={errors.availability} /> {/* Change to errors.availability or errors.status as per your data structure */}
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Save Changes</PrimaryButton>
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

            </div>



        </AuthenticatedLayout_Vendor>
    );
}
