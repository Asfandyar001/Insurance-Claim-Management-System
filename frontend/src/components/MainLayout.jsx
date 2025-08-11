import Sidebar from './Sidebar';
import TopBar from './Topbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import AddClaim from '../pages/AddClaim.jsx';

export default function MainLayout() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex relative">
            <Sidebar setOpenAddClaim={setOpen} />

            <div className="flex flex-col flex-1">
                <TopBar />

                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            <AddClaim open={open} onClose={() => setOpen(false)} onSubmit={()=> setOpen(false)} />
        </div>
    );
}
