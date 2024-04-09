import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Cart from '@/Components/Cart/Cart';



export default function Cart_Display({ auth, cart, menus }) {
    // console.log("cart",cart);
    // console.log("food",menus);
    // console.log("auth",auth.user.id);

    const userMenus = cart.filter(cartItem => cartItem.user_id === auth.user.id );

    // const filteredMenus = cart.filter(cartItem => cartItem.menu_id === menus.id);
    console.log("userMenus",userMenus);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className=' '>
                    <section className='p-5 lg:p-20'>
                    <div>
                        <h1 className='text-xl font-semibold text-gray-500 pb-3'>My Cart</h1>
                        <div className='flex flex-wrap justify-between gap-5'>

                            <div className="flex flex-col gap-5">

                                <Cart cart={userMenus} menus={menus}/>


                            </div>

                        </div>
                    </div>
                </section>
                </div>
        </AuthenticatedLayout>
    );
}
