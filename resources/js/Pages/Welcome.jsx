import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('hidden');
        document.getElementById('docs-card')?.classList.add('row-span-1');
        document.getElementById('docs-card-content')?.classList.add('flex-row');
        document.getElementById('background')?.classList.add('hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black dark:bg-black dark:text-white flex items-center justify-center min-h-screen">
                <img
                    src="/logo.png"
                    alt="GoFood Logo"
                    className="h-6 w-auto text-gray-800" // Adjusted classes
                />
                <div className="relative w-full max-w-2xl px-6">
                    <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">

                        <nav className="flex justify-center items-center gap-4 col-span-2 lg:col-start-2">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="btn-primary"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="btn-secondary"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="btn-secondary"
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        href={route('admin.login')}
                                        className="btn-secondary"
                                    >
                                        Admin Log in
                                    </Link>
                                    <Link
                                        href={route('admin.register')}
                                        className="btn-secondary"
                                    >
                                        Admin Register
                                    </Link>
                                    <Link
                                        href={route('courier.login')}
                                        className="btn-secondary"
                                    >
                                        Courier Log in
                                    </Link>
                                    <Link
                                        href={route('courier.register')}
                                        className="btn-secondary"
                                    >
                                        Courier Register
                                    </Link>
                                    <Link
                                        href={route('vendor.login')}
                                        className="btn-secondary"
                                    >
                                        Vendor Log in
                                    </Link>
                                    <Link
                                        href={route('vendor.register')}
                                        className="btn-secondary"
                                    >
                                        Vendor Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>
                </div>
            </div>
        </>
    );
}
