import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Cart from '@/Components/Cart/Cart';



export default function Checkout({ auth, cart, menus }) {

    const userMenus = cart.filter(cartItem => cartItem.user_id === auth.user.id);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div>
                My cart
            </div>
        </AuthenticatedLayout>
    );
}
